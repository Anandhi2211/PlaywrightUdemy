class OrderHistory {
  constructor(page) {
    this.page = page;
    this.orderList = this.page.locator("tbody tr");
  }

  async verifyTheOrder(result) {
    const orderCount = await this.orderList.count();
    for (let i = 0; i < orderCount; i++) {
      const tempOrderId = await this.orderList
        .nth(i)
        .locator("th")
        .textContent();
      if (tempOrderId.trim() === result) {
        await this.orderList
          .nth(i)
          .locator("td button[class='btn btn-primary']")
          .click();
        console.log("Order Found");
        break;
      }
    }
  }
}
module.exports = { OrderHistory };
