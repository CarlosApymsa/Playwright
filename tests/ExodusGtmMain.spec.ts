import{test, expect} from '@playwright/test';
import dotenv from 'dotenv';
import { SandboxLoginPage } from '../PageObjects/SandboxLoginPage';
import { url } from 'node:inspector';

dotenv.config();

const User = process.env.USER || '';
const Pass = process.env.PASS || '';
const URL = 'https://gtm-pwa.apymsa-testsvr.apymsa.com.mx/login';

test('Asignación', async({page}, testInfo) =>{
    const LoginPage = new SandboxLoginPage(page); 
    
    //Inicio de sesion
    await page.goto(URL);
    await LoginPage.userInput.fill(User);
    await LoginPage.passInput.fill(Pass);
    await LoginPage.Loginbotton.first().click();
    
    //Valida pantalla de inicio 
    await expect(page).toHaveTitle('Inicio');

    await page.getByTestId('MenuItem').first().click();

    //Valida pantalla de asignacion 
    await expect(page).toHaveTitle('Asignación');

    await page.waitForTimeout(2000);

    //Captura de pantalla Asignación
    await testInfo.attach('Asignación',{
        body: await page.screenshot (),
        contentType: 'image/png' 
    });

    //await page.pause();

});

test ('Tareas', async({page}, testInfo)=>{
    const LoginPage = new SandboxLoginPage(page);

    //inicio de sesion 
    await page.goto(URL);
    await LoginPage.userInput.fill(User);
    await LoginPage.passInput.fill(Pass);
    await LoginPage.Loginbotton.first().click();

    //Valida pantalla de inicio 
    await expect(page).toHaveTitle('Inicio');

    await page.getByTestId('MenuItem').nth(1).click();

    //Valida pantalla de Tareas asignadas
    await expect(page).toHaveTitle('Tareas');

    await page.waitForTimeout(2000);
    
    //Captura de pantalla de tareas
    await testInfo.attach('Tareas',{
        body: await page.screenshot(),
        contentType: 'image/png'

    });

    await page.pause();

})

test('Evidencias de envio', async({page}, tesInfo)=>{
    const LoginPage = new SandboxLoginPage(page);
    
    //inicio de sesion
    await page.goto(URL);
    await LoginPage.userInput.fill(User);
    await LoginPage.passInput.fill(Pass);
    await LoginPage.Loginbotton.first().click();
    
    //Valida pantalla de Inicio
    await expect(page).toHaveTitle('Inicio');

    await page.getByTestId('MenuItem').nth(2).click();

    //Valida pantalla evidencias de envio
    await expect(page).toHaveTitle('Evidencia de Envío');

    await page.waitForTimeout(2000)

    await tesInfo.attach('Evidencias de envio', {
        body: await page.screenshot(),
        contentType: 'image/png'
    });


})