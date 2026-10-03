const { chromium } = require("playwright");
(async () => {
  const [svg, png, w, h] = process.argv.slice(2);
  const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--no-sandbox"] });
  const page = await browser.newPage({ viewport: { width: +w, height: +h } });
  await page.goto("file://" + svg);
  await page.screenshot({ path: png });
  await browser.close();
})();
