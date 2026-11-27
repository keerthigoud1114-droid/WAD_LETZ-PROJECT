// Price calculation logic for menu items and add-ons
class PriceCalculator {
  static ADDON_RATES = {
    'Large': 15,
    'Large Size': 15,
    'Oat / Almond Milk': 10,
    'Extra Cheese': 15,
    'Extra Butter': 10,
    'Extra Masala': 5,
    'Extra Ice Cream': 15,
    'Extra Shot': 10
  };

  static calculateCustomizationExtra(customizations = []) {
    if (!Array.isArray(customizations)) return 0;
    return customizations.reduce((acc, tag) => {
      for (const [key, price] of Object.entries(this.ADDON_RATES)) {
        if (tag.includes(key)) {
          return acc + price;
        }
      }
      return acc;
    }, 0);
  }

  static calculateItemUnitPrice(basePrice, customizations = []) {
    const base = Number(basePrice) || 0;
    const addOnTotal = this.calculateCustomizationExtra(customizations);
    return Math.max(0, base + addOnTotal);
  }

  static calculateItemLineTotal(basePrice, customizations = [], quantity = 1) {
    const qty = Math.max(1, Math.min(50, parseInt(quantity, 10) || 1));
    const unitPrice = this.calculateItemUnitPrice(basePrice, customizations);
    return unitPrice * qty;
  }

  static calculateCartTotals(cartItems = [], isTakeaway = false) {
    if (!Array.isArray(cartItems)) {
      return { subtotal: 0, packagingFee: 0, grandTotal: 0, totalItems: 0 };
    }

    const subtotal = cartItems.reduce((sum, item) => {
      const lineTotal = (Number(item.unitPrice) || Number(item.price) || 0) * (Number(item.qty) || 1);
      return sum + lineTotal;
    }, 0);

    const totalItems = cartItems.reduce((count, item) => count + (Number(item.qty) || 1), 0);
    const packagingFee = (isTakeaway && cartItems.length > 0) ? 5 : 0;
    const grandTotal = subtotal + packagingFee;

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      packagingFee,
      grandTotal: Math.round(grandTotal * 100) / 100,
      totalItems
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PriceCalculator;
}
