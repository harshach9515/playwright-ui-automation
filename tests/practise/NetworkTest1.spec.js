import { test, expect } from '@playwright/test';


test("Security Test", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client");

    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const login = page.locator("#login");
    const homepage = page.locator("button[routerlink='/dashboard/']");

    const inputEmail = "harshachalla85@gmail.com";
    await email.fill(inputEmail);
    await password.fill("Hvr@12345");
    await login.click();

    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash");
    await expect(homepage).toBeVisible();

    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=1123112as1' })
    )

    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator('p').last()).toHaveText("You are not authorize to view this order")

})