import { test, expect } from '@playwright/test';

test('Test 2: Load and Verify List Items', async ({ page }) => {
  await page.goto(
    'https://claude.ai/public/artifacts/1e02a9a5-4f20-4f19-a7ba-6c3f16c6eab9'
  );

  // Accept cookies if shown
  const acceptCookies = page.getByRole('button', {
    name: 'Accept All Cookies',
  });

  if (await acceptCookies.isVisible().catch(() => false)) {
    await acceptCookies.click();
  }

  const frame = page.frameLocator('iframe').first();

  const loadMoreButton = frame.getByRole('button', {
    name: 'Load More Items',
  });

  // Locator for all list items
  const items = frame.locator('[data-testid^="list-item-"]');

  // Click "Load More Items" three times
  // Wait for the expected number of items after each click
  for (let i = 1; i <= 3; i++) {
    await loadMoreButton.click();

    // Each click loads 5 more items
    await expect(items).toHaveCount(i * 5);
  }

  // Verify exactly 15 items
  await expect(items).toHaveCount(15);

  // Verify total items text
  await expect(frame.getByText('Total items: 15')).toBeVisible();

  // Verify at least one active and one pending item
  const activeItems = frame.getByText('active', { exact: true });
  const pendingItems = frame.getByText('pending', { exact: true });

  expect(await activeItems.count()).toBeGreaterThan(0);
  expect(await pendingItems.count()).toBeGreaterThan(0);
});