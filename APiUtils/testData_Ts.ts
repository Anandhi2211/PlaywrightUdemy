// const base = require("@playwright/test");

import {test as baseTest} from "@playwright/test"
interface testDataInterface 
{
  username: string;
  password: string;
  productName: string;
}

export const customTest = baseTest.extend<{testData : testDataInterface}>({
  testData: {
    username: "anandhi@gmail.com",
    password: "Password@123",
    productName: "IPHONE 13 PRO",
  },
});
