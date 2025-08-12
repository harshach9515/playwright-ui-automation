import { Page, expect, Locator } from "@playwright/test";

 export class OrderHistoryPage {
    private page: Page;
    private orderHistoryTable: Locator;
    private orderRows: Locator;
    constructor(page) {
        this.page = page;
        this.orderHistoryTable = page.locator('table:has-text("Order Id")');
        this.orderRows = page.locator('table tbody tr');
    }

    async isPageLoaded() {
        return await this.orderHistoryTable.isVisible();
    }

    /**
     * Finds and clicks the "View" button for the given orderID.
     * @param {string} orderID - The order ID to search for.
     * @returns {Promise<boolean>} - Returns true if order is found and clicked, false otherwise.
     */
    async getOrderNumber(orderID:string) {
        // Wait for the table to be visible
        await this.orderHistoryTable.waitFor({ state: 'visible', timeout: 5000 });
        // Use tbody tr for all order rows
        const tableRows = await this.orderRows
        const rows = await tableRows.count();
        console.log("Order rows found:", rows);

        for (let i = 0; i < rows; ++i) {
            let tableOrderID = await tableRows.nth(i).locator("th").textContent();
            console.log("Checking Order ID:", tableOrderID);
            // Remove all whitespace and pipes for comparison
            const normalizedTableOrderID = tableOrderID?.trim().replace(/\s|\|/g, '');
            const normalizedOrderID = orderID.replace(/\s|\|/g, '');
            if (normalizedTableOrderID === normalizedOrderID) {
                console.log("Order Id Found!", tableOrderID);
                await tableRows.nth(i).locator("td button.btn-primary").waitFor({ state: 'visible', timeout: 3000 });
                await tableRows.nth(i).locator("td button.btn-primary").click();
                return true;
            }
        }
    }
}

export default OrderHistoryPage;