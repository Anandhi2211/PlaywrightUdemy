const { test, expect } = require("@playwright/test");
const { constants } = require("buffer");
const exp = require("constants");
const { openAsBlob } = require("fs");

test("Context Browser first test", async ({ browser }) => {
  //browser, page  - defined global variable
  const context = await browser.newContext(); //we can add cookies/plugins
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const username = page.locator("#username");
  const password = page.locator("[name='password']");
  const signin = page.locator("#signInBtn");
  const titles = page.locator(
    "//div[@class='card-body']/h4[@class='card-title']/a"
  );

  await username.fill("rahulshettyac1ademy");
  await password.fill("learning");
  await signin.click();

  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");

  await username.fill("");
  await username.fill("rahulshettyacademy");
  await signin.click();

  // console.log(await titles.first().textContent());

  console.log(await titles.allTextContents());
  //playwright code
});

test("@Basics UIControls", async ({ browser }) => {
  //browser, page  - defined global variable
  const context = await browser.newContext(); //we can add cookies/plugins
  const page = await context.newPage();

  page.on("request", (request) => console.log(request.url()));
  page.on("response", (response) => console.log(response.status()));

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const username = page.locator("#username");
  const password = page.locator("[name='password']");
  const signin = page.locator("#signInBtn");
  const dropDownOptions = page.locator("//select[@class = 'form-control']");
  const radioButtons = page.locator(
    "//label[@class = 'customradio']/span[@class = 'radiotextsty']"
  );
  const checkedButton = page.locator("#terms");
  const blinkingText = page.locator("a[href*='documents-request']");
  const blinkingTextLink = page.locator(".blinkingText");

  // const titles = page.locator("//div[@class='card-body']/h4[@class='card-title']/a");
  await username.fill("rahulshettyacademy");
  await password.fill("learning");
  await dropDownOptions.selectOption("consult");
  await radioButtons.last().click();
  await page.locator("#okayBtn").click();
  console.log(await radioButtons.last().isChecked());
  await expect(radioButtons.last()).toBeChecked();
  await checkedButton.click();
  expect(await checkedButton.toBeChecked);
  await checkedButton.uncheck();
  expect(await checkedButton.isChecked()).toBeFalsy();
  await expect(blinkingText).toHaveAttribute("class", "blinkingText");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    blinkingTextLink.click(),
  ]);

  const text = await newPage.locator(".im-para.red").textContent();
  console.log(text.split("@")[1].split(" ")[0]);
  const id = text.split("@")[1].split(" ")[0];
  await username.fill(id);

  // await page.pause();

  // await page.pause();
  // await signin.click();
});

test("@Basics Page first test", async ({ page }) => {
  //browser, page  - defined global variable
  await page.goto("https://rahulshettyacademy.com/");
  console.log(await page.title());
  await expect(page).toHaveTitle(
    "Selenium, API Testing, Software Testing & More QA Tutorials | Rahul Shetty Academy"
  );

  await page.locator(".header-upper").screenshot({ path: "screenshot2.png" });
  await page.screenshot({ path: "screenshot1.png" });

  await page.goto("https://www.google.com/");
  expect(await page.screenshot()).toMatchSnapshot("Original.png");

  //playwright code
});
