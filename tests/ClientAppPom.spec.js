const { test, expect } = require("@playwright/test");

const { customTest } = require("../APiUtils/testData");

const { PomManager } = require("../PageObjects/PomManager");

const dataSet = JSON.parse(
  JSON.stringify(require("../APiUtils/TestDataClientApp.json"))
);

for (const data of dataSet) {
  test(`@Client Test product Name ${data.productName}`, async ({ page }) => {
    const pomManager = new PomManager(page);
    const loginPage = pomManager.getLogin();
    await loginPage.goto();
    await loginPage.validLogin(data.username, data.password);

    const dashboard = pomManager.getDashBoard();
    await dashboard.searchTheProduct(data.productName);
    await dashboard.clickAddToCart();

    const cartPage = pomManager.getCartPage();
    await cartPage.clickCheckOutButton(data.productName);

    const checkOutPage = pomManager.getCheckoutPage();
    await checkOutPage.fillPersonelInfo("123", "Anandhi", "India");
    await checkOutPage.clickCheckout();

    const orderReviewPage = pomManager.getOrderReviewPage();
    const result = await orderReviewPage.getOrderId();
    await orderReviewPage.gotoMyOrders();
    const orderHistoryPage = pomManager.getOrderHistoryPage();
    await orderHistoryPage.verifyTheOrder(result);
  });
}

customTest.only("@Client Test product Name", async ({ page, testData }) => {
  const pomManager = new PomManager(page);
  const loginPage = pomManager.getLogin();
  await loginPage.goto();
  await loginPage.validLogin(testData.username, testData.password);
  const dashboard = pomManager.getDashBoard();
  await dashboard.searchTheProduct(testData.productName);
  await dashboard.clickAddToCart();
  const cartPage = pomManager.getCartPage();
  await cartPage.clickCheckOutButton(testData.productName);
  const checkOutPage = pomManager.getCheckoutPage();
  await checkOutPage.fillPersonelInfo("123", "Anandhi", "India");
  await checkOutPage.clickCheckout();
});
