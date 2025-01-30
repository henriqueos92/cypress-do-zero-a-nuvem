const cypress = require('cypress')
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: "uxptta",
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
    mochaJunitReporterReporterOptions: {
      mochaFile: 'results/junit/test-results.[hash].xml'
    },
    cypressMochawesomeReporterOptions: {
      charts: true,
      reportPageTitle: 'Relatório de Testes',
      embeddeScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: true
    },
  },
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)

      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
    }    
  },
})

