const { test, request, expect } = require("@playwright/test");
const { APIUtils } = require("../utils/APiUtils");

const loginPayload = { userEmail: "harshachalla85@gmail.com", userPassword: "Hvr@12345" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "67a8dde5c0d3e6622a297cc8" }] };
let token;
let apiContext;
let orderID;
let apiUtils;


//Before All Tests
test.beforeAll(async () => {
    apiContext = await request.newContext();
    apiUtils = new APIUtils(apiContext, loginPayload);
    token = await apiUtils.getToken();
    orderID = await apiUtils.createOrder(orderPayload, token);

});

//Test One
test.only("End To End Flow - Order status page", async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='orders']").click();
    await page.locator("table tr.ng-star-inserted").first().waitFor();
    const tableRows = page.locator("table tr.ng-star-inserted");
    const rows = await tableRows.count();
    console.log(rows);

    for (let i = 0; i < rows; ++i) {
        const tableorderID = await tableRows.nth(i).locator("th").textContent();
        console.log(tableorderID);
        if (orderID.includes(tableorderID)) {
            console.log("Order Id Found!")
            await tableRows.nth(i).locator("td button.btn-primary").click();
            break;
        }
        else {
            console.log("Order Id Not Found!")
        }
    }
    await page.pause();
});