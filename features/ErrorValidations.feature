Feature: Error Validations

    @Validation
    Scenario Outline: Validate the Error Validations page
        Given I navigate to the Ecommerce2 Application with "<username>" and "<password>"
        Then Verify Error message is displayed

    Examples:
        | username               | password      |
        | harshachalla85@gmail.com| Hvr@12345    |
        | invalidUser            | invalidPass   |