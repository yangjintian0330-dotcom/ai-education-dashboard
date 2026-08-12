import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../school-dashboard/index.html', import.meta.url), 'utf8');

assert.doesNotMatch(html, /<section class="metrics">/);
assert.match(html, /class="panel flywheel-panel flywheel-focus"/);
assert.equal((html.match(/class="flywheel-stage-card /g) ?? []).length, 4);
assert.match(html, /const metricValues=\[62,15241,3817,1634\]/);
assert.match(html, /const flywheelValues=\[metricValues\[0\],metricValues\[2\],metricValues\[1\],metricValues\[3\]\]/);
assert.match(html, /querySelectorAll\('\[data-flywheel-value\]'\)/);
assert.doesNotMatch(html, /new MutationObserver\(syncFlywheel\)/);

console.log('school flywheel focus verified');
