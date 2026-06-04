class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = 'input[name="firstName"], input[name="first_name"], #firstName';
    this.lastNameInput  = 'input[name="lastName"], input[name="last_name"], #lastName';
    this.emailInput     = 'input[name="email"], input[type="email"]';
    this.phoneInput     = 'input[name="phone"], input[name="telephone"], input[type="tel"]';
    this.address1Input  = 'input[name="address1"], input[name="address"], textarea[name="address"]';
    this.address2Input  = 'input[name="address2"]';
    this.cityInput      = 'input[name="city"]';
    this.stateDropdown  = 'select[name="state"], select[name="region"]';
    this.pincodeInput   = 'input[name="pincode"], input[name="postcode"], input[name="zip"]';
    this.gstInput       = 'input[name="gst"], input[name="gstin"], #gst';
    this.sameAddressChk = 'input[name="sameAddress"], #same-as-billing';
    this.nextBtn        = 'button:has-text("Next"), button:has-text("Continue"), .next-step';
    this.placeOrderBtn  = 'button:has-text("Place Order"), button:has-text("Submit"), .place-order';
    this.orderConfirmMsg= '.order-confirmation, :has-text("Order Placed"), :has-text("Thank you")';
    this.orderIdText    = '.order-id, .order-number, [class*="order-id"]';
    this.errorMsg       = '.error-message, .field-error, .alert-danger, [class*="error"]';
    this.progressBar    = '.checkout-steps, .progress-bar, .step-indicator';
    this.orderSummary   = '.order-summary, .cart-summary, [class*="summary"]';
  }

  async fillBillingAddress(data) {
    await this.page.locator(this.firstNameInput).first().fill(data.firstName).catch(() => {});
    await this.page.locator(this.lastNameInput).first().fill(data.lastName).catch(() => {});
    await this.page.locator(this.emailInput).first().fill(data.email).catch(() => {});
    await this.page.locator(this.phoneInput).first().fill(data.phone).catch(() => {});
    await this.page.locator(this.address1Input).first().fill(data.address1).catch(() => {});
    await this.page.locator(this.cityInput).first().fill(data.city).catch(() => {});
    await this.page.locator(this.pincodeInput).first().fill(data.pincode).catch(() => {});
  }

  async selectState(state) {
    await this.page.locator(this.stateDropdown).first().selectOption({ label: state }).catch(() => {});
  }

  async clickNext() {
    await this.page.locator(this.nextBtn).first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async placeOrder() {
    await this.page.locator(this.placeOrderBtn).first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async isOrderConfirmed() {
    return await this.page.locator(this.orderConfirmMsg).isVisible().catch(() => false);
  }

  async getErrorMessage() {
    return await this.page.locator(this.errorMsg).first().textContent().catch(() => '');
  }

  async checkSameAddress() {
    const chk = this.page.locator(this.sameAddressChk).first();
    if (!(await chk.isChecked().catch(() => false))) await chk.click();
  }
}

module.exports = { CheckoutPage };