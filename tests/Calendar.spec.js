const { test, expect } = require("@playwright/test");

test(" @Basics Calendar Test", async ({ page }) => {
  const date = "10";
  const month = "10";
  const year = "2024";
  const expectedList = [month, date, year];

  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await page.locator(".react-date-picker__wrapper").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.locator(".react-calendar__navigation__label").click();
  // await page.locator(".react-calendar__decade-view__years button");
  await page.getByText(year).click();
  await page
    .locator(".react-calendar__year-view__months button")
    .nth(Number(month) - 1)
    .click();
  // await page.locator(".react-calendar__month-view__days button").nth();
  await page.locator("//abbr[text()='" + date + "']").click();
  const selectedDate = await page.locator(
    ".react-date-picker__inputGroup__input"
  );
  console.log(await selectedDate.count());
  for (let i = 0; i < (await selectedDate.count()); i++) {
    console.log("Success");
    const temp = await selectedDate.nth(i).getAttribute("value");
    expect(temp).toEqual(expectedList[i]);
    console.log(temp);
  }
});
