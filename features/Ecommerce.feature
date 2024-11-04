Feature: Ecommerce Validation

    @Regression
    Scenario Outline: Placing Order
        Given Login Credentials username "anandhi@gmail.com" and password "Password@123"
        When Add "IPHONE 13 PRO"
        Then Verify if "IPHONE 13 PRO" is added to the cart
        When Enter valid details for placing order
        Then Verify if the order is present in OrderHistory

# Examples:
#     | prod          |
#     | ZARA COAT 3   |
#     | IPHONE 13 PRO |

