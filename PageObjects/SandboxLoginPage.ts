import{type Page, type Locator} from "@playwright/test";

export class SandboxLoginPage {
    readonly page:Page;
    readonly userInput: Locator;
    readonly passInput: Locator;
    readonly Loginbotton: Locator;


    constructor ( page: Page){
        this.page = page;
        this.userInput = page.getByTestId('TextInputEnabled').nth(1);
        this.passInput = page.locator ('//input[@type=\'password\']');
        this.Loginbotton = page.locator('div').filter({ hasText: /^Iniciar sesión$/ });

    }


}

