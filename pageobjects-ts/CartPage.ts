import { Page, Locator } from "@playwright/test";

/**
 * Author: Harshavardhan Reddy Challa
 * Description: Page Object Model for the Cart Page.
 */

export class CartPage {
    private page: Page;
    private cartHeading: Locator;
    private checkoutButton: Locator;
    /**
     * Initializes the CartPage with Playwright's Page object and sets up selectors.
     * @param {import('@playwright/test').Page} page - Playwright Page object
     */
    constructor(page: Page) {
        this.page = page;
        // Selector for cart page heading or unique element
        this.cartHeading = page.locator("div.cartSection h3");
        this.checkoutButton = page.locator("div.subtotal ul button.btn-primary");
    }

    /**
     * Verifies that the Cart Page is loaded by checking for a unique element.
     * Returns true if loaded, false otherwise.
     * @returns {Promise<boolean>} True if the cart heading is visible, false otherwise.
     */
    async isPageLoaded(): Promise<boolean> {
        try {
            await this.cartHeading.waitFor({ state: 'visible', timeout: 5000 });
            console.log("Cart Page is loaded: " + await this.cartHeading.textContent());
            return true;
        } catch (error) {
            console.error("Cart Page did not load: Cart heading not visible.");
            return false;
        }
    }

    /**
     * Clicks the checkout button on the cart page.
     * Waits for the button to be visible before clicking.
     */
    async clickCheckout() {
        await this.checkoutButton.waitFor({ state: 'visible', timeout: 3000 });
        await this.checkoutButton.click();
    }
}

export default CartPage;