import { After, Before, BeforeStep, AfterStep, Status } from "@cucumber/cucumber";
import playwright from 'playwright'
import LoginPage from '../../pageobjects/LoginPage.js';
import HomePage from "../../pageobjects/HomePage.js";
import CartPage from "../../pageobjects/CartPage.js";
import CheckOut from "../../pageobjects/Checkout.js";
import OrderHistoryPage from "../../pageobjects/OrderHistoryPage.js";
import path from "path";


Before(async function () {
    this.browser = await playwright.chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    // You can also initialize page objects here if needed
    this.loginPage = new LoginPage(this.page);
    this.homePage = new HomePage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckOut(this.page);
    this.orderHistoryPage = new OrderHistoryPage(this.page);
});

After(async function () {
    // Close the page and context after each scenario
    if (this.page) {
        await this.page.close();
    }
    if (this.context) {
        await this.context.close();
    }
    // Optionally close the browser if you want to start fresh for each scenario
    if (this.browser) {
        await this.browser.close();
    }
});

BeforeStep(async function () {
    // This hook runs before each step, you can add any setup code here if needed
    console.log("Before Step Hook: Executing before each step");
});

AfterStep(async function ({ result }) {
    // This hook runs after each step, you can add any cleanup code here if needed
    console.log("After Step Hook: Executing after each step");
    if (result.status === Status.FAILED) {
        // Take a screenshot if the step failed
        await this.page.screenshot({ path: `screenshots/failed-step-${Date.now()}.png` });
        console.log("Step failed, screenshot taken.");
    } else {
        console.log("Step passed successfully.");
    }

});