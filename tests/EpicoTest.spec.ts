import {test} from '@playwright/test';


const url = 'https://epico.apymsa-testsvr.apymsa.com.mx/Login?p=%2FClientes';

test('pedido x', async({page}) =>{
    await page.goto(url);
    await page.locator('#user').fill('VLIMON2');
    await page.locator('#password').fill('0000');
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();
    await page.getByRole('textbox', { name: 'Buscar por id, nombre,' }).fill('103559');
    await page.getByRole('button', { name: 'Buscar' }).click();
    await page.getByRole('menuitem', { name: 'Redirigir' }).click();
    await page.getByRole('button', { name: 'Búsqueda de producto' }).click();

    //Agregar pedido
    await page.getByRole('textbox', { name: 'Buscar por descripción, có' }).fill('0002200');
    await page.getByRole('button', { name: 'Buscar' }).click();
    await page.getByRole('textbox').nth(5).fill('5');
    await page.waitForTimeout (500);
    await page.getByRole('button', { name: 'Agregar a pedido' }).first().click();
    
    await page.waitForTimeout(1000);
    await page.getByRole('textbox', { name: 'Buscar por descripción, có' }).fill('0005500');
    await page.getByRole('button', { name: 'Buscar' }).click();
    await page.getByRole('textbox').nth(5).fill('3');
    await page.getByRole('button', { name: 'Agregar a pedido' }).first().click();
    
    
    await page.waitForTimeout(1000);
    await page.getByRole('textbox', { name: 'Buscar por descripción, có' }).fill('0001000');
    await page.getByRole('button', { name: 'Buscar' }).click();
    await page.getByRole('textbox').nth(5).fill('7');
    await page.getByRole('button', { name: 'Agregar a pedido' }).first().click();

    console.log(page.viewportSize());


    
    
  

    



    await page.pause();
    
})