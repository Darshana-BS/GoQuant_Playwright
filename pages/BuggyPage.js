// pages/BuggyPage.js
const { expect } = require('@playwright/test');

class BuggyPage {
  constructor(page) {
    this.page = page;
    this.registerLink = page.locator('text=Register');
    this.usernameInput = page.locator('input[name="username"]');
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.passwordInput = page.locator('#password');
    this.confirmPasswordInput = page.locator('input[name="confirmPassword"]');
    this.registerButton = page.locator('button.btn.btn-default[type="submit"]');
    this.loginInput = page.locator('input[name="login"]');
    this.loginPassword = page.locator('input[name="password"]');
    this.loginButton = page.locator('button.btn.btn-success[type="submit"]');
    this.firstNameProfile = page.locator('#firstName');
    this.saveProfileButton = page.locator('.btn.btn-default');
    this.logoutButton = page.locator('a.nav-link[href="javascript:void(0)"]');
    this.successMessage = page.locator('text=Registration is successful');
    this.profileSaveMsg = page.locator('text=The profile has been saved successful');
    this.errorMessage = page.locator('.result.alert.alert-danger');
    this.profileid = page.locator('[href="/profile"]')
  }

  async gotoHome() {
    await this.page.goto('https://buggy.justtestit.org/');
  }

  async gotoRegister() {
    await this.registerLink.click();
    await expect(this.page).toHaveURL(/\/register/);
  }

  async registerUser(username, firstName, lastName, password) {
    await this.usernameInput.fill(username);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
    await this.registerButton.click();
  }

  async login(username, password) {
    await this.loginInput.fill(username);
    await this.loginPassword.fill(password);
    await this.loginButton.click();
  }

  async updateProfile(newFirstName) {
    await this.page.profileid.click()
    await expect(page).toHaveURL(/profile/); // waits until profile page loads
    // await page.locator('#firstName').fill('MyUser_300000_Updated');
    // await page.locator('.btn.btn-default').click();
    await this.firstNameProfile.fill(newFirstName);
    await this.saveProfileButton.click();
    await expect(this.profileSaveMsg).toBeVisible();
  }

  async logout() {
    await this.logoutButton.click();
  }
}

module.exports = { BuggyPage };
