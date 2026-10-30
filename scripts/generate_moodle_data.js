const fs = require('fs');

const fullGrades = require('../alpro_students_full_grades.json');
const enrolledUsers = require('../alpro_enrolled_users.json');

// Map class names like "SI-50-01" to codes like "SI5001"
function classNameToCode(name) {
  if (!name) return 'SI5001';
  if (name === 'SI-50-INT') return 'SI50INT';
  return name.replace('SI-50-', 'SI50');
}

const students = Object.values(fullGrades).map(s => {
  const classCode = classNameToCode(s.class);
  return {
    id: s.userId,
    nim: s.nim || String(s.userId),
    name: s.name,
    classCode: classCode,
    className: s.class || 'SI-50-01',
    warmingUp: s.grades.warming_up,
    preTest: s.grades.pre_test,
    practice: s.grades.practice,
    jurnal: s.grades.jurnal,
    postTest: s.grades.post_test,
  };
});

// Sort by NIM
students.sort((a, b) => a.nim.localeCompare(b.nim));

// Group by classCode
const byClass = {};
students.forEach(s => {
  if (!byClass[s.classCode]) byClass[s.classCode] = [];
  byClass[s.classCode].push(s);
});

console.log('Total students:', students.length);
console.log('Classes found:', Object.keys(byClass));
Object.keys(byClass).sort().forEach(c => {
  console.log(`- ${c}: ${byClass[c].length} students`);
});

const fileContent = `/**
 * Data Mahasiswa & Penilaian Praktikum Algoritma & Pemrograman (EDM Laboratory)
 * Disinkronisasi langsung dari LMS Telkom University (CeLOE)
 * Course ID: 9963 (PRAK-FRI-2627-12 | ALGORITMA DAN PEMROGRAMAN - EDM)
 * Total Mahasiswa: ${students.length} Mahasiswa (15 Kelas: SI5001 - SI5014 & SI50INT)
 */

export interface MoodleStudentGrade {
  id: number;
  nim: string;
  name: string;
  classCode: string;
  className: string;
  warmingUp: number | null;
  preTest: number | null;
  practice: number | null;
  jurnal: number | null;
  postTest: number | null;
}

export const MOODLE_ALPRO_STUDENTS: MoodleStudentGrade[] = ${JSON.stringify(students, null, 2)};

export const MOODLE_STUDENTS_BY_CLASS: Record<string, MoodleStudentGrade[]> = ${JSON.stringify(byClass, null, 2)};

export const LMS_ALPRO_METADATA = {
  courseId: 9963,
  courseShortName: "PRAK-FRI-2627-12",
  courseFullName: "ALGORITMA DAN PEMROGRAMAN - EDM",
  institution: "Telkom University",
  faculty: "Fakultas Rekayasa Industri (FRI)",
  program: "S1 Sistem Informasi (Angkatan 2026 / SI'50)",
  totalStudents: ${students.length},
  totalClasses: ${Object.keys(byClass).length},
  syncTime: "${new Date().toISOString()}",
  components: ["Warming Up", "Pre Test", "Practice", "Jurnal", "Post Test"]
};
`;

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/moodle-alpro-students.ts', fileContent, 'utf-8');
console.log('Successfully wrote src/data/moodle-alpro-students.ts');
