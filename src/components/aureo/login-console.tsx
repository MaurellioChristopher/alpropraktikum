"use client";

import { useState } from "react";
import Image from "next/image";
import { loginAction } from "@/app/(auth)/actions/auth";
import { useActionState } from "react";
import { motion } from "motion/react";
import {
  Eye,
  EyeOff,
  Loader2,
  User,
  Lock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [state, formAction, isPending] = useActionState(loginAction, null);

  // Dynamic placeholder hint for password
  const passwordHint =
    identifier === "GWAN"
      ? "GWANkomdis123"
      : identifier
      ? `${identifier}123`
      : "KODE123";

  return (
    <div className="relative w-full max-w-[490px] lg:max-w-[520px] group">
      {/* Soft Ambient Diffuse Glow behind the glass card (Purple Aura) */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-purple-700/25 via-purple-600/30 to-purple-900/20 dark:from-purple-800/35 dark:via-purple-700/35 dark:to-purple-950/30 rounded-[2.4rem] blur-2xl opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* High-End Double-Bezel Hardware Enclosure with Specular Glint */}
      <div className="relative z-10 rounded-[2.15rem] p-1.5 bg-gradient-to-b from-white/95 via-purple-50/40 to-white/90 dark:from-[#1D1036] dark:via-[#0E0820] dark:to-black backdrop-blur-2xl border border-purple-100 dark:border-purple-900/40 shadow-[0_24px_60px_-12px_rgba(25,10,45,0.16)] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)] overflow-hidden transition-colors">
        
        {/* Subtle Specular Sheen across glass surface */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.15rem]">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-purple-300/10 dark:via-purple-400/5 to-transparent transform -skew-x-20 animate-shimmer" />
        </div>

        <div className="rounded-[1.8rem] p-4.5 sm:p-5 bg-white/90 dark:bg-[#0D071E] backdrop-blur-xl border border-purple-100/80 dark:border-purple-900/50 space-y-3 transition-colors">
          
          {/* Brand Logo & Console Title Header */}
          <div className="pb-2 border-b border-purple-100 dark:border-purple-950/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative h-7 w-9 shrink-0 drop-shadow-sm">
                <Image
                  src="/images/edm-emblem-crimson.png"
                  alt="EDM Laboratory Logo"
                  fill
                  sizes="36px"
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <span className="text-[8.5px] font-mono uppercase tracking-widest text-purple-700 dark:text-purple-400 font-extrabold block">
                  Autentikasi Internal
                </span>
                <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-tight tracking-tight">
                  Portal Asisten Praktikum
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-[9.5px] font-mono font-semibold text-purple-800 dark:text-purple-300 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              Sesi Aktif
            </div>
          </div>

          {/* Authentication Form — 100% Pure Manual Input */}
          <form action={formAction} className="space-y-3 pt-0.5">
            {/* Identifier Field */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 font-bold">
                Kode Asisten (NIM / ID Lab):
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <User size={15} />
                </div>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value.toUpperCase())}
                  placeholder="Masukkan Kode (Contoh: GWAN / IZIN / KEYS)"
                  className="w-full bg-white dark:bg-[#140C2C] border border-slate-300 dark:border-purple-900/50 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/25 focus:border-purple-600 dark:focus:border-purple-500 transition-all font-mono uppercase shadow-inner font-semibold"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-600 dark:text-slate-300 font-bold">
                  Password Sesi:
                </label>
                <span className="text-[9px] font-mono text-purple-700 dark:text-purple-300 font-semibold bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded-md border border-purple-200/80 dark:border-purple-800/60">
                  Format: {passwordHint}
                </span>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Lock size={15} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={`Masukkan password (misal: ${passwordHint})...`}
                  className="w-full bg-white dark:bg-[#140C2C] border border-slate-300 dark:border-purple-900/50 rounded-xl pl-9 pr-9 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/25 focus:border-purple-600 dark:focus:border-purple-500 transition-all font-mono shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Error Message (Refined Red Accent) */}
            {state?.error && (
              <div className="text-red-700 dark:text-red-400 text-xs font-mono bg-red-50 dark:bg-red-950/60 p-2 rounded-xl border border-red-200 dark:border-red-900/60 flex items-start gap-2">
                <span className="font-bold">•</span>
                <span>{state.error}</span>
              </div>
            )}

            {/* Action Button — Fluid Pill with Nested Trailing Icon */}
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isPending}
              className="w-full relative overflow-hidden bg-gradient-to-r from-[#200A3E] via-purple-700 to-purple-600 hover:from-[#2B0E54] hover:via-purple-600 hover:to-purple-500 text-white font-bold text-xs sm:text-[12.5px] tracking-wider uppercase pl-5 pr-1.5 py-2 rounded-2xl shadow-[0_12px_28px_-6px_rgba(124,58,237,0.45)] hover:shadow-[0_16px_32px_-6px_rgba(124,58,237,0.55)] transition-all flex items-center justify-between group disabled:opacity-75 cursor-pointer mt-1"
            >
              {/* Dynamic Button Sheen on Hover */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-20 animate-shimmer" />
              </div>

              {isPending ? (
                <div className="flex items-center justify-center gap-2 w-full py-0.5">
                  <Loader2 size={15} className="animate-spin" />
                  <span>Memverifikasi Akses Asisten...</span>
                </div>
              ) : (
                <>
                  <span className="relative z-10">Masuk ke Dashboard Asisten</span>
                  <div className="relative z-10 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:scale-105 shrink-0">
                    <ArrowRight size={14} />
                  </div>
                </>
              )}
            </motion.button>
          </form>

          {/* Informative Security Strip */}
          <div className="pt-1.5 border-t border-purple-100 dark:border-purple-950/80 flex items-center justify-center text-[9.5px] font-mono text-slate-400 dark:text-slate-500">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              <ShieldCheck size={12} className="text-purple-600 dark:text-purple-400" />
              <span>Internal EDM Laboratory • Sesi Aman</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
