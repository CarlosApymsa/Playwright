import{test, expect} from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const User = process.env.USER || '';
const Pass = process.env.PASS || '';
const URL = 'https://gtm-pwa.apymsa-testsvr.apymsa.com.mx/login';

test('evidencias',async({context, page },testinfo) =>{

    await page.goto(URL);
    await page.

});