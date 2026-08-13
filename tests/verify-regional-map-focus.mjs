import fs from 'node:fs';
import assert from 'node:assert/strict';

const source = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

assert.match(source, /classList\.add\('map-focus-grid'\)/);
assert.match(source, /querySelectorAll\(':scope > aside'\)\.forEach\(aside=>aside\.remove\(\)\)/);
assert.match(source, /\.map-focus-grid\{grid-template-columns:minmax\(0,1fr\)/);
assert.match(source, /\.map-focus-grid \.command\{width:100%;height:100%/);
assert.match(source, /\.map-focus-grid \.map-shell\{height:100%/);

console.log('regional map focus verified');
