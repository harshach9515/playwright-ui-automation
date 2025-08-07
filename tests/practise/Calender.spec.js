const {test,expect} = require("@playwright/test")

test("Calendar Examples", async ({page}) =>{

    const month = "6";
    const year = "2027";
    const date = "15";

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
})