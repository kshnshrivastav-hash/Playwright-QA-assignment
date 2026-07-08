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

    const acceptCookies = page.getByRole('button', {
        name: /Accept All Cookies/i,
    });

    if (await acceptCookies.isVisible().catch(() => false)) {
        await acceptCookies.click();
    }

    const frame = page.frameLocator(
        'iframe[title="Claude content"]'
    );

    const flakySelectorsTab = frame.locator(
        '[data-tab="selectors"]'
    );

    await expect(flakySelectorsTab).toBeVisible({
        timeout: 30000
    });

    await flakySelectorsTab.click();
  
    await expect(
        flakySelectorsTab
    ).toHaveAttribute(
        'data-tab',
        'selectors'
    );

    const regenerateButton = frame.getByTestId(
        'regenerate-ids'
    );

    await expect(regenerateButton).toBeVisible({
        timeout: 30000
    });

    await regenerateButton.click();


    const betaItem = frame.locator(
        '[data-name="Beta"]'
    );

    await expect(betaItem).toBeVisible({
        timeout: 30000
    });

    await betaItem.click();

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