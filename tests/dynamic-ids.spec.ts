import { test, expect } from '@playwright/test';

test('Test 3: Dynamic ID Handling', async ({ page }) => {

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


    // Select Claude artifact iframe
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

    // Pause execution here
    await page.pause();
    // Verify tab navigation (optional)
    await expect(
        flakySelectorsTab
    ).toHaveAttribute(
        'data-tab',
        'selectors'
    );


    // Click Regenerate All IDs
    const regenerateButton = frame.getByTestId(
        'regenerate-ids'
    );

    await expect(regenerateButton).toBeVisible({
        timeout: 30000
    });

    await regenerateButton.click();


    // Select Beta without using dynamic IDs
    const betaItem = frame.locator(
        '[data-name="Beta"]'
    );

    await expect(betaItem).toBeVisible({
        timeout: 30000
    });

    await betaItem.click();


    // Verify Beta is selected
    const selectedItem = frame.getByTestId(
        'selected-item'
    );

    await expect(selectedItem).toHaveText(
        'Selected: Beta',
        {
            timeout: 30000
        }
    );

});