const {test} = require("@playwright/test");

test("Place Order", async({page}) => {
    await page.route("",
        async route=>{
            const response  = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayLoad);
            route.fulfill(
                {
                    response,
                    body,
                }
            )

        }
    )

});
  