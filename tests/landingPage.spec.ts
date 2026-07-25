import { test, expect } from '@playwright/test';

    test('has title', async ({ page }) => {
  await page.goto('https://www.amazon.in/ref=nav_logo');
  await expect(page).toHaveTitle(/Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in/);
  await page.getByLabel('Search Amazon.in').fill('Playwright book');
  await page.getByLabel('Search Amazon.in').screenshot({ path: './screenshots/screenshot.png' });
  await page.locator('#sac-suggestion-row-1').click();
  await page.waitForEvent('load');
  await page.screenshot({ path: './screenshots/screenshot1.png' });
  await page.screenshot({ path: './screenshots/screenshot2.png', fullPage: true });
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  //await page.pause();

  }  ) 
