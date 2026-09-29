"use server";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export interface AssistantRecord {
  id?: string;
  code: string;
  nim?: string;
  name: string;
  role: "ASPRAK" | "KOMDIS" | "SEKBEN";
  password?: string;
  email?: string;
  is_active?: boolean;
}

/**
 * Mengambil daftar asisten aktif dari database Supabase
 */
export async function getAssistants(): Promise<AssistantRecord[]> {
  if (!isSupabaseConfigured()) {
    // Fallback data demo jika belum connect ke Supabase
    return [
      { code: "GWAN", nim: "1202230001", name: "Andi P. (Koor Komdis)", role: "KOMDIS" },
      { code: "IZIN", nim: "1202230002", name: "M. Izin (Korprak)", role: "ASPRAK" },
      { code: "KEYS", nim: "1202230003", name: "Keysha (Sekre)", role: "SEKBEN" },
    ];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("assistants")
      .select("id, code, nim, name, role, email, is_active")
      .eq("is_active", true)
      .order("code", { ascending: true });

    if (error) {
      console.error("Gagal mengambil data asisten:", error);
      return [];
    }

    return data as AssistantRecord[];
  } catch (err) {
    console.error("Error getAssistants:", err);
    return [];
  }
}

/**
 * Menambahkan asisten baru ke Supabase
 */
export async function addAssistant(assistant: AssistantRecord) {
  if (!isSupabaseConfigured()) {
    return { 
      success: false, 
      error: "Supabase belum terkonfigurasi. Harap isi NEXT_PUBLIC_SUPABASE_URL dan ANON_KEY di .env.local." 
    };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("assistants")
      .insert({
        code: assistant.code.trim().toUpperCase(),
        nim: assistant.nim?.trim() || null,
        name: assistant.name.trim(),
        role: assistant.role,
        password: assistant.password || "asisten2026",
        email: assistant.email || null,
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message || "Gagal menambahkan asisten" };
  }
}
