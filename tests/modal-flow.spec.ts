import { test, expect } from '@playwright/test';

test('Test 5: Modal Confirmation Flow', async ({ page }) => {

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


  // Navigate to Responsive tab
  const responsiveTab = frame.locator(
    '[data-tab="responsive"]'
  );

  await expect(responsiveTab).toBeVisible({
    timeout: 30000
  });

  await responsiveTab.click();


  // Open first modal
  const openModalButton = frame.getByTestId(
    'open-modal'
  );

  await expect(openModalButton).toBeVisible({
    timeout: 30000
  });

  await openModalButton.click();


  // Verify first modal is visible
  const modalContent = frame.getByTestId(
    'modal-content'
  );

  await expect(modalContent).toBeVisible({
    timeout: 30000
  });


  // Click Show Details inside first modal
  const showDetailsButton = modalContent.getByTestId(
    'show-nested'
  );

  await expect(showDetailsButton).toBeVisible();

  await showDetailsButton.click();


  // Verify nested modal is visible
  const nestedModalContent = frame.getByTestId(
    'nested-modal-content'
  );

  await expect(nestedModalContent).toBeVisible({
    timeout: 30000
  });


  // Click Confirm inside nested modal only
  const confirmButton = nestedModalContent.getByTestId(
    'final-confirm'
  );

  await expect(confirmButton).toBeVisible();

  await confirmButton.click();


  // Verify both modals are closed
  await expect(
    frame.getByTestId('modal-backdrop')
  ).not.toBeVisible({
    timeout: 30000
  });

  await expect(
    frame.getByTestId('nested-modal-backdrop')
  ).not.toBeVisible({
    timeout: 30000
  });


  // Verify result
  await expect(
    frame.getByTestId('modal-result')
  ).toHaveText(
    'Result: confirmed',
    {
      timeout: 30000
    }
  );

});