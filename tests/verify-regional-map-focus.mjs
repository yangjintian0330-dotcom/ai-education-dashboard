import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.match(source, /classList\.add\('map-focus-grid'\)/);
assert.match(source, /class="panel operations-panel"/);
assert.match(source, /class="panel ranking-panel"/);
assert.match(source, /词元消耗量/);
assert.match(source, /对话轮数/);
assert.match(source, /资源沉淀数/);
assert.match(source, /资源复用数/);
assert.match(source, /\.map-focus-grid\{grid-template-columns:260px minmax\(0,1fr\) 310px/);
assert.match(source, /\.map-focus-grid \.command\{width:100%;height:100%/);
assert.match(source, /\.map-focus-grid \.map-shell\{height:100%/);
for (const obsoleteCall of ['renderSchoolMetric', 'renderCapabilities', 'renderApps', 'updateResources', 'renderRanks']) {
  assert.match(source, new RegExp(`obsoleteRegionalUpdates.*${obsoleteCall}|${obsoleteCall}.*obsoleteRegionalUpdates`, 's'));
}

console.log('regional map focus verified');
