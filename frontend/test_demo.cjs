const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Capture console messages
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  console.log('Navigating to http://localhost:5173/recommendation?demo=paneer&demo_mode=true');
  await page.goto('http://localhost:5173/recommendation?demo=paneer&demo_mode=true', { waitUntil: 'networkidle2' });

  // Wait for a few seconds to see if it renders or throws
  await new Promise(r => setTimeout(r, 2000));

  // Check what is rendered
  const html = await page.evaluate(() => document.body.innerHTML);
  console.log('HTML Length:', html.length);
  
  // Extract specific parts if needed
  const isAnalyzing = await page.evaluate(() => {
    return document.body.innerText.includes('Analyzing Parameters...');
  });
  console.log('Is Analyzing Spinner visible?', isAnalyzing);
  
  const isBlank = await page.evaluate(() => {
    return document.querySelector('#root').children.length === 0 || document.body.innerText.trim() === '';
  });
  console.log('Is page blank?', isBlank);
  
  await browser.close();
})();
