import assert from 'node:assert/strict';
import fs from 'node:fs';

const html = fs.readFileSync(new URL('../school-dashboard/index.html', import.meta.url), 'utf8');

for (const title of ['高频 AI 能力', 'AI 教学覆盖学科', 'AI 教学应用场景', '校本资源沉淀']) {
  assert.match(html, new RegExp(`<h2>${title}</h2>`));
}
assert.match(html, /id="scene-list" class="cap-list"/);
assert.match(html, /id="resource-list" class="cap-list"/);
assert.match(html, /备课与教学设计/);
assert.match(html, /课堂互动任务/);
assert.match(html, /知识库内容/);
assert.match(html, /renderPager\('scene-list','scene-pager',teachingScenes\)/);
assert.match(html, /renderPager\('resource-list','resource-pager',schoolResources,'份'\)/);
assert.doesNotMatch(html, /<h2>老师使用次数<\/h2>/);
assert.doesNotMatch(html, /<h2>区域热门 AI 应用<\/h2>/);

console.log('school final dashboard verified');
