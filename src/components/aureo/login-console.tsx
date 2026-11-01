"use client";

import { useState } from "react";
import { loginAction } from "@/app/(auth)/actions/auth";
import { useActionState } from "react";
import {
  Eye,
  EyeOff,
  User,
  KeyRound,
  ArrowRight,
  Loader2,
  Sparkles,
} from "lucide-react";

export function LoginForm() {
  const [tab, setTab] = useState<"masuk" | "aktivasi">("masuk");
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="w-full max-w-[420px] bg-white dark:bg-[#120B24] rounded-[2rem] p-7 sm:p-9 shadow-[0_20px_50px_-15px_rgba(30,27,75,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-slate-100 dark:border-white/10 transition-colors">
      
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1E1B4B] dark:text-white mb-6">
        Masuk.
      </h2>

      {/* Segmented Pill Tabs */}
      <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-white/5 rounded-full mb-6 border border-slate-200/50 dark:border-white/5">
        <button
          type="button"
          onClick={() => setTab("masuk")}
          className={`py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            tab === "masuk"
              ? "bg-white dark:bg-[#1E1638] text-[#1E1B4B] dark:text-white shadow-xs"
              : "text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200"
          }`}
        >
          Masuk
        </button>
        <button
          type="button"
          onClick={() => setTab("aktivasi")}
          className={`py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            tab === "aktivasi"
              ? "bg-white dark:bg-[#1E1638] text-[#1E1B4B] dark:text-white shadow-xs"
              : "text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200"
          }`}
        >
          Aktivasi
        </button>
      </div>

      {tab === "aktivasi" ? (
        <div className="p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/70 dark:border-purple-900/40 text-xs space-y-3">
          <div className="flex items-center gap-2 text-purple-900 dark:text-purple-200 font-semibold">
            <Sparkles size={15} className="text-purple-600 dark:text-purple-400" />
            <span>Aktivasi Akun Mahasiswa SI&apos;50</span>
          </div>
          <p className="text-slate-600 dark:text-neutral-300 leading-relaxed text-xs">
            Akun seluruh 32 asisten praktikum EDM telah teraktivasi. Untuk praktikan SI&apos;50, gunakan NIM dan kata sandi default sesuai panduan pertemuan perdana.
          </p>
          <button
            type="button"
            onClick={() => setTab("masuk")}
            className="w-full py-2.5 bg-[#1E1B4B] hover:bg-[#141238] dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 rounded-xl font-medium text-xs transition-colors cursor-pointer"
          >
            Kembali ke Masuk
          </button>
        </div>
      ) : (
        <form action={formAction} className="space-y-4">
          {/* Identifier Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-neutral-300 block">
              NIM
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <User size={16} />
              </div>
              <input
                id="identifier"
                name="identifier"
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value.toUpperCase())}
                placeholder="NIM / Kode Asisten"
                className="w-full pl-10 pr-4 py-3 bg-slate-50/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-2xl text-xs font-mono uppercase text-slate-900 dark:text-white placeholder:text-slate-400 placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all font-medium"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-neutral-300 block">
              PIN
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <KeyRound size={16} />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="PIN / Kata Sandi"
                className="w-full pl-10 pr-10 py-3 bg-slate-50/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 rounded-2xl text-xs font-mono text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all font-medium"
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
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs font-mono">
              {state.error}
            </div>
          )}

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 py-3.5 bg-[#1E1B4B] hover:bg-[#141238] dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 rounded-2xl font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-md active:scale-[0.99]"
          >
            {isPending ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                <span>Memverifikasi...</span>
              </>
            ) : (
              <>
                <span>Masuk</span>
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
