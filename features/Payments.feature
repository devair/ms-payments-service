Feature: Pagamentos

    Para manter a API de pagmentos estável
    Eu como testador
    Quero garantir que tudo esteja funcionando conforme esperado


    Scenario: Create a Payment
    Given I make a POST request to /api/v1/payments
      And I set body to
      """
      {
        "orderId": 500,
        "amount": 2000,
        "paymentDate": "2024-03-09T07:56:00",
        "paymentUniqueNumber": "123"
      }
      """
     When I receive a response
     Then I expect response should have a status 201
     Then I expect response time should be less than 3000 ms