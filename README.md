# Playwright UI Automation Framework

This repository contains a Playwright-based UI automation framework for end-to-end testing across multiple browsers.

## Prerequisites
- Node.js (v16 or above recommended)
- npm (comes with Node.js)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/harshach9515/playwright-ui-automation.git
   cd playwright-ui-automation
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Running Tests

### Run All Tests (All Browsers)
```sh
npx playwright test
```

### Run Tests in a Specific Browser
- **Chrome:**
  ```sh
  npx playwright test --project=Chrome
  ```
- **Safari:**
  ```sh
  npx playwright test --project=Safari
  ```

### Run a Specific Test File
```sh
npx playwright test tests/practise/ClientAppPO.spec.js
```

### Run in Headed Mode
```sh
npx playwright test --headed
```

### Generate and View HTML Report
After running tests, view the report with:
```sh
npx playwright show-report
```

## Video & Trace
- Videos and traces are automatically saved for failed tests (see `playwright.config.js`).
- Find them in the `test-results/` directory or via the HTML report.

## Project Structure
- `tests/` - Test specs
- `pageobjects/` - Page Object Model classes
- `utils/` - Utility functions and helpers
- `playwright.config.js` - Playwright configuration

## Customization
- Update `playwright.config.js` to add/remove browsers, change timeouts, or adjust reporting.
- Add new tests in the `tests/` directory.

## More Info
- [Playwright Documentation](https://playwright.dev/docs/intro)

---

Feel free to fork and extend this framework for your own projects!
