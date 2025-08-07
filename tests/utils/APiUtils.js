const { expect } = require("@playwright/test");
const { log } = require("console");

let token;
let orderID;

class APIUtils {
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            })
        expect((loginResponse).ok()).toBeTruthy();
        const loignResponseJson = await loginResponse.json();
        token = loignResponseJson.token;
        console.log("Login Token: " + token);
        return token;
    }

    async createOrder(orderPayload, token) {
        const orderApiResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers:
                {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            })
        expect(orderApiResponse.ok).toBeTruthy();
        const orderJson = await orderApiResponse.json();
        console.log(orderJson);
        orderID = orderJson.orders[0];
        console.log(orderJson.orders[0]);
        return orderID;
    }
}
module.exports = { APIUtils };