import{test, expect} from '@playwright/test';
import dotenv from 'dotenv';
import { SandboxLoginPage } from '../PageObjects/SandboxLoginPage';

dotenv.config();

const User = process.env.USER || '';
const Pass = process.env.PASS || '';
const URL = 'https://gtm-pwa.apymsa-testsvr.apymsa.com.mx/login';

test('Tareas',async({page },testinfo) =>{
    const LoginPage = new SandboxLoginPage(page); 

    await page.goto(URL);
    await LoginPage.userInput.fill(User);
    await LoginPage.passInput.fill(Pass);
    await LoginPage.Loginbotton.first().click();

});