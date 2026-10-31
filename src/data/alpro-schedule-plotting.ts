/**
 * JADWAL & PLOTTINGAN RESMI PRAKTIKUM ALGORITMA DAN PEMROGRAMAN 2026/2027
 * Enterprise Data Management (EDM) Laboratory - Telkom University
 *
 * Diperbarui berdasarkan SK Plotting Praktikum Alpro 26/27:
 * - 15 Shift Praktikum (Senin s.d. Sabtu)
 * - Plotting Mahasiswa per Grup (A s.d. G) dan Asisten Penanggung Jawab
 */

export interface ShiftSchedule {
  shiftNumber: number;
  classCode: string;
  className: string;
  day: "Senin" | "Selasa" | "Rabu" | "Kamis" | "Jumat" | "Sabtu";
  dayIndex: number; // 1: Senin, 2: Selasa, ..., 6: Sabtu, 0: Minggu
  startTime: string; // "07:30"
  endTime: string;   // "09:30"
  timeDisplay: string; // "07.30 - 09.30"
  room: string;
  totalGroups: number;
  color: {
    bgLight: string;
    borderLight: string;
    textLight: string;
    bgDark: string;
    borderDark: string;
    badge: string;
  };
}

export interface StudentPlotting {
  nim: string;
  name: string;
  classCode: string;
  className: string;
  assistantCode: string;
  group: "A" | "B" | "C" | "D" | "E" | "F" | "G";
}

export interface ShiftPlottingSummary {
  shiftNumber: number;
  className: string;
  classCode: string;
  assistants: {
    group: "A" | "B" | "C" | "D" | "E" | "F" | "G";
    assistantCode: string;
    studentCount: number;
  }[];
  students: StudentPlotting[];
  isFinalized: boolean;
}

// 1. DAFTAR 15 SHIFT RESMI SESUAI JADWAL PRAKTIKUM ALPRO 26/27 (Image 1)
export const ALPRO_15_SHIFTS: ShiftSchedule[] = [
  // SENIN
  {
    shiftNumber: 1,
    classCode: "SI5012",
    className: "SI-50-12",
    day: "Senin",
    dayIndex: 1,
    startTime: "07:30",
    endTime: "09:30",
    timeDisplay: "07.30 - 09.30",
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
    totalGroups: 7,
    color: {
      bgLight: "bg-blue-100/90",
      borderLight: "border-blue-300",
      textLight: "text-blue-900",
      bgDark: "dark:bg-blue-950/70",
      borderDark: "dark:border-blue-800",
      badge: "bg-blue-500 text-white",
    },
  },
  {
    shiftNumber: 2,
    classCode: "SI5002",
    className: "SI-50-02",
    day: "Senin",
    dayIndex: 1,
    startTime: "10:30",
    endTime: "12:30",
    timeDisplay: "10.30 - 12.30",
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
    totalGroups: 7,
    color: {
      bgLight: "bg-rose-200/90",
      borderLight: "border-rose-300",
      textLight: "text-rose-950",
      bgDark: "dark:bg-rose-950/70",
      borderDark: "dark:border-rose-800",
      badge: "bg-rose-600 text-white",
    },
  },
  {
    shiftNumber: 3,
    classCode: "SI5011",
    className: "SI-50-11",
    day: "Senin",
    dayIndex: 1,
    startTime: "14:30",
    endTime: "16:30",
    timeDisplay: "14.30 - 16.30",
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
    totalGroups: 7,
    color: {
      bgLight: "bg-rose-100/90",
      borderLight: "border-rose-300",
      textLight: "text-rose-900",
      bgDark: "dark:bg-rose-950/50",
      borderDark: "dark:border-rose-900",
      badge: "bg-rose-500 text-white",
    },
  },

  // SELASA
  {
    shiftNumber: 4,
    classCode: "SI5004",
    className: "SI-50-04",
    day: "Selasa",
    dayIndex: 2,
    startTime: "07:30",
    endTime: "09:30",
    timeDisplay: "07.30 - 09.30",
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
    totalGroups: 7,
    color: {
      bgLight: "bg-teal-100/90",
      borderLight: "border-teal-300",
      textLight: "text-teal-950",
      bgDark: "dark:bg-teal-950/70",
      borderDark: "dark:border-teal-800",
      badge: "bg-teal-600 text-white",
    },
  },
  {
    shiftNumber: 5,
    classCode: "SI5009",
    className: "SI-50-09",
    day: "Selasa",
    dayIndex: 2,
    startTime: "10:30",
    endTime: "12:30",
    timeDisplay: "10.30 - 12.30",
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
    totalGroups: 7,
    color: {
      bgLight: "bg-teal-100/90",
      borderLight: "border-teal-300",
      textLight: "text-teal-950",
      bgDark: "dark:bg-teal-950/70",
      borderDark: "dark:border-teal-800",
      badge: "bg-teal-600 text-white",
    },
  },
  {
    shiftNumber: 6,
    classCode: "SI5010",
    className: "SI-50-10",
    day: "Selasa",
    dayIndex: 2,
    startTime: "14:30",
    endTime: "16:30",
    timeDisplay: "14.30 - 16.30",
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
    totalGroups: 7,
    color: {
      bgLight: "bg-amber-100/90",
      borderLight: "border-amber-300",
      textLight: "text-amber-950",
      bgDark: "dark:bg-amber-950/70",
      borderDark: "dark:border-amber-800",
      badge: "bg-amber-600 text-white",
    },
  },

  // RABU
  {
    shiftNumber: 7,
    classCode: "SI5013",
    className: "SI-50-13",
    day: "Rabu",
    dayIndex: 3,
    startTime: "09:30",
    endTime: "11:30",
    timeDisplay: "09.30 - 11.30",
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
    totalGroups: 7,
    color: {
      bgLight: "bg-emerald-100/90",
      borderLight: "border-emerald-300",
      textLight: "text-emerald-950",
      bgDark: "dark:bg-emerald-950/70",
      borderDark: "dark:border-emerald-800",
      badge: "bg-emerald-600 text-white",
    },
  },
  {
    shiftNumber: 8,
    classCode: "SI5005",
    className: "SI-50-05",
    day: "Rabu",
    dayIndex: 3,
    startTime: "13:30",
    endTime: "15:30",
    timeDisplay: "13.30 - 15.30",
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
    totalGroups: 7,
    color: {
      bgLight: "bg-orange-200/90",
      borderLight: "border-orange-300",
      textLight: "text-orange-950",
      bgDark: "dark:bg-orange-950/70",
      borderDark: "dark:border-orange-800",
      badge: "bg-orange-600 text-white",
    },
  },

  // KAMIS
  {
    shiftNumber: 9,
    classCode: "SI5003",
    className: "SI-50-03",
    day: "Kamis",
    dayIndex: 4,
    startTime: "07:30",
    endTime: "09:30",
    timeDisplay: "07.30 - 09.30",
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
    totalGroups: 7,
    color: {
      bgLight: "bg-rose-200/90",
      borderLight: "border-rose-300",
      textLight: "text-rose-950",
      bgDark: "dark:bg-rose-950/70",
      borderDark: "dark:border-rose-800",
      badge: "bg-rose-600 text-white",
    },
  },
  {
    shiftNumber: 10,
    classCode: "SI5006",
    className: "SI-50-06",
    day: "Kamis",
    dayIndex: 4,
    startTime: "14:30",
    endTime: "16:30",
    timeDisplay: "14.30 - 16.30",
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
    totalGroups: 7,
    color: {
      bgLight: "bg-purple-100/90",
      borderLight: "border-purple-300",
      textLight: "text-purple-950",
      bgDark: "dark:bg-purple-950/70",
      borderDark: "dark:border-purple-800",
      badge: "bg-purple-600 text-white",
    },
  },

  // JUMAT
  {
    shiftNumber: 11,
    classCode: "SI5001",
    className: "SI-50-01",
    day: "Jumat",
    dayIndex: 5,
    startTime: "07:30",
    endTime: "09:30",
    timeDisplay: "07.30 - 09.30",
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
    totalGroups: 7,
    color: {
      bgLight: "bg-sky-200/90",
      borderLight: "border-sky-300",
      textLight: "text-sky-950",
      bgDark: "dark:bg-sky-950/70",
      borderDark: "dark:border-sky-800",
      badge: "bg-sky-600 text-white",
    },
  },
  {
    shiftNumber: 12,
    classCode: "SI5008",
    className: "SI-50-08",
    day: "Jumat",
    dayIndex: 5,
    startTime: "13:30",
    endTime: "15:30",
    timeDisplay: "13.30 - 15.30",
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
    totalGroups: 7,
    color: {
      bgLight: "bg-amber-200/90",
      borderLight: "border-amber-300",
      textLight: "text-amber-950",
      bgDark: "dark:bg-amber-950/70",
      borderDark: "dark:border-amber-800",
      badge: "bg-amber-600 text-white",
    },
  },

  // SABTU
  {
    shiftNumber: 13,
    classCode: "SI50INT",
    className: "SI-50-INT",
    day: "Sabtu",
    dayIndex: 6,
    startTime: "07:30",
    endTime: "09:30",
    timeDisplay: "07.30 - 09.30",
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
    totalGroups: 7,
    color: {
      bgLight: "bg-blue-200/90",
      borderLight: "border-blue-300",
      textLight: "text-blue-950",
      bgDark: "dark:bg-blue-950/70",
      borderDark: "dark:border-blue-800",
      badge: "bg-blue-600 text-white",
    },
  },
  {
    shiftNumber: 14,
    classCode: "SI5007",
    className: "SI-50-07",
    day: "Sabtu",
    dayIndex: 6,
    startTime: "10:30",
    endTime: "12:30",
    timeDisplay: "10.30 - 12.30",
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
    totalGroups: 7,
    color: {
      bgLight: "bg-slate-200/90",
      borderLight: "border-slate-300",
      textLight: "text-slate-900",
      bgDark: "dark:bg-neutral-800",
      borderDark: "dark:border-neutral-700",
      badge: "bg-slate-600 text-white",
    },
  },
  {
    shiftNumber: 15,
    classCode: "SI5014",
    className: "SI-50-14",
    day: "Sabtu",
    dayIndex: 6,
    startTime: "14:30",
    endTime: "16:30",
    timeDisplay: "14.30 - 16.30",
    room: "Lab EDM 1 (Gd. Pelangi Lt. 2)",
    totalGroups: 7,
    color: {
      bgLight: "bg-rose-300/80",
      borderLight: "border-rose-400",
      textLight: "text-rose-950",
      bgDark: "dark:bg-rose-950/80",
      borderDark: "dark:border-rose-700",
      badge: "bg-rose-700 text-white",
    },
  },
];

// 2. DATA PLOTTING ASISTEN & MAHASISWA SHIFT 1 s.d. 4 (SESUAI GAMBAR 2, 3, 4, 5)
export const SHIFT_1_STUDENTS: StudentPlotting[] = [
  // GRUP A (ADDH)
  { nim: "102022400367", name: "RADITYA SYANDANA PRASETYO", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADDH", group: "A" },
  { nim: "102022600015", name: "YUDHA PRATAMA", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADDH", group: "A" },
  { nim: "102022600021", name: "KHALISHA NAYLA AKMAL", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADDH", group: "A" },
  { nim: "102022600041", name: "BRYAN GIVO ABDILUHUNG", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADDH", group: "A" },
  { nim: "102022600050", name: "NADYA FEBRYOLA", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADDH", group: "A" },
  { nim: "102022600081", name: "ALI RIDHO", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADDH", group: "A" },
  { nim: "102022600090", name: "TIARA AMALIDYA", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADDH", group: "A" },

  // GRUP B (IPGA)
  { nim: "102022600112", name: "AHMAD HUSEIN AL FARISY", classCode: "SI5012", className: "SI-50-12", assistantCode: "IPGA", group: "B" },
  { nim: "102022600114", name: "NAFISHA HAIFA LUTHFIAH", classCode: "SI5012", className: "SI-50-12", assistantCode: "IPGA", group: "B" },
  { nim: "102022600128", name: "ARKA YOHAN TRIOSLY", classCode: "SI5012", className: "SI-50-12", assistantCode: "IPGA", group: "B" },
  { nim: "102022600146", name: "DIEGO NAUFALINO CHANDRA", classCode: "SI5012", className: "SI-50-12", assistantCode: "IPGA", group: "B" },
  { nim: "102022600164", name: "ZAIDAN SYAUQI YUSUF SAPUTRA", classCode: "SI5012", className: "SI-50-12", assistantCode: "IPGA", group: "B" },
  { nim: "102022600168", name: "VANESSA SHALOM AVENTHA SUHARLY", classCode: "SI5012", className: "SI-50-12", assistantCode: "IPGA", group: "B" },

  // GRUP C (DERA)
  { nim: "102022600187", name: "DESTRA INDRA SETIAWAN", classCode: "SI5012", className: "SI-50-12", assistantCode: "DERA", group: "C" },
  { nim: "102022600201", name: "HAIFA NUR ROJABI UBAIDILLAH", classCode: "SI5012", className: "SI-50-12", assistantCode: "DERA", group: "C" },
  { nim: "102022600215", name: "MOCHAMMAD FADLI KAMALUDIN", classCode: "SI5012", className: "SI-50-12", assistantCode: "DERA", group: "C" },
  { nim: "102022600223", name: "NAILA SYAFIRA NUR SYABANI", classCode: "SI5012", className: "SI-50-12", assistantCode: "DERA", group: "C" },
  { nim: "102022600233", name: "ENGGAR ADITYA SANUSI", classCode: "SI5012", className: "SI-50-12", assistantCode: "DERA", group: "C" },
  { nim: "102022600250", name: "TRISTAN REMIEL NESIMNASI", classCode: "SI5012", className: "SI-50-12", assistantCode: "DERA", group: "C" },

  // GRUP D (FIAG)
  { nim: "102022600269", name: "JAHFAL DZIKRON ASHIDIK", classCode: "SI5012", className: "SI-50-12", assistantCode: "FIAG", group: "D" },
  { nim: "102022600272", name: "NAWAFA AHDELLA", classCode: "SI5012", className: "SI-50-12", assistantCode: "FIAG", group: "D" },
  { nim: "102022600287", name: "MUHAMMAD BILAL BACHTIAR", classCode: "SI5012", className: "SI-50-12", assistantCode: "FIAG", group: "D" },
  { nim: "102022600300", name: "PIJAR SURYA KELANA", classCode: "SI5012", className: "SI-50-12", assistantCode: "FIAG", group: "D" },
  { nim: "102022600321", name: "ISKANDAR", classCode: "SI5012", className: "SI-50-12", assistantCode: "FIAG", group: "D" },
  { nim: "102022600330", name: "THALITA MAULIDINA MULYASANDY", classCode: "SI5012", className: "SI-50-12", assistantCode: "FIAG", group: "D" },

  // GRUP E (ADFZ)
  { nim: "102022600338", name: "FAKHRI FATHURRAHMAN", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADFZ", group: "E" },
  { nim: "102022600358", name: "ELANG AVISENA", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADFZ", group: "E" },
  { nim: "102022600364", name: "HANINDA SALVADILLA", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADFZ", group: "E" },
  { nim: "102022600380", name: "SEVENT MIGELL SONDAKH", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADFZ", group: "E" },
  { nim: "102022600400", name: "FRIZLY OKTANIO CANDRA", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADFZ", group: "E" },
  { nim: "102022600415", name: "FAJRIYAH ZAHROTU SITA", classCode: "SI5012", className: "SI-50-12", assistantCode: "ADFZ", group: "E" },

  // GRUP F (AITS)
  { nim: "102022600417", name: "HIRZAN TAMMA RADITYA", classCode: "SI5012", className: "SI-50-12", assistantCode: "AITS", group: "F" },
  { nim: "102022600449", name: "SULTAN GIRI MAULANA PUTRA PAMUNGKAS", classCode: "SI5012", className: "SI-50-12", assistantCode: "AITS", group: "F" },
  { nim: "102022600464", name: "ANDI EVANSYAH ZAFALDI", classCode: "SI5012", className: "SI-50-12", assistantCode: "AITS", group: "F" },
  { nim: "102022600472", name: "PHELIZA AUDY ARLYN", classCode: "SI5012", className: "SI-50-12", assistantCode: "AITS", group: "F" },
  { nim: "102022600478", name: "MUHAMMAD GHALY ABQARY", classCode: "SI5012", className: "SI-50-12", assistantCode: "AITS", group: "F" },
  { nim: "102022600508", name: "RIZKY PUTRA ALFARIJI", classCode: "SI5012", className: "SI-50-12", assistantCode: "AITS", group: "F" },

  // GRUP G (MUDI)
  { nim: "102022630008", name: "ANDREI KURNIA ARSHAVIN", classCode: "SI5012", className: "SI-50-12", assistantCode: "MUDI", group: "G" },
  { nim: "102022630032", name: "I PUTU RESTU CAHAYA PUTRA", classCode: "SI5012", className: "SI-50-12", assistantCode: "MUDI", group: "G" },
  { nim: "102022630045", name: "AHMAD FADHIL AL HADY", classCode: "SI5012", className: "SI-50-12", assistantCode: "MUDI", group: "G" },
];

export const SHIFT_2_STUDENTS: StudentPlotting[] = [
  // GRUP A (GRGS)
  { nim: "102022600002", name: "GEBRI FAIRUZ CHALISA", classCode: "SI5002", className: "SI-50-02", assistantCode: "GRGS", group: "A" },
  { nim: "102022600022", name: "ADILUL HAKIMI", classCode: "SI5002", className: "SI-50-02", assistantCode: "GRGS", group: "A" },
  { nim: "102022600029", name: "FARZANA GHANIA PUTRI", classCode: "SI5002", className: "SI-50-02", assistantCode: "GRGS", group: "A" },
  { nim: "102022600048", name: "ALIF RAKHANAYA ARJUNA", classCode: "SI5002", className: "SI-50-02", assistantCode: "GRGS", group: "A" },
  { nim: "102022600065", name: "LABRIA MUTIARA SARI", classCode: "SI5002", className: "SI-50-02", assistantCode: "GRGS", group: "A" },
  { nim: "102022600066", name: "M ATHALLAH FARENTINO GHAZALI", classCode: "SI5002", className: "SI-50-02", assistantCode: "GRGS", group: "A" },
  { nim: "102022600089", name: "KETUT DHARMA ARTHA WARASMARA", classCode: "SI5002", className: "SI-50-02", assistantCode: "GRGS", group: "A" },

  // GRUP B (ADFZ)
  { nim: "102022600098", name: "ADELIA AMANDA PUTRI F", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADFZ", group: "B" },
  { nim: "102022600133", name: "MUHAMMAD RASYAH ALVIAN", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADFZ", group: "B" },
  { nim: "102022600138", name: "AYASHA ALIKA", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADFZ", group: "B" },
  { nim: "102022600151", name: "NABIL AHSAN BARIQI BIN MOHAMMAD ZULKARNAIN", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADFZ", group: "B" },
  { nim: "102022600170", name: "AHMAD RAIHAN IBRAHIM", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADFZ", group: "B" },
  { nim: "102022600181", name: "RAISA DINI FAZILA", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADFZ", group: "B" },

  // GRUP C (INTC)
  { nim: "102022600192", name: "MUHAMMAD IHSAN JAMALULLAIL", classCode: "SI5002", className: "SI-50-02", assistantCode: "INTC", group: "C" },
  { nim: "102022600239", name: "MUHAMMAD LABIB BADRU ZAMAN", classCode: "SI5002", className: "SI-50-02", assistantCode: "INTC", group: "C" },
  { nim: "102022600256", name: "EVAN HAFIZ TRIYANA", classCode: "SI5002", className: "SI-50-02", assistantCode: "INTC", group: "C" },
  { nim: "102022600274", name: "MUHAMMAD ADLY PERMANA", classCode: "SI5002", className: "SI-50-02", assistantCode: "INTC", group: "C" },
  { nim: "102022600286", name: "DAANIA RAMADHANI", classCode: "SI5002", className: "SI-50-02", assistantCode: "INTC", group: "C" },

  // GRUP D (DEVO)
  { nim: "102022600291", name: "FADLAN MUHAMMAD RIDWAN RIADI", classCode: "SI5002", className: "SI-50-02", assistantCode: "DEVO", group: "D" },
  { nim: "102022600304", name: "MUHAMMAD ATHALLA ARRAFFI", classCode: "SI5002", className: "SI-50-02", assistantCode: "DEVO", group: "D" },
  { nim: "102022600325", name: "MUHAMMAD NAZHIF DHANISWARA", classCode: "SI5002", className: "SI-50-02", assistantCode: "DEVO", group: "D" },
  { nim: "102022600339", name: "KAYLA TSABITA IZZATI PUTRI", classCode: "SI5002", className: "SI-50-02", assistantCode: "DEVO", group: "D" },
  { nim: "102022600346", name: "ERZA TRI APRILIAN", classCode: "SI5002", className: "SI-50-02", assistantCode: "DEVO", group: "D" },

  // GRUP E (ADDH)
  { nim: "102022600368", name: "M. KHAFIDHIN MUFTI ALI", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADDH", group: "E" },
  { nim: "102022600384", name: "KELVIN SURYA DINATA", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADDH", group: "E" },
  { nim: "102022600406", name: "RAFAEL CHRISTIAN WIBOWO", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADDH", group: "E" },
  { nim: "102022600421", name: "MUHAMMAD WISNU HARIS", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADDH", group: "E" },
  { nim: "102022600432", name: "ASTI ASH SHIDQY", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADDH", group: "E" },
  { nim: "102022600439", name: "I NYOMAN DIKA KURNIAWAN", classCode: "SI5002", className: "SI-50-02", assistantCode: "ADDH", group: "E" },

  // GRUP F (FIAG)
  { nim: "102022600453", name: "VINCENT JOVAN REANDE", classCode: "SI5002", className: "SI-50-02", assistantCode: "FIAG", group: "F" },
  { nim: "102022600467", name: "ABDI KUSUMA NATA", classCode: "SI5002", className: "SI-50-02", assistantCode: "FIAG", group: "F" },
  { nim: "102022600487", name: "AURELIA AGATHA TIKU", classCode: "SI5002", className: "SI-50-02", assistantCode: "FIAG", group: "F" },
  { nim: "102022600512", name: "SEMBIRING SAMUEL ELIESER", classCode: "SI5002", className: "SI-50-02", assistantCode: "FIAG", group: "F" },
  { nim: "102022630002", name: "RAKA TRI ANGGARA", classCode: "SI5002", className: "SI-50-02", assistantCode: "FIAG", group: "F" },
  { nim: "102022630010", name: "FAREL RAHMADIANSYAH", classCode: "SI5002", className: "SI-50-02", assistantCode: "FIAG", group: "F" },
  { nim: "102022630014", name: "HASNA NUR SABRINA", classCode: "SI5002", className: "SI-50-02", assistantCode: "FIAG", group: "F" },

  // GRUP G (DINF)
  { nim: "102022630015", name: "ARIZQI MUHAMMAD AKBAR", classCode: "SI5002", className: "SI-50-02", assistantCode: "DINF", group: "G" },
  { nim: "102022630017", name: "SITI AISYAH NURFADILLAH", classCode: "SI5002", className: "SI-50-02", assistantCode: "DINF", group: "G" },
  { nim: "102022630029", name: "SIVA AWRELYA MULANDARI", classCode: "SI5002", className: "SI-50-02", assistantCode: "DINF", group: "G" },
  { nim: "102022630043", name: "BRYAN GERRALD LIESTIANTO", classCode: "SI5002", className: "SI-50-02", assistantCode: "DINF", group: "G" },
  { nim: "102022630046", name: "SULTAN ALIFSYAH NAPU", classCode: "SI5002", className: "SI-50-02", assistantCode: "DINF", group: "G" },
];

export const SHIFT_3_STUDENTS: StudentPlotting[] = [
  // GRUP A (TICS)
  { nim: "102022600014", name: "ABELL PEDROSA SEMBIRING", classCode: "SI5011", className: "SI-50-11", assistantCode: "TICS", group: "A" },
  { nim: "102022600019", name: "ADINA RAISYA CLARESTA", classCode: "SI5011", className: "SI-50-11", assistantCode: "TICS", group: "A" },
  { nim: "102022600037", name: "SAYYID MUHAMMAD HASAN", classCode: "SI5011", className: "SI-50-11", assistantCode: "TICS", group: "A" },
  { nim: "102022600046", name: "QUEEN LATIFA YASMIN", classCode: "SI5011", className: "SI-50-11", assistantCode: "TICS", group: "A" },
  { nim: "102022600058", name: "BRYAN VIANDER", classCode: "SI5011", className: "SI-50-11", assistantCode: "TICS", group: "A" },

  // GRUP B (LAUF)
  { nim: "102022600077", name: "MUHAMMAD FAREL HARDISATYA", classCode: "SI5011", className: "SI-50-11", assistantCode: "LAUF", group: "B" },
  { nim: "102022600088", name: "AZKA FADILLAH RIZKI PUTRI", classCode: "SI5011", className: "SI-50-11", assistantCode: "LAUF", group: "B" },
  { nim: "102022600111", name: "MUHAMMAD RADITYA PRATAMA", classCode: "SI5011", className: "SI-50-11", assistantCode: "LAUF", group: "B" },
  { nim: "102022600113", name: "AISYAH WAHYUNINGSIH", classCode: "SI5011", className: "SI-50-11", assistantCode: "LAUF", group: "B" },
  { nim: "102022600127", name: "DANI SETYO GUSTOMO", classCode: "SI5011", className: "SI-50-11", assistantCode: "LAUF", group: "B" },
  { nim: "102022600145", name: "MUHAMMAD MYKO ADITYO", classCode: "SI5011", className: "SI-50-11", assistantCode: "LAUF", group: "B" },
  { nim: "102022600162", name: "SULTHAN EL HAKIM", classCode: "SI5011", className: "SI-50-11", assistantCode: "LAUF", group: "B" },

  // GRUP C (ALRS)
  { nim: "102022600166", name: "ANINDYA HASYA SETIAWAN", classCode: "SI5011", className: "SI-50-11", assistantCode: "ALRS", group: "C" },
  { nim: "102022600186", name: "HAFIZD JAALNI AKBAR", classCode: "SI5011", className: "SI-50-11", assistantCode: "ALRS", group: "C" },
  { nim: "102022600209", name: "ALFI AZHAR ALMASHOEM", classCode: "SI5011", className: "SI-50-11", assistantCode: "ALRS", group: "C" },
  { nim: "102022600222", name: "AJENG BYLQIS SORGAWI", classCode: "SI5011", className: "SI-50-11", assistantCode: "ALRS", group: "C" },
  { nim: "102022600232", name: "SALMAN HAFIDZ RAMDHANI", classCode: "SI5011", className: "SI-50-11", assistantCode: "ALRS", group: "C" },
  { nim: "102022600249", name: "ABEL JANUAR GIOVANI", classCode: "SI5011", className: "SI-50-11", assistantCode: "ALRS", group: "C" },

  // GRUP D (ADFZ)
  { nim: "102022600266", name: "DWI NOVITA SUCIATI", classCode: "SI5011", className: "SI-50-11", assistantCode: "ADFZ", group: "D" },
  { nim: "102022600299", name: "MUHAMMAD KAYSAN NURFADILAH", classCode: "SI5011", className: "SI-50-11", assistantCode: "ADFZ", group: "D" },
  { nim: "102022600319", name: "BIMO SATRIO UTOMO", classCode: "SI5011", className: "SI-50-11", assistantCode: "ADFZ", group: "D" },
  { nim: "102022600320", name: "FARAH HILMIY ZHAAFIRA", classCode: "SI5011", className: "SI-50-11", assistantCode: "ADFZ", group: "D" },
  { nim: "102022600336", name: "MUHAMMAD FATHURAKHMAN ARASY", classCode: "SI5011", className: "SI-50-11", assistantCode: "ADFZ", group: "D" },
  { nim: "102022600356", name: "DANIEL SIMARMATA", classCode: "SI5011", className: "SI-50-11", assistantCode: "ADFZ", group: "D" },

  // GRUP E (MAYR)
  { nim: "102022600363", name: "HANUN KEMALA DIYANTI", classCode: "SI5011", className: "SI-50-11", assistantCode: "MAYR", group: "E" },
  { nim: "102022600378", name: "SYAHRIAL AZMI CHABIB", classCode: "SI5011", className: "SI-50-11", assistantCode: "MAYR", group: "E" },
  { nim: "102022600397", name: "GANAR REY SITORUS", classCode: "SI5011", className: "SI-50-11", assistantCode: "MAYR", group: "E" },
  { nim: "102022600402", name: "CHERIE FAYOLA", classCode: "SI5011", className: "SI-50-11", assistantCode: "MAYR", group: "E" },
  { nim: "102022600414", name: "MUHAMMAD DAFFA FAHREZY", classCode: "SI5011", className: "SI-50-11", assistantCode: "MAYR", group: "E" },

  // GRUP F (MUHA)
  { nim: "102022600434", name: "MUHAMMAD RADITYA KAMAL", classCode: "SI5011", className: "SI-50-11", assistantCode: "MUHA", group: "F" },
  { nim: "102022600468", name: "NATANIA ZHAFIRA MASHURI", classCode: "SI5011", className: "SI-50-11", assistantCode: "MUHA", group: "F" },
  { nim: "102022600477", name: "MUHAMMAD NABIL ISDAN HASAN", classCode: "SI5011", className: "SI-50-11", assistantCode: "MUHA", group: "F" },
  { nim: "102022600490", name: "RAFLY AL -FAZAN AIRIL AKBAR", classCode: "SI5011", className: "SI-50-11", assistantCode: "MUHA", group: "F" },
  { nim: "102022600507", name: "SATRIA NOVA RISKY EKA PUTRA", classCode: "SI5011", className: "SI-50-11", assistantCode: "MUHA", group: "F" },

  // GRUP G (SYOW)
  { nim: "102022630013", name: "SYARIFAH ALYA ALHASNI", classCode: "SI5011", className: "SI-50-11", assistantCode: "SYOW", group: "G" },
  { nim: "102022630020", name: "HARIS ARDIAN", classCode: "SI5011", className: "SI-50-11", assistantCode: "SYOW", group: "G" },
  { nim: "102022630021", name: "MUHAMMAD HAFIZH AFKAR FADHIL PRIYAMBODO", classCode: "SI5011", className: "SI-50-11", assistantCode: "SYOW", group: "G" },
  { nim: "102022630034", name: "MUHAMMAD KHAIRUL RIDHO", classCode: "SI5011", className: "SI-50-11", assistantCode: "SYOW", group: "G" },
  { nim: "102022630036", name: "MUHAMMAD HAFIZH FARSYA SYAHPUTRA", classCode: "SI5011", className: "SI-50-11", assistantCode: "SYOW", group: "G" },
];

export const SHIFT_4_STUDENTS: StudentPlotting[] = [
  // GRUP A (MUDI)
  { nim: "102022600005", name: "TIARA MAYDA PANJAITAN", classCode: "SI5004", className: "SI-50-04", assistantCode: "MUDI", group: "A" },
  { nim: "102022600027", name: "FARIS ABDULLAH", classCode: "SI5004", className: "SI-50-04", assistantCode: "MUDI", group: "A" },
  { nim: "102022600035", name: "NAJLA GHASSANA ISMAELIA", classCode: "SI5004", className: "SI-50-04", assistantCode: "MUDI", group: "A" },
  { nim: "102022600051", name: "M. RAVEL PUTRA", classCode: "SI5004", className: "SI-50-04", assistantCode: "MUDI", group: "A" },
  { nim: "102022600068", name: "MUHAMMAD RAFI", classCode: "SI5004", className: "SI-50-04", assistantCode: "MUDI", group: "A" },
  { nim: "102022600076", name: "MYA PURNAMA SARI", classCode: "SI5004", className: "SI-50-04", assistantCode: "MUDI", group: "A" },
  { nim: "102022600095", name: "GIO ADITYA", classCode: "SI5004", className: "SI-50-04", assistantCode: "MUDI", group: "A" },

  // GRUP B (INTC)
  { nim: "102022600102", name: "DEVI JESSICA MANULLANG", classCode: "SI5004", className: "SI-50-04", assistantCode: "INTC", group: "B" },
  { nim: "102022600118", name: "ANDI MUHAMMAD RAFID ALYDRUS", classCode: "SI5004", className: "SI-50-04", assistantCode: "INTC", group: "B" },
  { nim: "102022600134", name: "MUHAMMAD SYAIFULLAH AL GHIFARI", classCode: "SI5004", className: "SI-50-04", assistantCode: "INTC", group: "B" },
  { nim: "102022600141", name: "CALLISTA FAIRUZ QUEENA", classCode: "SI5004", className: "SI-50-04", assistantCode: "INTC", group: "B" },
  { nim: "102022600154", name: "MIRZA AHNAF WIJANARKO", classCode: "SI5004", className: "SI-50-04", assistantCode: "INTC", group: "B" },

  // GRUP C (RAZA)
  { nim: "102022600172", name: "DARIS ATQIA", classCode: "SI5004", className: "SI-50-04", assistantCode: "RAZA", group: "C" },
  { nim: "102022600184", name: "LITA IMRAENI", classCode: "SI5004", className: "SI-50-04", assistantCode: "RAZA", group: "C" },
  { nim: "102022600197", name: "MUHAMMAD AR RAAFI FADHLIL ISKANDAR", classCode: "SI5004", className: "SI-50-04", assistantCode: "RAZA", group: "C" },
  { nim: "102022600211", name: "FREYA NAFIA QIANDRA", classCode: "SI5004", className: "SI-50-04", assistantCode: "RAZA", group: "C" },
  { nim: "102022600224", name: "AZRIAL RIZKY PRATAMA", classCode: "SI5004", className: "SI-50-04", assistantCode: "RAZA", group: "C" },

  // GRUP D (MJFA)
  { nim: "102022600241", name: "AHMAD SHOFIULLAH SHOLEHUDDIN", classCode: "SI5004", className: "SI-50-04", assistantCode: "MJFA", group: "D" },
  { nim: "102022600258", name: "MUHAMMAD HAFIZHURROHMAN", classCode: "SI5004", className: "SI-50-04", assistantCode: "MJFA", group: "D" },
  { nim: "102022600277", name: "ZIDANE RAMDHANI", classCode: "SI5004", className: "SI-50-04", assistantCode: "MJFA", group: "D" },
  { nim: "102022600312", name: "ADAM ZULFIKAR FATHURAHMAN", classCode: "SI5004", className: "SI-50-04", assistantCode: "MJFA", group: "D" },
  { nim: "102022600327", name: "FATWA FEBRIANSYAH PASARIB", classCode: "SI5004", className: "SI-50-04", assistantCode: "MJFA", group: "D" },

  // GRUP E (ARNA)
  { nim: "102022600342", name: "KAYLA RAHMA", classCode: "SI5004", className: "SI-50-04", assistantCode: "ARNA", group: "E" },
  { nim: "102022600370", name: "FARREL YOGA PRATAMA", classCode: "SI5004", className: "SI-50-04", assistantCode: "ARNA", group: "E" },
  { nim: "102022600383", name: "ISNA NI MATUL MASRUROH", classCode: "SI5004", className: "SI-50-04", assistantCode: "ARNA", group: "E" },
  { nim: "102022600388", name: "RENDYTYA PRATAMA DARMA", classCode: "SI5004", className: "SI-50-04", assistantCode: "ARNA", group: "E" },
  { nim: "102022600408", name: "RAMADHAN KANEDY", classCode: "SI5004", className: "SI-50-04", assistantCode: "ARNA", group: "E" },

  // GRUP F (MACY - Maurellio Christopher)
  { nim: "102022600423", name: "DAFFA HAFIZH FIRDAUS", classCode: "SI5004", className: "SI-50-04", assistantCode: "MACY", group: "F" },
  { nim: "102022600435", name: "GUSTI AYU PUTU EKA SHANTI", classCode: "SI5004", className: "SI-50-04", assistantCode: "MACY", group: "F" },
  { nim: "102022600442", name: "I KETUT SATYA WIRATAMA", classCode: "SI5004", className: "SI-50-04", assistantCode: "MACY", group: "F" },
  { nim: "102022600456", name: "MUHAMMAD IQBAL RAMADANY", classCode: "SI5004", className: "SI-50-04", assistantCode: "MACY", group: "F" },
  { nim: "102022600483", name: "MUHAMMAD AKRAM", classCode: "SI5004", className: "SI-50-04", assistantCode: "MACY", group: "F" },
  { nim: "102022600495", name: "ANINDHITA DEA SHAFIRA", classCode: "SI5004", className: "SI-50-04", assistantCode: "MACY", group: "F" },
  { nim: "102022600497", name: "FATHAN AZEEM BILHAQ GUNAWAN", classCode: "SI5004", className: "SI-50-04", assistantCode: "MACY", group: "F" },
  { nim: "102022600514", name: "NICO FEBRINO BAHARI", classCode: "SI5004", className: "SI-50-04", assistantCode: "MACY", group: "F" },

  // GRUP G (DSPH)
  { nim: "102022630003", name: "VICKY", classCode: "SI5004", className: "SI-50-04", assistantCode: "DSPH", group: "G" },
  { nim: "102022630018", name: "GENDHIS ASRINING GALIH", classCode: "SI5004", className: "SI-50-04", assistantCode: "DSPH", group: "G" },
  { nim: "102022630022", name: "MUHAMMAD DERRIL ALKHANSA", classCode: "SI5004", className: "SI-50-04", assistantCode: "DSPH", group: "G" },
  { nim: "102022630023", name: "KAILA LUNA ANANDITA", classCode: "SI5004", className: "SI-50-04", assistantCode: "DSPH", group: "G" },
  { nim: "102022630027", name: "RIFQI SYAFI'I WAHYU AL-HAQ", classCode: "SI5004", className: "SI-50-04", assistantCode: "DSPH", group: "G" },
  { nim: "102022630039", name: "YEHESKIEL SINURAYA", classCode: "SI5004", className: "SI-50-04", assistantCode: "DSPH", group: "G" },
];

// Map of finalized plottings for Shift 1 s.d. 4
export const ALL_SHIFT_PLOTTINGS: Record<number, ShiftPlottingSummary> = {
  1: {
    shiftNumber: 1,
    className: "SI-50-12",
    classCode: "SI5012",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "ADDH", studentCount: 7 },
      { group: "B", assistantCode: "IPGA", studentCount: 6 },
      { group: "C", assistantCode: "DERA", studentCount: 6 },
      { group: "D", assistantCode: "FIAG", studentCount: 6 },
      { group: "E", assistantCode: "ADFZ", studentCount: 6 },
      { group: "F", assistantCode: "AITS", studentCount: 6 },
      { group: "G", assistantCode: "MUDI", studentCount: 3 },
    ],
    students: SHIFT_1_STUDENTS,
  },
  2: {
    shiftNumber: 2,
    className: "SI-50-02",
    classCode: "SI5002",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "GRGS", studentCount: 7 },
      { group: "B", assistantCode: "ADFZ", studentCount: 6 },
      { group: "C", assistantCode: "INTC", studentCount: 5 },
      { group: "D", assistantCode: "DEVO", studentCount: 5 },
      { group: "E", assistantCode: "ADDH", studentCount: 6 },
      { group: "F", assistantCode: "FIAG", studentCount: 7 },
      { group: "G", assistantCode: "DINF", studentCount: 5 },
    ],
    students: SHIFT_2_STUDENTS,
  },
  3: {
    shiftNumber: 3,
    className: "SI-50-11",
    classCode: "SI5011",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "TICS", studentCount: 5 },
      { group: "B", assistantCode: "LAUF", studentCount: 7 },
      { group: "C", assistantCode: "ALRS", studentCount: 6 },
      { group: "D", assistantCode: "ADFZ", studentCount: 6 },
      { group: "E", assistantCode: "MAYR", studentCount: 5 },
      { group: "F", assistantCode: "MUHA", studentCount: 5 },
      { group: "G", assistantCode: "SYOW", studentCount: 5 },
    ],
    students: SHIFT_3_STUDENTS,
  },
  4: {
    shiftNumber: 4,
    className: "SI-50-04",
    classCode: "SI5004",
    isFinalized: true,
    assistants: [
      { group: "A", assistantCode: "MUDI", studentCount: 7 },
      { group: "B", assistantCode: "INTC", studentCount: 5 },
      { group: "C", assistantCode: "RAZA", studentCount: 5 },
      { group: "D", assistantCode: "MJFA", studentCount: 5 },
      { group: "E", assistantCode: "ARNA", studentCount: 5 },
      { group: "F", assistantCode: "MACY", studentCount: 8 },
      { group: "G", assistantCode: "DSPH", studentCount: 6 },
    ],
    students: SHIFT_4_STUDENTS,
  },
};

// 3. HELPER FUNCTIONS

/**
 * Mendapatkan seluruh shift yang dijaga oleh asisten tertentu
 */
export function getAssistantShifts(assistantCode: string): {
  shift: ShiftSchedule;
  group: string;
  studentCount: number;
  students: StudentPlotting[];
  isFinalized: boolean;
}[] {
  const result: {
    shift: ShiftSchedule;
    group: string;
    studentCount: number;
    students: StudentPlotting[];
    isFinalized: boolean;
  }[] = [];

  for (const shift of ALPRO_15_SHIFTS) {
    const plotting = ALL_SHIFT_PLOTTINGS[shift.shiftNumber];
    if (plotting) {
      const match = plotting.assistants.find((a) => a.assistantCode === assistantCode);
      if (match) {
        const groupStudents = plotting.students.filter((s) => s.assistantCode === assistantCode);
        result.push({
          shift,
          group: match.group,
          studentCount: groupStudents.length || match.studentCount,
          students: groupStudents,
          isFinalized: true,
        });
      }
    }
  }

  // Jika belum ada di shift 1-4, beri preview shift tentatif untuk asisten tersebut agar dashboard tidak kosong
  if (result.length === 0) {
    // Cari shift default berdasarkan hash kode asisten
    const defaultShiftNumber = ((assistantCode.charCodeAt(0) + assistantCode.charCodeAt(1)) % 11) + 5; // shift 5..15
    const fallbackShift = ALPRO_15_SHIFTS.find((s) => s.shiftNumber === defaultShiftNumber) || ALPRO_15_SHIFTS[4];
    result.push({
      shift: fallbackShift,
      group: "A",
      studentCount: 6,
      students: [],
      isFinalized: false,
    });
  }

  return result;
}

/**
 * Mendeteksi shift mana yang saat ini sedang berlangsung secara real-time berdasarkan jam & hari sekarang
 */
export function getCurrentOngoingShift(nowDate: Date = new Date()): {
  activeShift: ShiftSchedule | null;
  nextShiftToday: ShiftSchedule | null;
  currentDayName: string;
  isLabOperatingHours: boolean;
} {
  const dayIndex = nowDate.getDay(); // 0: Sun, 1: Mon, ..., 6: Sat
  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const currentDayName = dayNames[dayIndex];

  const currentHour = nowDate.getHours();
  const currentMinute = nowDate.getMinutes();
  const currentTotalMinutes = currentHour * 60 + currentMinute;

  // Filter shift yang jatuh di hari ini
  const todayShifts = ALPRO_15_SHIFTS.filter((s) => s.dayIndex === dayIndex);

  let activeShift: ShiftSchedule | null = null;
  let nextShiftToday: ShiftSchedule | null = null;

  for (const s of todayShifts) {
    const [startH, startM] = s.startTime.split(":").map(Number);
    const [endH, endM] = s.endTime.split(":").map(Number);
    const startMin = startH * 60 + startM;
    const endMin = endH * 60 + endM;

    if (currentTotalMinutes >= startMin && currentTotalMinutes <= endMin) {
      activeShift = s;
      break;
    } else if (currentTotalMinutes < startMin && !nextShiftToday) {
      nextShiftToday = s;
    }
  }

  const isLabOperatingHours = currentTotalMinutes >= 7 * 60 && currentTotalMinutes <= 18 * 60;

  return {
    activeShift,
    nextShiftToday,
    currentDayName,
    isLabOperatingHours,
  };
}

/**
 * Mendapatkan status shift asisten: sedang aktif sekarang, atau shift terdekat berikutnya
 */
export function getAssistantDutyStatus(assistantCode: string, nowDate: Date = new Date()) {
  const myShifts = getAssistantShifts(assistantCode);
  const ongoing = getCurrentOngoingShift(nowDate);

  // Cek apakah ada shift aktif yang dijaga asisten ini sekarang
  const currentActiveMyShift = myShifts.find((m) => m.shift.shiftNumber === ongoing.activeShift?.shiftNumber);

  // Cari shift saya berikutnya
  let upcomingMyShift = myShifts[0];

  return {
    isCurrentlyOnDuty: Boolean(currentActiveMyShift),
    activeShiftDetails: currentActiveMyShift || null,
    nextUpcomingShift: upcomingMyShift || null,
    allMyShifts: myShifts,
    systemOngoingShift: ongoing.activeShift,
  };
}
