const { test, expect } = require("@playwright/test");
const { count } = require("console");
const exp = require("constants");
const path = require("path");
let webContext;

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext(); //we can add cookies/plugins
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client/");
  const username = page.locator(
    "//div[@class='form-group']/input[@id='userEmail']"
  );
  const password = page.locator(
    "//div[@class='form-group mb-4']/input[@id='userPassword']"
  );
  const signup = page.locator("//input[@class='btn btn-block login-btn']");
  await username.fill("anandhi@gmail.com");
  await password.fill("Password@123");
  await signup.click();
  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "state.json" });
  webContext = await browser.newContext({ storageState: "state.json" });
});

test("@Api first item Name", async () =>
  //browser, page  - defined global variable
  {
    const productName = "ZARA COAT 3";
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/");
    const titles = page.locator(
      "//div[@class = 'card']/div[@class='card-body']//b"
    );
    const product = page.locator(".card-body");
    const cartButton = page.locator(
      "//button[@class='btn btn-custom' and contains(text(), 'Cart')]"
    );
    const productCount = await product.count();
    const checkoutButton = page.locator("//button[text()='Checkout']");
    const cvvTxtBox = page.locator(
      "(//div[@class='field small'])//input[@class='input txt']"
    );
    const nameOnCardTxtBox = page.locator(
      "//div[@class='field']//input[@class='input txt']"
    );
    const countryDropDown = page.locator("input[placeholder*=Country]");
    const optionSection = page.locator(".ta-results");
    const options = page.locator(".ta-results button");
    const myOrders = page.locator("button[routerlink='/dashboard/myorders']");
    const orderPage = page.locator(".table");
    // const orderList = page.locator("//tr[@class = 'ng-star-inserted']//th");
    const orderList = page.locator("tbody tr");

    // await page.locator("//div[@class = 'card']/div[@class='card-body']//b").first().waitFor();
    console.log(await titles.allTextContents());
    const titleText = await titles.allTextContents();
    // const count = await productCount.count
    for (let i = 0; i <= productCount; i++) {
      if ((await product.nth(i).locator("b").textContent()) === productName) {
        await product.nth(i).locator("text= Add to Cart").click();
        break;
      }
    }
    await cartButton.click();
    await page.locator("div ul li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await checkoutButton.click();
    await cvvTxtBox.fill("123");
    await nameOnCardTxtBox.fill("Anandhi");
    // await couponTxtBox.fill("10");
    // await couponButton.click();
    await countryDropDown.pressSequentially("Ind");
    await optionSection.waitFor();
    const optionsCount = await options.count();
    for (let i = 0; i <= optionsCount; i++) {
      const optionText = await options.nth(i).textContent();
      if (optionText === " India") {
        await options.nth(i).click();
        break;
      }
    }
    // const texstt = await page.locator("//div[@class = 'user__name mt-5']//label").textContent();
    // const texstt = await page.locator("//div[contains(@class, 'user__name') and contains(@class, 'mt-5')]//label").textContent();
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(
      "anandhi@gmail.com"
    );
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(
      " Thankyou for the order. "
    );
    const orderId = await page
      .locator(".em-spacer-1 .ng-star-inserted")
      .textContent();
    const result = orderId.trim().split(" ")[1];
    console.log(result);
    await myOrders.click();
    await orderPage.waitFor();
    const orderCount = await orderList.count();
    for (let i = 0; i < orderCount; i++) {
      const tempOrderId = await orderList.nth(i).locator("th").textContent();
      console.log(tempOrderId);
      if (tempOrderId.trim() === result) {
        await orderList
          .nth(i)
          .locator("td button[class='btn btn-primary']")
          .click();
        console.log("Order Found");
        break;
      }
    }
  });
