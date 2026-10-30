"use client";

import { useState } from "react";
import { Download, Search, CheckCircle2, Lock, ArrowLeft, ChevronDown, GraduationCap, RefreshCw } from "lucide-react";
import { DashboardSidebar } from "@/components/aureo/dashboard-sidebar";
import { SI50_CLASSES } from "@/lib/si-classes";
import { MOODLE_STUDENTS_BY_CLASS, LMS_ALPRO_METADATA, MoodleStudentGrade } from "@/data/moodle-alpro-students";
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
  const [selectedClass, setSelectedClass] = useState("SI5001");
  const [classDataStore, setClassDataStore] = useState<Record<string, GradeRow[]>>({
    SI5001: getStudentsByClassCode("SI5001"),
  });
  const [locked, setLocked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    
    // Weight: Warming Up (10%), Pre Test (15%), Practice (30%), Jurnal (30%), Post Test (15%)
    return ((vWU * 0.10) + (vPre * 0.15) + (vPrac * 0.30) + (vJur * 0.30) + (vPost * 0.15)).toFixed(2);
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
    const headers = ["NIM", "Nama Mahasiswa", "Kelas", "Warming Up (10%)", "Pre Test (15%)", "Practice (30%)", "Jurnal (30%)", "Post Test (15%)", "Nilai Akhir"];
    const rows = currentGrades.map(r => [
      `"${r.nim}"`,
      `"${r.name}"`,
      `"${selectedClass}"`,
      r.warmingUp || "0",
      r.preTest || "0",
      r.practice || "0",
      r.jurnal || "0",
      r.postTest || "0",
      calcFinal(r.warmingUp, r.preTest, r.practice, r.jurnal, r.postTest)
    ]);

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

  const filteredGrades = currentGrades.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    g.nim.includes(searchQuery)
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start pb-12">
      <DashboardSidebar activeTab="penilaian" />

      <div className="flex-1 w-full min-w-0 space-y-5">
        {/* Header Bar */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link href="/dashboard/assistant" className="text-xs font-semibold text-purple-700 hover:underline flex items-center gap-1">
                <ArrowLeft size={14} /> Kembali ke Dashboard
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900">Grade Spreadsheets</h1>
              <span className="text-[11px] font-mono font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-md">
                SI&apos;50
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LMS CeLOE Telkom
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-1">
              Course: {LMS_ALPRO_METADATA.courseFullName} ({LMS_ALPRO_METADATA.courseShortName}) • Kelas {currentClassInfo.name} ({currentClassInfo.totalStudents} Mahasiswa)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Class Dropdown for 15 classes */}
            <div className="relative">
              <select
                value={selectedClass}
                onChange={(e) => handleClassChange(e.target.value)}
                className="bg-slate-50 border border-slate-300 rounded-xl pl-3.5 pr-8 py-2 text-xs font-mono font-bold text-[#250B47] focus:outline-none focus:ring-2 focus:ring-purple-500/30 cursor-pointer appearance-none shadow-xs"
              >
                {SI50_CLASSES.map((cls) => (
                  <option key={cls.code} value={cls.code}>
                    {cls.code} ({cls.name}) • {cls.totalStudents} Mhs
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            <button
              type="button"
              onClick={() => setLocked(!locked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                locked
                  ? "bg-rose-100 border border-rose-200 text-rose-800"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              <Lock size={14} />
              {locked ? "Terkunci" : "Kunci Nilai"}
            </button>

            <button
              type="button"
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white rounded-xl text-xs font-bold font-mono uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              <Download size={14} />
              Export .csv
            </button>
          </div>
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

        {/* Search & Metadata Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama praktikan atau NIM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
            />
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
            <span>Komponen: <strong>5 Indikator</strong></span>
            <span>•</span>
            <span>Total: <strong>{filteredGrades.length} Mahasiswa</strong></span>
          </div>
        </div>

        {/* Spreadsheet Grid */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#0e071a] text-[10px] font-mono text-purple-200 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5 font-semibold text-white">NIM (SI&apos;50)</th>
                  <th className="px-5 py-3.5 font-semibold text-white">Nama Praktikan</th>
                  <th className="px-3 py-3.5 font-semibold text-right w-24 text-purple-300">Warming Up (10%)</th>
                  <th className="px-3 py-3.5 font-semibold text-right w-24 text-purple-300">Pre Test (15%)</th>
                  <th className="px-3 py-3.5 font-semibold text-right w-24 text-purple-300">Practice (30%)</th>
                  <th className="px-3 py-3.5 font-semibold text-right w-24 text-purple-300">Jurnal (30%)</th>
                  <th className="px-3 py-3.5 font-semibold text-right w-24 text-purple-300">Post Test (15%)</th>
                  <th className="px-5 py-3.5 font-semibold text-right text-emerald-400">Nilai Akhir</th>
                  <th className="px-4 py-3.5 font-semibold text-center w-14">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredGrades.map((row, idx) => (
                  <tr key={row.nim} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs text-slate-700 font-semibold">{row.nim}</td>
                    <td className="px-5 py-3 text-xs text-slate-900 font-medium">{row.name}</td>
                    
                    {/* Warming Up */}
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={row.warmingUp}
                        placeholder="-"
                        onChange={(e) => handleInputChange(idx, "warmingUp", e.target.value)}
                        disabled={locked}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-right font-mono text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-50"
                      />
                    </td>

                    {/* Pre Test */}
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={row.preTest}
                        placeholder="-"
                        onChange={(e) => handleInputChange(idx, "preTest", e.target.value)}
                        disabled={locked}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-right font-mono text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-50"
                      />
                    </td>

                    {/* Practice */}
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={row.practice}
                        placeholder="-"
                        onChange={(e) => handleInputChange(idx, "practice", e.target.value)}
                        disabled={locked}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-right font-mono text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-50"
                      />
                    </td>

                    {/* Jurnal */}
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={row.jurnal}
                        placeholder="-"
                        onChange={(e) => handleInputChange(idx, "jurnal", e.target.value)}
                        disabled={locked}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-right font-mono text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-50"
                      />
                    </td>

                    {/* Post Test */}
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={row.postTest}
                        placeholder="-"
                        onChange={(e) => handleInputChange(idx, "postTest", e.target.value)}
                        disabled={locked}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-right font-mono text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-purple-500 disabled:opacity-50"
                      />
                    </td>

                    {/* Nilai Akhir */}
                    <td className="px-5 py-3 text-right font-mono text-xs font-bold text-purple-700">
                      {calcFinal(row.warmingUp, row.preTest, row.practice, row.jurnal, row.postTest)}
                    </td>

                    <td className="px-4 py-3 text-center">
                      {row.status === "saving" && (
                        <div className="w-3.5 h-3.5 mx-auto rounded-full border-2 border-slate-300 border-t-purple-600 animate-spin" />
                      )}
                      {row.status === "saved" && (
                        <CheckCircle2 size={15} className="text-emerald-500 mx-auto" />
                      )}
                      {row.status === "idle" && (
                        <div className="w-1.5 h-1.5 mx-auto rounded-full bg-slate-300" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
