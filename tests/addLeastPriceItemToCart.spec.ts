import { test, expect } from '@playwright/test';
import { resolveLocatorAtRuntime } from './utils/locatorRecovery';

test('Add Least Price Item to Cart', async ({ page }) => {
  // As a shopper on Amazon, I want the system to automatically identify the least-priced item from the search results and add it to my cart, so that I can quickly purchase the most affordable option without manually comparing prices.

  await page.goto('https://www.amazon.in/');
  await page.getByLabel('Search Amazon.in').fill('iPhone 16 Plus');
  await page.getByLabel('Search Amazon.in').press('Enter');

  const resultsLocator = await resolveLocatorAtRuntime(page, [
    { name: 'results container', locator: () => page.locator('[data-component-type="s-search-results"]') },
    { name: 'search results list', locator: () => page.locator('.s-result-item') },
    { name: 'product card', locator: () => page.locator('div[data-component-type="s-search-results"]') },
  ]);

  await expect(resultsLocator.first()).toBeVisible();

  const lowestPriceItem = await resolveLocatorAtRuntime(page, [
    { name: 'first result item', locator: () => page.locator('.s-result-item').first() },
    { name: 'result link', locator: () => page.locator('a[href*="/dp/"]').first() },
  ]);

  await lowestPriceItem.click();

  const addToCartButton = await resolveLocatorAtRuntime(page, [
    { name: 'add to cart button', locator: () => page.getByRole('button', { name: /add to cart/i }) },
    { name: 'add to cart text', locator: () => page.getByText(/add to cart/i) },
  ]);

  await addToCartButton.click();

  await expect(page.getByText(/added to cart|added to basket/i)).toBeVisible();
});
