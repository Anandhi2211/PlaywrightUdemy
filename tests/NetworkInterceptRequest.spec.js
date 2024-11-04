const { test, expect } = require("@playwright/test");

test(" @Network Request Intercept", async ({ page }) => {
  const username = page.locator(
    "//div[@class='form-group']/input[@id='userEmail']"
  );
  const password = page.locator(
    "//div[@class='form-group mb-4']/input[@id='userPassword']"
  );
  const myOrders = page.locator("button[routerlink='/dashboard/myorders']");
  const signup = page.locator("//input[@class='btn btn-block login-btn']");
  await page.goto("https://rahulshettyacademy.com/client/");
  await username.fill("anandhi@gmail.com");
  await password.fill("Password@123");
  await signup.click();
  await page.waitForLoadState("networkidle");
  await myOrders.click();

  page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6705ab86ae2afd4c0b944ac1",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6705ab86ae2afd4c0b944ac11",
      })
  );

  // This approach is often used in testing to simulate different server responses or test edge cases.
  // By changing the URL slightly, you may be able to force an error response
  // (like a 404 Not Found), allowing you to see how your application handles cases
  // where data is unavailable or the endpoint doesn’t exist.

  await page.locator("button:has-text('View')").first().click();

  await expect(page.locator("p").last()).toHaveText(
    "You are not authorize to view this order"
  );
});
