const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  specPattern: 'cypress/integration/e2e/*'
  },
  chromeWebSecurity : false,
  pageLoadTimeout: 200000,
});
