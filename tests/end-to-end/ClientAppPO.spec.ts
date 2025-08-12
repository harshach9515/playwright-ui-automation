import { expect, test, Browser, Page, BrowserContext } from "@playwright/test";
import LoginPage from '../../pageobjects-ts/LoginPage.js';
import HomePage from "../../pageobjects-ts/HomePage.js";
import CartPage from "../../pageobjects-ts/CartPage.js";
import CheckOut from "../../pageobjects-ts/Checkout.js";
import OrderHistoryPage from "../../pageobjects-ts/OrderHistoryPage.js";


// Define the type for your test data
interface TestData {
  username: string;
  password: string;
  productName: string;
  country: string;
}



test.describe.configure({ mode: 'parallel' });

test("End To End Flow - Order status page", async ({ browser }) => {

    // --------- Browser & Page Setup ---------
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();

    // --------- Login Page Actions ---------
    const loginPage = new LoginPage(page);
    await loginPage.navigate("https://rahulshettyacademy.com/client");
    await loginPage.validLogin(testData.username, testData.password);

    // --------- Home Page Actions ---------
    const homePage = new HomePage(page);
    await homePage.verifyHomePage();
    await homePage.clickProduct(testData.productName);
    await homePage.clickOnCart();

    // --------- Cart Page Actions ---------
    const cartPage = new CartPage(page);
    const isCartPageLoaded: boolean = await cartPage.isPageLoaded();
    expect(isCartPageLoaded).toBeTruthy();
    await cartPage.clickCheckout();

    // --------- Checkout Page Actions ---------
    const checkoutPage = new CheckOut(page);
    await checkoutPage.selectCountry(testData.country);
    await checkoutPage.clickPlaceOrder();

    const orderNumber: string = await checkoutPage.getOrderID();
    console.log("Order Number: " + orderNumber);

    const isOrderSuccess: boolean = await checkoutPage.verifyOrderSuccess();
    expect(isOrderSuccess).toBeTruthy();
    const orderID: string = await checkoutPage.getOrderID();
    console.log("OrderID: " + orderID);
    await checkoutPage.clickOrderHistoryPage();

    // --------- Order History Page Actions ---------
    const orderHistoryPage = new OrderHistoryPage(page);
    const isOrderHistoryPageLoaded: boolean = await orderHistoryPage.isPageLoaded();
    expect(isOrderHistoryPageLoaded).toBeTruthy();
    console.log("Order History Page Loaded Successfully");

    expect(await orderHistoryPage.getOrderNumber(orderNumber)).toBeTruthy();

    await page.close();
    await context.close();
    await browser.close();
    console.log("Test completed successfully");
});

test("test one", async ({ browser }) => {
    // Add your test implementation here
});

test("test two", async ({ browser }) => {
    // Add your test implementation here
});
