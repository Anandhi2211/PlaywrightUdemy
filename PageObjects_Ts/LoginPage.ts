import { Locator, Page } from "@playwright/test";

export class LoginPage {
  page : Page;
  uname : Locator;
  pword : Locator;
  loginButton : Locator;
  
  constructor(page) {
    this.page = page;
    this.uname = page.locator(
      "//div[@class='form-group']/input[@id='userEmail']"
    );
    this.pword = page.locator(
      "//div[@class='form-group mb-4']/input[@id='userPassword']"
    );
    this.loginButton = page.locator(
      "//input[@class='btn btn-block login-btn']"
    );
  }

  async goto() {
    await this.page.goto("https://rahulshettyacademy.com/client/");
  }

  async validLogin(uname, pword) {
    await this.uname.fill(uname);
    await this.pword.fill(pword);
    await this.loginButton.click();
    await this.page.waitForLoadState("networkidle");
  }
}
module.exports = { LoginPage };
