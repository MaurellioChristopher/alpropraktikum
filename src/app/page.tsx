"use client";

import Image from "next/image";
import { LoginForm } from "@/components/aureo/login-console";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "motion/react";
import { CheckCircle2, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="w-full h-screen flex flex-col lg:flex-row overflow-hidden bg-[#F3F2FD] dark:bg-[#070312] selection:bg-purple-600 selection:text-white">

      {/* ============================================================ */}
      {/* LEFT PANEL: FULL-HEIGHT PASTEL LILAC BRAND                   */}
      {/* ============================================================ */}
      <section className="w-full lg:w-1/2 h-[55vw] max-h-[55vh] lg:h-full flex flex-col justify-between bg-[#CCC8F8] dark:bg-[#1A1232] relative overflow-hidden p-8 sm:p-10 lg:p-14 xl:p-16">

        {/* Ambient glow top-right */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/25 dark:bg-purple-600/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-purple-300/20 dark:bg-purple-900/20 blur-3xl pointer-events-none" />

        {/* Top: Brand Logo + Name */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl bg-white/80 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-sm border border-white/60 dark:border-white/10 overflow-hidden">
            <Image
              src="/images/edm-emblem-crimson.png"
              alt="Logo EDM"
              fill
              sizes="36px"
              className="object-contain p-1"
              priority
            />
          </div>
          <span className="font-extrabold text-xl text-[#1E1B4B] dark:text-white tracking-tight">
            edm-alpro<span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 mb-2 ml-0.5" />
          </span>
        </div>

        {/* Center: Bold Headline + Floating Logo Illustration */}
        <div className="relative z-10 flex-1 flex flex-col justify-center gap-6 sm:gap-8 lg:gap-10">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-[#1E1B4B] dark:text-white tracking-tight leading-[1.0]">
            ALPRO<br />Practicum
          </h1>

          {/* Floating Illustration Area */}
          <div className="relative flex items-end h-52 sm:h-64 lg:h-72 xl:h-80 w-full max-w-md">
            {/* Torus ring accent */}
            <div className="absolute left-24 sm:left-32 lg:left-36 bottom-10 sm:bottom-12 w-40 h-40 sm:w-52 sm:h-52 lg:w-56 lg:h-56 rounded-full border-[16px] sm:border-[20px] border-purple-400/30 dark:border-purple-500/20 rotate-[-12deg] pointer-events-none" />

            {/* Green check floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 bottom-10 z-20 bg-white/95 dark:bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-xl border border-white/90 dark:border-white/15"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500 flex items-center justify-center shadow-sm">
                <CheckCircle2 size={18} className="text-white" />
              </div>
            </motion.div>

            {/* Purple sparkle floating badge */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="absolute right-0 sm:right-4 top-0 z-20 bg-white/95 dark:bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-xl border border-white/90 dark:border-white/15"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-600 flex items-center justify-center shadow-sm">
                <Sparkles size={18} className="text-white" />
              </div>
            </motion.div>

            {/* Main EDM Logo Pedestal */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 mx-auto w-40 h-40 sm:w-52 sm:h-52 lg:w-56 lg:h-56 rounded-3xl bg-white/90 dark:bg-white/10 backdrop-blur-2xl border-2 border-white/95 dark:border-white/20 shadow-[0_24px_60px_rgba(79,70,229,0.22)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)] flex items-center justify-center p-7 sm:p-9"
            >
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
            </motion.div>
          </div>
        </div>

        {/* Bottom footnote */}
        <div className="relative z-10 text-xs font-mono text-[#1E1B4B]/50 dark:text-white/30">
          EDM Laboratory • Telkom University
        </div>
      </section>

      {/* ============================================================ */}
      {/* RIGHT PANEL: FULL-HEIGHT WHITE AUTH PANEL                    */}
      {/* ============================================================ */}
      <section className="w-full lg:w-1/2 flex-1 flex flex-col items-center justify-center bg-white dark:bg-[#0A0515] relative p-6 sm:p-10 lg:p-14 xl:p-16 overflow-y-auto">

        {/* Theme Toggle top-right corner */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30">
          <div className="bg-slate-100 dark:bg-white/10 border border-slate-200/70 dark:border-white/10 rounded-full p-1 shadow-xs">
            <ThemeToggle />
          </div>
        </div>

        {/* Center: Login Form */}
        <div className="w-full max-w-[400px] my-auto">
          <LoginForm />
        </div>

        {/* Bottom: support text */}
        <div className="text-center mt-6 space-y-1 pb-2">
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
