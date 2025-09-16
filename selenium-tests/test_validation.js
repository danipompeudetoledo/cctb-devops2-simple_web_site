
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function testValidation() {
  const TESTING_URL = 'http:54.87.136.54'; 
  let options = new chrome.Options()
    .addArguments('--headless=new', '--no-sandbox', '--disable-dev-shm-usage');

  let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  try {
    await driver.get(54.87.136.54);

    await driver.findElement(By.id('name')).sendKeys('Bob');
    // email empty
    await driver.findElement(By.id('role')).sendKeys('QA');

    await driver.findElement(By.css('button[type="submit"]')).click();

    const err = await driver.wait(until.elementLocated(By.css('.msg.error')), 5000);
    await driver.wait(until.elementTextContains(err, 'Please fill out all fields'), 3000);

    console.log('Validation Error Shown (as expected)');
  } finally {
    await driver.quit();
  }
})();
