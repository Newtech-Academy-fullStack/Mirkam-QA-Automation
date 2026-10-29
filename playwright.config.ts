import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

/**
 * Playwright configuration.
 * Docs: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Folder where Playwright looks for tests
  testDir: './tests',

  // Max time for one test (ms)
  timeout: 30_000,

  // Max time for each expect() assertion (ms)
  expect: { timeout: 5_000 },

  // Run test files in parallel
  fullyParallel: true,

  // Retry failed tests on CI only
  retries: process.env.CI ? 2 : 0,

  // Reporters: a list in the terminal + an HTML report (npm run report)
  reporter: [['list'], ['html', { open: 'never' }]],

  // Settings shared by all tests
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    trace: 'on-first-retry',        // record a trace when a test is retried
    screenshot: 'only-on-failure',  // take a screenshot when a test fails
    video: 'retain-on-failure',     // keep the video when a test fails
    testIdAttribute: 'data-test',   // saucedemo uses data-test="..." attributes
  },

  // Browsers to run against
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
