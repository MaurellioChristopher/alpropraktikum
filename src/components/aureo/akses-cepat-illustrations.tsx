"use client";

import React from "react";
import Image from "next/image";

export function PraktikanCardIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none p-1">
      {/* Background Ambient Glow */}
      <div className="absolute w-28 h-28 rounded-full bg-blue-300/30 dark:bg-blue-600/20 blur-xl top-1" />
      <div className="relative w-36 h-32 sm:w-40 sm:h-36 transition-transform duration-300">
        <Image
          src="/images/ilustrasi/praktikan.png"
          alt="Ilustrasi Akses Cepat Praktikan"
          fill
          sizes="(max-width: 640px) 144px, 160px"
          className="object-contain drop-shadow-[0_10px_20px_rgba(59,130,246,0.15)]"
          priority
        />
      </div>
    </div>
  );
}

export function DokumentasiCardIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none p-1">
      {/* Background Ambient Glow */}
      <div className="absolute w-28 h-28 rounded-full bg-emerald-300/30 dark:bg-emerald-600/20 blur-xl top-1" />
      <div className="relative w-36 h-32 sm:w-40 sm:h-36 transition-transform duration-300">
        <Image
          src="/images/ilustrasi/dokumentasi.png"
          alt="Ilustrasi Akses Cepat Dokumentasi"
          fill
          sizes="(max-width: 640px) 144px, 160px"
          className="object-contain drop-shadow-[0_10px_20px_rgba(16,185,129,0.15)]"
          priority
        />
      </div>
    </div>
  );
}

export function JadwalCardIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none p-1">
      {/* Background Ambient Glow */}
      <div className="absolute w-28 h-28 rounded-full bg-amber-300/30 dark:bg-amber-600/20 blur-xl top-1" />
      <div className="relative w-36 h-32 sm:w-40 sm:h-36 transition-transform duration-300">
        <Image
          src="/images/ilustrasi/jadwal-saya.png"
          alt="Ilustrasi Akses Cepat Jadwal Saya"
          fill
          sizes="(max-width: 640px) 144px, 160px"
          className="object-contain drop-shadow-[0_10px_20px_rgba(249,115,22,0.15)]"
          priority
        />
      </div>
    </div>
  );
}

export function SlideModulCardIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none p-1">
      {/* Background Ambient Glow */}
      <div className="absolute w-28 h-28 rounded-full bg-purple-300/30 dark:bg-purple-600/20 blur-xl top-1" />
      <div className="relative w-36 h-32 sm:w-40 sm:h-36 transition-transform duration-300">
        <Image
          src="/images/ilustrasi/ppt-modul.png"
          alt="Ilustrasi Akses Cepat PPT Modul"
          fill
          sizes="(max-width: 640px) 144px, 160px"
          className="object-contain drop-shadow-[0_10px_20px_rgba(147,51,234,0.15)]"
          priority
        />
      </div>
    </div>
  );
}
