"use server";

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(prevState: any, formData: FormData) {
  const identifier = (formData.get('identifier') as string)?.trim().toUpperCase();
  const password = formData.get('password') as string;
  const roleInput = (formData.get('role') as string) || "";

  if (!identifier || !password) {
    return { error: 'Harap isi Kode Asisten dan password.' };
  }

  const cookieStore = await cookies();
  
  const isNim = /^\d+$/.test(identifier);
  if (isNim) {
    return { error: 'Akses ditolak. Portal ini khusus untuk asisten praktikum (Asprak, Komdis, Sekben).' };
  }

  // Determine role based on identifier or roleInput
  let role = "ASPRAK";
  if (roleInput) {
    role = roleInput;
  } else if (identifier === "IZIN") {
    role = "KOMDIS";
  } else if (identifier === "LEVI") {
    role = "SEKBEN";
  } else {
    role = "ASPRAK";
  }

  if (identifier === "GWAN" || identifier === "IZIN" || identifier === "LEVI" || identifier.length >= 2) {
    cookieStore.set('mock_session', identifier, { path: '/' });
    cookieStore.set('mock_role', role, { path: '/' });
    redirect('/dashboard/assistant');
  }

  return { error: 'Kredensial tidak valid.' };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('mock_session');
  cookieStore.delete('mock_role');
  redirect('/');
}
