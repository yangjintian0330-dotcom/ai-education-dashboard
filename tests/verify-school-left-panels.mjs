import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../school-dashboard/index.html', import.meta.url), 'utf8');

assert.match(html, /<h2>高频 AI 能力<\/h2>/);
assert.match(html, /id="school-cap-list" class="cap-list"/);
assert.match(html, /id="school-cap-pager" class="pager"/);
assert.match(html, /<h2>年级 \/ 学科使用次数<\/h2>/);
assert.match(html, /id="grade-subject-usage-list" class="cap-list"/);
assert.match(html, /id="grade-subject-usage-pager" class="pager"/);
assert.match(html, /一年级数学/);
assert.match(html, /二年级语文/);
assert.match(html, /renderPager\('school-cap-list','school-cap-pager',schoolCapabilities\)/);
assert.match(html, /renderPager\('grade-subject-usage-list','grade-subject-usage-pager',gradeSubjectUsage\)/);
assert.doesNotMatch(html, /<h2>区域使用趋势<\/h2>/);

console.log('school left panels verified');
