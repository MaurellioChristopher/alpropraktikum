"use client";

import { useState } from "react";
import Image from "next/image";
import { loginAction } from "@/app/(auth)/actions/auth";
import { useActionState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  User,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Shield,
  Briefcase,
  Users,
  CheckCircle2,
  KeyRound,
  Info,
} from "lucide-react";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"ASPRAK" | "KOMDIS" | "SEKBEN">("ASPRAK");
  const [state, formAction, isPending] = useActionState(loginAction, null);

  const setAssistantPreset = (code: string, role: "ASPRAK" | "KOMDIS" | "SEKBEN") => {
    setIdentifier(code);
    setPassword("asisten2026");
    setSelectedRole(role);
  };

  return (
    <div className="relative w-full max-w-[440px] lg:max-w-[460px] group">
      {/* Soft Ambient Diffuse Glow behind the glass card */}
      <div className="absolute -inset-3 bg-gradient-to-tr from-rose-500/25 via-purple-600/25 to-indigo-500/20 rounded-[2.2rem] blur-2xl opacity-75 group-hover:opacity-90 transition-opacity pointer-events-none" />

      {/* High-End Double-Bezel Hardware Enclosure */}
      <div className="relative z-10 rounded-[2rem] p-1.5 bg-gradient-to-b from-white/95 via-white/80 to-white/90 backdrop-blur-2xl border border-white/90 shadow-[0_20px_50px_-10px_rgba(25,10,45,0.12)]">
        <div className="rounded-[1.65rem] p-5 sm:p-6 bg-white/70 backdrop-blur-xl border border-white/60 space-y-3.5">
          
          {/* Brand Logo & Console Title Header — Super Clean without paragraph or badge */}
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
                <h2 className="text-base sm:text-[17px] font-black text-slate-900 leading-tight tracking-tight">
                  Portal Asisten Praktikum
                </h2>
              </div>
            </div>

            <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100/90 px-2 py-0.5 rounded-full border border-slate-200/70">
              SI&apos;50
            </span>
          </div>
          
          {/* Quick Assistant Preset Switcher (1-Click Login) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
                <Sparkles size={11} className="text-[#9E1B32]" />
                Pilih Profil Asisten (1-Klik):
              </label>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => setAssistantPreset("GWAN", "ASPRAK")}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                  identifier === "GWAN"
                    ? "bg-[#250B47] text-white border-purple-900 shadow-md ring-2 ring-purple-600/30 scale-[1.02]"
                    : "bg-white/80 hover:bg-white text-slate-700 border-slate-200/80 shadow-2xs hover:border-purple-300"
                }`}
              >
                <div className="flex items-center gap-1 mb-0.5">
                  <Users size={11} className={identifier === "GWAN" ? "text-purple-300" : "text-slate-400"} />
                  <span className="text-xs font-mono font-bold leading-none">GWAN</span>
                </div>
                <div className={`text-[9px] font-mono leading-tight truncate ${identifier === "GWAN" ? "text-purple-200" : "text-slate-500"}`}>
                  Andi P.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAssistantPreset("IZIN", "KOMDIS")}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                  identifier === "IZIN"
                    ? "bg-[#9E1B32] text-white border-rose-900 shadow-md ring-2 ring-rose-600/30 scale-[1.02]"
                    : "bg-white/80 hover:bg-white text-slate-700 border-slate-200/80 shadow-2xs hover:border-rose-300"
                }`}
              >
                <div className="flex items-center gap-1 mb-0.5">
                  <Shield size={11} className={identifier === "IZIN" ? "text-rose-300" : "text-slate-400"} />
                  <span className="text-xs font-mono font-bold leading-none">IZIN</span>
                </div>
                <div className={`text-[9px] font-mono leading-tight truncate ${identifier === "IZIN" ? "text-rose-200 font-semibold" : "text-rose-600 font-bold"}`}>
                  M. Izin
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAssistantPreset("LEVI", "SEKBEN")}
                className={`p-2 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                  identifier === "LEVI"
                    ? "bg-[#1E1B4B] text-white border-indigo-900 shadow-md ring-2 ring-indigo-600/30 scale-[1.02]"
                    : "bg-white/80 hover:bg-white text-slate-700 border-slate-200/80 shadow-2xs hover:border-indigo-300"
                }`}
              >
                <div className="flex items-center gap-1 mb-0.5">
                  <Briefcase size={11} className={identifier === "LEVI" ? "text-indigo-300" : "text-slate-400"} />
                  <span className="text-xs font-mono font-bold leading-none">LEVI</span>
                </div>
                <div className={`text-[9px] font-mono leading-tight truncate ${identifier === "LEVI" ? "text-indigo-200 font-semibold" : "text-indigo-600 font-bold"}`}>
                  Levina
                </div>
              </button>
            </div>
          </div>

          {/* Authentication Form with comfortable vertical spacing */}
          <form action={formAction} className="space-y-2.5 pt-0.5">
            <input type="hidden" name="role" value={selectedRole} />

            {/* Role Indicator Pills */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                Hak Akses Role:
              </label>
              <div className="flex gap-1.5 p-1 bg-slate-100/80 rounded-xl border border-slate-200/60">
                {(["ASPRAK", "KOMDIS", "SEKBEN"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setSelectedRole(r)}
                    className={`flex-1 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                      selectedRole === r
                        ? r === "KOMDIS"
                          ? "bg-[#9E1B32] text-white shadow-xs"
                          : r === "SEKBEN"
                          ? "bg-[#1E1B4B] text-white shadow-xs"
                          : "bg-[#250B47] text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {r === "ASPRAK" ? "⚡ Asprak" : r === "KOMDIS" ? "🛡️ Komdis" : "📋 Sekben"}
                  </button>
                ))}
              </div>
            </div>

            {/* Identifier Field */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
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
                  placeholder="Contoh: GWAN / IZIN / LEVI"
                  className="w-full bg-white/90 border border-slate-300/80 rounded-xl pl-10 pr-3.5 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/25 focus:border-[#9E1B32] transition-all font-mono uppercase shadow-inner font-semibold"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Password Sesi:
                </label>
                <span className="text-[9px] font-mono text-slate-400">Default: asisten2026</span>
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
                  placeholder="Masukkan password akun..."
                  className="w-full bg-white/90 border border-slate-300/80 rounded-xl pl-10 pr-10 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/25 focus:border-[#9E1B32] transition-all font-sans shadow-inner"
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
            <button
              type="submit"
              disabled={isPending}
              className="w-full relative overflow-hidden bg-gradient-to-r from-[#9E1B32] via-[#7B1238] to-[#250B47] hover:from-[#B51E3A] hover:via-[#8E1542] hover:to-[#351065] text-white font-bold text-xs sm:text-[13px] tracking-wider uppercase pl-5 pr-2 py-2 rounded-2xl shadow-[0_12px_28px_-6px_rgba(158,27,50,0.35)] active:scale-[0.98] transition-all flex items-center justify-between group disabled:opacity-75 cursor-pointer mt-1"
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2 w-full py-1">
                  <Loader2 size={16} className="animate-spin" />
                  <span>Memverifikasi Akses Asisten...</span>
                </div>
              ) : (
                <>
                  <span>Masuk ke Dashboard ({selectedRole})</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1 group-hover:scale-105 shrink-0">
                    <ArrowRight size={15} />
                  </div>
                </>
              )}
            </button>
          </form>

          {/* Informative Security Strip */}
          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5 text-slate-500">
              <ShieldCheck size={13} className="text-[#9E1B32]" />
              <span>Internal EDM Laboratory</span>
            </div>
            <span className="font-semibold text-slate-600">S1 SI &apos;26 Telkom University</span>
          </div>
        </div>
      </div>
    </div>
  );
}
