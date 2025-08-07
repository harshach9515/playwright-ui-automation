import {expect, test} from "@playwright/test"

test("Client App Register", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client");

    const registerLink = page.locator("a.text-reset")
    const firstname = page.locator("#firstName");
    const lastname = page.locator("#lastName");
    const email = page.locator("#userEmail");
    const phonenumber = page.locator("#userMobile");
    const occupation = page.locator("select[formcontrolname='occupation']");
    const gender = page.locator("input[value='Male']");
    const password = page.locator("#userPassword");
    const confirmpassword = page.locator("#confirmPassword");
    const checkbox = page.locator("input[type='checkbox']");
    const registerBtn = page.locator("#login");


    await registerLink.click();
    await firstname.fill("harsha");
    await lastname.fill("chall");
    await email.fill("harshachalla85@gmail.com");
    await phonenumber.fill("1234234111");
    await occupation.selectOption("Doctor");
    await gender.click();
    await password.fill("Hvr@12345");
    await confirmpassword.fill("Hvr@12345");
    await checkbox.click();
    await registerBtn.click();

    await page.pause();

});

test.only("End To End Flow - Order status page", async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client");

    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const login = page.locator("#login");
    const homepage = page.locator("button[routerlink='/dashboard/']");
    const products = page.locator("div.card-body");
    const addtocart = page.locator("div.card-body i[class*='shopping-cart']");
    const cart = page.locator("button[routerlink='/dashboard/cart']");
    const cartItem = page.locator("div.cartSection h3");
    const checkout = page.locator("div.subtotal ul button.btn-primary");

    const textEmail = page.locator("div.user__name label")
    const placeOrder = page.locator("a.action__submit");
    const cardNumber = page.locator("")
    const expiryDate = page.locator("")
    const cvv = page.locator("")
    const nameOnCard = page.locator("")
    const applyCoupon = page.locator("")

    const selectCountry = page.locator("input[placeholder='Select Country']");

    const inputEmail = "harshachalla85@gmail.com";

    await email.fill(inputEmail);
    await password.fill("Hvr@12345");
    await login.click();

    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash");
    await expect(homepage).toBeVisible();

    const count = await products.count();
    console.log("Count: "+count)
    const productName = "ZARA COAT 3";
    
   for(let i=0; i<count;++i){
    if(await products.nth(i).locator("b").textContent() === productName){
        await products.nth(i).locator("text=Add To Cart").click();
        break;
    }

   }


    await cart.click();
    await page.locator("div li").first().waitFor();
    const bool = await cartItem.isVisible();
    expect(bool).toBeTruthy();

    const product = await cartItem.textContent();
    expect(product).toEqual(productName);
    await checkout.click();

    await selectCountry.type("ind", {delay:100})
    const dropdown = page.locator(".ta-results")
    await dropdown.waitFor();

    const count1 = await dropdown.locator("button").count();
    for(let i=0;i<count1;++i){
        let text = await dropdown.locator("button").nth(i).textContent();
        if(text.trim() === "India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    
    await expect(textEmail).toHaveText(inputEmail);

    await placeOrder.click();
    await page.locator("h1.hero-primary").waitFor();
    const successText = await page.locator("h1.hero-primary").textContent();
    expect(successText.trim()).toEqual("Thankyou for the order.");

    const orderID = await page.locator("td.em-spacer-1 label.ng-star-inserted").textContent();
    console.log("OrderID: "+orderID);

    await page.locator("text=Orders History Page").click();

    await page.locator("table tr.ng-star-inserted").first().waitFor();
    const tableRows = page.locator("table tr.ng-star-inserted");
    const rows = await tableRows.count();
    console.log(rows);
    
    for(let i=0;i<rows; ++i){
        const tableorderID = await tableRows.nth(i).locator("th").textContent();
        console.log(tableorderID);
        if(orderID.includes(tableorderID)){
            console.log("Order Id Found!")
            await tableRows.nth(i).locator("td button.btn-primary").click();
            break;
        }
        else{
            console.log("Order Id Not Found!")
        }
    }

   await page.pause();
});
