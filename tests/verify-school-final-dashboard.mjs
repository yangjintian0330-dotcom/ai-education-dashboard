import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../school-dashboard/index.html', import.meta.url), 'utf8');

for (const title of ['高频 AI 能力', '老师使用次数', '老师 AI 对话次数', '老师 AI 生成任务数']) {
  assert.match(html, new RegExp(`<h2>${title}</h2>`));
}
assert.match(html, /id="teacher-dialogue-list" class="cap-list"/);
assert.match(html, /id="teacher-task-list" class="cap-list"/);
assert.match(html, /const teacherDialogues=/);
assert.match(html, /const teacherTasks=/);
assert.match(html, /renderPager\('teacher-dialogue-list','teacher-dialogue-pager',teacherDialogues\)/);
assert.match(html, /renderPager\('teacher-task-list','teacher-task-pager',teacherTasks,'个'\)/);
assert.doesNotMatch(html, /<h2>区域热门 AI 应用<\/h2>/);

console.log('school final dashboard verified');
