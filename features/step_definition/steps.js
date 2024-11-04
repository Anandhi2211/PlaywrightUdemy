const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given(
  "Login Credentials username {string} and password {string}",
  { timeout: 100 * 1000 },
  async function (username, password) {
    const loginPage = this.pomManager.getLogin();
    await loginPage.goto();
    await loginPage.validLogin(username, password);
  }
);

When("Add {string}", async function (productName) {
  const dashboard = this.pomManager.getDashBoard();
  await dashboard.searchTheProduct(productName);
  await dashboard.clickAddToCart();
});

Then("Verify if {string} is added to the cart", async function (productName) {
  const cartPage = this.pomManager.getCartPage();
  await cartPage.clickCheckOutButton(productName);
});

When("Enter valid details for placing order", async function () {
  const checkOutPage = this.pomManager.getCheckoutPage();
  await checkOutPage.fillPersonelInfo("123", "Anandhi", "India");
  await checkOutPage.clickCheckout();
});

Then("Verify if the order is present in OrderHistory", async function () {
  orderReviewPage = this.pomManager.getOrderReviewPage();
  const result = await orderReviewPage.getOrderId();
  await orderReviewPage.gotoMyOrders();
  const orderHistoryPage = this.pomManager.getOrderHistoryPage();
  await orderHistoryPage.verifyTheOrder(result);
});

Given(
  "Login username {string} and password {string}",
  { timeout: 100 * 1000 },
  async function (username, password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const uname = this.page.locator("#username");
    const pwd = this.page.locator("[name='password']");
    const signin = this.page.locator("#signInBtn");
    await uname.fill(username);
    await pwd.fill(password);
    await signin.click();
  }
);

Then("Verify if the Error message is displayed", async function () {
  await expect(this.page.locator("[style*='block']")).toContainText(
    "Incorrect"
  );
});
