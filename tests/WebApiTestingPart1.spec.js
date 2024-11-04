const { test, expect, request } = require("@playwright/test");
const { APiUtils } = require("../APiUtils/APiUtils");
const payLoad = {
  userEmail: "anandhi@gmail.com",
  userPassword: "Password@123",
};
const orderPayLoad = {
  orders: [
    { country: "United States", productOrderedId: "6581cade9fd99c85e8ee7ff5" },
  ],
};
let response = {};

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, payLoad);
  response = await apiUtils.createOrder(orderPayLoad);
  console.log("Imhere");
  console.log(response.orderId);
});

test("@Api first item", async ({ page }) => {
  //browser, page  - defined global variable
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);
  await page.goto("https://rahulshettyacademy.com/client/");

  const storedToken = await page.evaluate(() =>
    window.localStorage.getItem("token")
  ); // to check if token is passed
  console.log("Token in localStorage:", storedToken);

  const myOrders = page.locator("button[routerlink='/dashboard/myorders']");
  const orderPage = page.locator(".table");
  const orderList = page.locator("tbody tr");
  await myOrders.click(); // Increase timeout to 60 seconds
  await orderPage.waitFor();
  const orderCount = await orderList.count();
  for (let i = 0; i < orderCount; i++) {
    const tempOrderId = await orderList.nth(i).locator("th").textContent();
    console.log(tempOrderId);
    if (tempOrderId.trim() === response.orderId) {
      await orderList
        .nth(i)
        .locator("td button[class='btn btn-primary']")
        .click();
      console.log("Order Found");
      break;
    }
  }
});
