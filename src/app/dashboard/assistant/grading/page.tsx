"use client";

import { useState } from "react";
import { Download, Search, CheckCircle2, Lock, ArrowLeft, ChevronDown, GraduationCap, RefreshCw } from "lucide-react";
import { DashboardSidebar } from "@/components/aureo/dashboard-sidebar";
import { SI50_CLASSES } from "@/lib/si-classes";
import { MOODLE_STUDENTS_BY_CLASS, LMS_ALPRO_METADATA, MoodleStudentGrade } from "@/data/moodle-alpro-students";
import { getAssistantCodeForStudent } from "@/data/alpro-schedule-plotting";
import { getAssistantByCode, ALPRO_ASSISTANTS } from "@/data/assistants-roster";
import Link from "next/link";

interface GradeRow {
  nim: string;
  name: string;
  warmingUp: string;
  preTest: string;
  practice: string;
  jurnal: string;
  postTest: string;
  status: "saved" | "saving" | "error" | "idle";
}

// Convert Moodle student data to GradeRow
const getStudentsByClassCode = (classCode: string): GradeRow[] => {
  const students = MOODLE_STUDENTS_BY_CLASS[classCode] || [];
  return students.map((s) => ({
    nim: s.nim,
    name: s.name,
    warmingUp: s.warmingUp !== null && s.warmingUp !== undefined ? s.warmingUp.toString() : "",
    preTest: s.preTest !== null && s.preTest !== undefined ? s.preTest.toString() : "",
    practice: s.practice !== null && s.practice !== undefined ? s.practice.toString() : "",
    jurnal: s.jurnal !== null && s.jurnal !== undefined ? s.jurnal.toString() : "",
    postTest: s.postTest !== null && s.postTest !== undefined ? s.postTest.toString() : "",
    status: "idle",
  }));
};

export default function GradingDashboard() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("SI5001");
  const [classDataStore, setClassDataStore] = useState<Record<string, GradeRow[]>>({
    SI5001: getStudentsByClassCode("SI5001"),
  });
  const [locked, setLocked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string | null>(null);

  const handleSyncLMS = async () => {
    setIsSyncing(true);
    setSyncStatus("Menghubungkan ke LMS...");
    try {
      const res = await fetch("/api/lms/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classCode: selectedClass }),
      });
      const data = await res.json();
      if (data.success && data.updatedGrades && data.updatedGrades[selectedClass]) {
        const liveList = data.updatedGrades[selectedClass].map((s: any) => ({
          ...s,
          status: "saved" as const,
        }));
        setClassDataStore((prev) => ({
          ...prev,
          [selectedClass]: liveList,
        }));
        setSyncStatus("✓ Berhasil disinkronkan");
        setTimeout(() => setSyncStatus(null), 3500);
      } else {
        setSyncStatus(data.error || "Gagal sinkronisasi");
      }
    } catch (e) {
      setSyncStatus("Koneksi gagal");
    } finally {
      setIsSyncing(false);
    }
  };

  const currentGrades = classDataStore[selectedClass] || getStudentsByClassCode(selectedClass);

  const handleClassChange = (newCode: string) => {
    setSelectedClass(newCode);
    if (!classDataStore[newCode]) {
      setClassDataStore(prev => ({
        ...prev,
        [newCode]: getStudentsByClassCode(newCode)
      }));
    }
  };

  const calcFinal = (wu: string, pre: string, prac: string, jur: string, post: string) => {
    const vWU = parseFloat(wu) || 0;
    const vPre = parseFloat(pre) || 0;
    const vPrac = parseFloat(prac) || 0;
    const vJur = parseFloat(jur) || 0;
    const vPost = parseFloat(post) || 0;
    
    // Aturan Resmi EDM: Jika nilai Pre-Test <= 50, maka nilai Warming Up/TP menjadi 0
    const effectiveWU = vPre <= 50 ? 0 : vWU;

    // Bobot Resmi: Warming Up/TP (5%), Pre-Test (20%), Practice (15%), Jurnal (20%), Post-Test (40%)
    return ((effectiveWU * 0.05) + (vPre * 0.20) + (vPrac * 0.15) + (vJur * 0.20) + (vPost * 0.40)).toFixed(2);
  };

  const handleInputChange = (idx: number, field: keyof GradeRow, value: string) => {
    if (locked) return;
    if (value !== "" && isNaN(Number(value))) return;
    const num = Number(value);
    if (num > 100) return;

    const updated = [...currentGrades];
    updated[idx] = { ...updated[idx], [field]: value, status: "saving" };

    setClassDataStore(prev => ({
      ...prev,
      [selectedClass]: updated
    }));

    setTimeout(() => {
      setClassDataStore(prev => {
        const list = [...(prev[selectedClass] || [])];
        if (list[idx] && list[idx].status === "saving") {
          list[idx] = { ...list[idx], status: "saved" };
        }
        return { ...prev, [selectedClass]: list };
      });
    }, 400);
  };

  const exportCSV = () => {
    const headers = [
      "NIM",
      "Nama Mahasiswa",
      "Kelas",
      "Asprak",
      "Warming Up/TP (5%)",
      "Pre-Test (20%)",
      "Practice (15%)",
      "Jurnal (20%)",
      "Post-Test (40%)",
      "Nilai Akhir"
    ];
    const rows = currentGrades.map(r => {
      const vPre = parseFloat(r.preTest) || 0;
      const vWU = parseFloat(r.warmingUp) || 0;
      const effectiveWU = vPre <= 50 ? 0 : vWU;
      const asprakCode = getAssistantCodeForStudent(r.nim, r.name);
      return [
        `"${r.nim}"`,
        `"${r.name}"`,
        `"${selectedClass}"`,
        `"${asprakCode}"`,
        effectiveWU,
        r.preTest || "0",
        r.practice || "0",
        r.jurnal || "0",
        r.postTest || "0",
        calcFinal(r.warmingUp, r.preTest, r.practice, r.jurnal, r.postTest)
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Nilai_Alpro_${selectedClass}_LMS_Telkom.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const currentClassInfo = SI50_CLASSES.find(c => c.code === selectedClass) || SI50_CLASSES[0];

  const filteredGrades = currentGrades.filter(g => {
    const asprak = getAssistantCodeForStudent(g.nim, g.name).toLowerCase();
    const q = searchQuery.toLowerCase();
    return (
      g.name.toLowerCase().includes(q) || 
      g.nim.includes(q) ||
      asprak.includes(q)
    );
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start pb-12">
      <DashboardSidebar
        activeTab="penilaian"
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      <div className="flex-1 w-full min-w-0 space-y-5">
        {/* Title & Sub-tabs matching Image 3 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Link href="/dashboard/assistant" className="text-xs font-semibold text-purple-700 dark:text-purple-400 hover:underline flex items-center gap-1">
                  <ArrowLeft size={13} /> Kembali ke Beranda
                </Link>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                Praktikan<span className="text-orange-500">.</span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-1">
                Bobot Resmi EDM: Warming Up/TP (5%), Pre-Test (20%), Practice (15%), Jurnal (20%), Post-Test (40%) • Ketentuan: Jika Pre-Test ≤ 50, maka nilai Warming Up = 0.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSyncLMS}
                disabled={isSyncing}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold font-mono shadow-xs transition-all cursor-pointer disabled:opacity-60"
                title="Tarik nilai terbaru langsung dari LMS CeLOE"
              >
                <RefreshCw size={13} className={isSyncing ? "animate-spin" : ""} />
                <span>{isSyncing ? "Menyinkronkan..." : "Sinkronkan LMS"}</span>
              </button>

              <button
                type="button"
                onClick={exportCSV}
                className="flex items-center gap-1.5 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-full text-xs font-bold font-mono shadow-xs transition-all cursor-pointer"
              >
                <Download size={13} />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Sub-tabs matching Image 3 */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-full bg-white dark:bg-white/10 text-slate-900 dark:text-white text-xs font-bold shadow-xs border border-slate-200/80 dark:border-white/10 cursor-pointer"
            >
              Kelompok saya
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-neutral-400 text-xs font-medium hover:bg-slate-200/70 dark:hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Praktikan pindahan</span>
              <span className="px-1.5 py-0.2 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-mono text-[10px] font-bold">
                3
              </span>
            </button>
          </div>
        </div>

        {/* Filter Bar matching Image 3 */}
        <div className="bg-white dark:bg-[#120824] rounded-2xl p-4 border border-slate-200/80 dark:border-purple-900/40 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Modul selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500 dark:text-neutral-400">Modul</span>
              <select className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-1.5 text-xs font-bold font-mono text-slate-800 dark:text-white focus:outline-none cursor-pointer">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>

            {/* Kelas selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500 dark:text-neutral-400">Kelas</span>
              <select
                value={selectedClass}
                onChange={(e) => handleClassChange(e.target.value)}
                className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-1.5 text-xs font-bold font-mono text-slate-800 dark:text-white focus:outline-none cursor-pointer"
              >
                {SI50_CLASSES.map((cls) => (
                  <option key={cls.code} value={cls.code}>
                    {cls.name} ({cls.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Grup selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500 dark:text-neutral-400">Grup</span>
              <select className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-1.5 text-xs font-bold font-mono text-slate-800 dark:text-white focus:outline-none cursor-pointer">
                <option value="A">A - DJDM</option>
                <option value="B">B - DJDM</option>
                <option value="C">C - DJDM</option>
                <option value="H">H - MACY</option>
              </select>
            </div>

            {/* LMS status telemetry */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200/80 dark:border-purple-900/40 text-xs font-mono text-purple-700 dark:text-purple-300">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
              <span>LMS Memeriksa... 0/2 komponen</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleClassChange(selectedClass)}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 flex items-center justify-center text-slate-600 dark:text-neutral-300 transition-colors cursor-pointer"
            title="Refresh nilai LMS"
          >
            <RefreshCw size={14} />
          </button>
        </div>

        {/* 15 CLASS QUICK SWITCHER STRIP */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {SI50_CLASSES.map((cls) => (
            <button
              key={cls.code}
              type="button"
              onClick={() => handleClassChange(cls.code)}
              className={`shrink-0 text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg transition-all ${
                selectedClass === cls.code
                  ? "bg-purple-700 text-white shadow-xs"
                  : cls.type === "Internasional"
                  ? "bg-purple-100 text-purple-900 border border-purple-300 hover:bg-purple-200"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cls.code}
              <span className="text-[9px] opacity-75 ml-1">({cls.totalStudents})</span>
            </button>
          ))}
        </div>

        {/* Group Section Container matching Image 3 */}
        <div className="bg-white dark:bg-[#120824] rounded-2xl border border-slate-200/80 dark:border-purple-900/40 shadow-xs p-5 space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Grup A</h2>
            <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-neutral-300 font-mono text-xs font-bold flex items-center justify-center">
              {filteredGrades.length}
            </span>
          </div>

          {/* Search bar matching Image 3 */}
          <div className="relative">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama / NIM"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full text-xs text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
          </div>

          {/* Table matching Image 3 */}
          <div className="overflow-x-auto pt-1">
            <table className="w-full text-left text-xs whitespace-nowrap min-w-[820px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/10 text-[11px] font-mono text-slate-400">
                  <th className="pb-3 font-medium">Praktikan</th>
                  <th className="pb-3 text-center w-20">Asprak</th>
                  <th className="pb-3 text-center w-24">Warming Up<br /><span className="text-[10px] font-bold text-purple-600 dark:text-purple-400">5%</span></th>
                  <th className="pb-3 text-center w-20">Pre-Test<br /><span className="text-[10px] font-bold text-purple-600 dark:text-purple-400">20%</span></th>
                  <th className="pb-3 text-center w-20">Practice<br /><span className="text-[10px] font-bold text-purple-600 dark:text-purple-400">15%</span></th>
                  <th className="pb-3 text-center w-20">Jurnal<br /><span className="text-[10px] font-bold text-purple-600 dark:text-purple-400">20%</span></th>
                  <th className="pb-3 text-center w-20">Post-Test<br /><span className="text-[10px] font-bold text-purple-600 dark:text-purple-400">40%</span></th>
                  <th className="pb-3 text-center w-20">Akhir</th>
                  <th className="pb-3 text-center w-24">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {filteredGrades.map((row, idx) => {
                  const finalScore = calcFinal(row.warmingUp, row.preTest, row.practice, row.jurnal, row.postTest);
                  const inisial = row.name.split(" ").map(w => w[0]).slice(0, 2).join("");
                  const vPre = parseFloat(row.preTest) || 0;
                  const vWU = parseFloat(row.warmingUp) || 0;
                  const isWuVoid = vPre <= 50 && vWU > 0;
                  const asprakCode = getAssistantCodeForStudent(row.nim, row.name);
                  const asstProfile = getAssistantByCode(asprakCode);

                  return (
                    <tr key={row.nim} className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors">
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-neutral-300 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                            {inisial}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white text-xs">
                              {row.name}
                            </div>
                            <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                              {row.nim}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Asprak Pengampu */}
                      <td className="py-3.5 px-2 text-center">
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-extrabold bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/60 shadow-2xs"
                          title={asstProfile ? `${asstProfile.name} (${asstProfile.position})` : `Asprak Pengampu: ${asprakCode}`}
                        >
                          {asprakCode}
                        </span>
                      </td>

                      {/* Warming Up / TP */}
                      <td className="py-3.5 px-2 text-center">
                        <input
                          type="text"
                          value={row.warmingUp}
                          placeholder="-"
                          onChange={(e) => handleInputChange(idx, "warmingUp", e.target.value)}
                          className={`w-14 py-1.5 bg-slate-50 dark:bg-white/5 border rounded-xl text-center font-mono text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-purple-500 ${
                            isWuVoid
                              ? "border-amber-400 dark:border-amber-600/80 line-through text-slate-400 dark:text-neutral-500 bg-amber-50/50 dark:bg-amber-950/20"
                              : "border-slate-200 dark:border-white/10 text-slate-800 dark:text-white"
                          }`}
                          title={isWuVoid ? "Nilai Warming Up dihitung 0 karena nilai Pre-Test ≤ 50" : undefined}
                        />
                        {isWuVoid && (
                          <span className="block text-[9px] font-mono text-amber-600 dark:text-amber-400 font-bold mt-0.5">
                            Hangus
                          </span>
                        )}
                      </td>

                      {/* Pre-Test */}
                      <td className="py-3.5 px-2 text-center">
                        <input
                          type="text"
                          value={row.preTest}
                          placeholder="-"
                          onChange={(e) => handleInputChange(idx, "preTest", e.target.value)}
                          className="w-14 py-1.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-center font-mono text-xs font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </td>

                      {/* Practice */}
                      <td className="py-3.5 px-2 text-center">
                        <input
                          type="text"
                          value={row.practice}
                          placeholder="-"
                          onChange={(e) => handleInputChange(idx, "practice", e.target.value)}
                          className="w-14 py-1.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-center font-mono text-xs font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </td>

                      {/* Jurnal */}
                      <td className="py-3.5 px-2 text-center">
                        <input
                          type="text"
                          value={row.jurnal}
                          placeholder="-"
                          onChange={(e) => handleInputChange(idx, "jurnal", e.target.value)}
                          className="w-14 py-1.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-center font-mono text-xs font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </td>

                      {/* Post-test */}
                      <td className="py-3.5 px-2 text-center">
                        <input
                          type="text"
                          value={row.postTest}
                          placeholder="-"
                          onChange={(e) => handleInputChange(idx, "postTest", e.target.value)}
                          className="w-14 py-1.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-center font-mono text-xs font-semibold text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                      </td>

                      {/* Akhir */}
                      <td className="py-3.5 px-2 text-center">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-mono font-bold text-xs">
                          {finalScore}
                        </span>
                      </td>

                      {/* Aksi matching Image 3 */}
                      <td className="py-3.5 pl-2 text-center">
                        <button
                          type="button"
                          onClick={() => alert(`Review nilai ${row.name}`)}
                          className="px-3 py-1 rounded-full border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-700 dark:text-neutral-200 text-[11px] font-medium transition-colors cursor-pointer"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
