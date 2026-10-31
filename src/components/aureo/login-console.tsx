"use client";

import { useState } from "react";
import Image from "next/image";
import { loginAction } from "@/app/(auth)/actions/auth";
import { useActionState } from "react";
import {
  getAssistantByCode,
  getAssistantByNim,
  getExpectedPassword,
} from "@/data/assistants-roster";
import {
  Eye,
  EyeOff,
  User,
  KeyRound,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export function LoginForm() {
  const [tab, setTab] = useState<"masuk" | "aktivasi">("masuk");
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [state, formAction, isPending] = useActionState(loginAction, null);

  const matchedAsst = identifier.trim()
    ? getAssistantByCode(identifier.trim()) || getAssistantByNim(identifier.trim())
    : null;

  const passwordHint = matchedAsst
    ? getExpectedPassword(matchedAsst.code)
    : "KODEASISTENALPRO123 / KODEASISTENADMINR1";

  return (
    <div className="w-full max-w-[460px] bg-white/95 dark:bg-[#130728]/95 backdrop-blur-xl rounded-[2.2rem] p-7 sm:p-9 shadow-[0_25px_60px_-15px_rgba(79,40,150,0.12)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.7)] border border-purple-100/90 dark:border-purple-900/50 transition-all relative">
      
      {/* Decorative top ambient edge glow */}
      <div className="absolute -top-px left-12 right-12 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      {/* Header Inside Card */}
      <div className="space-y-1.5 mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200/60 dark:border-purple-800/50 text-[10px] font-mono font-bold text-purple-700 dark:text-purple-300">
          <Sparkles size={11} className="text-purple-600 dark:text-purple-400" />
          <span>AUTHENTICATION PORTAL</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
          <span>Masuk ke Portal</span>
          <span className="text-purple-600 dark:text-purple-400">.</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-neutral-400 font-sans">
          Gunakan NIM Praktikan SI&apos;50 atau Kode Asisten resmi EDM.
        </p>
      </div>

      {/* Segmented Pill Tabs */}
      <div className="grid grid-cols-2 p-1.5 bg-slate-100/90 dark:bg-neutral-900/90 rounded-2xl mb-6 border border-slate-200/50 dark:border-neutral-800">
        <button
          type="button"
          onClick={() => setTab("masuk")}
          className={`py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            tab === "masuk"
              ? "bg-white dark:bg-purple-950 text-slate-900 dark:text-white shadow-xs font-bold"
              : "text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200"
          }`}
        >
          Masuk Akun
        </button>
        <button
          type="button"
          onClick={() => setTab("aktivasi")}
          className={`py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            tab === "aktivasi"
              ? "bg-white dark:bg-purple-950 text-slate-900 dark:text-white shadow-xs font-bold"
              : "text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200"
          }`}
        >
          Aktivasi Akun
        </button>
      </div>

      {tab === "aktivasi" ? (
        <div className="p-4 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 text-xs space-y-3 font-sans">
          <div className="flex items-center gap-2 text-purple-800 dark:text-purple-300 font-bold">
            <Sparkles size={16} />
            <span>Aktivasi Akun Mahasiswa SI&apos;50</span>
          </div>
          <p className="text-slate-600 dark:text-neutral-300 leading-relaxed text-xs">
            Seluruh akun 32 asisten praktikum EDM telah teraktivasi secara otomatis. Untuk mahasiswa baru SI&apos;50, login perdana menggunakan NIM dan PIN default sesuai instruksi koordinator.
          </p>
          <button
            type="button"
            onClick={() => setTab("masuk")}
            className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold text-xs transition-colors cursor-pointer shadow-xs"
          >
            Kembali ke Form Masuk
          </button>
        </div>
      ) : (
        <form action={formAction} className="space-y-4">
          {/* Identifier Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-400 font-bold flex items-center justify-between">
              <span>NIM / KODE ASISTEN</span>
              <span className="text-[10px] text-purple-600 dark:text-purple-400 font-normal">Contoh: MACY / 102022...</span>
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-600 dark:text-purple-400">
                <User size={16} />
              </div>
              <input
                id="identifier"
                name="identifier"
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value.toUpperCase())}
                placeholder="Masukkan NIM atau Kode Asisten"
                className="w-full pl-10 pr-4 py-3 bg-[#F9F8FD] dark:bg-[#0E051E] border border-purple-200/80 dark:border-purple-900/60 rounded-2xl text-xs font-mono uppercase text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-500/15 focus:border-purple-600 transition-all font-semibold"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-600 dark:text-neutral-400 font-bold">
                PIN / PASSWORD
              </label>
              <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-semibold">
                Sandi: {passwordHint}
              </span>
            </div>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-600 dark:text-purple-400">
                <KeyRound size={16} />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan PIN atau password"
                className="w-full pl-10 pr-10 py-3 bg-[#F9F8FD] dark:bg-[#0E051E] border border-purple-200/80 dark:border-purple-900/60 rounded-2xl text-xs font-mono text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-500/15 focus:border-purple-600 transition-all font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {state?.error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-mono">
              {state.error}
            </div>
          )}



          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-3 py-3.5 bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 hover:from-purple-800 hover:to-indigo-700 text-white rounded-2xl font-bold text-xs sm:text-sm tracking-wide shadow-[0_10px_25px_rgba(109,40,217,0.35)] hover:shadow-[0_14px_30px_rgba(109,40,217,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Memverifikasi Akun...</span>
              </>
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
