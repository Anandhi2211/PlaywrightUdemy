const { LoginPage } = require("../PageObjects/LoginPage");
const { DashBoard } = require("../PageObjects/DashBoard");
const { CartPage } = require("../PageObjects/CartPage");
const { CheckoutPage } = require("../PageObjects/CheckOutPage");
const { OrderReviewPage } = require("../PageObjects/OrderReviewPage");
const { OrderHistory } = require("../PageObjects/OrderHistory");

class PomManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashBoard = new DashBoard(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.orderReviewPage = new OrderReviewPage(this.page);
    this.orderHistoryPage = new OrderHistory(this.page);
  }

  getLogin() {
    return this.loginPage;
  }
  getDashBoard() {
    return this.dashBoard;
  }
  getCartPage() {
    return this.cartPage;
  }
  getCheckoutPage() {
    return this.checkoutPage;
  }
  getOrderReviewPage() {
    return this.orderReviewPage;
  }

  getOrderHistoryPage() {
    return this.orderHistoryPage;
  }
}

module.exports = { PomManager };
