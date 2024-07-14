Feature: Pagamentos

    Para manter a API de pagmentos estável
    Eu como testador
    Quero garantir que tudo esteja funcionando conforme esperado


    Scenario: Create a Payment
    Given I have a payment payload      
      """
      {
        "orderId": 300,
        "amount": 2000,
        "paymentDate": "2024-03-09T07:56:00",
        "paymentUniqueNumber": "123"
      }
      """
     When I send a POST request to /api/v1/payments
     Then I should get a 201 status code       