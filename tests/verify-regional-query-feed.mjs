import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.match(source, /query-school/);
assert.match(source, /query-teacher/);
assert.match(source, /query-content/);
assert.match(source, /你帮我生成一个八年级语文教学课件/);
assert.match(source, /\.query-school\{/);
assert.match(source, /\.query-teacher\{/);
assert.match(source, /\.query-content\{/);

console.log('regional query feed verified');
