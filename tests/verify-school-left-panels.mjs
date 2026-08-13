import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../school-dashboard/index.html', import.meta.url), 'utf8');

assert.match(html, /class="panel school-metric-panel"/);
assert.match(html, /<h2>AI 使用数据<\/h2>/);
assert.match(html, /class="panel school-metric-panel school-asset-panel"/);
assert.match(html, /<h2>资产沉淀<\/h2>/);
for (const label of ['执行任务数', '词元消耗量', '对话轮数', '教学资源', '教学应用', '知识库', '题库']) assert.match(html, new RegExp(label));
assert.match(html, /const updateSchoolLeftMetrics=/);
assert.match(html, /const updateSchoolAssetTypes=/);
assert.match(html, /class="school-asset-donut"/);
assert.match(html, /class="school-asset-pie-legend"/);
assert.match(html, /const updateSchoolAssetPie=/);
assert.match(html, /const renderSchoolUsageDepth=/);
assert.match(html, /<h2>年级学科使用量<\/h2>/);
assert.match(html, /id="grade-subject-usage"/);
assert.match(html, /id="grade-subject-pager"/);
assert.match(html, /const gradeSubjectUsage=/);
assert.match(html, /const updateGradeSubjectUsage=/);
assert.match(html, /school-left\{grid-template-rows:minmax\(0,1\.15fr\) minmax\(0,1\.8fr\) minmax\(0,2\.05fr\)!important/);
const usageDepth = html.slice(html.indexOf('const renderSchoolUsageDepth='), html.indexOf('const renderSchoolAssetPie='));
assert.doesNotMatch(usageDepth, />执行任务数</);
assert.match(html, /grid-template-rows:repeat\(2,minmax\(0,1fr\)\)!important/);
for (const label of ['七年级数学', '七年级语文', '八年级英语']) assert.match(html, new RegExp(label));
assert.doesNotMatch(html, /<h2>区域使用趋势<\/h2>/);

console.log('school left panels verified');
