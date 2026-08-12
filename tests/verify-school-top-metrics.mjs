import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../school-dashboard/index.html', import.meta.url), 'utf8');
const metrics = html.match(/<section class="metrics">([\s\S]*?)<\/section>/)?.[1] ?? '';

assert.equal((metrics.match(/class="metric"/g) ?? []).length, 5);
assert.match(metrics, /<label>活跃老师数<\/label>/);
assert.match(metrics, /<label>AI 生成任务数量<\/label>/);
assert.match(metrics, /<label>AI 对话次数<\/label>/);
assert.match(metrics, /<label>区域资源沉淀<\/label>/);
assert.match(metrics, /<label>校本资源沉淀<\/label>/);
assert.doesNotMatch(metrics, /↑|服务学生/);
assert.match(html, /\.metrics\{grid-template-columns:repeat\(5,1fr\)/);
assert.match(html, /const metricValues=\[62,15241,3817,13379,1634\]/);
assert.doesNotMatch(html, /飞象老师校园版 · 学校实时画像/);
assert.doesNotMatch(html, />实时在线</);

console.log('school top metrics verified');
