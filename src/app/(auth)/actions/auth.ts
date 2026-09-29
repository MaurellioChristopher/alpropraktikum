"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function loginAction(prevState: any, formData: FormData) {
  const identifier = (formData.get("identifier") as string)?.trim().toUpperCase();
  const password = (formData.get("password") as string)?.trim();
  const roleInput = ((formData.get("role") as string) || "ASPRAK").toUpperCase();

  if (!identifier || !password) {
    return { error: "Harap isi Kode Asisten dan password sesi." };
  }

  const cookieStore = await cookies();

  // Rule password dinamis:
  // - Jika role Komdis: KODEkomdis123 (contoh: GWANkomdis123)
  // - Jika role lain (Asprak/Sekben): KODE123 (contoh: IZIN123, KEYS123)
  const isKomdis = roleInput === "KOMDIS" || identifier === "GWAN";
  const expectedPassword = isKomdis
    ? `${identifier.toLowerCase()}komdis123`
    : `${identifier.toLowerCase()}123`;

  // 1. JIKA SUPABASE TERKONFIGURASI: Cek ke Database Supabase
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
      }

      if (assistant) {
        // Cek apakah password sesuai dengan rule dinamis KODE123 / KODEkomdis123 ATAU password tersimpan di db
        const dbExpectedPassword =
          assistant.role === "KOMDIS"
            ? `${assistant.code.toLowerCase()}komdis123`
            : `${assistant.code.toLowerCase()}123`;

        const isValid =
          password.toLowerCase() === dbExpectedPassword ||
          assistant.password === password ||
          password.toLowerCase() === expectedPassword;

        if (!isValid) {
          const hint = assistant.role === "KOMDIS" ? `${assistant.code}komdis123` : `${assistant.code}123`;
          return { error: `Password salah. Format password untuk ${assistant.role}: ${hint}` };
        }

        // Simpan sesi asisten
        cookieStore.set("mock_session", assistant.code, { path: "/", httpOnly: true });
        cookieStore.set("mock_role", assistant.role, { path: "/", httpOnly: true });
        cookieStore.set("assistant_name", assistant.name, { path: "/", httpOnly: true });

        redirect("/dashboard/assistant");
      }
    } catch (err: any) {
      if (err?.digest?.startsWith("NEXT_REDIRECT")) {
        throw err;
      }
      console.error("Login Supabase Exception:", err);
    }
  }

  // 2. VERIFIKASI SECARA MANUAL (Sesuai Aturan Dinamis Pengguna):
  // Password wajib sesuai: KODE123 (atau KODEkomdis123 untuk Komdis)
  const isValidManualPassword =
    password.toLowerCase() === expectedPassword ||
    password === "asisten2026"; // toleransi backwards compatibility

  if (!isValidManualPassword) {
    const hint = isKomdis ? `${identifier}komdis123` : `${identifier}123`;
    return {
      error: `Password sesi salah. Format password untuk role ${roleInput}: ${hint}`,
    };
  }

  // Tentukan nama asisten
  let assistantName = `Asisten ${identifier}`;
  if (identifier === "GWAN") assistantName = "Andi P. (Koor Komdis)";
  else if (identifier === "IZIN") assistantName = "M. Izin (Korprak)";
  else if (identifier === "KEYS") assistantName = "Keysha (Sekre)";

  cookieStore.set("mock_session", identifier, { path: "/" });
  cookieStore.set("mock_role", roleInput, { path: "/" });
  cookieStore.set("assistant_name", assistantName, { path: "/" });

  redirect("/dashboard/assistant");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("mock_session");
  cookieStore.delete("mock_role");
  cookieStore.delete("assistant_name");
  redirect("/");
}
