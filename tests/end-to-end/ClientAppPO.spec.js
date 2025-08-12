import { expect, test } from "@playwright/test";
import LoginPage from '../../pageobjects/LoginPage.js';
import HomePage from "../../pageobjects/HomePage.js";
import CartPage from "../../pageobjects/CartPage.js";
import CheckOut from "../../pageobjects/Checkout.js";
import OrderHistoryPage from "../../pageobjects/OrderHistoryPage.js";



test.describe.configure({ mode: 'parallel' }); // Ensure tests run in parallel


test("End To End Flow - Order status page", async ({ browser }) => {

    // --------- Browser & Page Setup ---------
    const context = await browser.newContext();
    const page = await context.newPage();

    // --------- Login Page Actions ---------
    const loginPage = new LoginPage(page);
    await loginPage.navigate("https://rahulshettyacademy.com/client")
    await loginPage.validLogin(testData.username, testData.password);

    // --------- Home Page Actions ---------
    const homePage = new HomePage(page);
    await homePage.verifyHomePage();
    await homePage.clickProduct(testData.productName);
    await homePage.clickOnCart();

    // --------- Cart Page Actions ---------
    const cartPage = new CartPage(page);
    const isCartPageLoaded = await cartPage.isPageLoaded();
    expect(isCartPageLoaded).toBeTruthy();
    await cartPage.clickCheckout();

    // --------- Checkout Page Actions ---------
    const checkoutPage = new CheckOut(page);
    await checkoutPage.selectCountry(testData.country);
    await checkoutPage.clickPlaceOrder();

    const orderNumber = await checkoutPage.getOrderID();
    console.log("Order Number: " + orderNumber);

    const isOrderSuccess = await checkoutPage.verifyOrderSuccess();
    expect(isOrderSuccess).toBeTruthy();
    const orderID = await checkoutPage.getOrderID();
    console.log("OrderID: " + orderID);
    await checkoutPage.clickOrderHistoryPage();

    // --------- Order History Page Actions ---------
    const orderHistoryPage = new OrderHistoryPage(page);
    const isOrderHistoryPageLoaded = await orderHistoryPage.isPageLoaded();
    expect(isOrderHistoryPageLoaded).toBeTruthy();
    console.log("Order History Page Loaded Successfully");

    const isOrderFound = await orderHistoryPage.getOrderNumber(orderNumber);
    expect(isOrderFound).toBeTruthy();
    await page.close();
    await context.close();
    await browser.close();
    console.log("Test completed successfully");
});


