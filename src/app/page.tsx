"use client";

import { useState } from "react";
import Image from "next/image";
import { LoginForm } from "@/components/aureo/login-console";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion, AnimatePresence } from "motion/react";
import {
  Code2,
  Database,
  Network,
  Trophy,
  BookOpen,
  Info,
  X,
  Sparkles,
  MapPin,
  Users,
  ShieldCheck,
} from "lucide-react";

export default function Home() {
  const [activeModal, setActiveModal] = useState<"modul" | "tentang" | null>(null);

  const modules = [
    { no: "01", title: "Pointer, Pointer Arithmetics & Memory Layout", icon: Code2, diff: "Fundamental" },
    { no: "02", title: "Singly & Doubly Linked List Implementation", icon: Network, diff: "Intermediate" },
    { no: "03", title: "Stack & Queue: Buffer Management & Simulation", icon: Database, diff: "Intermediate" },
    { no: "04", title: "Binary Search Tree (BST) & Self-Balancing AVL", icon: Network, diff: "Advanced" },
    { no: "05", title: "Graph Representations & Traversal (BFS & DFS)", icon: Network, diff: "Advanced" },
    { no: "06", title: "Divide & Conquer: QuickSort & MergeSort O(n log n)", icon: Code2, diff: "Advanced" },
    { no: "07", title: "Hash Table, Collision Resolution & Map Structures", icon: Database, diff: "Advanced" },
    { no: "08", title: "Final Practicum Project & Big Data Engine Challenge", icon: Trophy, diff: "Mastery" },
  ];

  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F7F6FD] dark:bg-[#070312] text-slate-900 dark:text-white font-sans selection:bg-purple-600 selection:text-white transition-colors duration-300">
      
      {/* ============================================================ */}
      {/* LEFT COLUMN: FULLSCREEN BRAND HERO WITH GIANT BLENDED MASCOT  */}
      {/* ============================================================ */}
      <section className="lg:w-[57%] xl:w-[60%] min-h-screen lg:h-screen flex flex-col justify-between p-7 sm:p-10 lg:p-12 xl:p-16 relative overflow-hidden bg-gradient-to-br from-[#F5F1FF] via-[#EDE7FD] to-[#DFD5FC] dark:from-[#17092F] dark:via-[#110523] dark:to-[#080213] border-b lg:border-b-0 lg:border-r border-purple-200/70 dark:border-purple-950/70">
        
        {/* Subtle Ambient Background Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-400/25 dark:bg-purple-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-indigo-400/20 dark:bg-indigo-600/10 blur-3xl pointer-events-none" />

        {/* GIANT MASCOT WATERMARK / HERO BACKGROUND ("disaruin ke text") */}
        <div className="absolute right-[-8%] sm:right-[-4%] bottom-[-4%] lg:bottom-[-2%] w-[105%] sm:w-[95%] lg:w-[110%] xl:w-[100%] h-[80%] lg:h-[90%] pointer-events-none select-none z-0">
          <div className="relative w-full h-full opacity-45 sm:opacity-50 dark:opacity-35 transition-opacity duration-300">
            <Image
              src="/images/landing-hero-alpro-edm.png"
              alt="Background Maskot EDM Laboratory"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain object-bottom-right drop-shadow-xl"
            />
          </div>
        </div>

        {/* Top Header: Official EDM Logo & Identification */}
        <div className="relative z-10 flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-2xl bg-white/95 dark:bg-purple-900/60 shadow-[0_4px_16px_rgba(40,16,80,0.12)] border border-white/90 dark:border-purple-700/50 flex items-center justify-center p-2.5 shrink-0 overflow-hidden">
            <Image
              src="/images/edm-emblem-crimson.png"
              alt="Logo Resmi EDM"
              fill
              sizes="48px"
              className="object-contain p-1.5"
              priority
            />
          </div>
          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-purple-700 dark:text-purple-400">
              EDM LABORATORY
            </div>
            <div className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-neutral-200 leading-none tracking-tight">
              Enterprise Data Management • ALPRO
            </div>
          </div>
        </div>

        {/* Center: MASSIVE TYPOGRAPHY OVERLAPPING THE MASCOT ("nabrakin aja gapapa") */}
        <div className="relative z-10 my-auto py-8 lg:py-10 space-y-6 sm:space-y-7 max-w-2xl">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-purple-900/70 border border-purple-200/80 dark:border-purple-800/80 text-xs font-mono font-bold text-purple-900 dark:text-purple-200 backdrop-blur-md shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 dark:bg-purple-400 animate-pulse" />
            <span>PORTAL RESMI PRAKTIKUM 2026/2027</span>
          </div>

          {/* Huge Editorial Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-[5.5rem] font-black text-slate-950 dark:text-white tracking-tight leading-[0.95]">
            ALPRO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 dark:from-purple-300 dark:via-indigo-300 dark:to-purple-200">
              Practicum.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl font-medium text-slate-800 dark:text-neutral-100 leading-relaxed font-sans max-w-xl">
            Sistem Manajemen Praktikum Algoritma &amp; Pemrograman S1 Sistem Informasi Telkom University. Terintegrasi penuh dengan 15 Kelas SI&apos;50 dan 32 Asisten Resmi EDM.
          </p>

          {/* Large Elevated Feature Chips */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-mono font-bold bg-white/90 dark:bg-purple-950/80 text-purple-950 dark:text-purple-200 border border-purple-200 dark:border-purple-800/80 shadow-xs backdrop-blur-md">
              <Users size={16} className="text-purple-600 dark:text-purple-400" />
              15 Kelas SI&apos;50
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-mono font-bold bg-white/90 dark:bg-purple-950/80 text-purple-950 dark:text-purple-200 border border-purple-200 dark:border-purple-800/80 shadow-xs backdrop-blur-md">
              <ShieldCheck size={16} className="text-purple-600 dark:text-purple-400" />
              32 Asisten Resmi
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-mono font-bold bg-white/90 dark:bg-purple-950/80 text-purple-950 dark:text-purple-200 border border-purple-200 dark:border-purple-800/80 shadow-xs backdrop-blur-md">
              <MapPin size={16} className="text-purple-600 dark:text-purple-400" />
              R1 Lt. 8 TULT
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-mono font-bold bg-white/90 dark:bg-purple-950/80 text-purple-950 dark:text-purple-200 border border-purple-200 dark:border-purple-800/80 shadow-xs backdrop-blur-md">
              <Sparkles size={16} className="text-purple-600 dark:text-purple-400" />
              Lab EDM Lt. 3
            </span>
          </div>
        </div>

        {/* Bottom Footnote Bar */}
        <div className="relative z-10 flex items-center justify-between text-xs sm:text-sm font-mono text-purple-950/80 dark:text-neutral-300 border-t border-purple-200/70 dark:border-purple-900/40 pt-4">
          <span className="font-semibold">Enterprise Data Management Laboratory</span>
          <span>Telkom University © 2026/2027</span>
        </div>
      </section>

      {/* ============================================================ */}
      {/* RIGHT COLUMN: FULLSCREEN SLEEK LOGIN CONSOLE & CONTROLS      */}
      {/* ============================================================ */}
      <section className="lg:w-[43%] xl:w-[40%] min-h-screen lg:h-screen flex flex-col justify-between p-6 sm:p-8 lg:p-10 xl:p-12 bg-[#FAF9FE] dark:bg-[#0B0316] relative z-20 overflow-y-auto border-l border-purple-100/60 dark:border-purple-950/60">
        
        {/* Top Controls Row */}
        <div className="w-full flex items-center justify-end gap-2 pb-4">
          <button
            type="button"
            onClick={() => setActiveModal("modul")}
            className="px-3 py-1.5 rounded-full bg-white dark:bg-purple-950/70 hover:bg-purple-50 hover:dark:bg-purple-900/60 border border-slate-200/80 dark:border-purple-800 text-xs font-semibold text-slate-700 dark:text-neutral-200 transition-all cursor-pointer shadow-2xs"
          >
            Silabus Modul
          </button>
          <button
            type="button"
            onClick={() => setActiveModal("tentang")}
            className="px-3 py-1.5 rounded-full bg-white dark:bg-purple-950/70 hover:bg-purple-50 hover:dark:bg-purple-900/60 border border-slate-200/80 dark:border-purple-800 text-xs font-semibold text-slate-700 dark:text-neutral-200 transition-all cursor-pointer shadow-2xs"
          >
            Tentang Lab
          </button>
          <div className="bg-white dark:bg-purple-950/70 border border-slate-200/80 dark:border-purple-800 rounded-full p-1 shadow-2xs">
            <ThemeToggle />
          </div>
        </div>

        {/* Center: Beautifully Integrated Login Console */}
        <div className="my-auto w-full flex items-center justify-center py-4">
          <LoginForm />
        </div>

        {/* Bottom Support Text & Security Assurance */}
        <div className="text-center pt-4 space-y-1">
          <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400">
            Butuh bantuan akun? Hubungi Koordinator Asisten Praktikum di Ruang R1 Lt. 8 TULT / Lab EDM Lt. 3.
          </div>
          <div className="text-[10px] font-mono text-slate-400 dark:text-neutral-500">
            🔒 256-Bit SSL Enkripsi • Terhubung Database EDM Supabase
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* MODAL: SILABUS MODUL                                         */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activeModal === "modul" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#120824] border border-purple-100 dark:border-purple-900/50 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <BookOpen size={20} className="text-purple-600" />
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Silabus 8 Modul Praktikum</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {modules.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.no} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200/70 dark:border-neutral-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">MODUL {m.no}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">{m.diff}</span>
                      </div>
                      <h4 className="text-xs font-semibold text-slate-800 dark:text-neutral-200">{m.title}</h4>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* MODAL: TENTANG LAB                                           */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activeModal === "tentang" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-xl bg-white dark:bg-[#120824] border border-purple-100 dark:border-purple-900/50 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-neutral-800">
                <div className="flex items-center gap-2">
                  <Info size={20} className="text-purple-600" />
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white">Tentang Lab EDM</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-neutral-300">
                <p>
                  <strong>Enterprise Data Management (EDM) Laboratory</strong> adalah laboratorium riset dan praktikum di bawah naungan Program Studi S1 Sistem Informasi, Fakultas Rekayasa Industri, Telkom University.
                </p>
                <p>
                  Mengampu mata kuliah praktikum fundamental pemrograman dan struktur data untuk seluruh mahasiswa angkatan 2026 (SI&apos;50) dengan dukungan 32 asisten praktikum terverifikasi.
                </p>
                <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-[11px] font-mono text-purple-900 dark:text-purple-200 space-y-1">
                  <div>📍 <strong>Lokasi Praktikum:</strong> Ruang R1 Lantai 8 TULT (Telkom University Landmark Tower).</div>
                  <div>🏢 <strong>Ruang Asisten &amp; Lab:</strong> Gedung Laboratorium Terpadu Lt. 3, Telkom University, Bandung.</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
