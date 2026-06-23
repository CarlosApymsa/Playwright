import {test, expect} from '@playwright/test' 
import { array } from 'node:stream/iter';
const URL = 'https://gtm-pwa.apymsa-testsvr.apymsa.com.mx/login'
const User = '1931'
const Pass = '0000'


test('Ubicacion incorrecta', async({context, page})=>{
    
    await context.grantPermissions(['geolocation']);

    //Localización Lesoto//
    await context.setGeolocation({
    latitude: -29.682674,
    longitude: 27.474826 // San Francisco
    });
    
    //Dirige al usuario a la pagina principal 
    await page.goto (URL);
    
    //No inserta valor de usuario
    await page.getByTestId('TextInputEnabled').nth(1).fill(User);

    //Inserta valor de password
    await page.locator ('//input[@type=\'password\']').fill(Pass);

    //Clic en el boton iniciar sesión
    await page.locator('div').filter({ hasText: /^Iniciar sesión$/ }).first().click();

    //Prueba de localizacion invalida
    const sinUbicacion = await page.getByText('No se encontró ninguna sucursal en tu localización');
    await expect (sinUbicacion).toContainText ('No se encontró ninguna sucursal en tu localización');

    await page.pause()

});

test('Botón inicio sesión deshabilitado falta usuario', async({page})=>{
    
    //Dirige al usuario a la pagina principal 
    await page.goto (URL);
    
    //No inserta valor de usuario
    await page.getByTestId('TextInputEnabled').nth(1).fill('');

    // Validar que el usuario este vacío
    await expect(page.locator('//div[@tabindex="-1"]').nth(2))
    .toHaveAttribute('tabindex', '-1');

    //valida que el boton este deshabilitado
    const estilo = 'align-items: center; justify-content: center; flex-shrink: 1; border-radius: 9.16667px; height: 54px; width: 660px; background-color: rgb(189, 189, 189);';
    const locator = page.locator(`//div[@style="${estilo}"]`).first();
    await expect(locator).toHaveAttribute('style', estilo);

    //Inserta valor de password
    await page.locator ('//input[@type=\'password\']').fill(Pass);

    //Clic en el boton iniciar sesión
    await page.locator('div').filter({ hasText: /^Iniciar sesión$/ }).first().click();

    //await page.pause()

});

test('Botón inicio sesión deshabilitado falta pass', async({page})=>{
    
    //Dirige al usuario a la pagina principal 
    await page.goto (URL);
    
    //No inserta valor de usuario
    await page.getByTestId('TextInputEnabled').nth(1).fill(User);

    //Inserta valor de password
    await page.locator ('//input[@type=\'password\']').fill('');

        // Validar que el usuario este vacío
    await expect(page.locator('//div[@tabindex="-1"]').nth(3))
    .toHaveAttribute('tabindex', '-1');

    //valida que el boton este deshabilitado
    const estilo = 'align-items: center; justify-content: center; flex-shrink: 1; border-radius: 9.16667px; height: 54px; width: 660px; background-color: rgb(189, 189, 189);';
    const locator = page.locator(`//div[@style="${estilo}"]`).first();
    await expect(locator).toHaveAttribute('style', estilo);

    //Clic en el boton iniciar sesión
    await page.locator('div').filter({ hasText: /^Iniciar sesión$/ }).first().click();

    //await page.pause()

});

test('Usuario incorrecto', async({page})=>{
    
    //Dirige al usuario a la pagina principal 
    await page.goto (URL);
    
    //Inserta valor de usuario
    await page.getByTestId('TextInputEnabled').nth(1).fill('1');

    //Valida que el usuario tenga valor
    await expect(page.locator('//div[@tabindex="0"]').nth(2))
    .toHaveAttribute('tabindex', '0');

    //Inserta valor de password
    await page.locator ('//input[@type=\'password\']').fill(Pass);

    // Valida que el pass tenga valor
    await expect(page.locator('//div[@tabindex="0"]').nth(3))
    .toHaveAttribute('tabindex', '0');

    //valida que el boton este habilitado
    const estilo = 'align-items: center; justify-content: center; flex-shrink: 1; border-radius: 9.16667px; height: 54px; width: 660px; background-color: rgb(27, 56, 146);';
    const locator = page.locator(`//div[@style="${estilo}"]`).first();
    await expect(locator).toHaveAttribute('style', estilo);

    //Clic en el boton iniciar sesión
    await page.locator('div').filter({ hasText: /^Iniciar sesión$/ }).first().click();
    
    //Alerta de usuario invalido
    const alerta = page.locator('div').filter({ hasText: 'ErrorEl usuario o la contrase' }).nth(3);
    await expect (alerta).toContainText ('ErrorEl usuario o la contrase');

    //await page.pause()

});


test('Pass incorrecto', async({page})=>{
    
    //Dirige al usuario a la pagina principal 
    await page.goto (URL);
    
    //Inserta valor de usuario
    await page.getByTestId('TextInputEnabled').nth(1).fill(User);

    //Valida que el usuario tenga valor
    await expect(page.locator('//div[@tabindex="0"]').nth(2))
    .toHaveAttribute('tabindex', '0');

    //Inserta valor de password
    await page.locator ('//input[@type=\'password\']').fill('9999');

    //Clic en visualizar pass
    await page.locator('div:nth-child(5) > div > div > .css-175oi2r.r-1loqt21 > svg > path').click();

    await page.waitForTimeout(1000);

    // Valida que el pass tenga valor
    await expect(page.locator('//div[@tabindex="0"]').nth(3))
    .toHaveAttribute('tabindex', '0');

    //valida que el boton este habilitado
    const estilo = 'align-items: center; justify-content: center; flex-shrink: 1; border-radius: 9.16667px; height: 54px; width: 660px; background-color: rgb(27, 56, 146);';
    const locator = page.locator(`//div[@style="${estilo}"]`).first();
    await expect(locator).toHaveAttribute('style', estilo);

    //Clic en el boton iniciar sesión
    await page.locator('div').filter({ hasText: /^Iniciar sesión$/ }).first().click();
    
    //Alerta de pass invalido
    const alerta = page.locator('div').filter({ hasText: 'ErrorEl usuario o la contrase' }).nth(3);
    await expect (alerta).toContainText ('ErrorEl usuario o la contrase');

    //await page.pause();

});

test('Inicio de sesion correcto', async({page})=>{
    
    //Dirige al usuario a la pagina principal 
    await page.goto (URL);
    
    //Inserta valor de usuario
    await page.getByTestId('TextInputEnabled').nth(1).fill(User);

    //Valida que el usuario tenga valor
    await expect(page.locator('//div[@tabindex="0"]').nth(2))
    .toHaveAttribute('tabindex', '0');

    //Inserta valor de password
    await page.locator ('//input[@type=\'password\']').fill(Pass);

    //Clic en visualizar pass
    await page.locator('div:nth-child(5) > div > div > .css-175oi2r.r-1loqt21 > svg > path').click();

    await page.waitForTimeout(1000);

    // Valida que el pass tenga valor
    await expect(page.locator('//div[@tabindex="0"]').nth(3))
    .toHaveAttribute('tabindex', '0');

    //valida que el boton este habilitado
    const estilo = 'align-items: center; justify-content: center; flex-shrink: 1; border-radius: 9.16667px; height: 54px; width: 660px; background-color: rgb(27, 56, 146);';
    const locator = page.locator(`//div[@style="${estilo}"]`).first();
    await expect(locator).toHaveAttribute('style', estilo);

    //Clic en el boton iniciar sesión
    await page.locator('div').filter({ hasText: /^Iniciar sesión$/ }).first().click();

    //Valida que se recupere la pagina de inicio de sesion
    await expect(page).toHaveTitle('Inicio');

    await page.pause();

});
