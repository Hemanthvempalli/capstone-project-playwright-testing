class CartPage {
  constructor(page) {
    this.page = page;
    this.cartIcon       = '.cart-icon, .cart-link, a[href*="cart"], #cart-icon';
    this.cartCount      = '.cart-count, .cart-badge, .cart-qty, [class*="cart-count"]';
    this.cartItems      = '.cart-item, .cart-product, .cart-row, [class*="cart-item"]';
    this.removeBtn      = 'button:has-text("Remove"), .remove-item, .delete-item';
    this.qtyInput       = '.qty-input, input[name="quantity"], input[type="number"]';
    this.qtyPlus        = '.qty-plus, button:has-text("+"), [class*="increase"]';
    this.qtyMinus       = '.qty-minus, button:has-text("-"), [class*="decrease"]';
    this.cartTotal      = '.cart-total, .order-total, .total-price, [class*="total"]';
    this.emptyCartMsg   = '.empty-cart, [class*="empty"]';
    this.checkoutBtn    = 'button:has-text("Checkout"), a:has-text("Checkout"), .checkout-btn';
    this.continueShopBtn= 'a:has-text("Continue Shopping"), .continue-shopping';
    this.updateCartBtn  = 'button:has-text("Update"), .update-cart';
  }

  async navigateToCart() {
    await this.page.locator(this.cartIcon).first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getCartItemCount() {
    return await this.page.locator(this.cartItems).count();
  }

  async getCartBadgeNumber() {
    const text = await this.page.locator(this.cartCount).first().textContent().catch(() => '0');
    return parseInt(text.trim()) || 0;
  }

  async removeFirstItem() {
    await this.page.locator(this.removeBtn).first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async increaseQuantity() {
    await this.page.locator(this.qtyPlus).first().click();
    await this.page.waitForTimeout(500);
  }

  async decreaseQuantity() {
    await this.page.locator(this.qtyMinus).first().click();
    await this.page.waitForTimeout(500);
  }

  async setQuantity(qty) {
    await this.page.locator(this.qtyInput).first().fill(String(qty));
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(500);
  }

  async isCartEmpty() {
    return await this.page.locator(this.emptyCartMsg).isVisible().catch(() => false);
  }

  async proceedToCheckout() {
    await this.page.locator(this.checkoutBtn).first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = { CartPage };