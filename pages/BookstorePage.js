// pages/BookstorePage.js

class BookstorePage {
  constructor(page) {
    this.page = page;

    this.bookLinks     = 'a[href*="/bookstore/books/"]';
    this.addToCartBtns = 'a[href*="add-to-cart"]';
    this.cartIcon      = 'a[href="/bookstore/cart"]';
    this.cartImg       = 'img[src*="cart"]';
    this.signInLink    = 'a[href*="signin"]';
    this.signUpLink    = 'a[href*="signup"]';
    this.allBooksLink  = 'a[href="/bookstore"]';
    this.sortAsc       = 'a[href*="sort=asc"]';
    this.sortDesc      = 'a[href*="sort=desc"]';
    this.categoryAll   = 'a[href="/bookstore/"]';
    this.emailInput    = 'input[type="email"]';
    this.passwordInput = 'input[type="password"]';
    this.submitBtn     = 'button[type="submit"]';
  }

  async navigateToBookstore() {
    await this.page.goto('/bookstore');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToCart() {
    await this.page.goto('/bookstore/cart');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToSignIn() {
    await this.page.goto('/bookstore/user/signin');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToSignUp() {
    await this.page.goto('/bookstore/user/signup');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToBookDetail(bookId) {
    await this.page.goto(`/bookstore/books/${bookId}`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async addBookToCartDirect(bookId) {
    await this.page.goto(`/bookstore/add-to-cart/${bookId}`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async addBookToCartByIndex(index = 0) {
    const btns = this.page.locator(this.addToCartBtns);
    await btns.nth(index).click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getPageTitle() {
    return this.page.title();
  }

  async getBodyText() {
    return this.page.textContent('body');
  }
}

module.exports = BookstorePage;