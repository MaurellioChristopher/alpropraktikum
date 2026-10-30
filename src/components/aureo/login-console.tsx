"use client";

import { useState } from "react";
import Image from "next/image";
import { loginAction } from "@/app/(auth)/actions/auth";
import { useActionState } from "react";
import { motion } from "motion/react";
import { getAssistantByCode } from "@/data/assistants-roster";
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
  const [identifier, setIdentifier] = useState("MACY");
  const [password, setPassword] = useState("macykomdis123");
  const [state, formAction, isPending] = useActionState(loginAction, null);

  const matchedAsst = getAssistantByCode(identifier);
  const isKomdis = matchedAsst?.role === "KOMDIS" || identifier === "MACY";

  const passwordHint = identifier
    ? isKomdis
      ? `${identifier.toLowerCase()}komdis123`
      : `${identifier.toLowerCase()}123`
    : "macykomdis123";

  const handleSelectPreset = (code: string, pass: string) => {
    setIdentifier(code);
    setPassword(pass);
  };

  return (
    <div className="w-full max-w-[440px] bg-white dark:bg-[#120824] rounded-[2rem] p-7 sm:p-9 shadow-[0_20px_50px_rgba(40,16,80,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-slate-100 dark:border-purple-900/40 transition-all">
      {/* Title */}
      <div className="space-y-1 mb-6">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
          <span>Masuk</span>
          <span className="text-purple-600 dark:text-purple-400">.</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono">
          Portal Asisten & Praktikan Algoritma Pemrograman
        </p>
      </div>

      {/* Segmented Pill Tabs matching reference */}
      <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-neutral-900/90 rounded-2xl mb-6">
        <button
          type="button"
          onClick={() => setTab("masuk")}
          className={`py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            tab === "masuk"
              ? "bg-white dark:bg-purple-950 text-slate-900 dark:text-white shadow-xs font-bold"
              : "text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-200"
          }`}
        >
          Masuk
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
          Aktivasi
        </button>
      </div>

      {tab === "aktivasi" ? (
        <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 text-xs space-y-3 font-mono">
          <div className="flex items-center gap-2 text-purple-800 dark:text-purple-300 font-bold">
            <Sparkles size={16} />
            <span>Aktivasi Akun Praktikan SI&apos;50</span>
          </div>
          <p className="text-slate-600 dark:text-neutral-300 leading-relaxed text-[11px]">
            Akun asisten praktikum (32 asisten) telah teraktivasi otomatis dari sistem laboratorium EDM.
            Bagi mahasiswa baru SI&apos;50, gunakan NIM dan PIN default dari LMS Telkom University.
          </p>
          <button
            type="button"
            onClick={() => setTab("masuk")}
            className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl font-bold text-xs transition-colors"
          >
            Kembali ke Form Masuk
          </button>
        </div>
      ) : (
        <form action={formAction} className="space-y-4">
          {/* Identifier Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 font-bold">
              NIM / KODE ASISTEN
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
                placeholder="NIM atau Kode (e.g. MACY / DEVO)"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-neutral-900/80 border border-slate-200 dark:border-neutral-800 rounded-2xl text-xs font-mono uppercase text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all font-semibold"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 font-bold">
                PIN / PASSWORD
              </label>
              <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-semibold">
                Contoh: {passwordHint}
              </span>
            </div>
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
                placeholder="Masukkan PIN atau password"
                className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-neutral-900/80 border border-slate-200 dark:border-neutral-800 rounded-2xl text-xs font-mono text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 transition-all font-medium"
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

          {/* Quick Assistant Account Presets */}
          <div className="pt-1">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1.5 font-semibold">
              Preset Cepat Asisten:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                { code: "MACY", pass: "macykomdis123", role: "Koor CnI" },
                { code: "DEVO", pass: "devo123", role: "Korprak" },
                { code: "GRGS", pass: "grgs123", role: "Sekre" },
                { code: "SYOW", pass: "syow123", role: "Bendahara" },
              ].map((p) => (
                <button
                  key={p.code}
                  type="button"
                  onClick={() => handleSelectPreset(p.code, p.pass)}
                  className={`text-[10px] font-mono px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                    identifier === p.code
                      ? "bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-700 font-bold"
                      : "bg-slate-50 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 border-slate-200 dark:border-neutral-700 hover:bg-slate-100"
                  }`}
                >
                  {p.code} ({p.role})
                </button>
              ))}
            </div>
          </div>

          {/* Primary Submit Button matching reference */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 py-3.5 bg-[#1B112C] hover:bg-[#281842] dark:bg-purple-700 dark:hover:bg-purple-600 text-white rounded-2xl font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Memverifikasi Sesi...</span>
              </>
            ) : (
              <>
                <span>Masuk</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
