import { Page, Locator} from "@playwright/test";

export class LoginPage {
    private page: Page;
    private userName: Locator;
    private password: Locator;
    private loginBtn: Locator;

   /**
   * @param {Page} page
   */
    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginBtn = page.locator("#login");
    }

    async navigate(url:string) {
        await this.page.goto(url);

    }

    async validLogin(username:string, password:string) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }
}
export default LoginPage;