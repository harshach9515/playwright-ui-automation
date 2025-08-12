import reporter from 'cucumber-html-reporter';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname workaround in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  theme: 'bootstrap',
  jsonFile: path.join(__dirname, 'cucumber_report.json'),
  output: path.join(__dirname, 'cucumber_report.html'),
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "STAGING",
    "Browser": "Chromium",
    "Platform": process.platform,
    "Executed": "Local"
  }
};

reporter.generate(options);
