import { Page, expect, Locator } from "@playwright/test";

export class HomePage {
    private page: Page;
    private homePage: Locator;
    private products: Locator;
    private cart: Locator;
    /**
    * @param {Page} page
    */
    constructor(page: Page) {
        this.page = page;
        this.homePage = page.locator("button[routerlink='/dashboard/']");
        this.products = page.locator("div.card-body");
        this.cart = page.locator("button[routerlink='/dashboard/cart']");
    }

    async verifyHomePage() {
        await expect(this.page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/dash");
        await expect(this.homePage).toBeVisible();
    }

    /**
     * Clicks "Add To Cart" for the specified product name.
     * Waits for products to be visible before interacting.
     * @param {string} productName
     */
    async clickProduct(productName: string) {
        // Wait for products to be visible
        await this.products.first().waitFor({ state: 'visible', timeout: 5000 });
        const count = await this.products.count();
        console.log("Product Count : " + count);
        for (let i = 0; i < count; ++i) {
            const productTitle = await this.products.nth(i).locator("b").textContent();
            if (productTitle && productTitle.trim() === productName) {
                const addToCartBtn = this.products.nth(i).locator("text=Add To Cart");
                await addToCartBtn.waitFor({ state: 'visible', timeout: 3000 });
                await addToCartBtn.click();
                // Optionally, wait for a toast or cart update here
                break;
            }
        }
    }

    async clickOnCart() {
        await this.cart.waitFor({ state: 'visible', timeout: 3000 });
        await this.cart.click();
    }
}

export default HomePage;