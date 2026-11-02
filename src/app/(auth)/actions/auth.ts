"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import {
  getAssistantByCode,
  getAssistantByNim,
  getAssistantAccessLevel,
  getExpectedPassword,
} from "@/data/assistants-roster";

export async function loginAction(prevState: any, formData: FormData) {
  const identifier = (formData.get("identifier") as string)?.trim().toUpperCase();
  const password = (formData.get("password") as string)?.trim();

  if (!identifier || !password) {
    return { error: "Harap isi Kode Asisten / NIM dan password sesi." };
  }

  const cookieStore = await cookies();

  // 1. Verifikasi Asisten Resmi Laboratorium EDM (32 Asisten Resmi)
  const matchedAssistant = getAssistantByCode(identifier) || getAssistantByNim(identifier);

  if (!matchedAssistant) {
    return {
      error: "Identitas tidak ditemukan. Harap masukkan Kode Asisten resmi atau NIM Anda.",
    };
  }

  const assistantCode = matchedAssistant.code;
  const accessLevel = getAssistantAccessLevel(assistantCode);
  const expectedPassword = getExpectedPassword(assistantCode);

  // Verifikasi kecocokan sandi (case-insensitive untuk kenyamanan pengguna)
  let isPasswordValid = password.toUpperCase() === expectedPassword.toUpperCase();
  if (!isPasswordValid && assistantCode === "DEVO") {
    // Mendukung DEVOADMINR1 maupun DEVO194545 untuk kemudahan akses Super Admin DEVO
    isPasswordValid =
      password.toUpperCase() === "DEVOADMINR1" || password.toUpperCase() === "DEVO194545";
  }
  if (!isPasswordValid && assistantCode === "MACY") {
    isPasswordValid = password.toUpperCase() === "MACY194545";
  }

  if (!isPasswordValid) {
    return {
      error: "Password salah. Silakan periksa kembali kata sandi akun Anda.",
    };
  }

  // 2. Simpan Sesi & Hak Akses Berdasarkan Departemen Resmi
  // - "SUPER_ADMIN" : Khusus MACY & DEVO (Super Admin)
  // - "ADMIN"       : Executive Board & Compliance and Integrity
  // - "ASPRAK"      : Akun Biasa (Creative & Multimedia, Tech & Systems, Module Development)
  const sessionRole =
    accessLevel === "SUPER_ADMIN" || accessLevel === "ADMIN_BESAR"
      ? "SUPER_ADMIN"
      : accessLevel === "ADMIN"
      ? "ADMIN"
      : "ASPRAK";

  cookieStore.set("mock_session", assistantCode, { path: "/" });
  cookieStore.set("mock_role", sessionRole, { path: "/" });
  cookieStore.set("assistant_name", `${matchedAssistant.name} (${matchedAssistant.position})`, { path: "/" });

  redirect("/dashboard/assistant");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("mock_session");
  cookieStore.delete("mock_role");
  cookieStore.delete("assistant_name");
  redirect("/");
}
