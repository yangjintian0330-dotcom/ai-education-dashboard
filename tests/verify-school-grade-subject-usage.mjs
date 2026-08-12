import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../school-dashboard/index.html', import.meta.url), 'utf8');

assert.match(html, /<h2>年级 \/ 学科使用次数<\/h2>/);
assert.match(html, /<label>年级学科 \/ 使用次数<\/label>/);
assert.match(html, /const gradeSubjectUsage=/);
for (const item of ['一年级数学', '二年级语文', '三年级英语']) {
  assert.match(html, new RegExp(item));
}
assert.match(html, /renderPager\('grade-subject-usage-list','grade-subject-usage-pager',gradeSubjectUsage\)/);
assert.doesNotMatch(html, /id="teacher-usage-list"/);

console.log('school grade subject usage verified');
