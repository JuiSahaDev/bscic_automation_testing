const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportTitle: 'BSCIC Automation Test Report',
    reportPageTitle: 'BSCIC Test Results',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveJson: true,
    charts: true,
    reportDir: 'cypress/reports/html',
    overwrite: true,
    html: true,
    json: true,
    reportFilename: 'index',
  },

  video: true,
  videosFolder: 'cypress/videos',
  videoCompression: 32,
  screenshotsFolder: 'cypress/screenshots',

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config; // optional but recommended
    },
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 180000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    experimentalModifyObstructiveThirdPartyCode: true,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
  },
});
