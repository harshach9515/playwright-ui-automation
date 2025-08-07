import { base } from '@playwright/test';

export const test = base.test.extend({
    testData: {
        username: "harshachalla85@gmail.com",
        password: "Hvr@12345",
        productName: "ZARA COAT 3",
        country: "India"
    }
});