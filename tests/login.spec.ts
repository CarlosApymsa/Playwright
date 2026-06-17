import {test, expect} from '@playwright/test' 

test('login', async({page})=>{
    await page.goto ('http://127.0.0.1:5500/login.html')

    await page.locator ('input#username').fill('user')

    await page.locator ('input#password').fill('pass')

    await page.locator ('//button[@type=\'submit\']') . click()


    await page.pause()
})