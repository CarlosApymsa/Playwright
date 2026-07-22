import {test, expect} from '@playwright/test';
import dotenv from 'dotenv';
import { SandboxLoginPage } from '../PageObjects/SandboxLoginPage';
import { TaskList } from '../Constants/task-types';

dotenv.config();

const User = process.env.USER || '';
const Pass = process.env.PASS || '';
const URL = 'https://gtm-pwa.apymsa-testsvr.apymsa.com.mx/login';

test ('Recueperar tarea asignada', async ({page}, testInf) =>{
    const LoginPage = new SandboxLoginPage(page);
    
    //Inicio de sesion
    await page.goto(URL);
    await LoginPage.userInput.fill(User);
    await LoginPage.passInput.fill(Pass);
    await LoginPage.Loginbotton.first().click();
    
    //Valida pantalla Inicio
    await expect(page).toHaveTitle('Inicio');

    const responsePromise = page.waitForResponse(response => 
        response.url().includes('/login') &&
        response.status() === 200
    );    

    await page.getByTestId('MainItem').nth(1).click

    const response = await responsePromise;
    const body = await response.json();
    expect(body).toHaveProperty('data');
    expect(body.data.length).toBeGreaterThan(0);

    // const taskName = ( 
    //     await page.getByText(TaskList)
    //     .textContent())?.trim();

    //     expect(Object.values(TaskList)).toContain(taskName);




})