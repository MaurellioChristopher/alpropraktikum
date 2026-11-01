"use client";

import Image from "next/image";
import { LoginForm } from "@/components/aureo/login-console";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "motion/react";

export default function Home() {
  return (
    <main className="w-screen h-screen flex overflow-hidden selection:bg-purple-600 selection:text-white">

      {/* ============================================================ */}
      {/* LEFT PANEL: LAVENDER GRADIENT + MASCOT BACKGROUND            */}
      {/* ============================================================ */}
      <section className="hidden lg:flex w-1/2 h-full flex-col relative overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #E2DFFF 0%, #C9C4F5 40%, #BDB6F2 70%, #D4AEFF 100%)",
        }}
      >
        {/* ── Decorative sparkle stars (CSS, no image needed) ─────────── */}
        {[
          { top: "18%", left: "12%", size: 10, opacity: 0.55 },
          { top: "35%", left: "52%", size: 8, opacity: 0.4 },
          { top: "60%", left: "20%", size: 12, opacity: 0.45 },
          { top: "72%", right: "38%", size: 7, opacity: 0.35 },
          { top: "28%", right: "22%", size: 9, opacity: 0.5 },
        ].map((s, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [s.opacity, s.opacity * 0.4, s.opacity] }}
            transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute pointer-events-none"
            style={{ top: s.top, left: s.left, right: (s as {right?: string}).right }}
          >
            {/* 4-point star SVG */}
            <svg width={s.size} height={s.size} viewBox="0 0 20 20" fill="none">
              <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z" fill="#8B5CF6" />
            </svg>
          </motion.div>
        ))}

        {/* ── Big light circle outline (decorative ring) ───────────────── */}
        <div
          className="absolute pointer-events-none rounded-full border border-white/30"
          style={{ width: "70%", aspectRatio: "1", top: "10%", left: "-15%" }}
        />

        {/* ── EDM Logo (top-right, clean watermark style) ─────────────── */}
        {/* Positioned so it's well above the mascot area */}
        <div className="absolute top-6 right-6 xl:top-8 xl:right-8 z-10 pointer-events-none select-none">
          <div className="relative" style={{ width: 140, height: 90 }}>
            <Image
              src="/images/edm-ribbon-logo.png"
              alt="EDM Laboratory"
              fill
              sizes="140px"
              className="object-contain opacity-80"
              priority
            />
          </div>
        </div>

        {/* ── Cloud puffs at the bottom (CSS blur shapes) ─────────────── */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ height: "22%" }}>
          {/* Left cloud blob */}
          <div className="absolute bottom-0 left-[-5%] w-[45%] h-full rounded-[50%] bg-white/55 blur-sm" />
          {/* Center cloud blob */}
          <div className="absolute bottom-[-4%] left-[15%] w-[55%] h-[85%] rounded-[50%] bg-white/60 blur-sm" />
          {/* Right cloud blob */}
          <div className="absolute bottom-[-2%] right-[-8%] w-[40%] h-[80%] rounded-[50%] bg-white/50 blur-sm" />
        </div>


        {/* ── Foreground content: brand + headline ─────────────────────── */}
        <div className="relative z-20 flex flex-col h-full p-10 xl:p-14">
          
          {/* Top brand pill */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="relative w-9 h-9 rounded-xl bg-white/70 backdrop-blur-sm border border-white/80 overflow-hidden shadow-sm shrink-0">
              <Image
                src="/images/edm-emblem-crimson.png"
                alt="Logo EDM"
                fill
                sizes="36px"
                className="object-contain p-1"
                priority
              />
            </div>
            <span className="font-extrabold text-lg text-[#1E1B4B] tracking-tight">
              edm-alpro
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-600 mb-1.5 ml-0.5" />
            </span>
          </div>

          {/* Headline — vertically centered in remaining space */}
          <div className="flex-1 flex items-center">
            <h1 className="text-6xl xl:text-8xl font-extrabold text-[#1E1B4B] tracking-tight leading-[1.0]">
              ALPRO<br />Practicum
            </h1>
          </div>

          {/* Bottom footnote */}
          <p className="text-xs font-mono text-[#1E1B4B]/40 shrink-0">
            EDM Laboratory • Telkom University
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* RIGHT PANEL: WHITE AUTH PANEL                                */}
      {/* ============================================================ */}
      <section className="w-full lg:w-1/2 h-full flex flex-col items-center justify-center bg-white dark:bg-[#0A0515] relative p-6 sm:p-10 lg:p-12 xl:p-16 overflow-y-auto">

        {/* Mobile brand header */}
        <div className="lg:hidden w-full flex items-center gap-2.5 mb-8 shrink-0 pt-[max(0.5rem,env(safe-area-inset-top))]">
          <div className="relative w-8 h-8 rounded-xl overflow-hidden bg-purple-100 border border-purple-200/60">
            <Image src="/images/edm-emblem-crimson.png" alt="Logo EDM" fill sizes="32px" className="object-contain p-1" priority />
          </div>
          <span className="font-extrabold text-base text-[#1E1B4B] dark:text-white tracking-tight">
            edm-alpro<span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-600 mb-1 ml-0.5" />
          </span>
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
