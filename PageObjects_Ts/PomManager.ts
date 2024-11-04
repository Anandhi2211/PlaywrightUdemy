import { LoginPage } from "../PageObjects_Ts/LoginPage";
import { CartPage } from "../PageObjects_Ts/CartPage";
import { DashBoard } from "../PageObjects_Ts/DashBoard";
import { CheckoutPage } from "../PageObjects_Ts/CheckOutPage";
import { OrderHistory } from "../PageObjects_Ts/OrderHistory";
import { OrderReviewPage } from "../PageObjects_Ts/OrderReviewPage";
import { Page } from "@playwright/test";

export class PomManager {


  page :Page;
  loginPage : LoginPage;
  dashBoard : DashBoard;
  cartPage : CartPage;
  checkoutPage : CheckoutPage;
  orderReviewPage : OrderReviewPage;
  orderHistoryPage : OrderHistory;

  constructor(page) {
    this.page = page;
    this.loginPage  = new LoginPage(this.page);
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
