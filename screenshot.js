const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// Start the server
const server = spawn('cmd', ['/c', 'node_modules\\.bin\\serve.cmd', '.'], { cwd: __dirname, stdio: 'inherit' });

// Wait for server to start
setTimeout(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Get list of HTML files in the root directory
    const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

    for (const file of files) {
      const url = `http://localhost:3000/${file}`;
      console.log(`Taking screenshot of ${file}...`);
      await page.goto(url, { waitUntil: 'networkidle2' });
      await page.screenshot({ path: path.join(__dirname, 'screenshots', `${path.parse(file).name}.png`), fullPage: true });
    }

    await browser.close();
    console.log('Screenshots taken successfully.');
  } catch (error) {
    console.error('Error taking screenshots:', error);
  } finally {
    server.kill();
  }
}, 3000);