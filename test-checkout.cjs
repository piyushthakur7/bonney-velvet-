const { chromium } = require('playwright');

(async () => {
  let browser;
  try {
    console.log('Launching browser...');
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    console.log('Navigating to shop...');
    await page.goto('http://localhost:3000/shop');
    
    console.log('Waiting for products to load...');
    await page.waitForSelector('.group.block'); // Wait for products
    
    console.log('Clicking the first product...');
    const firstProduct = await page.$('.group.block');
    await firstProduct.click();
    
    console.log('Waiting for product page to load...');
    await page.waitForSelector('button:has-text("Add to Bag")');
    
    console.log('Adding to bag...');
    await page.click('button:has-text("Add to Bag")');
    
    // Wait for the toast or just navigate to cart
    await page.waitForTimeout(1000);
    
    console.log('Navigating to cart...');
    await page.goto('http://localhost:3000/cart');
    
    console.log('Waiting for cart to load...');
    await page.waitForSelector('a:has-text("Secure Checkout")');
    
    console.log('Clicking checkout...');
    await page.click('a:has-text("Secure Checkout")');
    
    console.log('Waiting for checkout page to load...');
    await page.waitForSelector('input[name="name"]');
    
    // Fill out form
    console.log('Filling out form...');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '9876543210');
    await page.fill('input[name="address"]', '123 Test St');
    await page.fill('input[name="city"]', 'Mumbai');
    await page.fill('input[name="state"]', 'MH');
    await page.fill('input[name="pincode"]', '400001');
    
    console.log('Submitting checkout form...');
    // We can click the button using type="submit"
    await page.click('button[type="submit"]:has-text("Secure Checkout")');
    
    console.log('Waiting for Mock Payment Modal...');
    // In our system it creates an order and shows a mock modal if using dummy keys
    await page.waitForSelector('text="Razorpay Simulated"', { timeout: 10000 });
    
    console.log('Clicking Simulate Successful Payment...');
    await page.click('button:has-text("Simulate Successful Payment")');
    
    console.log('Waiting for Success Page...');
    // Wait for the Thank you page
    await page.waitForSelector('text="Thank You!"', { timeout: 15000 });
    
    console.log('Success! Checkout flow works perfectly.');
    
  } catch (err) {
    console.error('Test failed:', err);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
