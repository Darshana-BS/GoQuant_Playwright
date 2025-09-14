const { BuggyPage } = require('../pages/BuggyPage')

const { test, expect } = require('@playwright/test');

// helper to start/stop trace per test
async function startTracing(context, name) {
  await context.tracing.start({ screenshots: true, snapshots: true });
  return async () => {
    await context.tracing.stop({ path: `trace/${name}.zip` });
  };G
}

//-----------------------------TC_01--------------------------------
test('Register with valid user with trace', async ({ browser }) => {  
  const context = await browser.newContext();
  const stopTrace = await startTracing(context, 'TC01_RegisterValid');
  const page = await context.newPage();
  const buggy = new BuggyPage(page);

  await buggy.gotoHome();
  await buggy.gotoRegister();
  await buggy.registerUser('MyUser_30', 'Firstname_1', 'Lastname_1', 'GoQuant_DN_User_1');
  const myText = page.locator('text=Registration is successful');
  await expect(myText).toBeVisible;
  await page.waitForTimeout(3000);
  await stopTrace();
});

//-----------------------------TC_02 + TC_03--------------------------------
test('Login and update profile', async ({ browser }) => {
  const context = await browser.newContext();
  const stopTrace = await startTracing(context, 'TC02_LoginUpdate');
  const page = await context.newPage();
  const buggy = new BuggyPage(page);

  await buggy.gotoHome();
  await buggy.login('MyUser_300000', 'GoQuant_DN_User_1');

  //profile update
  await page.locator('[href="/profile"]').click()
  await page.locator('#firstName').fill('MyUser_300000_Updated');
  await page.locator('.btn.btn-default')
//   await this.saveProfileButton.click();
  await page.waitForTimeout(4000);
//   await buggy.updateProfile('MyUser_300000_Updated');
  const myText = page.locator('text=The profile has been saved successful');
  await expect(myText).toBeVisible;
  await buggy.logout();

  await stopTrace();
});

//-----------------------------TC_04--------------------------------
test('Register user with password < 6 chars', async ({ browser }) => {
  const context = await browser.newContext();
  const stopTrace = await startTracing(context, 'TC04_InvalidPassword');
  const page = await context.newPage();
  const buggy = new BuggyPage(page);

  await buggy.page.goto("https://buggy.justtestit.org/register");
  await buggy.registerUser('MyUser_30', 'Firstname_1', 'Lastname_1', 'MyUser');
  await expect(buggy.errorMessage).toBeVisible();
  await expect(buggy.errorMessage).toContainText('Password not long enough')

  await stopTrace();
});

//-----------------------------TC_05--------------------------------
test('Register with existing user', async ({ browser }) => {
  const context = await browser.newContext();
  const stopTrace = await startTracing(context, 'TC05_ExistingUser');
  const page = await context.newPage();
  const buggy = new BuggyPage(page);

  await buggy.gotoHome();
  await buggy.gotoRegister();
  await buggy.registerUser('MyUser_300000', 'Firstname_1', 'Lastname_1', 'GoQuant_DN_User_1');
  await expect(buggy.errorMessage).toBeVisible();

  await stopTrace();
});
//---------------------------------------------------------------------