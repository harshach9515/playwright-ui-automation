import { Page, Locator } from "@playwright/test";

export class CheckOut{
    private page: Page;
    private checkoutButton: Locator;
    private continueButton: Locator;
    private countryName: Locator;
    private placeOrderButton: Locator;
    private orderSuccessMessage: Locator;
    private orderID: Locator;
    private orderHistoryPage: Locator;
    /**
     * Initializes the CheckOut page with Playwright's Page object and sets up selectors.
     * @param {import('@playwright/test').Page} page - Playwright Page object
     */
    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.locator('button[name="checkout"]');
        this.continueButton = page.locator('button[name="continue"]');
        this.countryName = page.locator("input[placeholder='Select Country']");
        this.placeOrderButton = page.locator("a.action__submit");
        this.orderSuccessMessage = page.locator("h1.hero-primary");
        this.orderID = page.locator("td.em-spacer-1 label.ng-star-inserted");
        this.orderHistoryPage = page.locator("text=Orders History Page");
    }

    /**
     * Clicks the checkout button on the checkout page.
     */
    async clickCheckout() {
        await this.checkoutButton.waitFor({ state: 'visible', timeout: 3000 });
        await this.checkoutButton.click();
    }

    /**
     * Selects a country from the dropdown by typing and clicking the matching option.
     * @param {string} country - The country name to select.
     */
    async selectCountry(country: string) {
        await this.countryName.type(country, { delay: 100 });
        const dropdown = this.page.locator(".ta-results");
        await dropdown.waitFor();

        const count1 = await dropdown.locator("button").count();
        for (let i = 0; i < count1; ++i) {
            let text = await dropdown.locator("button").nth(i).textContent();
            if (text && text.trim() === country) {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    /**
     * Clicks the "Place Order" button to submit the order.
     */
    async clickPlaceOrder() {
        await this.placeOrderButton.waitFor({ state: 'visible', timeout: 3000 });
        await this.placeOrderButton.click();
    }

    /**
     * Verifies if the order was placed successfully by checking the success message.
     * @returns {Promise<boolean>} True if the success message matches, else false.
     */
    async verifyOrderSuccess(): Promise<boolean> {
        await this.orderSuccessMessage.waitFor();
        const successText = await this.orderSuccessMessage.textContent();
        return (successText?.trim() ?? "") === "Thankyou for the order.";
    }

    /**
     * Retrieves the order ID from the confirmation page.
     * @returns {Promise<string>} The order ID.
     */
    async getOrderID(): Promise<string> {
        await this.orderID.waitFor();
        const orderID = await this.orderID.textContent();
        return orderID ?? "";
    }

    /**
     * Navigates to the Order History page by clicking the corresponding link.
     */
    async clickOrderHistoryPage(){
        await this.orderHistoryPage.waitFor({ state: 'visible', timeout: 3000 });
        await this.orderHistoryPage.click();
        await this.page.locator("table tr.ng-star-inserted").first().waitFor();
    }
}

export default CheckOut;