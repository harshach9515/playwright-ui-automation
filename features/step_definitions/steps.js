import { Given, When, Then, setDefaultTimeout, BeforeAll } from '@cucumber/cucumber';

import { expect, test } from "@playwright/test";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const testDataPath = path.join(__dirname, '../../tests/utils/testdata.json');
const testData = JSON.parse(fs.readFileSync(testDataPath, 'utf8'));

setDefaultTimeout(60 * 1000); // Set default timeout to 60 seconds
let orderNumber;

Given('I navigate to the Ecommerce Application with {string} and {string}', async function (username, password) {
    await this.loginPage.navigate("https://rahulshettyacademy.com/client")
    await this.loginPage.validLogin(username, password);
});

When('I add {string} to CartPage', async function (productName) {
    await this.homePage.clickProduct(productName);
    await this.homePage.clickOnCart();
});

Then('I should see {string} in the CartPage', async function (productName) {
    const isCartPageLoaded = await this.cartPage.isPageLoaded();
    expect(isCartPageLoaded).toBeTruthy();
    await this.cartPage.clickCheckout();

});

When('I enter valid details and Place the order', async function () {
    await this.checkoutPage.selectCountry(testData.country);
    await this.checkoutPage.clickPlaceOrder();

    orderNumber = await this.checkoutPage.getOrderID();
    console.log("Order Number: " + orderNumber);

    const isOrderSuccess = await this.checkoutPage.verifyOrderSuccess();
    expect(isOrderSuccess).toBeTruthy();
    const orderID = await this.checkoutPage.getOrderID();
    console.log("OrderID: " + orderID);
    await this.checkoutPage.clickOrderHistoryPage();

});

Then('I should verify the order details in the Order history page', async function () {
    const isOrderHistoryPageLoaded = await this.orderHistoryPage.isPageLoaded();
    expect(isOrderHistoryPageLoaded).toBeTruthy();
    console.log("Order History Page Loaded Successfully");
    const isOrderFound = await this.orderHistoryPage.getOrderNumber(orderNumber);
    expect(isOrderFound).toBeTruthy();

});


Given('I navigate to the Ecommerce2 Application with {string} and {string}', async function (string, string2) {
    await this.loginPage.navigate("https://rahulshettyacademy.com/loginpagePractise/")
    await this.page.locator("#username").fill(string);
    await this.page.locator("#password").fill(string2);
    await this.page.locator("#signInBtn").click();
});



Then('Verify Error message is displayed', async function () {
    const errorMessage = await this.page.locator(".error-message").innerText();
    console.log("Error Message: " + errorMessage);
    expect(errorMessage).toBeTruthy();
    expect(errorMessage).toContain("Invalid username or password");
});