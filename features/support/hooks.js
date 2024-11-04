const playwright = require("@playwright/test");
const { PomManager } = require("../../PageObjects/PomManager");
const {
  Before,
  After,
  AfterStep,
  BeforeStep,
  Status,
} = require("@cucumber/cucumber");

Before(async function () {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext();
  this.page = await context.newPage();
  this.pomManager = new PomManager(this.page);
});

After(async function () {
  console.log("Im at the After Section");
});

BeforeStep(function (result) {
  console.log("Im inside BeforeStep");
});

AfterStep(async function (result) {
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: "screenshot.png" });
  }
});
