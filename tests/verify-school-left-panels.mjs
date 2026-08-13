import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../school-dashboard/index.html', import.meta.url), 'utf8');

assert.match(html, /class="panel school-metric-panel"/);
assert.match(html, /<h2>AI 使用数据<\/h2>/);
assert.match(html, /class="panel school-metric-panel school-asset-panel"/);
assert.match(html, /<h2>资产沉淀<\/h2>/);
for (const label of ['执行任务数', '词元消耗量', '对话轮数', '资源沉淀数', '资源复用数']) assert.match(html, new RegExp(label));
assert.match(html, /const updateSchoolLeftMetrics=/);
assert.doesNotMatch(html, /年级 \/ 学科使用次数|grade-subject-usage|school-cap-pager/);
assert.doesNotMatch(html, /<h2>区域使用趋势<\/h2>/);

console.log('school left panels verified');
