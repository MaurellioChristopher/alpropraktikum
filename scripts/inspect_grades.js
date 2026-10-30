const https = require('https');
const fs = require('fs');

const token = 'fc6d5658f31cb68d90907134703b5694';
const baseUrl = 'https://lms.telkomuniversity.ac.id/webservice/rest/server.php';

async function callMoodle(wsfunction, params = {}) {
  const queryParams = new URLSearchParams({
    wstoken: token,
    wsfunction: wsfunction,
    moodlewsrestformat: 'json',
    ...params
  });

  const url = `${baseUrl}?${queryParams.toString()}`;
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'MoodleMobile' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    }).on('error', reject);
  });
}

(async () => {
  const courseId = 9963;
  console.log('Fetching groups...');
  const groups = await callMoodle('core_group_get_course_groups', { courseid: courseId });
  console.log('Groups count:', groups.length);
  fs.writeFileSync('alpro_groups.json', JSON.stringify(groups, null, 2), 'utf-8');
  if (Array.isArray(groups)) {
    groups.slice(0, 15).forEach(g => console.log(`Group: ${g.name} (id: ${g.id})`));
  }

  // Check one student's grades
  const users = JSON.parse(fs.readFileSync('alpro_enrolled_users.json', 'utf-8'));
  const students = users.filter(u => u.roles && u.roles.some(r => r.shortname === 'student'));
  const sampleStudent = students[0];
  console.log(`\nSample student: ${sampleStudent.fullname} (ID: ${sampleStudent.id})`);

  console.log('Fetching grade items for sample student...');
  const studentGrades = await callMoodle('gradereport_user_get_grade_items', {
    courseid: courseId,
    userid: sampleStudent.id
  });
  fs.writeFileSync('sample_student_grades.json', JSON.stringify(studentGrades, null, 2), 'utf-8');
  
  if (studentGrades.usergrades && studentGrades.usergrades.length > 0) {
    const items = studentGrades.usergrades[0].gradeitems;
    console.log(`Grade items count for student: ${items.length}`);
    items.forEach(item => {
      if (item.gradeformatted || item.graderaw !== null) {
        console.log(`  - ${item.itemname}: raw=${item.graderaw}, formatted=${item.gradeformatted}, max=${item.grademax}`);
      }
    });
  } else {
    console.log('Grade items response:', studentGrades);
  }
})();
