const pactum = require('pactum');
const { Given, When, Then, Before, After } = require('@cucumber/cucumber');

let spec = pactum.spec();

Before(() => {
  spec = pactum.spec();  
});

Given(/^I make a (.*) request to (.*)$/, function (method, endpoint) {
  spec[method.toLowerCase()](endpoint);
});

Given(/I set body to/, function (body) {
  try {
    spec.withJson(JSON.parse(body));
  } catch(error) {
    spec.withBody(body);
  }
});

When('I receive a response', async function () {
  await spec.toss();
});

Then('I expect response should have a status {int}', function (code) {
  spec.response().should.have.status(code);
});

Then('I expect response time should be less than {int} ms', function (ms) {
  spec.response().should.have.responseTimeLessThan(ms)
});

After(() => {
  spec.end();
});