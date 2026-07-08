import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: './tests',


  fullyParallel: true,

  retries: process.env.CI ? 2 : 0,

  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        headless: false,
        launchOptions: {
          args: [
            '--disable-blink-features=AutomationControlled',
          ],
        },
      },
    },
  ]
});