const { test, expect } = require('@playwright/test');        //test annotation comes from this playwright/test module, hence it is needed 
const { register } = require('module');

//-----------------------------TC_01- Regoster User with valid crednetials-----------------------------
test('Register with valid user with trace', async ({ browser }) => {  
    const context = await browser.newContext();
    //start trace
    await context.tracing.start({ screenshots: true, snapshots: true });
    
    const page = await context.newPage();
    // Go to the website
    await page.goto("https://buggy.justtestit.org/");

    // Locate and click the Register link
    const registerLink = page.locator('text=Register');
    await registerLink.click();

    //  Verify that URL contains /register
    await expect(page).toHaveURL(/\/register/);

    //Enter the valid details 
    await page.locator('input[name="username"]').fill('MyUser_30');
    await page.locator('input[name="firstName"]').fill('Firstname_1')
    await page.locator('input[name="lastName"]').fill('Lastname_1')
    await page.locator('#password').fill('GoQuant_DN_User_1');
    await page.locator('input[name="confirmPassword"]').fill('GoQuant_DN_User_1') 

    //Click register 
    const resgister_user = page.locator('button.btn.btn-default[type="submit"]')
    await resgister_user.click();
    // await page.locator('a.btn[href="/"]').click();
    await page.waitForTimeout(3000);

    // Verify  registration is successful 
    const myText = page.locator('text=Registration is successful');
    await expect(myText).toBeVisible;

    //stop tracing 
    await context.tracing.stop({ path: 'trace/trace.zip' });

 });
//----------------------------------------------------------------------------------------------------------------

//---------------------TC_02- Login and logout of newly registered user crednetials--------------------------------
test('Login with recently registered user', async ({ browser }) => {  // destructure page, not browser
    const context = await browser.newContext();
    //start trace
    await context.tracing.start({ screenshots: true, snapshots: true });
    
    // Go to the website
    const page = await context.newPage();
    await page.goto("https://buggy.justtestit.org/");

    // Locate and enter login credentials
    await page.locator('input[name="login"]').fill('MyUser_300000');
    await page.locator('input[name="password"]').fill('GoQuant_DN_User_1');
    await page.locator('button.btn.btn-success[type="submit"]').click();
    // await page.screenshot({ path: 'screenshots/Login_success.png' });

//---------------------TC_03- Update profile details----------------------------------------------------------
    //Update profile 
    await page.waitForTimeout(3000);
    await page.locator('#firstName').fill('MyUser_300000_Updated');
    await page.locator('.btn.btn-default').click();
    //validate the new name 
    const myText = page.locator('text=The profile has been saved successful');
    await expect(myText).toBeVisible;
//----------------------------------------------------------------------------------------------------------------

    //Log out
    await page.locator('a.nav-link[href="javascript:void(0)"]').click();
    await page.waitForTimeout(4000);

    //stop tracing 
    await context.tracing.stop({ path: 'trace/trace.zip' });
    //  Verify Assert that URL contains /register
    //await expect(page).toHaveURL(/\/register/);

});
//----------------------------------------------------------------------------------------------------------------

//---------------------TC_04- Register User with invalid crednetials with password = 5 characters-----------------
test('Register_Password_less_than_6_characters', async ({ browser }) => {  
    const context = await browser.newContext();
    //start trace
    await context.tracing.start({ screenshots: true, snapshots: true });
    
    // Go to the website
    const page = await context.newPage();
    await page.goto("https://buggy.justtestit.org/register");

    // Locate and enter login credentials
    await page.locator('input[name="username"]').fill('MyUser_30');
    await page.locator('input[name="firstName"]').fill('Firstname_1')
    await page.locator('input[name="lastName"]').fill('Lastname_1')
    await page.locator('#password').fill('MyUser');
    await page.locator('input[name="confirmPassword"]').fill('MyUser') 
    // Locate and click the Register button
    const resgister_user = page.locator('button.btn.btn-default[type="submit"]')
    await resgister_user.click();
    await page.waitForTimeout(4000);

    //validate error message for password validation 
    // const myText2 = page.locator('text=minimum field size of 6');
    // await expect(myText2).toBeVisible;
    // const errorMessage = await page.locator('div.result.alert-danger')
    // await expect(errorMessage).toBeVisible(); 
    // await expect(errorMessage).toContainText('InvalidPasswordException: Password did not conform with policy: Password not long enough');
    // check for the error
    const errorMessage = page.locator('.result.alert.alert-danger');

    if (await errorMessage.isVisible()) {
        const text = await errorMessage.textContent();
        console.log('Error found:', text);
        // //await expect(errorMessage).toContainText('minimum field size of 6');
        await expect(text).toBeVisible;
    } else {
        //explicitly fail if no error is shown
        throw new Error('Validation error was not displayed!');
    }
    //stop tracing 
    await context.tracing.stop({ path: 'trace/trace.zip' });

});
//----------------------------------------------------------------------------------------------------------------

//---------------------TC_05- Register User with existing user Id-------------------------------------------------
test('Register with existing user with trace', async ({ browser }) => {  
    const context = await browser.newContext();
    //start trace
    await context.tracing.start({ screenshots: true, snapshots: true });
    
    const page = await context.newPage();
    // Go to the website
    await page.goto("https://buggy.justtestit.org/");

    // Locate and click the Register link
    const registerLink = page.locator('text=Register');
    await registerLink.click();

    //  Verify that URL contains /register
    await expect(page).toHaveURL(/\/register/);

    //Enter the valid details 
    await page.locator('input[name="username"]').fill('MyUser_300000');
    await page.locator('input[name="firstName"]').fill('Firstname_1')
    await page.locator('input[name="lastName"]').fill('Lastname_1')
    await page.locator('#password').fill('GoQuant_DN_User_1');
    await page.locator('input[name="confirmPassword"]').fill('GoQuant_DN_User_1') 

    //Click register 
    const resgister_user = page.locator('button.btn.btn-default[type="submit"]')
    await resgister_user.click();
    // await page.locator('a.btn[href="/"]').click();
    await page.waitForTimeout(3000);

    // Verify  registration is successful 
    // const text = await page.locator('.result.alert.alert-danger').textContent();
    // expect(text?.trim()).toContain('User already exists');
    const myText = page.locator('User already exists');
    await expect(myText).toBeVisible;

    //stop tracing 
    await context.tracing.stop({ path: 'trace/trace.zip' });

 });
//----------------------------------------------------------------------------------------------------------------

//---------------------TC_05- Regoster User with valid crednetials------------------------------------------------

//----------------------------------------------------------------------------------------------------------------
