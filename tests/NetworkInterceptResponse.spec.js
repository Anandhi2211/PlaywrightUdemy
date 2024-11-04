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
const fakePayLoad = { data: [], message: "No Orders" };
let response = {};

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, payLoad);
  response = await apiUtils.createOrder(orderPayLoad);
  console.log("Imhere");
  console.log(response.orderId);
});

test(" @Network first item", async ({ page }) => {
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
  page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      //intercept responce(get the response)(APi Response)-> Modify (fake/mock response)->inject to browser
      const mockResponse = await page.request.fetch(route.request());
      const body = JSON.stringify(fakePayLoad);
      route.fulfill({
        mockResponse,
        body,
      });
    }
  );

  await myOrders.click(); // Increase timeout to 60 seconds
  //   await page.pause();
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
    // "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/66e1aa30ae2afd4c0b70f65a"
  );
});
