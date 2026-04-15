const { chromium } = require('playwright');

(async () => {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 15000 });
    
    const rootHtml = await page.evaluate(() => document.getElementById('root')?.innerHTML || '');
    const overlayText = await page.evaluate(() => {
      const overlay = document.querySelector('vite-error-overlay');
      return overlay ? overlay.shadowRoot?.innerHTML || 'Vite error overlay present' : 'No overlay';
    });
    
    console.log('Root HTML length:', rootHtml.length);
    if (overlayText !== 'No overlay') {
      console.log('Vite Error Overlay found:', overlayText.substring(0, 1000));
    }
    
    await browser.close();
  } catch (err) {
    console.error('Playwright Script Error:', err);
  }
})();
