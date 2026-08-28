import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const regional = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const school = readFileSync(new URL('../school-dashboard/index.html', import.meta.url), 'utf8');
const combined = `${regional}\n${school}`;

assert.match(regional, /北京市西城区 <b>AI\+ 教育<\/b> 智能体导航/);
assert.match(regional, /search\('110102'/);
assert.match(regional, /center:\[116\.36\d*,39\.9\d*\]/);
assert.match(regional, /北京市第四中学/);
assert.match(regional, /北京市第八中学/);
assert.match(regional, /北京市第三十五中学/);
assert.match(regional, /北京市第一六一中学/);
assert.match(school, /北京市第四中学/);

const districtSuccess = regional.indexOf("search.search('110102'");
const firstMarkerRender = regional.indexOf('renderSchoolMarkers(boundaries)');
const firstFitView = regional.indexOf('map.setFitView(polygons');
assert.ok(districtSuccess >= 0, '应使用西城区行政区代码获取边界');
assert.ok(firstMarkerRender > firstFitView, '应先绘制并聚焦西城区边界，再渲染学校');
assert.match(regional, /isPointInRing\(\[s\[1\],s\[2\]\],path\)/);

for (const stale of [
  '上海市虹口区', '虹口区', '虹口实验', '虹智',
  '鲁迅初级中学', '北郊学校', '继光初级中学', '丰镇中学',
  '钟山初级中学', '江湾初级中学', '曲阳第二中学', '澄衷初级中学',
  '海南中学', '华东师范大学第一附属初级中学'
]) {
  assert.doesNotMatch(combined, new RegExp(stale), `stale regional content: ${stale}`);
}

console.log('Xicheng localization verified.');
