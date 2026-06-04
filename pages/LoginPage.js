class LoginPage {
  constructor(page) {
    this.page = page;

    this.usernameInput = '#username';
    this.passwordInput = '#password';
    this.submitBtn     = 'button[type="submit"]';
    this.flashMsg      = '#flash';
    this.logoutBtn     = 'a[href="/logout"]';
  }

  async navigate() {
    await this.page.goto('/login');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async fillUsername(username) {
    await this.page.locator(this.usernameInput).fill(username);
  }

  async fillPassword(password) {
    await this.page.locator(this.passwordInput).fill(password);
  }

  async clickSubmit() {
    await this.page.locator(this.submitBtn).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickSubmit();
  }

  async getFlashMessage() {
    try {
      const el = this.page.locator(this.flashMsg);
      await el.waitFor({ timeout: 5000 });
      return (await el.textContent()) || '';
    } catch {
      return '';
    }
  }

  async getSuccessMessage() {
    return this.getFlashMessage();
  }

  async getErrorMessage() {
    return this.getFlashMessage();
  }
}

module.exports = LoginPage;