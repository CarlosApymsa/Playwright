import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker';


test('registry', async ({ page }) => {
  
  await page.goto('file:///C:/Users/carlos.marquez/Downloads/recursos/registration/register.html');
  await page.locator ("id=name").fill(faker.person.firstName());
  await page.locator ("id=last-name").fill(faker.person.lastName());
  await page.locator("id=age").fill(faker.number.int({min: 18, max: 65}).toString());
  await page.locator("id=country").selectOption('Mexico');
  await page.locator("input[value='M']").click();
  await page.locator("id=email").fill(faker.internet.email());
  await page.locator("id=monday").click(),
  await page.locator("id=friday").click();
  await page.locator("id=picture").setInputFiles('pictures/RH.JPG');
  await page.getByRole('button', { name: 'Guardar' }).click();
    
   await page.pause()
 
  
});