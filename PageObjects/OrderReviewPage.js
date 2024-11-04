// const { expect } = require("@playwright/test");
class OrderReviewPage {
  constructor(page) {
    this.page = page;
    this.orderConfirmation = this.page.locator(".hero-primary");
    this.order = this.page.locator(".em-spacer-1 .ng-star-inserted");
    this.myOrders = this.page.locator(
      "button[routerlink='/dashboard/myorders']"
    );
    this.orderHistoryTable = this.page.locator(".table");
  }

  async getOrderId() {
    // await expect(this.orderConfirmation).toHaveText(
    //   " Thankyou for the order. "
    // );
    const orderId = await this.order.textContent();
    const result = orderId.trim().split(" ")[1];
    console.log(result);
    return result;
  }

  async gotoMyOrders() {
    await this.myOrders.click();
    await this.orderHistoryTable.waitFor();
  }
}

module.exports = { OrderReviewPage };
