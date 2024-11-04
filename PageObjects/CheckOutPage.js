const { expect } = require("@playwright/test");
class CheckoutPage {
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

    for (let i = 0; i <= optionsCount; i++) {
      const optionText = await this.countryOptions.nth(i).textContent();
      if (optionText.trimStart() === country) {
        await this.countryOptions.nth(i).click();
        break;
      }
    }

    // await expect(
    //   this.page.locator(".user__name [type='text']").first()
    // ).toHaveText("anandhi@gmail.com");
  }

  async clickCheckout() {
    await this.submit.click();
  }
}
module.exports = { CheckoutPage };
