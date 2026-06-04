class ProductPage {
  constructor(page) {
    this.page = page;
    this.searchInput    = 'input[name="search"], input[placeholder*="Search"], input[type="search"], #search';
    this.searchBtn      = 'button[type="submit"], .search-btn, button:has-text("Search")';
    this.productCards   = '.product-item, .product-card, .products-list li, [class*="product"]';
    this.sortDropdown   = 'select[name="sort"], .sort-select, #sort-by';
    this.filterOptions  = '.filter-option, .category-filter, .sidebar-filter';
    this.productTitle   = '.product-title, .product-name, h1.title, h2.name';
    this.productImage   = '.product-image img, .product-photo img';
    this.productDesc    = '.product-description, .description, #description';
    this.productSpecs   = '.specifications, .tech-specs, #specifications';
    this.addToCartBtn   = 'button:has-text("Add to Cart"), .add-to-cart, #addToCart';
    this.breadcrumb     = '.breadcrumb, nav[aria-label="breadcrumb"], .breadcrumbs';
    this.relatedProducts= '.related-products, .similar-products, [class*="related"]';
    this.downloadLink   = 'a:has-text("Download"), a:has-text("Datasheet"), a[href$=".pdf"]';
    this.productCount   = '.product-count, .results-count, [class*="count"]';
  }

  async search(term) {
    await this.page.locator(this.searchInput).first().fill(term);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getProductCount() {
    return await this.page.locator(this.productCards).count();
  }

  async clickFirstProduct() {
    await this.page.locator(this.productCards).first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async getProductTitle() {
    return await this.page.locator(this.productTitle).first().textContent().catch(() => '');
  }

  async navigateToCategory(categoryName) {
    await this.page.goto('/');
    await this.page.locator(`a:has-text("${categoryName}")`).first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = { ProductPage };