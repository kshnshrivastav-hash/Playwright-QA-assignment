import { test, expect, Frame } from '@playwright/test';

test('Test 1: Delayed Button Flow', async ({ page }) => {

    await page.goto(
        'https://claude.ai/public/artifacts/1e02a9a5-4f20-4f19-a7ba-6c3f16c6eab9'
    );

    const timingTab = page.getByRole('tab', {
        name: 'Timing Challenges'
    });

    let challengeFrame: Frame | undefined;

    await expect.poll(async () => {

        for (const frame of page.frames()) {

            const count = await frame
                .getByRole('button', { name: 'Start Process' })
                .count()
                .catch(() => 0);

            if (count > 0) {
                challengeFrame = frame;
                return true;
            }
        }

        return false;

    }, {
        timeout: 10000
    }).toBe(true);

    if (!challengeFrame) {
        throw new Error('Challenge frame not found');
    }

    const startProcessButton = challengeFrame.getByRole('button', {
        name: 'Start Process'
    });

    const confirmButton = challengeFrame.getByRole('button', {
        name: 'Confirm Action'
    });

    const successMessage = challengeFrame.getByText(
        'Action Confirmed Successfully'
    );

    await expect(startProcessButton).toBeVisible();

    await startProcessButton.click();

    await expect(confirmButton).toBeEnabled();

    await confirmButton.click();

    await expect(successMessage).toBeVisible();
});
