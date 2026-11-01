"use client";

import Image from "next/image";
import { LoginForm } from "@/components/aureo/login-console";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "motion/react";
import { CheckCircle2, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-[#F8F7FD] dark:bg-[#070312] text-slate-900 dark:text-white font-sans selection:bg-purple-600 selection:text-white transition-colors duration-300 flex items-center justify-center p-4 sm:p-6 lg:p-10 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] relative overflow-x-hidden">
      
      {/* Top Right Subtle Theme Toggle */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30">
        <div className="bg-white/80 dark:bg-white/10 backdrop-blur-md border border-slate-200/60 dark:border-white/10 rounded-full p-1 shadow-xs">
          <ThemeToggle />
        </div>
      </div>

      {/* Main Two-Column Card Layout (EISD Practicum Style Reference) */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 my-auto">
        
        {/* ============================================================ */}
        {/* LEFT COLUMN: ROUNDED PASTEL LILAC BRAND PANEL                */}
        {/* ============================================================ */}
        <section className="w-full lg:w-[50%] xl:w-[48%] rounded-[2.5rem] bg-[#D7D2F9] dark:bg-[#1A1232] p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden border border-purple-200/50 dark:border-white/10 shadow-[0_20px_50px_-15px_rgba(100,70,200,0.18)] min-h-[480px] sm:min-h-[540px] lg:min-h-[620px]">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/20 dark:bg-purple-600/10 blur-2xl pointer-events-none" />

          {/* Top Brand Identity */}
          <div className="relative z-10 flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-xl bg-white/90 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center p-1.5 shadow-xs border border-white/60 dark:border-white/10">
              <Image
                src="/images/edm-emblem-crimson.png"
                alt="Logo EDM"
                fill
                sizes="32px"
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="font-extrabold text-base sm:text-lg text-[#1E1B4B] dark:text-white tracking-tight flex items-center gap-0.5">
              <span>edm-alpro</span>
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 inline-block ml-0.5" />
            </div>
          </div>

          {/* Bold Editorial Headline */}
          <div className="relative z-10 my-4 sm:my-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E1B4B] dark:text-white tracking-tight leading-[1.05]">
              ALPRO<br />Practicum
            </h1>
          </div>

          {/* 3D-Styled Illustration Area with EDM Logo (Replaces Books/Pencil) */}
          <div className="relative z-10 w-full h-56 sm:h-64 lg:h-72 flex items-center justify-center mt-2 sm:mt-4 select-none">
            
            {/* Background Arch / Torus Ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full border-[14px] sm:border-[18px] border-purple-300/40 dark:border-purple-500/20 rotate-[-15deg] blur-[0.5px]" />
            </div>

            {/* Floating Left Pill: Green Checkmark Badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-2 sm:left-6 bottom-6 sm:bottom-10 z-20 bg-white/95 dark:bg-white/10 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl shadow-lg border border-white/90 dark:border-white/15 flex items-center justify-center"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-emerald-500 flex items-center justify-center shadow-xs">
                <CheckCircle2 size={16} className="text-white" />
              </div>
            </motion.div>

            {/* Floating Right Pill: Purple Sparkles Badge */}
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute right-2 sm:right-6 top-4 sm:top-6 z-20 bg-white/95 dark:bg-white/10 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl shadow-lg border border-white/90 dark:border-white/15 flex items-center justify-center"
            >
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-purple-600 flex items-center justify-center shadow-xs">
                <Sparkles size={16} className="text-white" />
              </div>
            </motion.div>

            {/* Center Pedestal with EDM Logo */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-white/85 dark:bg-white/10 backdrop-blur-xl border-2 border-white/90 dark:border-white/20 shadow-[0_20px_50px_rgba(79,70,229,0.18)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex items-center justify-center p-6 sm:p-7"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/images/edm-square-logo.png"
                  alt="EDM Laboratory Logo"
                  fill
                  priority
                  sizes="(max-width: 640px) 180px, 220px"
                  className="object-contain drop-shadow-md"
                />
              </div>
            </motion.div>
          </div>

        </section>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: CLEAN FLOATING AUTHENTICATION CARD             */}
        {/* ============================================================ */}
        <section className="w-full lg:w-[50%] xl:w-[48%] flex items-center justify-center p-2 sm:p-4">
          <LoginForm />
        </section>

      </div>

    </main>
  );
}
