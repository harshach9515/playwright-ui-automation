// @ts-check
import { defineConfig, devices } from '@playwright/test';
const path = require('path');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries: 0, // Retry failed tests once
  workers: 1, // Run tests in a single worker
  

  reporter: [['html'], ['allure-playwright']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  projects: [
    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        video: 'retain-on-failure', // Only record if test fails
        ignoreHTTPSErrors: true,
        permissions: ['geolocation', 'notifications'],
        screenshot: 'on-first-failure',
        trace: 'on'
      },
    },
    {
      name: 'Safari',
      use: {
        browserName: 'webkit',
        headless: false,
        //...devices['iPhone 11'],
        //viewport: null, //{width: 1290, height:1080}
        screenshot: 'on-first-failure',
        trace: 'retain-on-failure'

      },
    },
  ],
});

