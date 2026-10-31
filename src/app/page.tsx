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
  ExternalLink,
  Sparkles,
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
    <main className="min-h-screen w-full bg-[#F2F4F8] dark:bg-[#070312] text-slate-900 dark:text-white flex items-center justify-center p-3 sm:p-6 lg:p-10 font-sans selection:bg-purple-600 selection:text-white transition-colors duration-300">
      
      {/* Top Floating Controls */}
      <div className="fixed top-5 right-6 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveModal("modul")}
          className="px-3 py-1.5 rounded-full bg-white/80 dark:bg-purple-950/70 border border-slate-200 dark:border-purple-800 text-xs font-semibold text-slate-700 dark:text-neutral-200 backdrop-blur-md hover:bg-white transition-all cursor-pointer shadow-xs"
        >
          Silabus
        </button>
        <button
          type="button"
          onClick={() => setActiveModal("tentang")}
          className="px-3 py-1.5 rounded-full bg-white/80 dark:bg-purple-950/70 border border-slate-200 dark:border-purple-800 text-xs font-semibold text-slate-700 dark:text-neutral-200 backdrop-blur-md hover:bg-white transition-all cursor-pointer shadow-xs"
        >
          Tentang Lab
        </button>
        <div className="bg-white/80 dark:bg-purple-950/70 border border-slate-200 dark:border-purple-800 rounded-full p-1 backdrop-blur-md shadow-xs">
          <ThemeToggle />
        </div>
      </div>

      {/* Main Split Grid (Max 1440px) */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch min-h-[640px] sm:min-h-[720px]">
        
        {/* LEFT COLUMN: Large Lilac/Purple Squircle Card with Mascot */}
        <div className="lg:col-span-7 bg-gradient-to-br from-[#EAE4F8] via-[#EDE9FE] to-[#DFD6F9] dark:from-[#1C0D38] dark:via-[#140828] dark:to-[#0A0414] border border-purple-200/80 dark:border-purple-900/50 rounded-[2.5rem] p-7 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden shadow-[0_15px_40px_rgba(40,16,80,0.06)] dark:shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
          
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-purple-400/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-indigo-400/15 blur-3xl pointer-events-none" />

          {/* Top Logo & Branding */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl bg-white/90 dark:bg-purple-900/60 shadow-xs border border-white/80 dark:border-purple-750 flex items-center justify-center p-2 shrink-0 overflow-hidden">
              <Image
                src="/images/edm-emblem-crimson.png"
                alt="EDM Logo"
                fill
                sizes="40px"
                className="object-contain p-2"
                priority
              />
            </div>
            <div>
              <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-purple-700 dark:text-purple-400">
                EDM LABORATORY
              </div>
              <div className="text-sm font-bold text-slate-800 dark:text-neutral-200 leading-none">
                ALPRO Practicum
              </div>
            </div>
          </div>

          {/* Center Content: Headline & Mascot */}
          <div className="relative z-10 my-6 sm:my-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Huge Clean Typography */}
            <div className="md:col-span-7 space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.05]">
                ALPRO<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-600 dark:from-purple-300 dark:to-indigo-300">
                  Practicum
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed font-sans max-w-sm">
                Sistem Manajemen Praktikum Algoritma &amp; Pemrograman S1 Sistem Informasi Telkom University. Terintegrasi langsung dengan 15 Kelas SI&apos;50 dan 32 Asisten Resmi EDM.
              </p>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-white/80 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 border border-purple-200 dark:border-purple-800 shadow-2xs">
                  15 Kelas SI&apos;50
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-white/80 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 border border-purple-200 dark:border-purple-800 shadow-2xs">
                  32 Asisten Resmi
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-white/80 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 border border-purple-200 dark:border-purple-800 shadow-2xs">
                  Lab EDM Lt. 3
                </span>
              </div>
            </div>

            {/* Mascot Showcase with Ground Shadow */}
            <div className="md:col-span-5 flex flex-col items-center justify-center relative">
              <div className="relative w-48 h-56 sm:w-56 sm:h-64 lg:w-60 lg:h-72 drop-shadow-2xl">
                <Image
                  src="/images/edm-mascot.png"
                  alt="Maskot Resmi EDM Laboratory"
                  fill
                  priority
                  sizes="(max-width: 768px) 192px, 240px"
                  className="object-contain"
                />
              </div>
              {/* Ground Shadow */}
              <div className="w-32 sm:w-40 h-4 bg-purple-900/20 dark:bg-purple-950/50 rounded-full blur-md -mt-2" />
            </div>
          </div>

          {/* Bottom Footnote */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-purple-900/70 dark:text-neutral-400 border-t border-purple-200/60 dark:border-purple-900/40 pt-4">
            <span>Enterprise Data Management</span>
            <span>Telkom University © 2026/2027</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Minimalist Login Form Container */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <LoginForm />
        </div>

      </div>

      {/* SILABUS MODAL */}
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
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
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

      {/* TENTANG MODAL */}
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
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
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
                <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-[11px] font-mono text-purple-900 dark:text-purple-200">
                  📍 Gedung Laboratorium Terpadu Lt. 3, Telkom University, Bandung.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
