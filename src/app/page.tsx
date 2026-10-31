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
      {/* LEFT COLUMN: FULLSCREEN BRAND HERO WITH OFFICIAL 3 MASCOTS   */}
      {/* ============================================================ */}
      <section className="lg:w-[58%] xl:w-[62%] min-h-screen lg:h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-14 relative overflow-hidden bg-gradient-to-br from-[#EAE5FF] via-[#EDE8FD] to-[#DFD6F9] dark:from-[#17092E] dark:via-[#110524] dark:to-[#080212] border-b lg:border-b-0 lg:border-r border-purple-200/70 dark:border-purple-950/70">
        
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-indigo-400/20 dark:bg-indigo-600/10 blur-3xl pointer-events-none" />

        {/* Top Header: Official EDM Logo & Identification */}
        <div className="relative z-10 flex items-center gap-3.5">
          <div className="relative w-11 h-11 rounded-2xl bg-white/95 dark:bg-purple-900/60 shadow-[0_4px_14px_rgba(40,16,80,0.1)] border border-white/90 dark:border-purple-700/50 flex items-center justify-center p-2 shrink-0 overflow-hidden">
            <Image
              src="/images/edm-emblem-crimson.png"
              alt="Logo Resmi EDM"
              fill
              sizes="44px"
              className="object-contain p-1.5"
              priority
            />
          </div>
          <div>
            <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-purple-700 dark:text-purple-400">
              EDM LABORATORY
            </div>
            <div className="text-sm font-extrabold text-slate-800 dark:text-neutral-200 leading-none tracking-tight">
              Enterprise Data Management • ALPRO
            </div>
          </div>
        </div>

        {/* Center Hero: Large Bold Typography & Overview */}
        <div className="relative z-10 my-auto py-6 sm:py-8 space-y-4 sm:space-y-5 max-w-xl">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-purple-900/50 border border-purple-200/80 dark:border-purple-800/60 text-xs font-mono font-bold text-purple-800 dark:text-purple-300 backdrop-blur-md shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400 animate-pulse" />
            <span>PORTAL RESMI PRAKTIKUM 2026/2027</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05]">
            ALPRO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 dark:from-purple-300 dark:via-indigo-300 dark:to-purple-200">
              Practicum.
            </span>
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm lg:text-base text-slate-600 dark:text-neutral-300 leading-relaxed font-sans max-w-lg">
            Sistem Manajemen Praktikum Algoritma &amp; Pemrograman S1 Sistem Informasi Telkom University. Terintegrasi langsung dengan 15 Kelas SI&apos;50, 32 Asisten Resmi EDM, dan Ruang Praktikum R1 Lantai 8 TULT / Lab Terpadu Lt. 3.
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/85 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 border border-purple-200/80 dark:border-purple-800/50 shadow-2xs">
              <Users size={12} className="text-purple-600 dark:text-purple-400" />
              15 Kelas SI&apos;50
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/85 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 border border-purple-200/80 dark:border-purple-800/50 shadow-2xs">
              <ShieldCheck size={12} className="text-purple-600 dark:text-purple-400" />
              32 Asisten Resmi
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/85 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 border border-purple-200/80 dark:border-purple-800/50 shadow-2xs">
              <MapPin size={12} className="text-purple-600 dark:text-purple-400" />
              R1 Lt. 8 TULT
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white/85 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 border border-purple-200/80 dark:border-purple-800/50 shadow-2xs">
              <Sparkles size={12} className="text-purple-600 dark:text-purple-400" />
              Lab EDM Lt. 3
            </span>
          </div>
        </div>

        {/* Bottom Hero: Official 3 Mascot Illustration Showcase */}
        <div className="relative z-10 w-full flex flex-col items-center justify-end select-none pointer-events-none mt-auto pt-2">
          <div className="relative w-full max-w-lg sm:max-w-xl h-52 sm:h-64 lg:h-72 xl:h-80 drop-shadow-[0_20px_35px_rgba(79,40,150,0.18)]">
            <Image
              src="/images/edm-3maskot-cutout.png"
              alt="Maskot Resmi EDM Laboratory - 3 Maskot Kucing EDM"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-contain object-bottom"
              priority
            />
          </div>
        </div>

        {/* Bottom Footnote Bar */}
        <div className="relative z-10 flex items-center justify-between text-xs font-mono text-purple-950/70 dark:text-neutral-400 border-t border-purple-200/70 dark:border-purple-900/40 pt-4 mt-2">
          <span className="font-semibold">Enterprise Data Management Laboratory</span>
          <span>Telkom University © 2026/2027</span>
        </div>
      </section>

      {/* ============================================================ */}
      {/* RIGHT COLUMN: FULLSCREEN SLEEK LOGIN CONSOLE & CONTROLS      */}
      {/* ============================================================ */}
      <section className="lg:w-[42%] xl:w-[38%] min-h-screen lg:h-screen flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-14 bg-white dark:bg-[#0C0418] relative z-20 overflow-y-auto">
        
        {/* Top Controls Row */}
        <div className="w-full flex items-center justify-end gap-2 pb-6">
          <button
            type="button"
            onClick={() => setActiveModal("modul")}
            className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-purple-50 dark:bg-purple-950/70 hover:dark:bg-purple-900/60 border border-slate-200 dark:border-purple-800 text-xs font-semibold text-slate-700 dark:text-neutral-200 transition-all cursor-pointer shadow-2xs"
          >
            Silabus
          </button>
          <button
            type="button"
            onClick={() => setActiveModal("tentang")}
            className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-purple-50 dark:bg-purple-950/70 hover:dark:bg-purple-900/60 border border-slate-200 dark:border-purple-800 text-xs font-semibold text-slate-700 dark:text-neutral-200 transition-all cursor-pointer shadow-2xs"
          >
            Tentang Lab
          </button>
          <div className="bg-slate-100 dark:bg-purple-950/70 border border-slate-200 dark:border-purple-800 rounded-full p-1 shadow-2xs">
            <ThemeToggle />
          </div>
        </div>

        {/* Center: Beautifully Integrated Login Console */}
        <div className="my-auto w-full flex items-center justify-center py-6">
          <LoginForm />
        </div>

        {/* Bottom Support Text */}
        <div className="text-center pt-6 text-[11px] font-mono text-slate-400 dark:text-neutral-500">
          Butuh bantuan akses? Hubungi Koordinator Asisten Praktikum di Ruang R1 Lt. 8 TULT / Lab EDM Lt. 3.
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
