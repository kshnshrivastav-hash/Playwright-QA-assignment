import { test, expect } from '@playwright/test';

test('Test 4: Conditional Login Flow', async ({ page }) => {

  test.setTimeout(60000);

  await page.goto(
    'https://claude.ai/public/artifacts/1e02a9a5-4f20-4f19-a7ba-6c3f16c6eab9',
    {
      waitUntil: 'networkidle',
      timeout: 60000,
    }
  );


  // Accept cookies if displayed
  const acceptCookies = page.getByRole('button', {
    name: /Accept All Cookies/i,
  });

  if (await acceptCookies.isVisible().catch(() => false)) {
    await acceptCookies.click();
  }


  // Access artifact iframe
  const frame = page.frameLocator(
    'iframe[title="Claude content"]'
  );


  // Navigate to Flaky Selectors tab
  const flakySelectorsTab = frame.locator(
    '[data-tab="selectors"]'
  );

  await expect(flakySelectorsTab).toBeVisible({
    timeout: 30000
  });

  await flakySelectorsTab.click();


  // ============================
  // Admin User Login
  // ============================

  const adminLogin = frame.getByTestId(
    'login-admin'
  );

  await expect(adminLogin).toBeVisible();

  await adminLogin.click();


  // Wait for dashboard to load
  const dashboard = frame.getByTestId(
    'dashboard-section'
  );

  await expect(dashboard).toBeVisible({
    timeout: 30000
  });


  // Verify Admin Panel visible
  await expect(
    frame.getByTestId('admin-panel')
  ).toBeVisible();


  // Verify Standard Panel is NOT visible
  await expect(
    frame.getByTestId('standard-panel')
  ).not.toBeVisible();


  // Logout
  const logoutButton = frame.getByTestId(
    'logout-button'
  );

  await expect(logoutButton).toBeVisible();

  await logoutButton.click();


  // ============================
  // Standard User Login
  // ============================

  const standardLogin = frame.getByTestId(
    'login-standard'
  );

  await expect(standardLogin).toBeVisible({
    timeout: 30000
  });

  await standardLogin.click();


  // Wait for dashboard again
  await expect(dashboard).toBeVisible({
    timeout: 30000
  });


  // Verify Standard Panel visible
  await expect(
    frame.getByTestId('standard-panel')
  ).toBeVisible();


  // Verify Admin Panel is NOT visible
  await expect(
    frame.getByTestId('admin-panel')
  ).not.toBeVisible();

});