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
    
    const responsePromise = page.waitForResponse(response => 
        response.url().includes('/gt/v1/generalTask/api/v1/task/unassigned?branchOfficeId=25&employeeId=1931&roleId=1') && response.status() === 200
    );
   
    //Inicio de sesion
    await page.goto(URL);

    await LoginPage.userInput.fill(User);
    await LoginPage.passInput.fill(Pass);
    await LoginPage.Loginbotton.first().click();

    
    
    //Valida pantalla Inicio
    await expect(page).toHaveTitle('Inicio');

    page.on('response', response => {
    console.log(
        response.status(),
        response.url()
    );
});

    await page.getByTestId('MenuItem').nth(1).click();


    

    const response = await responsePromise;
    const body = await response.json();
    expect(body).toHaveProperty('data');
    expect(body.data.length).toBeGreaterThan(0);

    // const taskName = ( 
    //     await page.getByText(TaskList)
    //     .textContent())?.trim();

    //     expect(Object.values(TaskList)).toContain(taskName);

    await page.pause();




});

