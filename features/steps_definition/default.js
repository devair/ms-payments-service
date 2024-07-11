const { request, settings,mock } = require('pactum');
const { Before } = require('@cucumber/cucumber');

Before(() => {
  request.setBaseUrl('https://reqres.in'); // A hosted REST-API ready to respond to your AJAX requests
  settings.setReporterAutoRun(false);
});