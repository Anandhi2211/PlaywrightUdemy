import { Locator, Page,expect } from "@playwright/test";
// const { expect } = require("@playwright/test");
export class CheckoutPage {
  page : Page;
  cvv : Locator;
  nameOnTheCard: Locator;
  countryDropDown: Locator;
  countryOptionsSection: Locator;
  countryOptions: Locator;
  submit : Locator;
  optionText : Locator;
  constructor(page) {
    this.page = page;
    this.cvv = this.page.locator(
      "(//div[@class='field small'])//input[@class='input txt']"
    );
    this.nameOnTheCard = this.page.locator(
      "//div[@class='field']//input[@class='input txt']"
    );
    this.countryDropDown = this.page.locator("input[placeholder*=Country]");
    this.countryOptionsSection = this.page.locator(".ta-results");
    this.countryOptions = this.page.locator(".ta-results button");
    this.submit = page.locator(".action__submit");
  }

  async fillPersonelInfo(cvv, nameOnTheCard, country) {
    await this.cvv.fill(cvv);
    await this.nameOnTheCard.fill(nameOnTheCard);
    await this.countryDropDown.pressSequentially(country);
    await this.countryOptionsSection.waitFor();
    const optionsCount = await this.countryOptions.count();

    for (let i = 0; i <optionsCount; i++) {
      let optionText : any;
      optionText = await this.countryOptions.nth(i).textContent();
      if (optionText.trimStart() === country) {
        await this.countryOptions.nth(i).click();
        break;
      }
    }
  }

  async clickCheckout() {
    await this.submit.click();
  }
}
module.exports = { CheckoutPage };
