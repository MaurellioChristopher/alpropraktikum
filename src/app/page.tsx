"use client";

import Image from "next/image";
import { LoginForm } from "@/components/aureo/login-console";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "motion/react";
import { CheckCircle2, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="w-screen h-screen flex overflow-hidden bg-[#F3F2FD] dark:bg-[#070312] selection:bg-purple-600 selection:text-white">

      {/* ============================================================ */}
      {/* LEFT PANEL: FULL-HEIGHT PASTEL LILAC BRAND                   */}
      {/* ============================================================ */}
      <section className="hidden lg:flex w-1/2 h-full flex-col bg-[#C9C4F5] dark:bg-[#1A1232] relative overflow-hidden p-12 xl:p-16">

        {/* Ambient glow */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/20 dark:bg-purple-600/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-purple-300/20 dark:bg-purple-900/20 blur-3xl pointer-events-none" />

        {/* Top: Brand */}
        <div className="relative z-10 flex items-center gap-3 shrink-0">
          <div className="relative w-9 h-9 shrink-0 rounded-xl bg-white/80 dark:bg-white/10 border border-white/60 dark:border-white/10 overflow-hidden shadow-sm">
            <Image src="/images/edm-emblem-crimson.png" alt="Logo EDM" fill sizes="36px" className="object-contain p-1" priority />
          </div>
          <span className="font-extrabold text-lg text-[#1E1B4B] dark:text-white tracking-tight">
            edm-alpro<span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 mb-1.5 ml-0.5" />
          </span>
        </div>

        {/* Middle: Headline + Illustration — takes remaining space */}
        <div className="relative z-10 flex-1 flex flex-col justify-center min-h-0">
          
          {/* Headline */}
          <h1 className="text-6xl xl:text-8xl font-extrabold text-[#1E1B4B] dark:text-white tracking-tight leading-[1.0] mb-10">
            ALPRO<br />Practicum
          </h1>

          {/* Illustration — fits inside remaining space */}
          <div className="relative flex items-center justify-start w-full" style={{ height: "min(300px, 35vh)" }}>

            {/* Torus ring accent */}
            <div className="absolute left-24 xl:left-32 top-1/2 -translate-y-1/2 w-48 h-48 xl:w-56 xl:h-56 rounded-full border-[18px] xl:border-[22px] border-purple-400/30 dark:border-purple-500/20 rotate-[-12deg] pointer-events-none" />

            {/* Green check badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 bottom-0 z-20 bg-white/95 dark:bg-white/10 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/90 dark:border-white/15"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center">
                <CheckCircle2 size={19} className="text-white" />
              </div>
            </motion.div>

            {/* Purple sparkle badge */}
            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="absolute right-4 top-0 z-20 bg-white/95 dark:bg-white/10 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-white/90 dark:border-white/15"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center">
                <Sparkles size={19} className="text-white" />
              </div>
            </motion.div>

            {/* Main EDM Logo Pedestal */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 mx-auto"
              style={{ width: "min(220px, 28vh)", height: "min(220px, 28vh)" }}
            >
              <div className="w-full h-full rounded-3xl bg-white/90 dark:bg-white/10 backdrop-blur-2xl border-2 border-white/95 dark:border-white/20 shadow-[0_24px_60px_rgba(79,70,229,0.22)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)] flex items-center justify-center p-7">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/edm-square-logo.png"
                    alt="EDM Laboratory Logo"
                    fill
                    priority
                    sizes="220px"
                    className="object-contain drop-shadow-lg"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom footnote */}
        <p className="relative z-10 shrink-0 text-xs font-mono text-[#1E1B4B]/50 dark:text-white/30 mt-6">
          EDM Laboratory • Telkom University
        </p>
      </section>

      {/* ============================================================ */}
      {/* RIGHT PANEL (also full page on mobile)                       */}
      {/* ============================================================ */}
      <section className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center bg-white dark:bg-[#0A0515] relative p-6 sm:p-10 lg:p-14 xl:p-16 overflow-y-auto">

        {/* Mobile brand header (visible only < lg) */}
        <div className="lg:hidden w-full flex items-center gap-2.5 mb-8 shrink-0 pt-[max(0.5rem,env(safe-area-inset-top))]">
          <div className="relative w-8 h-8 rounded-xl bg-[#C9C4F5] border border-purple-200/60 overflow-hidden">
            <Image src="/images/edm-emblem-crimson.png" alt="Logo EDM" fill sizes="32px" className="object-contain p-1" priority />
          </div>
          <span className="font-extrabold text-base text-[#1E1B4B] dark:text-white tracking-tight">edm-alpro<span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-600 mb-1 ml-0.5" /></span>
        </div>

        {/* Theme Toggle */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30">
          <div className="bg-slate-100 dark:bg-white/10 border border-slate-200/70 dark:border-white/10 rounded-full p-1 shadow-xs">
            <ThemeToggle />
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-[400px] my-auto">
          <LoginForm />
        </div>

        {/* Bottom text */}
        <div className="text-center mt-6 space-y-1 shrink-0 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          <p className="text-xs text-slate-400 dark:text-neutral-500">
            Butuh bantuan? Hubungi Koordinator Asisten di R1 Lt.8 TULT.
          </p>
          <p className="text-[11px] font-mono text-slate-400/70 dark:text-neutral-600">
            Enkripsi 256-Bit • EDM Laboratory
          </p>
        </div>
      </section>

    </main>
  );
}
