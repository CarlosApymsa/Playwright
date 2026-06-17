import {test, expect} from '@playwright/test' 

test('inicio de sesión', async({page})=>{
    await page.goto ('https://gtm-pwa.apymsa-testsvr.apymsa.com.mx/login');
  
    await page.getByTestId('TextInputEnabled').nth(1).fill('1931');

    await page.locator ('//input[@type=\'password\']').fill('0000');

    await page.locator('div').filter({ hasText: /^Iniciar sesión$/ }).first().click();

  

})

test('Consulta de tareas', async({page})=>{
    await page.goto ('https://gtm-pwa.apymsa-testsvr.apymsa.com.mx/login');
  
    await page.getByTestId('TextInputEnabled').nth(1).fill('1931');

    await page.locator ('//input[@type=\'password\']').fill('0000');

    await page.locator('div').filter({ hasText: /^Iniciar sesión$/ }).first().click();

    await page.locator('div').filter({ hasText: /^Consulta de tareas cargadas$/ }).first().click();

    await page.pause()
    
    const tipoTarea= {
        1:"Recepción de traspaso de CEDIS",
        2:"Revisión-acomodo de traspaso de proveedor",
        3:"Conteo de inventarios",
        4:"Reconteo de inventarios",
        5:"Conteo inventario mesa de ayuda",
        6:"Reconteo inventario mesa de ayuda",
        7:"Tarea especial de inventarios para sucursal",
        8:"Surtir pedido cliente",
        9:"Revisar pedido",
        10:"Empacar pedido",
        11:"Revisión-acomodo de traspaso de CEDIS",
        12:"Revisión de garantía de mostrador",
        13:"Revisión de devolución de mostrador",
        14:"Recepción de traspaso de sucursal",
        15:"Revisión-acomodo de traspaso de sucursal",
        16:"Revisión de garantías de clientes de agentes",
        17:"Revisión de devoluciones de clientes de agentes",
        18:"Tarea automática especial de inventarios",
        19:"Conteo gerentes regionales",
        20:"Conteo semanal admon",
        21:"Reconteo de tareas automaticas especiales",
        22:"Conteo inventario Retail",
        23:"Reconteo inventario Retail",
        24:"Conteo especial Retail",
        25:"Reconteo especial Retail",
        26:"Conteo automatico especial Retail",
        27:"Reconteo automatico especial Retail",
        28:"Conteo de inventarios de consigna",
        29:"Conteo nuevo gerentes regional",
        30:"Surtido de traspasos de balanceo de inventario",
        31:"Revisar traspaso de balanceo de inventario",
        32:"Empacar traspaso de balanceo de inventario",
        33:"Conteo inventario gerente regional",
        34:"Reconteo inventario gerente regional",
    };
  

    
});
    