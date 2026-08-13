import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../school-dashboard/index.html', import.meta.url), 'utf8');

for (const title of ['AI 使用数据', '资产沉淀', '老师使用排名', '老师辅助工作排名']) {
  assert.match(html, new RegExp(`<h2>${title}</h2>`));
}
assert.match(html, /id="school-usage-ranking" class="school-rank-visual"/);
assert.match(html, /id="school-work-ranking" class="school-rank-visual"/);
assert.match(html, /const teacherDialogues=/);
assert.match(html, /const teacherTasks=/);
assert.match(html, /renderPager\('teacher-dialogue-list','teacher-dialogue-pager',teacherDialogues\)/);
assert.match(html, /renderPager\('teacher-task-list','teacher-task-pager',teacherTasks,'个'\)/);
assert.match(html, /const renderSchoolRightRankings=/);
assert.match(html, /teacherUsage=/);
assert.match(html, /\.final-side\{grid-template-rows:minmax\(0,1fr\)!important\}/);
assert.doesNotMatch(html, /<h2>区域热门 AI 应用<\/h2>/);

console.log('school final dashboard verified');
