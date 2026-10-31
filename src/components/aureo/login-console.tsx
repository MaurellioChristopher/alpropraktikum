"use client";

import { useState } from "react";
import Image from "next/image";
import { loginAction } from "@/app/(auth)/actions/auth";
import { useActionState } from "react";

import {
  Eye,
  EyeOff,
  User,
  KeyRound,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export function LoginForm() {
  const [tab, setTab] = useState<"masuk" | "aktivasi">("masuk");
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="w-full max-w-[420px] bg-white dark:bg-[#0E071A]/95 backdrop-blur-md rounded-2xl p-7 sm:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-slate-200/80 dark:border-white/10 transition-colors">
      
      {/* Header Inside Card */}
      <div className="space-y-1.5 mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/50 border border-purple-200/60 dark:border-purple-800/40 text-[10px] font-mono font-semibold text-purple-700 dark:text-purple-300">
          <ShieldCheck size={12} className="text-purple-600 dark:text-purple-400" />
          <span>PORTAL ASISTEN &amp; PRAKTIKAN</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Masuk ke Portal
        </h2>
        <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed">
          Gunakan NIM Praktikan SI&apos;50 atau Kode Asisten resmi EDM.
        </p>
      </div>

      {/* Segmented Pill Tabs */}
      <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-white/5 rounded-xl mb-6 border border-slate-200/70 dark:border-white/5">
        <button
          type="button"
          onClick={() => setTab("masuk")}
          className={`py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            tab === "masuk"
              ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-2xs font-semibold"
              : "text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200"
          }`}
        >
          Masuk Akun
        </button>
        <button
          type="button"
          onClick={() => setTab("aktivasi")}
          className={`py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
            tab === "aktivasi"
              ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-2xs font-semibold"
              : "text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200"
          }`}
        >
          Aktivasi Akun
        </button>
      </div>

      {tab === "aktivasi" ? (
        <div className="p-4 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/70 dark:border-purple-900/40 text-xs space-y-3">
          <div className="flex items-center gap-2 text-purple-900 dark:text-purple-200 font-semibold">
            <Sparkles size={14} className="text-purple-600 dark:text-purple-400" />
            <span>Aktivasi Akun Mahasiswa SI&apos;50</span>
          </div>
          <p className="text-slate-600 dark:text-neutral-300 leading-relaxed text-xs">
            Akun seluruh 32 asisten praktikum EDM telah teraktivasi. Untuk praktikan SI&apos;50, gunakan NIM dan kata sandi default sesuai panduan pertemuan perdana.
          </p>
          <button
            type="button"
            onClick={() => setTab("masuk")}
            className="w-full py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 rounded-xl font-medium text-xs transition-colors cursor-pointer"
          >
            Kembali ke Form Masuk
          </button>
        </div>
      ) : (
        <form action={formAction} className="space-y-4">
          {/* Identifier Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-400 font-semibold flex items-center justify-between">
              <span>NIM / Kode Asisten</span>
              <span className="text-[10px] text-slate-400 font-normal">Contoh: MACY / 102022...</span>
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <User size={15} />
              </div>
              <input
                id="identifier"
                name="identifier"
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value.toUpperCase())}
                placeholder="NIM atau Kode Asisten"
                className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-mono uppercase text-slate-900 dark:text-white placeholder:text-slate-400 placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all font-medium"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-400 font-semibold">
                Password
              </label>
            </div>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <KeyRound size={15} />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                className="w-full pl-9 pr-9 py-2.5 bg-slate-50/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-mono text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {state?.error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-mono">
              {state.error}
            </div>
          )}

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 rounded-xl font-medium text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-xs"
          >
            {isPending ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Memverifikasi...</span>
              </>
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
