import {test,expect} from "@playwright/test"

import { customTest } from "../APiUtils/testData_Ts";
// const { test, expect } = require("@playwright/test");
// import { Page } from "@playwright/test";

import { PomManager } from "../PageObjects_Ts/PomManager";
import { LoginPage } from "../PageObjects_Ts/LoginPage";
import { DashBoard } from "../PageObjects_Ts/DashBoard";
import { CartPage } from "../PageObjects_Ts/CartPage";
import { CheckoutPage } from "../PageObjects_Ts/CheckOutPage";
import { OrderReviewPage } from "../PageObjects_Ts/OrderReviewPage";
import { OrderHistory } from "../PageObjects_Ts/OrderHistory";

// const dataSet : any = JSON.parse(JSON.stringify(require("../APiUtils/TestDataClientAppTs.json")));

import dataSet from '../APiUtils/TestDataClientAppTs.json'
// const dataSet : any = require("../APiUtils/TestDataClientApp copy.json");

for (const data of dataSet) {
  test (` @Client Test product Name ${data.productName} `, async ({ page}) => {
    const pomManager : PomManager = new PomManager(page);
    const loginPage : LoginPage = pomManager.getLogin();
    await loginPage.goto();
    await loginPage.validLogin(data.username, data.password);
    const dashboard :DashBoard = pomManager.getDashBoard();
    await dashboard.searchTheProduct(data.productName);
    await dashboard.clickAddToCart();
    const cartPage : CartPage= pomManager.getCartPage();
    await cartPage.clickCheckOutButton(data.productName);
    const checkOutPage :CheckoutPage = pomManager.getCheckoutPage();
    await checkOutPage.fillPersonelInfo("123", "Anandhi", "India");
    await checkOutPage.clickCheckout();
    const orderReviewPage : OrderReviewPage= pomManager.getOrderReviewPage();

    const result: any= await orderReviewPage.getOrderId();
    await orderReviewPage.gotoMyOrders();
    const orderHistoryPage : OrderHistory= pomManager.getOrderHistoryPage();
    await orderHistoryPage.verifyTheOrder(result);
  });
}

customTest("@Client Test product Name", async ({ page, testData}) => {
  const pomManager : PomManager = new PomManager(page);

  const loginPage : LoginPage = pomManager.getLogin();
  await loginPage.goto();
  await loginPage.validLogin(testData.username, testData.password);
  const dashboard :DashBoard = pomManager.getDashBoard();
  await dashboard.searchTheProduct(testData.productName);
  await dashboard.clickAddToCart();
  const cartPage : CartPage= pomManager.getCartPage();
  await cartPage.clickCheckOutButton(testData.productName);
  const checkOutPage :CheckoutPage = pomManager.getCheckoutPage();
  await checkOutPage.fillPersonelInfo("123", "Anandhi", "India");
  await checkOutPage.clickCheckout();

});
