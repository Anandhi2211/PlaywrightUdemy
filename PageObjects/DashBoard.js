class DashBoard {
  constructor(page) {
    this.page = page;
    this.products = this.page.locator(".card-body");
    this.productTitle = this.page.locator(
      "//div[@class = 'card']/div[@class='card-body']//b"
    );
    this.cartButton = this.page.locator(
      "//button[@class='btn btn-custom' and contains(text(), 'Cart')]"
    );
    this.checkOutButton = this.page.locator("//button[text()='Checkout']");
  }

  async searchTheProduct(productName) {
    const count = await this.products.count();
    // console.log(productName);
    // const temp = await this.products.locator("b").textContent();
    // console.log(await this.productTitle.textContent());
    for (let i = 0; i <= count; i++) {
      // const tempProd = await this.products.nth(i).locator("b").textContent();
      // console.log(tempProd);
      console.log(count, await this.products.nth(i).locator("b").textContent());
      console.log(count, productName);
      if (
        (await this.products.nth(i).locator("b").textContent()) === productName
      ) {
        await this.products.nth(i).locator("text= Add to Cart").click();
        break;
      }
    }
  }

  async clickAddToCart() {
    await this.cartButton.click();
  }
}

module.exports = { DashBoard };
