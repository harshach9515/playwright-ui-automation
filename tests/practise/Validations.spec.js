import { test, expect } from '@playwright/test';


test("Validation ", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice");
    //  await page.goto("https://google.com");
    //  await page.goBack();
    //  await page.goForward();

    await expect(page.locator("#show-textbox")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("s#how-textbox")).toBeHidden();

    await page.on("dialog", dialog => dialog.accept())
    const frame = page.frameLocator("");
    await frame.locator("local:visible").click();
    const text = frame.locator("").textContent();
    text.text.split(" ")[1];
})

test("ScreenShot Test", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice");
    await expect(page.locator("#show-textbox")).toBeVisible();
     await page.locator('#hide-textbox').screenshot({ path: "hide.png" });
    await page.locator("#hide-textbox").click();

    await page.screenshot({ path: "screenshot.png" });
    await expect(page.locator("s#how-textbox")).toBeHidden();

})

test.only("Visual testing", async({page}) =>{
    await page.goto("https://google.com");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
})