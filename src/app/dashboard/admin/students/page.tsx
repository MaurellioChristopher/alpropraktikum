"use client";

import { UploadCloud, FileSpreadsheet, Download, Check } from "lucide-react";
import { useState } from "react";

export default function AdminStudentsPage() {
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <header className="flex flex-col gap-2">
        <h1 className="font-display text-4xl text-white">Master Data Praktikan</h1>
        <p className="text-[var(--color-steel)] max-w-2xl text-sm">
          Unggah data praktikan secara massal via SheetJS (.xlsx). Sistem akan menuliskannya secara transaksional ke tabel `student_details`.
        </p>
      </header>

      {/* Upload Zone */}
      <div className="bg-[#09040D] border border-[#27272A] border-dashed rounded-[6px] p-12 flex flex-col items-center justify-center text-center">
        {uploadSuccess ? (
          <div className="flex flex-col items-center gap-4 text-green-500">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
              <Check size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="font-mono text-lg text-white">Batch Import Berhasil</h3>
              <p className="text-[var(--color-steel)] font-mono text-xs">48 baris data baru ditambahkan ke database.</p>
            </div>
            <button 
              onClick={() => { setFileSelected(null); setUploadSuccess(false); }}
              className="mt-4 px-6 py-2 bg-[#12091F] text-[var(--color-bone)] border border-[#27272A] rounded-[4px] font-mono text-xs uppercase hover:bg-[#1a0e2d]"
            >
              Upload Ulang
            </button>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-[rgba(197,166,124,0.1)] flex items-center justify-center text-[var(--color-aureo-gold)] mb-6">
              <UploadCloud size={32} />
            </div>
            <h3 className="font-mono text-lg text-white mb-2">Drag & Drop Spreadsheet</h3>
            <p className="text-[var(--color-steel)] font-mono text-xs mb-8">atau klik untuk memilih file .xlsx</p>

            <div className="flex gap-4 items-center">
              <label className="bg-[var(--color-bone)] text-black hover:bg-white cursor-pointer font-mono text-xs uppercase tracking-wider px-6 py-3 rounded-[6px] font-semibold transition-colors">
                <span>Pilih File</span>
                <input 
                  type="file" 
                  accept=".xlsx, .xls, .csv" 
                  className="hidden" 
                  onChange={(e) => setFileSelected(e.target.files?.[0] || null)}
                />
              </label>
              
              <button className="flex items-center gap-2 px-6 py-3 bg-[#12091F] text-[var(--color-bone)] border border-[#27272A] rounded-[6px] font-mono text-xs uppercase tracking-wider hover:bg-[#1a0e2d] transition-colors">
                <Download size={14} />
                Download Template
              </button>
            </div>

            {fileSelected && (
              <div className="mt-8 p-4 bg-[#12091F] border border-[#27272A] rounded-[4px] flex items-center justify-between w-full max-w-md">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet size={20} className="text-[var(--color-aureo-gold)]" />
                  <span className="font-mono text-sm text-[var(--color-bone)]">{fileSelected.name}</span>
                </div>
                <button 
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="bg-[var(--color-aureo-gold)] text-black px-4 py-1.5 rounded-[4px] font-mono text-xs font-bold disabled:opacity-50"
                >
                  {isUploading ? "Processing..." : "Execute"}
                </button>
              </div>
            )}
          </>
        )}
      </div>

    </div>
  );
}
