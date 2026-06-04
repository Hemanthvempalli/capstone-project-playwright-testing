// pages/NavigationPage.js

class NavigationPage {
  constructor(page) {
    this.page = page;

    this.logo             = 'img[src*="logo"]';
    this.navTipsLink      = 'a[href="/tips"]';
    this.navTestCasesLink = 'a[href="/test-cases"]';
    this.navAboutLink     = 'a[href="/about"]';
  }

  async navigateTo(path) {
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getTitle() {
    return this.page.title();
  }

  async getBodyText() {
    return this.page.textContent('body');
  }
}

module.exports = NavigationPage;