const base = require("@playwright/test");

exports.customTest = base.test.extend({
  testData: {
    username: "anandhi@gmail.com",
    password: "Password@123",
    productName: "IPHONE 13 PRO",
  },
});
