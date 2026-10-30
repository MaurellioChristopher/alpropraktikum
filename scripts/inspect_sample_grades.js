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
  console.log('Fetching user groups...');
  const userGroups = await callMoodle('core_group_get_course_user_groups', { courseid: courseId });
  fs.writeFileSync('alpro_user_groups.json', JSON.stringify(userGroups, null, 2), 'utf-8');
  console.log('User groups count:', userGroups.groups ? userGroups.groups.length : 0);
  if (userGroups.groups && userGroups.groups.length > 0) {
    console.log('Sample user groups entry:', userGroups.groups[0]);
  }

  // Let's check which students have non-null grades by testing a few students from different groups
  const users = JSON.parse(fs.readFileSync('alpro_enrolled_users.json', 'utf-8'));
  const students = users.filter(u => u.roles && u.roles.some(r => r.shortname === 'student'));
  console.log('Checking grades for 10 sample students...');

  for (let i = 0; i < Math.min(10, students.length); i++) {
    const s = students[i];
    const res = await callMoodle('gradereport_user_get_grade_items', {
      courseid: courseId,
      userid: s.id
    });
    if (res.usergrades && res.usergrades[0]) {
      const graded = res.usergrades[0].gradeitems.filter(g => g.graderaw !== null && g.graderaw !== undefined);
      console.log(`Student ${s.fullname} (ID ${s.id}): ${graded.length} graded items`);
      graded.forEach(g => {
        console.log(`   - ${g.itemname}: ${g.graderaw} (${g.gradeformatted})`);
      });
    }
  }
})();
