"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function loginAction(prevState: any, formData: FormData) {
  const identifier = (formData.get("identifier") as string)?.trim().toUpperCase();
  const password = (formData.get("password") as string)?.trim();
  const roleInput = ((formData.get("role") as string) || "").toUpperCase();

  if (!identifier || !password) {
    return { error: "Harap isi Kode Asisten dan password sesi." };
  }

  const cookieStore = await cookies();

  // 1. JIKA SUPABASE SUDAH TERKONFIGURASI: Validasi langsung ke Database Supabase
  if (isSupabaseConfigured()) {
    try {
      const supabase = await createClient();

      // Cari asisten berdasarkan kode atau NIM
      const { data: assistant, error } = await supabase
        .from("assistants")
        .select("*")
        .or(`code.ilike.${identifier},nim.eq.${identifier}`)
        .eq("is_active", true)
        .maybeSingle();

      if (error) {
        console.error("Supabase Query Error:", error);
        return { error: `Gagal mengakses database Supabase: ${error.message}` };
      }

      if (!assistant) {
        return { 
          error: `Asisten dengan kode/NIM "${identifier}" tidak ditemukan di database. Pastikan data sudah terdaftar di Supabase.` 
        };
      }

      // Verifikasi password sesi
      if (assistant.password !== password) {
        return { error: "Password sesi salah. Silakan periksa kembali password Anda." };
      }

      // Simpan sesi asisten ke dalam secure cookies
      cookieStore.set("mock_session", assistant.code, { path: "/", httpOnly: true });
      cookieStore.set("mock_role", assistant.role, { path: "/", httpOnly: true });
      cookieStore.set("assistant_name", assistant.name, { path: "/", httpOnly: true });

      redirect("/dashboard/assistant");
    } catch (err: any) {
      if (err?.digest?.startsWith("NEXT_REDIRECT")) {
        throw err; // Re-throw Next.js redirect
      }
      console.error("Login Supabase Exception:", err);
      return { error: err.message || "Terjadi kesalahan saat memproses login ke Supabase." };
    }
  }

  // 2. JIKA SUPABASE BELUM DI-SETUP: Mode Demo / Failover Aman
  // Tentukan role default berdasarkan identifier atau input
  let role = "ASPRAK";
  if (roleInput && ["ASPRAK", "KOMDIS", "SEKBEN"].includes(roleInput)) {
    role = roleInput;
  } else if (identifier === "GWAN") {
    role = "KOMDIS";
  } else if (identifier === "IZIN") {
    role = "ASPRAK";
  } else if (identifier === "KEYS") {
    role = "SEKBEN";
  }

  // Izinkan masuk untuk preset demo atau kode kustom apapun jika password diisi
  if (identifier.length >= 2) {
    cookieStore.set("mock_session", identifier, { path: "/" });
    cookieStore.set("mock_role", role, { path: "/" });
    cookieStore.set(
      "assistant_name",
      identifier === "GWAN"
        ? "Andi P. (Koor Komdis)"
        : identifier === "IZIN"
        ? "M. Izin (Korprak)"
        : identifier === "KEYS"
        ? "Keysha (Sekre)"
        : `Asisten ${identifier}`,
      { path: "/" }
    );
    redirect("/dashboard/assistant");
  }

  return { error: "Kredensial tidak valid." };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("mock_session");
  cookieStore.delete("mock_role");
  cookieStore.delete("assistant_name");
  redirect("/");
}
