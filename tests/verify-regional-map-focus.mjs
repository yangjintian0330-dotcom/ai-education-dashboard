import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.match(source, /classList\.add\('map-focus-grid'\)/);
assert.match(source, /class="panel side-kpi token-kpi"/);
assert.match(source, /class="panel side-kpi turns-kpi"/);
assert.match(source, /class="panel side-kpi assets-kpi"/);
assert.match(source, /class="panel side-kpi reuse-kpi"/);
assert.match(source, /词元消耗量/);
assert.match(source, /对话轮数/);
assert.match(source, /资产沉淀数/);
assert.match(source, /资产复用数/);
assert.match(source, /\.map-focus-grid\{grid-template-columns:220px minmax\(0,1fr\) 220px/);
assert.match(source, /\.map-focus-grid \.command\{width:100%;height:100%/);
assert.match(source, /\.map-focus-grid \.map-shell\{height:100%/);

console.log('regional map focus verified');
