Feature: Ecommerce2 Validation

    @Validation
    Scenario Outline: Login Validation
        Given Login username <username> and password <password>
        Then Verify if the Error message is displayed

        Examples:
            | username   | password |
            | anandhi123 | 123      |
            | BBB        | Bdf      |