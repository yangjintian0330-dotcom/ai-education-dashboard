import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const start = source.indexOf('const pages=') + 'const pages='.length;
const end = source.indexOf(';const escapedCloseTag', start);
const regional = JSON.parse(source.slice(start, end)).regional;
const openStart = regional.indexOf('const open = () =>');
const openEnd = regional.indexOf("info.open(map,[lng,lat]);", openStart);
const hoverCard = regional.slice(openStart, openEnd);

assert.match(hoverCard, /活跃老师数/);
assert.match(hoverCard, /对话次数/);
assert.match(hoverCard, /进入学校看板/);
assert.doesNotMatch(hoverCard, /资源复用|应用创作/);

console.log('School hover card verification passed.');
