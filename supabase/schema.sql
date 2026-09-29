-- ====================================================================
-- SKEMA DATABASE SUPABASE: EDM LABORATORY (ALGORITMA & PEMROGRAMAN)
-- Jalankan skrip SQL ini di Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql/new
-- ====================================================================

-- 1. TABEL ASISTEN PRAKTIKUM (Portal Internal Laboratorium)
CREATE TABLE IF NOT EXISTS public.assistants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,                       -- Kode Asisten (misal: GWAN, IZIN, LEVI)
  nim TEXT UNIQUE,                                 -- NIM Asisten (misal: 1202230015)
  name TEXT NOT NULL,                              -- Nama Lengkap Asisten
  role TEXT NOT NULL CHECK (role IN ('ASPRAK', 'KOMDIS', 'SEKBEN')), -- Hak Akses Role
  password TEXT NOT NULL DEFAULT 'asisten2026',    -- Password Sesi
  email TEXT,                                      -- Email institusi (@telkomuniversity.ac.id)
  is_active BOOLEAN DEFAULT true,                  -- Status Keaktifan Akun
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index untuk mempercepat query pencarian login
CREATE INDEX IF NOT EXISTS idx_assistants_code ON public.assistants (code);
CREATE INDEX IF NOT EXISTS idx_assistants_nim ON public.assistants (nim);
CREATE INDEX IF NOT EXISTS idx_assistants_role ON public.assistants (role);

-- Aktifkan Row Level Security (RLS)
ALTER TABLE public.assistants ENABLE ROW LEVEL SECURITY;

-- Policy agar aplikasi Next.js (Anon Key) dapat memverifikasi asisten aktif
DROP POLICY IF EXISTS "Allow read active assistants" ON public.assistants;
CREATE POLICY "Allow read active assistants" 
ON public.assistants 
FOR SELECT 
USING (is_active = true);

-- Policy untuk update profil asisten (opsional)
DROP POLICY IF EXISTS "Allow update assistants" ON public.assistants;
CREATE POLICY "Allow update assistants" 
ON public.assistants 
FOR UPDATE 
USING (true);

-- Policy untuk insert asisten baru
DROP POLICY IF EXISTS "Allow insert assistants" ON public.assistants;
CREATE POLICY "Allow insert assistants" 
ON public.assistants 
FOR INSERT 
WITH CHECK (true);

-- ====================================================================
-- SEED DATA AWAL: CONTOH DAFTAR ASISTEN PRAKTIKUM
-- Anda bisa mengubah atau menambah data asisten sesuai tim Anda di bawah ini!
-- ====================================================================

INSERT INTO public.assistants (code, nim, name, role, password, email)
VALUES 
  ('GWAN', '1202230001', 'Andi Pratama', 'ASPRAK', 'asisten2026', 'andip@telkomuniversity.ac.id'),
  ('IZIN', '1202230002', 'M. Izin Alamsyah', 'KOMDIS', 'asisten2026', 'izina@telkomuniversity.ac.id'),
  ('LEVI', '1202230003', 'Levina Putri', 'SEKBEN', 'asisten2026', 'levinap@telkomuniversity.ac.id'),
  ('RAFI', '1202230004', 'Rafi Al-Fayed', 'ASPRAK', 'asisten2026', 'rafia@telkomuniversity.ac.id'),
  ('DINA', '1202230005', 'Dina Kartika', 'ASPRAK', 'asisten2026', 'dinak@telkomuniversity.ac.id'),
  ('FAIS', '1202230006', 'Faisal Rahman', 'KOMDIS', 'asisten2026', 'faisalr@telkomuniversity.ac.id'),
  ('NINA', '1202230007', 'Nina Safitri', 'SEKBEN', 'asisten2026', 'ninas@telkomuniversity.ac.id')
ON CONFLICT (code) DO UPDATE 
SET 
  nim = EXCLUDED.nim,
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  password = EXCLUDED.password,
  email = EXCLUDED.email,
  updated_at = timezone('utc'::text, now());
