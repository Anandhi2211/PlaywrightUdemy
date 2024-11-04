const { test, expect } = require("@playwright/test");

test("@Basics Frames", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  // await page.goto("https://www.google.com/");
  // await page.goBack();
  // await page.goForward();
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();
  // await page.pause();
  page.on("dialog", (dialog) => dialog.accept());
  await page.locator("#confirmbtn").click();
  await page.locator("#mousehover").hover();
  const frame1 = page.frameLocator("#courses-iframe");
  await frame1.locator("li a[href*='lifetime']:visible").click();
  const fullText = await frame1.locator(".text h2").textContent();
  console.log(fullText.split(" ")[1]);
});
