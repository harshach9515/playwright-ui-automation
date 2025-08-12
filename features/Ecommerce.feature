Feature: Ecommerce Validation

    @Regression
    Scenario: Validate the ClientAppPO page
        Given I navigate to the Ecommerce Application with "harshachalla85@gmail.com" and "Hvr@12345"
        When I add "ZARA COAT 3" to CartPage
        Then I should see "ZARA COAT 3" in the CartPage
        When I enter valid details and Place the order
        Then I should verify the order details in the Order history page
        When I click on the "Logout" button
        Then I should be logged out successfully

         @Validation
    Scenario Outline: Validate the Error Validations page
        Given I navigate to the Ecommerce2 Application with "<username>" and "<password>"
        Then Verify Error message is displayed

    Examples:
        | username               | password      |
        | harshachalla85@gmail.com| Hvr@12345    |
        | invalidUser            | invalidPass   |