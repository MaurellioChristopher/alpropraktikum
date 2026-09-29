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
  Shield,
  Briefcase,
  Users,
} from "lucide-react";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"ASPRAK" | "KOMDIS" | "SEKBEN">("ASPRAK");
  const [state, formAction, isPending] = useActionState(loginAction, null);

  // Dynamic placeholder hint for password
  const passwordHint =
    selectedRole === "KOMDIS" || identifier === "GWAN"
      ? `${identifier || "KODE"}komdis123`
      : `${identifier || "KODE"}123`;

  return (
    <div className="relative w-full max-w-[490px] lg:max-w-[520px] group">
      {/* Soft Ambient Diffuse Glow behind the glass card */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-rose-500/25 via-purple-600/25 to-indigo-500/20 rounded-[2.4rem] blur-2xl opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* High-End Double-Bezel Hardware Enclosure with Specular Glint */}
      <div className="relative z-10 rounded-[2.15rem] p-1.5 bg-gradient-to-b from-white/95 via-white/80 to-white/90 backdrop-blur-2xl border border-white/90 shadow-[0_24px_60px_-12px_rgba(25,10,45,0.16)] overflow-hidden">
        
        {/* Subtle Specular Sheen across glass surface */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.15rem]">
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-20 animate-shimmer" />
        </div>

        <div className="rounded-[1.8rem] p-6 sm:p-7 bg-white/80 backdrop-blur-xl border border-white/60 space-y-4.5">
          
          {/* Brand Logo & Console Title Header */}
          <div className="pb-3 border-b border-slate-200/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-10 shrink-0 drop-shadow-sm">
                <Image
                  src="/images/edm-emblem-crimson.png"
                  alt="EDM Laboratory Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#9E1B32] font-extrabold block">
                  Autentikasi Internal
                </span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight tracking-tight">
                  Portal Asisten Praktikum
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50/90 border border-emerald-200/80 text-[10px] font-mono font-semibold text-emerald-700 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Sesi Aktif
            </div>
          </div>

          {/* Authentication Form — 100% Pure Manual Input */}
          <form action={formAction} className="space-y-4 pt-1">
            <input type="hidden" name="role" value={selectedRole} />

            {/* Role Indicator Pills */}
            <div className="space-y-1.5">
              <label className="text-[10.5px] font-mono uppercase tracking-wider text-slate-600 font-bold">
                Hak Akses Role:
              </label>
              <div className="flex gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/70">
                {(["ASPRAK", "KOMDIS", "SEKBEN"] as const).map((r) => {
                  const isSelected = selectedRole === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setSelectedRole(r)}
                      className={`flex-1 py-2 px-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? r === "KOMDIS"
                            ? "bg-[#9E1B32] text-white shadow-md ring-2 ring-rose-500/20"
                            : r === "SEKBEN"
                            ? "bg-[#1E1B4B] text-white shadow-md ring-2 ring-indigo-500/20"
                            : "bg-[#250B47] text-white shadow-md ring-2 ring-purple-500/20"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                      }`}
                    >
                      {r === "ASPRAK" ? (
                        <>
                          <Users size={12} className={isSelected ? "text-purple-300" : "text-slate-400"} />
                          <span>Asprak</span>
                        </>
                      ) : r === "KOMDIS" ? (
                        <>
                          <Shield size={12} className={isSelected ? "text-rose-300" : "text-slate-400"} />
                          <span>Komdis</span>
                        </>
                      ) : (
                        <>
                          <Briefcase size={12} className={isSelected ? "text-indigo-300" : "text-slate-400"} />
                          <span>Sekben</span>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Identifier Field */}
            <div className="space-y-1.5">
              <label className="text-[10.5px] font-mono uppercase tracking-wider text-slate-600 font-bold">
                Kode Asisten (NIM / ID Lab):
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <User size={16} />
                </div>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value.toUpperCase())}
                  placeholder="Masukkan Kode (Contoh: GWAN / IZIN / KEYS)"
                  className="w-full bg-white/95 border border-slate-300/85 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/25 focus:border-[#9E1B32] transition-all font-mono uppercase shadow-inner font-semibold"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10.5px] font-mono uppercase tracking-wider text-slate-600 font-bold">
                  Password Sesi:
                </label>
                <span className="text-[9.5px] font-mono text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200/80">
                  Format: {passwordHint}
                </span>
              </div>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Lock size={16} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={`Masukkan password (misal: ${passwordHint})...`}
                  className="w-full bg-white/95 border border-slate-300/85 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/25 focus:border-[#9E1B32] transition-all font-mono shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {state?.error && (
              <div className="text-rose-700 text-xs font-mono bg-rose-50 p-2.5 rounded-xl border border-rose-200 flex items-start gap-2">
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
              className="w-full relative overflow-hidden bg-gradient-to-r from-[#9E1B32] via-[#7B1238] to-[#250B47] hover:from-[#B51E3A] hover:via-[#8E1542] hover:to-[#351065] text-white font-bold text-xs sm:text-[13px] tracking-wider uppercase pl-6 pr-2 py-2.5 rounded-2xl shadow-[0_16px_36px_-8px_rgba(158,27,50,0.38)] hover:shadow-[0_20px_42px_-8px_rgba(158,27,50,0.48)] transition-all flex items-center justify-between group disabled:opacity-75 cursor-pointer mt-2"
            >
              {/* Dynamic Button Sheen on Hover */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-20 animate-shimmer" />
              </div>

              {isPending ? (
                <div className="flex items-center justify-center gap-2 w-full py-1">
                  <Loader2 size={16} className="animate-spin" />
                  <span>Memverifikasi Akses Asisten...</span>
                </div>
              ) : (
                <>
                  <span className="relative z-10">Masuk ke Dashboard ({selectedRole})</span>
                  <div className="relative z-10 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1.5 group-hover:scale-105 shrink-0">
                    <ArrowRight size={15} />
                  </div>
                </>
              )}
            </motion.button>
          </form>

          {/* Informative Security Strip */}
          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-center text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-2 text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <ShieldCheck size={13} className="text-[#9E1B32]" />
              <span>Internal EDM Laboratory • Sesi Aman</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
