"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function loginAction(prevState: any, formData: FormData) {
  const identifier = (formData.get("identifier") as string)?.trim().toUpperCase();
  const password = (formData.get("password") as string)?.trim();

  if (!identifier || !password) {
    return { error: "Harap isi Kode Asisten dan password sesi." };
  }

  const cookieStore = await cookies();

  // Pemetaan default berdasarkan kode asisten:
  // - GWAN: Koor Komdis (KOMDIS)
  // - IZIN: Korprak (ASPRAK)
  // - KEYS: Sekre (SEKBEN)
  // - LEVI: Sekben (SEKBEN)
  let resolvedRole: "ASPRAK" | "KOMDIS" | "SEKBEN" = "ASPRAK";
  let assistantName = `Asisten ${identifier}`;

  if (identifier === "GWAN") {
    resolvedRole = "KOMDIS";
    assistantName = "Andi Pratama (Koor Komdis)";
  } else if (identifier === "IZIN") {
    resolvedRole = "ASPRAK";
    assistantName = "M. Izin Alamsyah (Korprak)";
  } else if (identifier === "KEYS") {
    resolvedRole = "SEKBEN";
    assistantName = "Keysha (Sekre)";
  } else if (identifier === "LEVI") {
    resolvedRole = "SEKBEN";
    assistantName = "Levina Sekar (Sekben)";
  } else if (identifier.includes("KOMDIS")) {
    resolvedRole = "KOMDIS";
  }

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
        // Gunakan role & nama dari database
        const dbRole = (assistant.role as "ASPRAK" | "KOMDIS" | "SEKBEN") || resolvedRole;
        const dbName = assistant.name || assistantName;

        const dbExpectedPassword =
          dbRole === "KOMDIS"
            ? `${assistant.code.toLowerCase()}komdis123`
            : `${assistant.code.toLowerCase()}123`;

        const isValid =
          password.toLowerCase() === dbExpectedPassword ||
          assistant.password === password ||
          password === "asisten2026";

        if (!isValid) {
          const hint = dbRole === "KOMDIS" ? `${assistant.code}komdis123` : `${assistant.code}123`;
          return { error: `Password salah. Format password untuk ${assistant.code}: ${hint}` };
        }

        // Simpan sesi asisten
        cookieStore.set("mock_session", assistant.code, { path: "/" });
        cookieStore.set("mock_role", dbRole, { path: "/" });
        cookieStore.set("assistant_name", dbName, { path: "/" });

        redirect("/dashboard/assistant");
      }
    } catch (err: any) {
      if (err?.digest?.startsWith("NEXT_REDIRECT")) {
        throw err;
      }
      console.error("Login Supabase Exception:", err);
    }
  }

  // 2. VERIFIKASI SECARA MANUAL (Fallback Offline Sesuai Aturan Dinamis Pengguna):
  // Rule password dinamis:
  // - Jika role Komdis: KODEkomdis123 (contoh: GWANkomdis123)
  // - Jika role lain (Asprak/Sekben): KODE123 (contoh: IZIN123, KEYS123)
  const isKomdis = resolvedRole === "KOMDIS";
  const expectedPassword = isKomdis
    ? `${identifier.toLowerCase()}komdis123`
    : `${identifier.toLowerCase()}123`;

  const isValidManualPassword =
    password.toLowerCase() === expectedPassword ||
    password === "asisten2026"; // toleransi backwards compatibility

  if (!isValidManualPassword) {
    const hint = isKomdis ? `${identifier}komdis123` : `${identifier}123`;
    return {
      error: `Password sesi salah. Format password untuk kode ${identifier}: ${hint}`,
    };
  }

  cookieStore.set("mock_session", identifier, { path: "/" });
  cookieStore.set("mock_role", resolvedRole, { path: "/" });
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
