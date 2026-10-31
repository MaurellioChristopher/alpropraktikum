"use server";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { ALPRO_ASSISTANTS, getExpectedPassword, AssistantRole } from "@/data/assistants-roster";

export interface AssistantRecord {
  id?: string;
  code: string;
  nim?: string;
  name: string;
  role: AssistantRole;
  position?: string;
  division?: string;
  phone?: string;
  lineId?: string;
  password?: string;
  email?: string;
  is_active?: boolean;
}

/**
 * Mengambil daftar asisten aktif dari database Supabase atau fallback data roster resmi
 */
export async function getAssistants(): Promise<AssistantRecord[]> {
  if (!isSupabaseConfigured()) {
    return ALPRO_ASSISTANTS.map((a) => ({
      code: a.code,
      nim: a.nim,
      name: `${a.name} (${a.position})`,
      role: a.role,
      position: a.position,
      division: a.division,
      phone: a.phone,
      lineId: a.lineId,
      email: a.studentEmail,
      is_active: true,
    }));
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
        password: assistant.password || getExpectedPassword(assistant.code),
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
