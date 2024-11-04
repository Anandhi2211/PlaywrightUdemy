import { Locator, Page } from "@playwright/test";
const { expect } = require("@playwright/test");
export class CartPage {
  page :Page;
  checkOutButton : Locator;
  cartList:Locator

  constructor(page) {
    this.page = page;
    this.checkOutButton = this.page.locator("//button[text()='Checkout']");
    this.cartList = this.page.locator("div ul li");
  }

  async clickCheckOutButton(productName : String) {
    await this.cartList.first().waitFor();
    const bool = await this.page
      .locator(`h3:has-text("${productName}")`)
      .isVisible();
    expect(bool).toBeTruthy();
    await this.checkOutButton.click();
  }
}
module.exports = { CartPage };
