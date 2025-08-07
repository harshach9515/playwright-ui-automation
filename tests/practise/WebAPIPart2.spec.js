const {test} = require("@playwright/test");

let webContext;

test.beforeAll( async({browser}) =>{

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");

    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const login = page.locator("#login");

    const inputEmail = "harshachalla85@gmail.com";
    await email.fill(inputEmail);
    await password.fill("Hvr@12345");
    await login.click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    page.close();
    webContext = await browser.newContext({storageState: 'state.json'});
})

test.only("WebAPI Par2", async() =>{
    const page = await webContext.newPage();
     await page.goto("https://rahulshettyacademy.com/client");
    console.log("Hi");
})