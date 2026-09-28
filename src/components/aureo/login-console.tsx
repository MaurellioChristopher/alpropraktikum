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
    <div className="relative w-full max-w-[450px] lg:max-w-[470px]">
      {/* Soft Ambient Diffuse Glow behind the glass card */}
      <div className="absolute -inset-3 bg-gradient-to-tr from-rose-500/20 via-purple-600/25 to-indigo-500/20 rounded-3xl blur-2xl opacity-70 pointer-events-none" />

      {/* High-End Frosted Glass Container — Minimalist & Roomy */}
      <div className="relative z-10 glass-panel-light rounded-3xl p-5 sm:p-5 lg:p-6 shadow-[0_16px_40px_rgba(25,10,40,0.08)] border border-white/90 space-y-3">
        
        {/* Brand Logo & Console Title Header */}
        <div className="pb-2.5 border-b border-slate-200/70 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative h-7 w-9 shrink-0">
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
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#9E1B32] font-extrabold block">
                  Autentikasi Internal
                </span>
                <h2 className="text-base sm:text-[17px] font-black text-slate-900 leading-tight">
                  Portal Asisten Praktikum
                </h2>
              </div>
            </div>

            <span className="text-[9px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80 font-bold shrink-0">
              ● Server Siap
            </span>
          </div>

          <p className="text-[11px] text-slate-500 font-mono leading-relaxed">
            Sistem terintegrasi EDM Laboratory untuk modul, presensi 15 kelas SI&apos;50, dan nilai akademik.
          </p>
        </div>
        
        {/* Quick Assistant Preset Switcher (1-Click Login) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-1.5">
              <Sparkles size={12} className="text-[#9E1B32]" />
              Pilih Profil Asisten (1-Klik):
            </label>
            <span className="text-[9px] font-mono text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded font-semibold">
              SI&apos;50 Alpro
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => setAssistantPreset("GWAN", "ASPRAK")}
              className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                identifier === "GWAN"
                  ? "bg-[#250B47] text-white border-purple-900 shadow-sm ring-2 ring-purple-600/30"
                  : "bg-slate-50/80 hover:bg-slate-100 text-slate-700 border-slate-200/80"
              }`}
            >
              <div className="flex items-center gap-1 mb-0.5">
                <Users size={11} className={identifier === "GWAN" ? "text-purple-300" : "text-slate-400"} />
                <span className="text-xs font-mono font-bold leading-none">GWAN</span>
              </div>
              <div className={`text-[9px] font-mono leading-tight ${identifier === "GWAN" ? "text-purple-200" : "text-slate-500"}`}>
                Andi P. (Asprak)
              </div>
            </button>

            <button
              type="button"
              onClick={() => setAssistantPreset("IZIN", "KOMDIS")}
              className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                identifier === "IZIN"
                  ? "bg-[#9E1B32] text-white border-rose-900 shadow-sm ring-2 ring-rose-600/30"
                  : "bg-slate-50/80 hover:bg-slate-100 text-slate-700 border-slate-200/80"
              }`}
            >
              <div className="flex items-center gap-1 mb-0.5">
                <Shield size={11} className={identifier === "IZIN" ? "text-rose-300" : "text-slate-400"} />
                <span className="text-xs font-mono font-bold leading-none">IZIN</span>
              </div>
              <div className={`text-[9px] font-mono leading-tight ${identifier === "IZIN" ? "text-rose-200 font-semibold" : "text-rose-600 font-bold"}`}>
                M. Izin (Komdis)
              </div>
            </button>

            <button
              type="button"
              onClick={() => setAssistantPreset("LEVI", "SEKBEN")}
              className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                identifier === "LEVI"
                  ? "bg-[#1E1B4B] text-white border-indigo-900 shadow-sm ring-2 ring-indigo-600/30"
                  : "bg-slate-50/80 hover:bg-slate-100 text-slate-700 border-slate-200/80"
              }`}
            >
              <div className="flex items-center gap-1 mb-0.5">
                <Briefcase size={11} className={identifier === "LEVI" ? "text-indigo-300" : "text-slate-400"} />
                <span className="text-xs font-mono font-bold leading-none">LEVI</span>
              </div>
              <div className={`text-[9px] font-mono leading-tight ${identifier === "LEVI" ? "text-indigo-200 font-semibold" : "text-indigo-600 font-bold"}`}>
                Levina (Sekben)
              </div>
            </button>
          </div>
        </div>

        {/* Authentication Form with comfortable vertical spacing */}
        <form action={formAction} className="space-y-3 pt-0.5">
          <input type="hidden" name="role" value={selectedRole} />

          {/* Role Indicator Pills */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">
              Hak Akses Role:
            </label>
            <div className="flex gap-1.5">
              {(["ASPRAK", "KOMDIS", "SEKBEN"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r)}
                  className={`flex-1 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                    selectedRole === r
                      ? r === "KOMDIS"
                        ? "bg-[#9E1B32] text-white shadow-xs"
                        : r === "SEKBEN"
                        ? "bg-[#1E1B4B] text-white shadow-xs"
                        : "bg-[#250B47] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
                <User size={17} />
              </div>
              <input
                id="identifier"
                name="identifier"
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value.toUpperCase())}
                placeholder="Contoh: GWAN / IZIN / LEVI"
                className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all font-mono uppercase shadow-xs font-semibold"
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
                <Lock size={17} />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password akun..."
                className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all font-sans shadow-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {state?.error && (
            <div className="text-rose-700 text-xs font-mono bg-rose-50 p-3 rounded-xl border border-rose-200 flex items-start gap-2">
              <span className="font-bold">•</span>
              <span>{state.error}</span>
            </div>
          )}

          {/* Action Button — Prominent & Sleek */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full relative overflow-hidden bg-gradient-to-r from-[#9E1B32] via-[#7B1238] to-[#250B47] hover:from-[#B51E3A] hover:via-[#8E1542] hover:to-[#351065] text-white font-bold text-xs sm:text-[13px] tracking-wider uppercase py-3 sm:py-3.5 px-5 rounded-xl shadow-lg shadow-rose-950/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-75 cursor-pointer mt-1"
          >
            {isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Memverifikasi Akses Asisten...</span>
              </>
            ) : (
              <>
                <span>Masuk ke Dashboard ({selectedRole})</span>
                <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Informative Security & Lab Strip at the bottom of the card */}
        <div className="pt-2.5 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-500">
            <ShieldCheck size={13} className="text-[#9E1B32]" />
            <span>Internal EDM Laboratory • Telkom University</span>
          </div>
          <span className="font-semibold text-slate-600">S1 Sistem Informasi &apos;26</span>
        </div>
      </div>
    </div>
  );
}
