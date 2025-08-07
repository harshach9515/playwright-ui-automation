import {expect, test} from "@playwright/test"

test("First Test", async({page}) =>{

    const username = page.locator("#username");
    const password = page.locator("#password");
    const signInButton = page.locator("#signInBtn");
    const dropdown = page.locator("#login-form select.form-control");
    const homepage = page.locator("div.container h");
    const devices =  page.locator("div.card-body a");
    const submitBtn = page.locator("input.btn.btn-success");
    const alertMes = page.locator("div.alert");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await username.fill("rahulshettyacademy");
    await password.fill("learning");
    await dropdown.selectOption("Teacher");
    await signInButton.click();
    

    const homePageTitle = await homepage.textContent();
    console.log("Home Page Title: " + homePageTitle);
    expect(homePageTitle).toEqual("Shop Name");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(3000);

    const deviceTitles = await devices.allTextContents();
    for(const text of deviceTitles){
        console.log(text);
    }

    const deviceHandles = await devices.elementHandles();
    for(const device of deviceHandles){
        if((await device.innerText()).trim() === "iphone X"){
            await device.click();
            break;
        }
    }

    await submitBtn.click();
   
    const alertText = await alertMes.textContent();
    console.log(alertText)
    expect(alertText).toContain("The Form has been submitted successfully");

    await page.pause();
    await page.close();
});

test("Switch To Window", async ({page}) => {

    const blinkingLink = page.locator(".blinkingText");
    

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //await blinkingLink.click();

    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        blinkingLink.click()
    ]);

    await newPage.waitForLoadState();
    const redText = newPage.locator(".red");
    console.log(await redText.textContent());

    console.log(await blinkingLink.textContent());


})

