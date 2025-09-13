const { test, expect } = require('@playwright/test');        //test annotation comes from this playwright/test module, hence it is needed 

test('Register with valid user', async ({ page }) => {  // destructure page, not browser
    // Go to the website
    await page.goto("https://buggy.justtestit.org/");

    // Locate and click the Register link
    const registerLink = page.locator('text=Register');
    await registerLink.click();

    // Optional: Assert that URL contains /register
    await expect(page).toHaveURL(/\/register/);

    //Enter the valid details 
    await page.locator('input[name="username"]').fill('MyUser_1');
    await page.locator('input[name="firstName"]').fill('Firstname_1')
    await page.locator('input[name="lastName"]').fill('Lastname_1')
    await page.locator('#password').fill('MySecurePassword123');
    await page.locator('input[name="confirmPassword"]').fill('Password_1')
});