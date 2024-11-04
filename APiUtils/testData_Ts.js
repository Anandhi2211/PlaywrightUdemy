"use strict";
// const base = require("@playwright/test");
Object.defineProperty(exports, "__esModule", { value: true });
exports.customTest = void 0;
var test_1 = require("@playwright/test");
exports.customTest = test_1.test.extend({
    testData: {
        username: "anandhi@gmail.com",
        password: "Password@123",
        productName: "IPHONE 13 PRO",
    },
});
