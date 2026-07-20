import {test, expect} from '@playwright/test';
import dotenv from 'dotenv';
import { SandboxLoginPage } from '../PageObjects/SandboxLoginPage';

dotenv.config();


const User = process.env.USER || '';
const Pass = process.env.PASS || '';
const URL = 'https://gtm-pwa.apymsa-testsvr.apymsa.com.mx/login'


test('Ubicacion incorrecta', async({context, page}, testInfo) => {
    const LoginPage = new SandboxLoginPage(page); 
        
    await context.grantPermissions(['geolocation']);
    
    //Localización Lesoto
    await context.setGeolocation({
    latitude: -29.682674,
    longitude: 27.474826 // San Francisco
    });
    
    //Dirige al usuario a la pagina principal 
    await page.goto (URL);
    
    //Inserta valor de usuario
    await LoginPage.passInput.fill(User);

    //Inserta valor de password
    await LoginPage.userInput.fill(Pass);

    //Clic en el boton iniciar sesión
    await LoginPage.Loginbotton.first().click();

    //Valida localizacion invalida
    const sinUbicacion = await page.getByText('No se encontró ninguna sucursal en tu localización');
    await expect (sinUbicacion).toContainText ('No se encontró ninguna sucursal en tu localización');

    //Captura de evicencia
    await testInfo.attach('Ubicacion incorrecta',{
        body: await page.screenshot (),
        contentType: 'image/png' 

    });

    //await page.pause()

});

test('Botón inicio sesión deshabilitado falta usuario', async({page}, testInfo)=>{
    const LoginPage = new SandboxLoginPage (page);

    
    //Dirige al usuario a la pagina principal 
    await page.goto (URL);
    
    //No inserta valor de usuario
    await LoginPage.userInput.fill('');

    //Valida que el usuario este vacío
    await expect(page.locator('//div[@tabindex="-1"]').nth(2))
    .toHaveAttribute('tabindex', '-1');

    //valida que el boton este deshabilitado
    const locator = page.locator(`//div[contains(@style, "background-color: rgb(189, 189, 189)")]`).first();
    await expect(locator).toHaveCSS('background-color','rgb(189, 189, 189)');

    //Inserta valor de password
    await LoginPage.passInput.fill(Pass);

    //Clic en el boton iniciar sesión
    await LoginPage.Loginbotton.first().click();

    //Captura de evicencia
    await testInfo.attach('Botón inicio sesión deshabilitado falta usuario',{
        body: await page.screenshot (),
        contentType: 'image/png' 

    });

    //await page.pause()

});

test('Botón inicio sesión deshabilitado falta pass', async({page}, testInfo)=>{
    const LoginPage = new SandboxLoginPage(page);
    
    //Dirige al usuario a la pagina principal 
    await page.goto (URL);
    
    //Inserta valor de usuario
    await LoginPage.userInput.fill(User);

    //No inserta valor de password
    await LoginPage.passInput.fill('');

    //Valida que el pass este vacío
    await expect(page.locator('//div[@tabindex="-1"]').nth(3))
    .toHaveAttribute('tabindex', '-1');

    //valida que el boton este deshabilitado
    const locator = page.locator(`//div[contains(@style, "background-color: rgb(189, 189, 189)")]`).first();
    await expect(locator).toHaveCSS('background-color','rgb(189, 189, 189)');


    //Clic en el boton iniciar sesión
    await LoginPage.Loginbotton.first().click();

    //Captura de evicencia
    await testInfo.attach('Botón inicio sesión deshabilitado falta pass',{
        body: await page.screenshot (),
        contentType: 'image/png' 
    });

    //await page.pause()

});

test('Usuario incorrecto', async({page}, testInfo)=>{
    const LoginPage = new SandboxLoginPage(page);
    
    //Dirige al usuario a la pagina principal 
    await page.goto (URL);
    
    //Inserta valor incorrecto al usuario
    await LoginPage.userInput.fill('1');

    //Valida que el usuario tenga valor
    await expect(page.getByTestId('TextInputEnabled').nth(1)).toHaveValue('1');

    //Inserta valor de password
    await LoginPage.passInput.fill(Pass);

    // Valida que el pass tenga valor
    await expect(page.locator ('//input[@type=\'password\']')).toHaveValue(Pass);

    //valida que el boton este habilitado
    const locator = page.locator(`//div[contains(@style, "background-color: rgb(27, 56, 146)")]`).first();
    await expect(locator).toHaveCSS('background-color','rgb(27, 56, 146)');

    //Clic en el boton iniciar sesión
    await LoginPage.Loginbotton.first().click();

    //Valida alerta de usuario invalido
    await expect ( page.getByText('El usuario o la contraseña')).toBeVisible();

    //Captura de evicencia
    await testInfo.attach('Usuario incorrecto',{
        body: await page.screenshot (),
        contentType: 'image/png'
    });

    //await page.pause()

});


test('Pass incorrecto', async({page}, testInfo)=>{
    const LoginPage = new SandboxLoginPage (page);
    
    //Dirige al usuario a la pagina principal 
    await page.goto (URL);
    
    //Inserta valor de usuario
    await LoginPage.userInput.fill(User);

    //Valida que el usuario tenga valor
    await expect(page.getByTestId('TextInputEnabled').nth(1)).toHaveValue(User);

    //Inserta valor incorecto al password
    await LoginPage.passInput.fill('9999');

    //Valida que el pass tenga valor
    await expect (page.locator ('//input[@type=\'password\']')).toHaveValue('9999');

    //Clic en visualizar pass
    await page.getByTestId('EyeIcon').click();

    //Valida que el boton este habilitado
    const locator = page.locator(`//div[contains(@style, "background-color: rgb(27, 56, 146)")]`).first();
    await expect(locator).toHaveCSS('background-color','rgb(27, 56, 146)');

    //Clic en el boton iniciar sesión
    await LoginPage.Loginbotton.first().click();
    
    //Valida alerta de pass invalido
    await expect ( page.getByText('El usuario o la contraseña')).toBeVisible();

    //Captura de evicencia
    await testInfo.attach('Pass incorrecto',{
        body: await page.screenshot (),
        contentType: 'image/png' 
    });

    //await page.pause();

});

test('Inicio de sesion correcto', async({page}, testInfo)=>{
    const LoginPage = new SandboxLoginPage(page);
    
    //Dirige al usuario a la pagina principal 
    await page.goto (URL);
    
    //Inserta valor de usuario
    await LoginPage.userInput.fill(User);

    //Valida que el usuario tenga valor
    await expect(page.getByTestId('TextInputEnabled').nth(1)).toHaveValue(User);

    //Inserta valor de password
    await LoginPage.passInput.fill(Pass);

    //Valida que el pass tenga valor
    await expect(page.locator ('//input[@type=\'password\']')).toHaveValue(Pass);

    //Clic en visualizar pass
    await page.getByTestId('EyeIcon').click(); 

    //Valida que el boton este habilitado
    const locator = page.locator(`//div[contains(@style, "background-color: rgb(27, 56, 146)")]`).first();
    await expect(locator).toHaveCSS('background-color','rgb(27, 56, 146)');

    //Captura de evicencia antes de iniciar sesión
    await testInfo.attach('Inicio de sesion correcto 1',{
        body: await page.screenshot (),
        contentType: 'image/png' 
    });

    //Clic en el boton iniciar sesión
    await LoginPage.Loginbotton.first().click();

    //Valida que se recupere la pagina de inicio de sesion
    await expect(page).toHaveTitle('Inicio');

    //Captura de evicencia
    await testInfo.attach('Inicio de sesion correcto 2',{
        body: await page.screenshot (),
        contentType: 'image/png' 
    });

    
    //await page.pause();

});
