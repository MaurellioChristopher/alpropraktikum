/**
 * Data Resmi Asisten Praktikum Algoritma & Pemrograman (EDM Laboratory)
 * Angkatan SI'48 & SI'49 - Tahun Akademik 2026/2027
 * Total: 32 Asisten (6 Divisi: Koordinator, BPH/Sekben, CnI, CnM, TnC, MD)
 */

export type AssistantRole = "ASPRAK" | "KOMDIS" | "SEKBEN" | "ADMIN" | "SUPER_ADMIN";
export type AccessLevel = "SUPER_ADMIN" | "ADMIN" | "ASPRAK" | "ADMIN_BESAR";

export interface AssistantProfile {
  nim: string;
  name: string;
  originClass: string;
  phone: string;
  studentEmail: string;
  personalEmail: string;
  code: string;
  lineId: string;
  position: string;
  division: "Koordinator" | "Sekretaris & Bendahara" | "Compliance & Integrity" | "Creative & Multimedia" | "Tech & Systems" | "Module Development";
  role: AssistantRole;
}

export const ALPRO_ASSISTANTS: AssistantProfile[] = [
  {
    nim: "102022430024",
    name: "Devin Octavian",
    originClass: "SI-48-04",
    phone: "087878073703",
    studentEmail: "devinoctavian@student.telkomuniversity.ac.id",
    personalEmail: "devin191006@gmail.com",
    code: "DEVO",
    lineId: "devinoctavian",
    position: "Koordinator Praktikum (Super Admin)",
    division: "Koordinator",
    role: "SUPER_ADMIN",
  },
  {
    nim: "102022400331",
    name: "Gracia Gebriella Sianturi",
    originClass: "SI-48-05",
    phone: "085268425588",
    studentEmail: "graciagebriella@student.telkomuniversity.ac.id",
    personalEmail: "allegrch@gmail.com",
    code: "GRGS",
    lineId: "graciagebriella",
    position: "Sekretaris 1 (Executive Board)",
    division: "Sekretaris & Bendahara",
    role: "ADMIN",
  },
  {
    nim: "102022500050",
    name: "Arziky Samudra Marpaung",
    originClass: "SI-49-02",
    phone: "08111116763",
    studentEmail: "arzikysamudram@student.telkomuniversity.ac.id",
    personalEmail: "30arzikysamudra@gmail.com",
    code: "ARSM",
    lineId: "arzikyy",
    position: "Sekretaris 2 (Executive Board)",
    division: "Sekretaris & Bendahara",
    role: "ADMIN",
  },
  {
    nim: "102022400228",
    name: "Syalfa Oktaviana Wijaya",
    originClass: "SI-48-07",
    phone: "085759534269",
    studentEmail: "syalfaoktawijaya@student.telkomuniversity.ac.id",
    personalEmail: "syalfaoktawijaya@gmail.com",
    code: "SYOW",
    lineId: "soktavianaw",
    position: "Bendahara (Executive Board)",
    division: "Sekretaris & Bendahara",
    role: "ADMIN",
  },
  {
    nim: "102022430009",
    name: "Maurellio Christopher Yonathan",
    originClass: "SI-48-02",
    phone: "08986162446",
    studentEmail: "maurelliochristopher@student.telkomuniversity.ac.id",
    personalEmail: "route.to.maurel@gmail.com",
    code: "MACY",
    lineId: "reach.rel",
    position: "Koor CnI (Super Admin)",
    division: "Compliance & Integrity",
    role: "SUPER_ADMIN",
  },
  {
    nim: "102022430017",
    name: "Adnan Dinata Hidaryan",
    originClass: "SI-48-10",
    phone: "081321540405",
    studentEmail: "adnandinatahldaryan@student.telkomuniversity.ac.id",
    personalEmail: "adnanhidryan@gmail.com",
    code: "ADDH",
    lineId: "adn_dinata",
    position: "Compliance & Integrity (Admin)",
    division: "Compliance & Integrity",
    role: "ADMIN",
  },
  {
    nim: "102022500126",
    name: "Irena Maulani",
    originClass: "SI-49-02",
    phone: "081384645467",
    studentEmail: "irenamaulani@student.telkomuniversity.ac.id",
    personalEmail: "irenamaulani0706@gmail.com",
    code: "IREM",
    lineId: "renilau",
    position: "Compliance & Integrity (Admin)",
    division: "Compliance & Integrity",
    role: "ADMIN",
  },
  {
    nim: "102022500040",
    name: "Tiara Candy Syaqila",
    originClass: "SI-49-04",
    phone: "081311392044",
    studentEmail: "tiaracandysyaqila@student.telkomuniversity.ac.id",
    personalEmail: "tcandysyaqila@gmail.com",
    code: "TICS",
    lineId: "timdy_",
    position: "Compliance & Integrity (Admin)",
    division: "Compliance & Integrity",
    role: "ADMIN",
  },
  {
    nim: "102022500251",
    name: "Raja Abhibhawa Putra",
    originClass: "SI-49-02",
    phone: "085695762407",
    studentEmail: "rajaabhibhawaputra@student.telkomuniversity.ac.id",
    personalEmail: "rajabhibhawa@gmail.com",
    code: "RAAP",
    lineId: "rja432",
    position: "Compliance & Integrity (Admin)",
    division: "Compliance & Integrity",
    role: "ADMIN",
  },
  {
    nim: "102022500273",
    name: "Intan Callysta",
    originClass: "SI-49-01",
    phone: "082117015653",
    studentEmail: "intancallysta@student.telkomuniversity.ac.id",
    personalEmail: "callysturn@gmail.com",
    code: "INTC",
    lineId: "intan.callysta",
    position: "Compliance & Integrity (Admin)",
    division: "Compliance & Integrity",
    role: "ADMIN",
  },
  {
    nim: "102022500122",
    name: "Adam Rizky Pratama",
    originClass: "SI-49-02",
    phone: "085782959500",
    studentEmail: "adamrizkyp@student.telkomuniversity.ac.id",
    personalEmail: "patas.bogors@gmail.com",
    code: "ADRP",
    lineId: "1204060516",
    position: "Compliance & Integrity (Admin)",
    division: "Compliance & Integrity",
    role: "ADMIN",
  },
  {
    nim: "102022400137",
    name: "I Putu Gede Aris Pramana Nugraha",
    originClass: "SI-48-03",
    phone: "082341074554",
    studentEmail: "iputugedearispramana@student.telkomuniversity.ac.id",
    personalEmail: "arispramana014@gmail.com",
    code: "IPGA",
    lineId: "arispramana03",
    position: "Koor CnM",
    division: "Creative & Multimedia",
    role: "ASPRAK",
  },
  {
    nim: "102022400370",
    name: "Nabila Nur Aini",
    originClass: "SI-48-03",
    phone: "082216295921",
    studentEmail: "nabilanuraini@student.telkomuniversity.ac.id",
    personalEmail: "nabilanuraini2501@gmail.com",
    code: "NNUA",
    lineId: "nblaini.",
    position: "Creative & Multimedia",
    division: "Creative & Multimedia",
    role: "ASPRAK",
  },
  {
    nim: "102022400083",
    name: "Hafizatul Khairani",
    originClass: "SI-48-03",
    phone: "082171838039",
    studentEmail: "hafizatulkhairani@student.telkomuniversity.ac.id",
    personalEmail: "hafizatulkhairani09@gmail.com",
    code: "HAFK",
    lineId: "hfzatlkrmi",
    position: "Creative & Multimedia",
    division: "Creative & Multimedia",
    role: "ASPRAK",
  },
  {
    nim: "102022400227",
    name: "Laula Fatimatusschifa",
    originClass: "SI-48-09",
    phone: "085786078985",
    studentEmail: "laulafatimatusschifa@student.telkomuniversity.ac.id",
    personalEmail: "Woofeeers@gmail.com",
    code: "LAUF",
    lineId: "laula",
    position: "Creative & Multimedia",
    division: "Creative & Multimedia",
    role: "ASPRAK",
  },
  {
    nim: "102022400352",
    name: "Dea Rizky Ananda",
    originClass: "SI-48-02",
    phone: "082216765938",
    studentEmail: "dearizkyananda@student.telkomuniversity.ac.id",
    personalEmail: "dearizkyananda1@gmail.com",
    code: "DERA",
    lineId: "06deananda",
    position: "Creative & Multimedia",
    division: "Creative & Multimedia",
    role: "ASPRAK",
  },
  {
    nim: "102022400160",
    name: "Rakean Ahmad Zayyid Ardhi",
    originClass: "SI-48-02",
    phone: "085219526767",
    studentEmail: "rakeanahmadzayyid@student.telkomuniversity.ac.id",
    personalEmail: "telu.rakeanahmad@gmail.com",
    code: "RAZA",
    lineId: "488redmi",
    position: "Creative & Multimedia",
    division: "Creative & Multimedia",
    role: "ASPRAK",
  },
  {
    nim: "102022430039",
    name: "MUHAMMAD NUR RIZQI",
    originClass: "SI-48-03",
    phone: "081249974371",
    studentEmail: "muhammadnurrizqi@student.telkomuniversity.ac.id",
    personalEmail: "rizqi.27560@gmail.com",
    code: "MUNR",
    lineId: "rq56",
    position: "Creative & Multimedia",
    division: "Creative & Multimedia",
    role: "ASPRAK",
  },
  {
    nim: "102022400302",
    name: "Figo Al Ghifari",
    originClass: "SI-48-10",
    phone: "087763072400",
    studentEmail: "figoalghifari@student.telkomuniversity.ac.id",
    personalEmail: "figoalghifrii@gmail.com",
    code: "FIAG",
    lineId: "figoalghfrii",
    position: "Koor TnC",
    division: "Tech & Systems",
    role: "ASPRAK",
  },
  {
    nim: "102022500352",
    name: "Adam Fadhilah Zamzam",
    originClass: "SI-49-09",
    phone: "08986218601",
    studentEmail: "adamfadhilahz@student.telkomuniversity.ac.id",
    personalEmail: "adamzamzam571@gmail.com",
    code: "ADFZ",
    lineId: "zamzamop",
    position: "Tech & Systems",
    division: "Tech & Systems",
    role: "ASPRAK",
  },
  {
    nim: "102022400136",
    name: "arneta alifiana",
    originClass: "SI-48-09",
    phone: "082231430156",
    studentEmail: "arnetaalifiana@student.telkomuniversity.ac.id",
    personalEmail: "arnetaalifiana@gmail.com",
    code: "ARNA",
    lineId: "anachan2403",
    position: "Tech & Systems",
    division: "Tech & Systems",
    role: "ASPRAK",
  },
  {
    nim: "102022530072",
    name: "Azrian Muhammadin Hanif",
    originClass: "SI-49-06",
    phone: "081572749746",
    studentEmail: "azrianmuhammadin@student.telkomuniversity.ac.id",
    personalEmail: "azrianawan@gmail.com",
    code: "AZMH",
    lineId: "azrii-27",
    position: "Tech & Systems",
    division: "Tech & Systems",
    role: "ASPRAK",
  },
  {
    nim: "102022400045",
    name: "Mochammad Ja'far Ar-razi",
    originClass: "SI-48-09",
    phone: "085813416707",
    studentEmail: "mochammadjaferarrazi@student.telkomuniversity.ac.id",
    personalEmail: "jafar33886@gmail.com",
    code: "MJFA",
    lineId: "jafararrazi",
    position: "Tech & Systems",
    division: "Tech & Systems",
    role: "ASPRAK",
  },
  {
    nim: "102022400250",
    name: "Alifia Ryana Saputri",
    originClass: "SI-48-INT",
    phone: "085651364493",
    studentEmail: "alifiaryanasaputri@student.telkomuniversity.ac.id",
    personalEmail: "alifiaryaas@gmail.com",
    code: "ALRS",
    lineId: "alifiaarss",
    position: "Tech & Systems",
    division: "Tech & Systems",
    role: "ASPRAK",
  },
  {
    nim: "102022400082",
    name: "Faatin Anandhiyaa Aufaa",
    originClass: "SI-48-01",
    phone: "0895422909557",
    studentEmail: "faatinanandhiyaa@student.telkomuniversity.ac.id",
    personalEmail: "fatinanandhia28@gmail.com",
    code: "FAAA",
    lineId: "tinpatinn",
    position: "Tech & Systems",
    division: "Tech & Systems",
    role: "ASPRAK",
  },
  {
    nim: "102022400339",
    name: "Aisyah Tiana Syifa",
    originClass: "SI-48-01",
    phone: "082319001425",
    studentEmail: "aisyahtianasyifa@student.telkomuniversity.ac.id",
    personalEmail: "aisyahtiana@gmail.com",
    code: "AITS",
    lineId: "syaatn",
    position: "Tech & Systems",
    division: "Tech & Systems",
    role: "ASPRAK",
  },
  {
    nim: "102022430036",
    name: "Muhammad Daffa Izzati",
    originClass: "SI-48-02",
    phone: "088238715345",
    studentEmail: "muhammaddaffaizzati@student.telkomuniversity.ac.id",
    personalEmail: "m.daffaizzati@gmail.com",
    code: "MUDI",
    lineId: "dizzisdapa",
    position: "Koor MD",
    division: "Module Development",
    role: "ASPRAK",
  },
  {
    nim: "102022400321",
    name: "Dinar Fadillatunnisa",
    originClass: "SI-48-04",
    phone: "082246732977",
    studentEmail: "dinarfadillatunnisa@student.telkomuniversity.ac.id",
    personalEmail: "dinarfdtlnisa@gmail.com",
    code: "DINF",
    lineId: "dinarfdtlnisa",
    position: "Module Development",
    division: "Module Development",
    role: "ASPRAK",
  },
  {
    nim: "102022430028",
    name: "Dewinda Salsabila Putri Haidir",
    originClass: "SI-48-09",
    phone: "081245376324",
    studentEmail: "dewindasalsabila@student.telkomuniversity.ac.id",
    personalEmail: "dewindasalsabila9@gmail.com",
    code: "DSPH",
    lineId: "dewinda.sph",
    position: "Module Development",
    division: "Module Development",
    role: "ASPRAK",
  },
  {
    nim: "102022430030",
    name: "Jabriel Bamasena Javier Rahardjanto",
    originClass: "SI-48-03",
    phone: "081325332561",
    studentEmail: "jabrielbamasena@student.telkomuniversity.ac.id",
    personalEmail: "jabrielbams@gmail.com",
    code: "JBJR",
    lineId: "jb1512",
    position: "Module Development",
    division: "Module Development",
    role: "ASPRAK",
  },
  {
    nim: "102022400163",
    name: "Mayhesa Rachmadliharja",
    originClass: "SI-48-07",
    phone: "081280777806",
    studentEmail: "mayhesarachmadliharja@student.telkomuniversity.ac.id",
    personalEmail: "mayhesa.r@gmail.com",
    code: "MAYR",
    lineId: "mayhesa.r",
    position: "Module Development",
    division: "Module Development",
    role: "ASPRAK",
  },
  {
    nim: "102022400092",
    name: "Muhammad Haqi Aqilla",
    originClass: "SI-48-07",
    phone: "081315168050",
    studentEmail: "muhammadhaqiaqilla@student.telkomuniversity.ac.id",
    personalEmail: "afraidhaqi@gmail.com",
    code: "MUHA",
    lineId: "haqilbau",
    position: "Module Development",
    division: "Module Development",
    role: "ASPRAK",
  },
];

/**
 * Helper mencari asisten berdasarkan Kode
 */
export function getAssistantByCode(code: string): AssistantProfile | undefined {
  const normalized = code.trim().toUpperCase();
  return ALPRO_ASSISTANTS.find((a) => a.code === normalized);
}

/**
 * Helper mencari asisten berdasarkan NIM
 */
export function getAssistantByNim(nim: string): AssistantProfile | undefined {
  return ALPRO_ASSISTANTS.find((a) => a.nim === nim.trim());
}

/**
 * Daftar Divisi & Koordinator
 */
export const ALPRO_DIVISIONS = [
  {
    id: "koor",
    name: "Koordinator Asisten (Korprak)",
    koorCode: "DEVO",
    koorName: "Devin Octavian",
    description: "Memimpin seluruh operasional praktikum Algoritma & Pemrograman serta koordinasi dengan dosen pengampu.",
  },
  {
    id: "sekben",
    name: "Sekretaris & Bendahara (BPH)",
    koorCode: "GRGS",
    koorName: "Gracia Gebriella Sianturi",
    description: "Administrasi modul, surat perizinan praktikan, kas laboratorium, dan rekapitulasi data asisten.",
  },
  {
    id: "cni",
    name: "Compliance & Integrity (Komdis)",
    koorCode: "MACY",
    koorName: "Maurellio Christopher Yonathan",
    description: "Penegakan tata tertib praktikum, investigasi keterlambatan, sanksi pelanggaran kode etik, dan dispensasi.",
  },
  {
    id: "cnm",
    name: "Creative & Multimedia (CnM)",
    koorCode: "IPGA",
    koorName: "I Putu Gede Aris Pramana Nugraha",
    description: "Desain visual modul, infografis tata tertib, dokumentasi media laboratorium, dan branding lab.",
  },
  {
    id: "tnc",
    name: "Tech & Systems (TnC)",
    koorCode: "FIAG",
    koorName: "Figo Al Ghifari",
    description: "Infrastruktur server lab, jaringan workstation, otomasi grading, dan integrasi Moodle LMS.",
  },
  {
    id: "md",
    name: "Module Development (MD)",
    koorCode: "MUDI",
    koorName: "Muhammad Daffa Izzati",
    description: "Penyusunan materi modul praktikum, problem set kuis, studi kasus guided, dan soal ujian praktikum.",
  },
];

/**
 * Cek apakah asisten termasuk Executive Board (Koordinator, Sekretaris & Bendahara)
 */
export function isExecutiveBoard(codeOrNim: string): boolean {
  const asst = getAssistantByCode(codeOrNim) || getAssistantByNim(codeOrNim);
  if (!asst) return false;
  return asst.division === "Koordinator" || asst.division === "Sekretaris & Bendahara";
}

/**
 * Cek apakah asisten termasuk Compliance & Integrity (CnI / Komdis)
 */
export function isComplianceAndIntegrity(codeOrNim: string): boolean {
  const asst = getAssistantByCode(codeOrNim) || getAssistantByNim(codeOrNim);
  if (!asst) return false;
  return asst.division === "Compliance & Integrity";
}

/**
 * Level Hak Akses Resmi:
 * - "SUPER_ADMIN" : MACY & DEVO (Super Admin dengan otoritas tertinggi)
 * - "ADMIN"       : Anggota Executive Board & Compliance and Integrity
 * - "ASPRAK"      : Asisten Praktikum Biasa (CnM, TnC, MD)
 */
export function getAssistantAccessLevel(codeOrNim: string): AccessLevel {
  const normalized = codeOrNim.trim().toUpperCase();
  if (
    normalized === "MACY" ||
    normalized === "102022430009" ||
    normalized === "DEVO" ||
    normalized === "102022430024"
  ) {
    return "SUPER_ADMIN";
  }
  const asst = getAssistantByCode(normalized) || getAssistantByNim(normalized);
  if (!asst) return "ASPRAK";
  if (asst.code === "MACY" || asst.code === "DEVO" || asst.role === "SUPER_ADMIN") {
    return "SUPER_ADMIN";
  }
  if (isExecutiveBoard(asst.code) || isComplianceAndIntegrity(asst.code)) {
    return "ADMIN";
  }
  return "ASPRAK";
}

/**
 * Aturan Sandi Sesuai Ketentuan Resmi:
 * 1. MACY (Super Admin)                                : MACY194545
 * 2. DEVO (Super Admin)                                : DEVOADMINR1
 * 3. ADMIN (Executive Board & Compliance and Integrity): ${KODEASISTEN}ADMINR1
 * 4. AKUN BIASA (CnM, TnC, MD)                         : ${KODEASISTEN}ALPRO123
 */
export function getExpectedPassword(codeOrNim: string): string {
  const normalized = codeOrNim.trim().toUpperCase();
  const asst = getAssistantByCode(normalized) || getAssistantByNim(normalized);
  const code = asst ? asst.code : normalized;

  if (code === "MACY") {
    return "MACY194545";
  }
  if (code === "DEVO") {
    return "DEVOADMINR1";
  }
  const level = getAssistantAccessLevel(code);
  if (level === "ADMIN" || level === "SUPER_ADMIN" || level === "ADMIN_BESAR") {
    return `${code}ADMINR1`;
  }
  return `${code}ALPRO123`;
}
