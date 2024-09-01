import { Given, When, Then } from '@cucumber/cucumber';
import request from 'supertest';
import { expect  } from 'pactum';
import { app } from '../../../../application'


let response: request.Response;
  
Given('I have a payment payload', function (body) {
  this.payload = body
});

When('I send a POST request to \\/api\\/v1\\/payments', async function () {
  response = await request(await app).post('/api/v1/payments').send(this.payload);
});

Then('I should get a {int} status code', function (int){
  
  expect(response.status, int)

});


