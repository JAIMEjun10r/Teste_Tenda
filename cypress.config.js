const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://marketplace-develop.tendaatacado.com.br/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1700,
    viewportHeight: 1200
  },
});
