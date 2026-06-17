import { chromium } from 'playwright-core';

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const BASE   = 'http://localhost:5173';

const browser = await chromium.launch({
  executablePath: CHROME,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  headless: true,
});

const take = async (url, file, w = 1280, h = 820) => {
  const page = await browser.newPage();
  await page.setViewportSize({ width: w, height: h });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(600);
  await page.screenshot({ path: file, fullPage: false });
  await page.close();
  console.log('saved', file);
};

// 1. Index overview
await take(`${BASE}/lessons/index.html`, '/tmp/preview-index.png');

// 2. Index filtered to Grade 7 (simulate click)
{
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 820 });
  await page.goto(`${BASE}/lessons/index.html`, { waitUntil: 'networkidle' });
  await page.click('[data-grade="7"]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: '/tmp/preview-grade7.png' });
  await page.close();
  console.log('saved /tmp/preview-grade7.png');
}

// 3. Open a lesson in preview panel (present-perfect)
{
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 820 });
  await page.goto(`${BASE}/lessons/present-perfect.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/preview-lesson.png' });
  await page.close();
  console.log('saved /tmp/preview-lesson.png');
}

// 4. Section 5 (Guided Practice) of conditionals
{
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 820 });
  await page.goto(`${BASE}/lessons/conditionals.html`, { waitUntil: 'networkidle' });
  // click to section 5
  await page.click('.stepper button:nth-child(5)');
  await page.waitForTimeout(400);
  await page.screenshot({ path: '/tmp/preview-practice.png' });
  await page.close();
  console.log('saved /tmp/preview-practice.png');
}

await browser.close();
