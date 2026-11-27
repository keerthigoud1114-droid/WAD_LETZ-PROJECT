/**
 * Campus Quick Bite - Frontend Client Controller
 * Manages kiosk catalog rendering, customization modals, cart calculations,
 * and synchronized order transitions across staff and display boards.
 */

const DEFAULT_MENU_ITEMS = [
  {
    id: 'samosa',
    name: 'Samosa',
    category: 'Snacks',
    price: 15,
    prepTime: 3,
    isVeg: true,
    isEgg: false,
    desc: 'Crispy golden pastry stuffed with mildly spiced potatoes and green peas.',
    image: 'assets/images/samosa.jpg',
    type: 'food'
  },
  {
    id: 'veg-puff',
    name: 'Veg Puff',
    category: 'Snacks',
    price: 20,
    prepTime: 4,
    isVeg: true,
    isEgg: false,
    desc: 'Flaky baked golden pastry filled with savory spiced mixed vegetables.',
    image: 'assets/images/veg-puff.jpg',
    type: 'food'
  },
  {
    id: 'egg-puff',
    name: 'Egg Puff',
    category: 'Snacks',
    price: 25,
    prepTime: 4,
    isVeg: false,
    isEgg: true,
    desc: 'Crispy multi-layered bakery puff stuffed with spiced boiled egg halves.',
    image: 'assets/images/egg-puff.jpg',
    type: 'food'
  },
  {
    id: 'masala-maggi',
    name: 'Masala Maggi',
    category: 'Snacks',
    price: 35,
    prepTime: 6,
    isVeg: true,
    isEgg: false,
    desc: 'Hot and slurpable noodles tossed with secret canteen masala and diced veggies.',
    image: 'assets/images/masala-maggi.jpg',
    type: 'food'
  },
  {
    id: 'cheese-maggi',
    name: 'Cheese Maggi',
    category: 'Snacks',
    price: 50,
    prepTime: 7,
    isVeg: true,
    isEgg: false,
    desc: 'Classic masala maggi blanketed with a generous layer of melted cheese.',
    image: 'assets/images/cheese-maggi.jpg',
    type: 'food'
  },
  {
    id: 'veg-sandwich',
    name: 'Veg Sandwich',
    category: 'Breakfast',
    price: 35,
    prepTime: 5,
    isVeg: true,
    isEgg: false,
    desc: 'Triple layer toasted sandwich with cucumber, tomatoes, and spicy green chutney.',
    image: 'assets/images/veg-sandwich.jpg',
    type: 'food'
  },
  {
    id: 'paneer-sandwich',
    name: 'Paneer Sandwich',
    category: 'Breakfast',
    price: 50,
    prepTime: 6,
    isVeg: true,
    isEgg: false,
    desc: 'Grilled sandwich stuffed with seasoned soft cottage cheese and bell peppers.',
    image: 'assets/images/paneer-sandwich.jpg',
    type: 'food'
  },
  {
    id: 'idli',
    name: 'Idli',
    category: 'Breakfast',
    price: 30,
    prepTime: 5,
    isVeg: true,
    isEgg: false,
    desc: 'Two steamed fluffy rice cakes served with hot lentil sambar and coconut chutney.',
    image: 'assets/images/idli.jpg',
    type: 'food'
  },
  {
    id: 'masala-dosa',
    name: 'Masala Dosa',
    category: 'Breakfast',
    price: 50,
    prepTime: 8,
    isVeg: true,
    isEgg: false,
    desc: 'Crisp golden fermented crepe rolled with spiced mashed potato filling.',
    image: 'assets/images/masala-dosa.jpg',
    type: 'food'
  },
  {
    id: 'plain-dosa',
    name: 'Plain Dosa',
    category: 'Breakfast',
    price: 40,
    prepTime: 7,
    isVeg: true,
    isEgg: false,
    desc: 'Light and golden roasted crepe cooked with pure ghee, served with 2 chutneys.',
    image: 'assets/images/plain-dosa.jpg',
    type: 'food'
  },
  {
    id: 'vada',
    name: 'Vada',
    category: 'Breakfast',
    price: 15,
    prepTime: 3,
    isVeg: true,
    isEgg: false,
    desc: 'Crunchy golden savory medu vada with black pepper, cumin and coconut dip.',
    image: 'assets/images/vada.jpg',
    type: 'food'
  },
  {
    id: 'poori',
    name: 'Poori',
    category: 'Breakfast',
    price: 40,
    prepTime: 6,
    isVeg: true,
    isEgg: false,
    desc: 'Two puffed deep-fried golden pooris served with savory potato curry.',
    image: 'assets/images/poori.jpg',
    type: 'food'
  },
  {
    id: 'veg-fried-rice',
    name: 'Veg Fried Rice',
    category: 'Meals',
    price: 60,
    prepTime: 8,
    isVeg: true,
    isEgg: false,
    desc: 'Fragrant basmati rice stir-fried on high flame with diced carrots, beans and soy.',
    image: 'assets/images/veg-fried-rice.jpg',
    type: 'food'
  },
  {
    id: 'veg-noodles',
    name: 'Veg Noodles',
    category: 'Meals',
    price: 55,
    prepTime: 8,
    isVeg: true,
    isEgg: false,
    desc: 'Wok-tossed Hakka noodles with shredded cabbage, bell peppers and spring onion.',
    image: 'assets/images/veg-noodles.jpg',
    type: 'food'
  },
  {
    id: 'chai',
    name: 'Chai',
    category: 'Beverages',
    price: 10,
    prepTime: 2,
    isVeg: true,
    isEgg: false,
    desc: 'Authentic Indian cutting masala chai brewed with freshly crushed ginger & cardamom.',
    image: 'assets/images/chai.jpg',
    type: 'beverage'
  },
  {
    id: 'filter-coffee',
    name: 'Filter Coffee',
    category: 'Beverages',
    price: 20,
    prepTime: 3,
    isVeg: true,
    isEgg: false,
    desc: 'South Indian chicory blend decoction frothed with piping hot full-cream milk.',
    image: 'assets/images/filter-coffee.jpg',
    type: 'beverage'
  },
  {
    id: 'cold-coffee',
    name: 'Cold Coffee',
    category: 'Beverages',
    price: 40,
    prepTime: 5,
    isVeg: true,
    isEgg: false,
    desc: 'Chilled rich blended coffee with creamy milk, sugar and chocolate swirl.',
    image: 'assets/images/cold-coffee.jpg',
    type: 'beverage'
  },
  {
    id: 'lemon-juice',
    name: 'Lemon Juice',
    category: 'Beverages',
    price: 20,
    prepTime: 2,
    isVeg: true,
    isEgg: false,
    desc: 'Freshly squeezed nimbu pani with chilled water, mint leaves and black salt.',
    image: 'assets/images/lemon-juice.jpg',
    type: 'beverage'
  },
  {
    id: 'milkshake',
    name: 'Milkshake',
    category: 'Beverages',
    price: 50,
    prepTime: 5,
    isVeg: true,
    isEgg: false,
    desc: 'Velvety thick milkshake prepared with fresh milk and ice cream drizzle.',
    image: 'assets/images/milkshake.jpg',
    type: 'beverage'
  },
  {
    id: 'ice-cream',
    name: 'Ice Cream',
    category: 'Desserts',
    price: 30,
    prepTime: 2,
    isVeg: true,
    isEgg: false,
    desc: 'Two scoops of premium smooth vanilla and chocolate ice cream.',
    image: 'assets/images/ice-cream.jpg',
    type: 'food'
  }
];

// Fallback SVG placeholder generator
function generateFoodSvgPlaceholder(name, category) {
  const bgPalette = {
    'Snacks': '#FFEDD5',
    'Breakfast': '#FEF3C7',
    'Meals': '#DCFCE7',
    'Beverages': '#E0E7FF',
    'Desserts': '#FCE7F3'
  };
  const bg = bgPalette[category] || '#F3F4F6';
  const icon = category === 'Beverages' ? '☕' : category === 'Desserts' ? '🍨' : '🍔';
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"><rect width="300" height="200" fill="${encodeURIComponent(bg)}"/><text x="150" y="90" font-size="44" text-anchor="middle" dominant-baseline="middle">${icon}</text><text x="150" y="140" font-size="16" font-family="sans-serif" font-weight="bold" fill="%23333333" text-anchor="middle">${encodeURIComponent(name)}</text></svg>`;
}

// Client-side input sanitization utility against XSS
function sanitizeText(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .trim();
}

// LocalStorage & Session state manager
const STORAGE_KEYS = {
  MENU_STOCK: 'cqb_menu_stock_v1',
  CART: 'cqb_cart_v1',
  ORDERS: 'cqb_orders_v1',
  TOKEN_COUNTER: 'cqb_token_counter_v1',
  WALLET_BALANCE: 'cqb_wallet_balance_v1',
  WALLET_TRANSACTIONS: 'cqb_wallet_tx_v1',
  SETTINGS: 'cqb_settings_v1',
  LAST_TOKEN: 'cqb_last_token_v1'
};

class Store {
  static getStock() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MENU_STOCK);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  static isAvailable(itemId) {
    const stock = this.getStock();
    return stock[itemId] !== false;
  }

  static setItemStock(itemId, isAvailable) {
    const stock = this.getStock();
    stock[itemId] = Boolean(isAvailable);
    localStorage.setItem(STORAGE_KEYS.MENU_STOCK, JSON.stringify(stock));
    this.notifyChange('stock');

    // Dual-mode server sync if available
    fetch(`/api/menu/${encodeURIComponent(itemId)}/stock`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isAvailable: Boolean(isAvailable) })
    }).catch(() => {});
  }

  static resetAllStock() {
    localStorage.removeItem(STORAGE_KEYS.MENU_STOCK);
    this.notifyChange('stock');
  }

  static getCart() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CART);
      return data ? JSON.parse(data) : { items: [], takeaway: false, slot: 'Immediate' };
    } catch {
      return { items: [], takeaway: false, slot: 'Immediate' };
    }
  }

  static saveCart(cart) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    this.notifyChange('cart');
  }

  static clearCart() {
    this.saveCart({ items: [], takeaway: false, slot: 'Immediate' });
  }

  static getOrders() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  static saveOrders(orders) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    this.notifyChange('orders');
  }

  static addOrder(order) {
    const orders = this.getOrders();
    orders.unshift(order);
    this.saveOrders(orders);
    localStorage.setItem(STORAGE_KEYS.LAST_TOKEN, order.token);
    return order;
  }

  static updateOrderStatus(token, newStatus) {
    const orders = this.getOrders();
    const target = orders.find(o => o.token.toUpperCase() === token.toUpperCase());
    if (target) {
      target.status = newStatus;
      target.statusTimestamps = target.statusTimestamps || {};
      target.statusTimestamps[newStatus] = new Date().toISOString();
      this.saveOrders(orders);

      // Dual-mode server sync
      fetch(`/api/orders/${encodeURIComponent(token)}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      }).catch(() => {});

      return target;
    }
    return null;
  }

  static clearCompletedOrders() {
    const orders = this.getOrders().filter(o => o.status !== 'PICKED_UP');
    this.saveOrders(orders);
  }

  static getNextToken() {
    let current = parseInt(localStorage.getItem(STORAGE_KEYS.TOKEN_COUNTER) || '0', 10);
    current += 1;
    localStorage.setItem(STORAGE_KEYS.TOKEN_COUNTER, current.toString());
    return `#B-${String(current).padStart(3, '0')}`;
  }

  static getLastToken() {
    return localStorage.getItem(STORAGE_KEYS.LAST_TOKEN) || null;
  }

  static getWalletBalance() {
    const val = localStorage.getItem(STORAGE_KEYS.WALLET_BALANCE);
    return val !== null ? parseFloat(val) : 500.0;
  }

  static setWalletBalance(balance) {
    const val = Math.max(0, parseFloat(balance) || 0);
    localStorage.setItem(STORAGE_KEYS.WALLET_BALANCE, val.toFixed(2));
    this.notifyChange('wallet');
  }

  static getWalletTransactions() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WALLET_TRANSACTIONS);
      return data ? JSON.parse(data) : [
        { id: 'tx-init', type: 'credit', amount: 500, desc: 'Initial Semester Canteen Allowance', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ];
    } catch {
      return [];
    }
  }

  static addWalletTransaction(type, amount, desc) {
    const list = this.getWalletTransactions();
    list.unshift({
      id: 'tx-' + Date.now(),
      type,
      amount: parseFloat(amount),
      desc: sanitizeText(desc),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })
    });
    localStorage.setItem(STORAGE_KEYS.WALLET_TRANSACTIONS, JSON.stringify(list));
    this.notifyChange('wallet');
  }

  static getSettings() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : { soundEnabled: true, voiceEnabled: true };
    } catch {
      return { soundEnabled: true, voiceEnabled: true };
    }
  }

  static saveSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    this.notifyChange('settings');
  }

  static notifyChange(type) {
    window.dispatchEvent(new CustomEvent('campus-sync', { detail: { type } }));
  }
}

// Audio synthesize engine & text-to-speech announcer
class AudioEngine {
  static audioCtx = null;

  static initAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  static playChime(type = 'ready') {
    const settings = Store.getSettings();
    if (!settings.soundEnabled) return;

    try {
      this.initAudio();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;

      if (type === 'ready') {
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
        notes.forEach((freq, idx) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);

          gain.gain.setValueAtTime(0, now + idx * 0.12);
          gain.gain.linearRampToValueAtTime(0.25, now + idx * 0.12 + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.45);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.5);
        });
      } else if (type === 'paid') {
        const notes = [440, 880];
        notes.forEach((freq, idx) => {
          const osc = this.audioCtx.createOscillator();
          const gain = this.audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);

          gain.gain.setValueAtTime(0.2, now + idx * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.3);

          osc.connect(gain);
          gain.connect(this.audioCtx.destination);

          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.35);
        });
      }
    } catch (e) {
      console.warn('Audio chime playback error:', e);
    }
  }

  static announceToken(tokenNumber, counter = 'Counter 1') {
    const settings = Store.getSettings();
    if (!settings.voiceEnabled) return;

    if (!('speechSynthesis' in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const cleanToken = tokenNumber.replace('#', '').replace('-', ' ');
      const utterance = new SpeechSynthesisUtterance(`Token ${cleanToken} is ready for pickup at ${counter}.`);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.lang = 'en-US';

      const voices = window.speechSynthesis.getVoices();
      const engVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Female')));
      if (engVoice) utterance.voice = engVoice;

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }
}

// Notification toast helper
function showToast(message, type = 'info', icon = '🔔') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icon}</span> <span>${sanitizeText(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = '0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// Core App Controller
class CanteenApp {
  constructor() {
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.sortBy = 'default';
    this.kitchenFilter = 'all';
    this.activeCustomizingItem = null;
    this.customizingQty = 1;
    this.activePaymentMethod = 'upi';
    this.isProcessingPayment = false;
  }

  init() {
    this.bindEvents();
    this.startGlobalClock();
    this.renderAllViews();
    this.listenToSyncEvents();

    const lastToken = Store.getLastToken();
    if (lastToken) {
      const trackerInput = document.getElementById('trackTokenInput');
      if (trackerInput && !trackerInput.value) {
        trackerInput.value = lastToken;
      }
    }
  }

  listenToSyncEvents() {
    window.addEventListener('storage', () => this.renderAllViews());
    window.addEventListener('campus-sync', () => this.renderAllViews());
  }

  startGlobalClock() {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const dateStr = now.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });

      const globalClock = document.getElementById('globalClock');
      if (globalClock) globalClock.textContent = timeStr;

      const tvTime = document.getElementById('tvClockTime');
      const tvDate = document.getElementById('tvClockDate');
      if (tvTime) tvTime.textContent = timeStr;
      if (tvDate) tvDate.textContent = dateStr;
    };
    updateTime();
    setInterval(updateTime, 1000);
  }

  switchView(viewName) {
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));

    const targetSection = document.getElementById(`view-${viewName}`);
    const targetTab = document.querySelector(`.nav-tab[data-view="${viewName}"]`);

    if (targetSection) targetSection.classList.add('active');
    if (targetTab) targetTab.classList.add('active');

    if (viewName === 'kiosk') this.renderMenu();
    if (viewName === 'kitchen') this.renderKitchenConsole();
    if (viewName === 'display') this.renderPickupDisplay();
    if (viewName === 'tracker') this.renderTracker();
    if (viewName === 'wallet') this.renderWallet();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderMenu() {
    const foodGrid = document.getElementById('foodGrid');
    const emptyState = document.getElementById('emptyMenuState');
    const itemCountText = document.getElementById('menuItemCount');
    const categoryTitle = document.getElementById('currentCategoryTitle');

    if (!foodGrid) return;

    let items = [...DEFAULT_MENU_ITEMS];

    if (this.currentCategory !== 'all') {
      items = items.filter(i => i.category.toLowerCase() === this.currentCategory.toLowerCase());
      if (categoryTitle) categoryTitle.textContent = `${this.currentCategory} Specialties`;
    } else {
      if (categoryTitle) categoryTitle.textContent = 'All Canteen Menu Items';
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      items = items.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.desc.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q)
      );
    }

    if (this.sortBy === 'price-low') {
      items.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-high') {
      items.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'prep-fast') {
      items.sort((a, b) => a.prepTime - b.prepTime);
    }

    if (itemCountText) {
      itemCountText.textContent = `${items.length} dishes available`;
    }

    if (items.length === 0) {
      foodGrid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    const cart = Store.getCart();

    foodGrid.innerHTML = items.map(item => {
      const isAvailable = Store.isAvailable(item.id);
      const cartItem = cart.items.find(ci => ci.id === item.id && (!ci.customizations || ci.customizations.length === 0));
      const inCartQty = cartItem ? cartItem.qty : 0;
      const vegClass = item.isEgg ? 'egg' : 'veg';
      const fallbackSvg = generateFoodSvgPlaceholder(item.name, item.category);

      return `
        <div class="food-card ${!isAvailable ? 'sold-out' : ''}" data-item-id="${item.id}">
          <div class="card-img-wrap">
            <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackSvg}';">
            <span class="veg-indicator-dot ${vegClass}" title="${item.isEgg ? 'Contains Egg' : '100% Vegetarian'}"></span>
            <div class="prep-badge-overlay">
              <span>⏱️ ${item.prepTime} min</span>
            </div>
            ${!isAvailable ? '<div class="sold-out-overlay">SOLD OUT</div>' : ''}
          </div>

          <div class="card-details">
            <div class="card-category-row">
              <span class="card-category-tag">${item.category}</span>
              <span class="card-customizable-tag">✨ Customizable</span>
            </div>
            <h3 class="card-title">${item.name}</h3>
            <p class="card-desc">${item.desc}</p>

            <div class="card-footer-action">
              <div class="card-price-wrap">
                <span class="card-price-label">Price</span>
                <span class="card-price-value">₹${item.price}</span>
              </div>

              ${!isAvailable
                ? `<button class="btn-add-food" disabled>Out of Stock</button>`
                : inCartQty > 0
                  ? `
                    <div class="card-qty-control">
                      <button class="card-qty-btn" onclick="app.updateCardQuantity('${item.id}', -1)">−</button>
                      <span class="card-qty-num">${inCartQty}</span>
                      <button class="card-qty-btn" onclick="app.updateCardQuantity('${item.id}', 1)">+</button>
                    </div>
                  `
                  : `
                    <button class="btn-add-food" onclick="app.openCustomization('${item.id}')">
                      <span>+ ADD</span>
                    </button>
                  `
              }
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  openCustomization(itemId) {
    const item = DEFAULT_MENU_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    if (!Store.isAvailable(item.id)) {
      showToast(`${item.name} is currently out of stock.`, 'error', '⚠️');
      return;
    }

    this.activeCustomizingItem = item;
    this.customizingQty = 1;

    const modal = document.getElementById('customizationModal');
    const img = document.getElementById('customItemImage');
    const vegBadge = document.getElementById('customItemVegBadge');
    const catTag = document.getElementById('customItemCategory');
    const nameEl = document.getElementById('customItemName');
    const descEl = document.getElementById('customItemDesc');
    const basePriceEl = document.getElementById('customItemBasePrice');
    const prepTimeEl = document.getElementById('customItemPrepTime');
    const qtyValEl = document.getElementById('customQtyValue');

    const bevSizeGroup = document.getElementById('beverageSizeGroup');
    const bevMilkGroup = document.getElementById('beverageMilkGroup');
    const bevOptsGroup = document.getElementById('beverageOptionsGroup');
    const foodOptsGroup = document.getElementById('foodOptionsGroup');

    if (img) {
      img.src = item.image;
      img.onerror = () => { img.src = generateFoodSvgPlaceholder(item.name, item.category); };
    }
    if (vegBadge) {
      vegBadge.textContent = item.isEgg ? '🥚 Contains Egg' : '🟢 100% Pure Veg';
      vegBadge.style.color = item.isEgg ? '#D97706' : '#10B981';
    }
    if (catTag) catTag.textContent = item.category;
    if (nameEl) nameEl.textContent = item.name;
    if (descEl) descEl.textContent = item.desc;
    if (basePriceEl) basePriceEl.textContent = `₹${item.price}`;
    if (prepTimeEl) prepTimeEl.textContent = item.prepTime;
    if (qtyValEl) qtyValEl.textContent = '1';

    document.querySelectorAll('input[name="bevSize"]').forEach(r => { r.checked = r.value === 'Regular'; });
    document.querySelectorAll('input[name="bevMilk"]').forEach(r => { r.checked = r.value === 'Standard Milk'; });
    document.querySelectorAll('input[name="bevCustom"]').forEach(c => { c.checked = false; });
    document.querySelectorAll('input[name="foodCustom"]').forEach(c => { c.checked = false; });

    if (item.type === 'beverage') {
      bevSizeGroup.style.display = 'block';
      if (bevMilkGroup) bevMilkGroup.style.display = (item.id === 'lemon-juice') ? 'none' : 'block';
      bevOptsGroup.style.display = 'block';
      foodOptsGroup.style.display = 'none';
    } else {
      bevSizeGroup.style.display = 'none';
      if (bevMilkGroup) bevMilkGroup.style.display = 'none';
      bevOptsGroup.style.display = 'none';
      foodOptsGroup.style.display = 'block';
    }

    this.recalculateCustomizationPrice();
    modal.style.display = 'flex';
  }

  closeCustomization() {
    const modal = document.getElementById('customizationModal');
    if (modal) modal.style.display = 'none';
    this.activeCustomizingItem = null;
  }

  recalculateCustomizationPrice() {
    if (!this.activeCustomizingItem) return;

    const base = this.activeCustomizingItem.price;
    let extra = 0;

    if (this.activeCustomizingItem.type === 'beverage') {
      const selectedSize = document.querySelector('input[name="bevSize"]:checked');
      if (selectedSize && selectedSize.value.includes('Large')) {
        extra += 15;
      }
      const selectedMilk = document.querySelector('input[name="bevMilk"]:checked');
      if (selectedMilk && selectedMilk.value.includes('+₹10')) {
        extra += 10;
      }
      document.querySelectorAll('input[name="bevCustom"]:checked').forEach(cb => {
        extra += parseInt(cb.dataset.price || '0', 10);
      });
    } else {
      document.querySelectorAll('input[name="foodCustom"]:checked').forEach(cb => {
        extra += parseInt(cb.dataset.price || '0', 10);
      });
    }

    const unitPrice = base + extra;
    const total = unitPrice * this.customizingQty;

    const dynamicTotalEl = document.getElementById('customDynamicTotal');
    const confirmBtnPriceEl = document.getElementById('confirmAddBtnPrice');

    if (dynamicTotalEl) dynamicTotalEl.textContent = `₹${total}`;
    if (confirmBtnPriceEl) confirmBtnPriceEl.textContent = `₹${total}`;

    return { unitPrice, total, extra };
  }

  confirmAddCustomizationToCart() {
    if (!this.activeCustomizingItem) return;

    const item = this.activeCustomizingItem;
    const { unitPrice } = this.recalculateCustomizationPrice();
    const customizations = [];

    if (item.type === 'beverage') {
      const selectedSize = document.querySelector('input[name="bevSize"]:checked');
      if (selectedSize && selectedSize.value.includes('Large')) {
        customizations.push('Large Size (+₹15)');
      }
      const selectedMilk = document.querySelector('input[name="bevMilk"]:checked');
      if (selectedMilk && selectedMilk.value !== 'Standard Milk') {
        customizations.push(selectedMilk.value);
      }
      document.querySelectorAll('input[name="bevCustom"]:checked').forEach(cb => {
        const p = parseInt(cb.dataset.price, 10);
        customizations.push(p > 0 ? `${cb.value} (+₹${p})` : cb.value);
      });
    } else {
      document.querySelectorAll('input[name="foodCustom"]:checked').forEach(cb => {
        const p = parseInt(cb.dataset.price, 10);
        customizations.push(p > 0 ? `${cb.value} (+₹${p})` : cb.value);
      });
    }

    this.addToCartWithCustomizations(item, customizations, unitPrice, this.customizingQty);
    this.closeCustomization();
    showToast(`Added ${this.customizingQty}x ${item.name} to Tray!`, 'success', '🛒');
  }

  addToCartWithCustomizations(item, customizations = [], unitPrice, qty = 1) {
    const cart = Store.getCart();
    const customKey = customizations.sort().join('||');
    const existingIndex = cart.items.findIndex(ci => ci.id === item.id && (ci.customizations || []).sort().join('||') === customKey);

    const validatedQty = Math.max(1, Math.min(20, parseInt(qty, 10) || 1));

    if (existingIndex > -1) {
      cart.items[existingIndex].qty = Math.min(50, cart.items[existingIndex].qty + validatedQty);
    } else {
      cart.items.push({
        id: item.id,
        name: item.name,
        category: item.category,
        image: item.image,
        prepTime: item.prepTime,
        basePrice: item.price,
        unitPrice: unitPrice,
        qty: validatedQty,
        customizations: customizations
      });
    }

    Store.saveCart(cart);
  }

  updateCardQuantity(itemId, delta) {
    const cart = Store.getCart();
    const item = DEFAULT_MENU_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    const index = cart.items.findIndex(ci => ci.id === itemId && (!ci.customizations || ci.customizations.length === 0));

    if (index > -1) {
      cart.items[index].qty += delta;
      if (cart.items[index].qty <= 0) {
        cart.items.splice(index, 1);
      }
    } else if (delta > 0) {
      cart.items.push({
        id: item.id,
        name: item.name,
        category: item.category,
        image: item.image,
        prepTime: item.prepTime,
        basePrice: item.price,
        unitPrice: item.price,
        qty: 1,
        customizations: []
      });
    }

    Store.saveCart(cart);
  }

  renderCart() {
    const cart = Store.getCart();
    const countBadge = document.getElementById('cartCountBadge');
    const kioskCartTotalDisplay = document.getElementById('kioskCartTotalDisplay');
    const cartDrawerCount = document.getElementById('cartDrawerCount');
    const cartItemsList = document.getElementById('cartItemsList');
    const emptyCartView = document.getElementById('emptyCartView');
    const cartDrawerFooter = document.getElementById('cartDrawerFooter');

    const billSubtotal = document.getElementById('billSubtotal');
    const packagingFeeRow = document.getElementById('packagingFeeRow');
    const billGrandTotal = document.getElementById('billGrandTotal');
    const checkoutBtnTotal = document.getElementById('checkoutBtnTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const takeawayCheckbox = document.getElementById('takeawayCheckbox');
    const pickupSlotSelect = document.getElementById('pickupSlotSelect');

    const totalItemCount = cart.items.reduce((sum, item) => sum + item.qty, 0);

    if (countBadge) countBadge.textContent = totalItemCount;
    if (cartDrawerCount) cartDrawerCount.textContent = `${totalItemCount} items`;

    if (takeawayCheckbox) {
      takeawayCheckbox.checked = Boolean(cart.takeaway);
    }
    if (pickupSlotSelect && cart.slot) {
      pickupSlotSelect.value = cart.slot;
    }

    const subtotal = cart.items.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
    const packagingFee = (cart.takeaway && cart.items.length > 0) ? 5 : 0;
    const grandTotal = subtotal + packagingFee;

    if (kioskCartTotalDisplay) kioskCartTotalDisplay.textContent = `₹${grandTotal}`;
    if (billSubtotal) billSubtotal.textContent = `₹${subtotal}`;
    if (packagingFeeRow) packagingFeeRow.style.display = cart.takeaway ? 'flex' : 'none';
    if (billGrandTotal) billGrandTotal.textContent = `₹${grandTotal}`;
    if (checkoutBtnTotal) checkoutBtnTotal.textContent = `₹${grandTotal}`;

    if (checkoutBtn) {
      checkoutBtn.disabled = cart.items.length === 0;
    }

    if (cart.items.length === 0) {
      if (cartItemsList) cartItemsList.innerHTML = '';
      if (emptyCartView) emptyCartView.style.display = 'flex';
      if (cartDrawerFooter) cartDrawerFooter.style.display = 'none';
      return;
    }

    if (emptyCartView) emptyCartView.style.display = 'none';
    if (cartDrawerFooter) cartDrawerFooter.style.display = 'block';

    if (cartItemsList) {
      cartItemsList.innerHTML = cart.items.map((item, index) => {
        const customBadge = item.customizations && item.customizations.length > 0
          ? `<div class="cart-item-customizations">✨ ${item.customizations.join(', ')}</div>`
          : '';

        return `
          <div class="cart-item-row">
            <button class="btn-remove-item" onclick="app.removeCartItem(${index})" title="Remove item">✕</button>
            <img class="cart-item-thumb" src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.src='${generateFoodSvgPlaceholder(item.name, item.category)}';">
            <div class="cart-item-info">
              <h4 class="cart-item-name">${item.name}</h4>
              ${customBadge}
              <div class="cart-item-bottom">
                <span class="cart-item-price">₹${item.unitPrice * item.qty}</span>
                <div class="cart-qty-inline">
                  <button onclick="app.changeCartItemQty(${index}, -1)">−</button>
                  <span>${item.qty}</span>
                  <button onclick="app.changeCartItemQty(${index}, 1)">+</button>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  openCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartDrawerBackdrop');
    if (drawer && backdrop) {
      drawer.classList.add('open');
      backdrop.style.display = 'block';
      this.renderCart();
    }
  }

  closeCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartDrawerBackdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('open');
      backdrop.style.display = 'none';
    }
  }

  changeCartItemQty(index, delta) {
    const cart = Store.getCart();
    if (!cart.items[index]) return;

    cart.items[index].qty += delta;
    if (cart.items[index].qty <= 0) {
      cart.items.splice(index, 1);
    }
    Store.saveCart(cart);
  }

  removeCartItem(index) {
    const cart = Store.getCart();
    if (cart.items[index]) {
      const removedName = cart.items[index].name;
      cart.items.splice(index, 1);
      Store.saveCart(cart);
      showToast(`Removed ${removedName} from tray`, 'info', '🗑️');
    }
  }

  clearEntireCart() {
    const cart = Store.getCart();
    if (cart.items.length === 0) return;

    if (confirm('Are you sure you want to empty your canteen tray?')) {
      Store.clearCart();
      showToast('Canteen tray emptied', 'info', '🧹');
    }
  }

  openCheckout() {
    const cart = Store.getCart();
    if (cart.items.length === 0) {
      showToast('Your tray is empty! Add food items first.', 'error', '⚠️');
      return;
    }

    this.closeCartDrawer();

    const subtotal = cart.items.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
    const packagingFee = cart.takeaway ? 5 : 0;
    const grandTotal = subtotal + packagingFee;

    const modal = document.getElementById('checkoutModal');
    const amountDisplay = document.getElementById('checkoutAmountDisplay');
    const slotBadge = document.getElementById('checkoutSlotBadge');
    const payNowBtnAmount = document.getElementById('payNowBtnAmount');
    const payNowBtn = document.getElementById('payNowBtn');
    const processingOverlay = document.getElementById('paymentProcessingOverlay');

    if (amountDisplay) amountDisplay.textContent = `₹${grandTotal}`;
    if (slotBadge) slotBadge.textContent = cart.slot || 'Immediate';
    if (payNowBtnAmount) payNowBtnAmount.textContent = `₹${grandTotal}`;

    if (payNowBtn) payNowBtn.disabled = false;
    if (processingOverlay) processingOverlay.style.display = 'none';

    this.renderUpiQrCode(grandTotal);
    this.updateWalletCheckoutTab(grandTotal);
    this.setPaymentMethod(this.activePaymentMethod || 'upi');

    modal.style.display = 'flex';
  }

  closeCheckout() {
    if (this.isProcessingPayment) return;
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.style.display = 'none';
  }

  setPaymentMethod(method) {
    this.activePaymentMethod = method;

    document.querySelectorAll('.payment-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.method === method);
    });

    const upiContent = document.getElementById('tabContentUpi');
    const walletContent = document.getElementById('tabContentWallet');

    if (method === 'upi') {
      if (upiContent) upiContent.style.display = 'block';
      if (walletContent) walletContent.style.display = 'none';
      const payNowBtn = document.getElementById('payNowBtn');
      if (payNowBtn) payNowBtn.disabled = false;
    } else {
      if (upiContent) upiContent.style.display = 'none';
      if (walletContent) walletContent.style.display = 'block';

      const cart = Store.getCart();
      const subtotal = cart.items.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
      const grandTotal = subtotal + (cart.takeaway ? 5 : 0);
      const balance = Store.getWalletBalance();

      const payNowBtn = document.getElementById('payNowBtn');
      if (payNowBtn) payNowBtn.disabled = balance < grandTotal;
    }
  }

  renderUpiQrCode(totalAmount) {
    const qrcodeBox = document.getElementById('qrcodeBox');
    if (!qrcodeBox) return;

    qrcodeBox.innerHTML = '';
    const upiUri = `upi://pay?pa=canteen.pay@campusbhim&pn=Campus%20Quick%20Bite&am=${totalAmount}&cu=INR&tn=Campus%20Canteen%20Order`;

    if (typeof QRCode !== 'undefined') {
      try {
        new QRCode(qrcodeBox, {
          text: upiUri,
          width: 170,
          height: 170,
          colorDark: '#1E293B',
          colorLight: '#FFFFFF',
          correctLevel: QRCode.CorrectLevel.M
        });
        return;
      } catch (e) {
        console.warn('QRCode CDN fallback:', e);
      }
    }

    qrcodeBox.innerHTML = `
      <svg width="170" height="170" viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg">
        <rect width="170" height="170" fill="#ffffff" rx="8"/>
        <rect x="15" y="15" width="40" height="40" fill="#1E293B" rx="4"/>
        <rect x="23" y="23" width="24" height="24" fill="#ffffff" rx="2"/>
        <rect x="29" y="29" width="12" height="12" fill="#FF6600"/>
        <rect x="115" y="15" width="40" height="40" fill="#1E293B" rx="4"/>
        <rect x="123" y="23" width="24" height="24" fill="#ffffff" rx="2"/>
        <rect x="129" y="29" width="12" height="12" fill="#FF6600"/>
        <rect x="15" y="115" width="40" height="40" fill="#1E293B" rx="4"/>
        <rect x="23" y="123" width="24" height="24" fill="#ffffff" rx="2"/>
        <rect x="29" y="129" width="12" height="12" fill="#FF6600"/>
        <rect x="65" y="65" width="40" height="40" fill="#10B981" rx="4"/>
        <text x="85" y="90" fill="#ffffff" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle">UPI</text>
      </svg>
    `;
  }

  updateWalletCheckoutTab(grandTotal) {
    const currentBal = Store.getWalletBalance();
    const afterBal = currentBal - grandTotal;

    const balanceEl = document.getElementById('checkoutWalletBalance');
    const orderCostEl = document.getElementById('checkoutWalletOrderCost');
    const balanceAfterEl = document.getElementById('checkoutWalletBalanceAfter');
    const alertEl = document.getElementById('insufficientBalanceAlert');

    if (balanceEl) balanceEl.textContent = `₹${currentBal.toFixed(2)}`;
    if (orderCostEl) orderCostEl.textContent = `− ₹${grandTotal.toFixed(2)}`;
    if (balanceAfterEl) balanceAfterEl.textContent = `₹${Math.max(0, afterBal).toFixed(2)}`;

    if (alertEl) {
      alertEl.style.display = currentBal < grandTotal ? 'block' : 'none';
    }
  }

  processPayment() {
    if (this.isProcessingPayment) return;

    const cart = Store.getCart();
    if (cart.items.length === 0) return;

    const subtotal = cart.items.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
    const packagingFee = cart.takeaway ? 5 : 0;
    const grandTotal = subtotal + packagingFee;

    if (this.activePaymentMethod === 'wallet') {
      const balance = Store.getWalletBalance();
      if (balance < grandTotal) {
        showToast('Insufficient wallet balance. Please choose UPI or top-up.', 'error', '⚠️');
        return;
      }
    }

    this.isProcessingPayment = true;
    const payNowBtn = document.getElementById('payNowBtn');
    const processingOverlay = document.getElementById('paymentProcessingOverlay');
    const progressFill = document.getElementById('processingProgressFill');
    const countdownText = document.getElementById('processingCountdownText');

    if (payNowBtn) payNowBtn.disabled = true;
    if (processingOverlay) processingOverlay.style.display = 'flex';
    if (progressFill) progressFill.style.width = '100%';

    let secondsLeft = 3;
    if (countdownText) countdownText.textContent = `${secondsLeft} seconds remaining...`;

    const countdownInterval = setInterval(() => {
      secondsLeft -= 1;
      if (countdownText && secondsLeft > 0) {
        countdownText.textContent = `${secondsLeft} second${secondsLeft > 1 ? 's' : ''} remaining...`;
      }
    }, 1000);

    setTimeout(() => {
      clearInterval(countdownInterval);
      this.isProcessingPayment = false;

      if (this.activePaymentMethod === 'wallet') {
        const balance = Store.getWalletBalance();
        const newBalance = balance - grandTotal;
        Store.setWalletBalance(newBalance);
        Store.addWalletTransaction('debit', grandTotal, 'Canteen Meal Order');

        fetch('/api/wallet/pay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: grandTotal, desc: 'Canteen Meal Order' })
        }).catch(() => {});
      }

      const token = Store.getNextToken();
      const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
      const maxPrep = Math.max(...cart.items.map(i => i.prepTime || 4));
      const estPrepTime = `${maxPrep} minutes`;

      const newOrder = {
        token: token,
        orderId: orderId,
        createdAt: new Date().toISOString(),
        timeFormatted: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        items: [...cart.items],
        subtotal: subtotal,
        packagingFee: packagingFee,
        grandTotal: grandTotal,
        takeaway: Boolean(cart.takeaway),
        slot: cart.slot || 'Immediate',
        paymentMethod: this.activePaymentMethod === 'wallet' ? 'Student Wallet (Simulated)' : 'Mock UPI (Paid)',
        status: 'PAID',
        estPrepTime: estPrepTime,
        statusTimestamps: {
          PAID: new Date().toISOString()
        }
      };

      Store.addOrder(newOrder);
      Store.clearCart();

      // Dual-mode server sync
      fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: newOrder.items,
          takeaway: newOrder.takeaway,
          slot: newOrder.slot,
          paymentMethod: this.activePaymentMethod,
          submittedTotal: newOrder.grandTotal
        })
      }).catch(() => {});

      AudioEngine.playChime('paid');
      this.closeCheckout();
      this.showReceipt(newOrder);

      showToast(`Payment successful! Token ${token} generated`, 'success', '🎉');
    }, 3000);
  }

  showReceipt(order) {
    const modal = document.getElementById('receiptModal');
    const tokenEl = document.getElementById('receiptTokenNumber');
    const orderIdEl = document.getElementById('receiptOrderId');
    const timestampEl = document.getElementById('receiptTimestamp');
    const slotEl = document.getElementById('receiptSlot');
    const prepTimeEl = document.getElementById('receiptPrepTime');
    const payMethodEl = document.getElementById('receiptPayMethod');
    const statusEl = document.getElementById('receiptStatus');
    const itemsListEl = document.getElementById('receiptItemsList');
    const totalAmountEl = document.getElementById('receiptTotalAmount');

    if (tokenEl) tokenEl.textContent = order.token;
    if (orderIdEl) orderIdEl.textContent = order.orderId;
    if (timestampEl) timestampEl.textContent = `${new Date(order.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${order.timeFormatted}`;
    if (slotEl) slotEl.textContent = order.slot;
    if (prepTimeEl) prepTimeEl.textContent = order.estPrepTime;
    if (payMethodEl) payMethodEl.textContent = order.paymentMethod;
    if (statusEl) statusEl.textContent = `${order.status} (In Queue)`;
    if (totalAmountEl) totalAmountEl.textContent = `₹${order.grandTotal}`;

    if (itemsListEl) {
      itemsListEl.innerHTML = order.items.map(item => `
        <div class="ticket-item-entry">
          <div>
            <span><strong>${item.qty}x</strong> ${item.name}</span>
            ${item.customizations && item.customizations.length > 0 ? `<span class="ticket-item-sub">+ ${item.customizations.join(', ')}</span>` : ''}
          </div>
          <span>₹${item.unitPrice * item.qty}</span>
        </div>
      `).join('');

      if (order.packagingFee > 0) {
        itemsListEl.innerHTML += `
          <div class="ticket-item-entry">
            <div><span>Takeaway Packaging</span></div>
            <span>₹${order.packagingFee}</span>
          </div>
        `;
      }
    }

    if (modal) modal.style.display = 'flex';
  }

  closeReceipt() {
    const modal = document.getElementById('receiptModal');
    if (modal) modal.style.display = 'none';
  }

  renderKitchenConsole() {
    const orders = Store.getOrders();
    const grid = document.getElementById('kitchenCardsGrid');
    const emptyState = document.getElementById('emptyKitchenState');
    const searchInput = document.getElementById('kitchenSearchInput');

    const statTotal = document.getElementById('statTotalOrders');
    const statPaid = document.getElementById('statPaidOrders');
    const statPrep = document.getElementById('statPreparingOrders');
    const statReady = document.getElementById('statReadyOrders');
    const statPicked = document.getElementById('statPickedOrders');
    const navBadge = document.getElementById('kitchenOrderCountBadge');

    const paidCount = orders.filter(o => o.status === 'PAID').length;
    const prepCount = orders.filter(o => o.status === 'PREPARING').length;
    const readyCount = orders.filter(o => o.status === 'READY').length;
    const pickedCount = orders.filter(o => o.status === 'PICKED_UP').length;
    const activeTotal = paidCount + prepCount + readyCount;

    if (statTotal) statTotal.textContent = activeTotal;
    if (statPaid) statPaid.textContent = paidCount;
    if (statPrep) statPrep.textContent = prepCount;
    if (statReady) statReady.textContent = readyCount;
    if (statPicked) statPicked.textContent = pickedCount;
    if (navBadge) navBadge.textContent = activeTotal;

    if (!grid) return;

    let filtered = [...orders];

    if (this.kitchenFilter !== 'all') {
      filtered = filtered.filter(o => o.status === this.kitchenFilter);
    }

    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    if (query) {
      filtered = filtered.filter(o =>
        o.token.toLowerCase().includes(query) ||
        o.orderId.toLowerCase().includes(query) ||
        o.items.some(i => i.name.toLowerCase().includes(query))
      );
    }

    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    grid.innerHTML = filtered.map(order => {
      let actionButtons = '';
      if (order.status === 'PAID') {
        actionButtons = `
          <button class="btn-kitchen-action btn-start-prep" onclick="app.advanceOrderStatus('${order.token}', 'PREPARING')">
            👨‍🍳 Start Preparing
          </button>
        `;
      } else if (order.status === 'PREPARING') {
        actionButtons = `
          <button class="btn-kitchen-action btn-mark-ready" onclick="app.advanceOrderStatus('${order.token}', 'READY')">
            🔔 Mark Ready for Pickup
          </button>
        `;
      } else if (order.status === 'READY') {
        actionButtons = `
          <button class="btn-kitchen-action btn-mark-picked" onclick="app.advanceOrderStatus('${order.token}', 'PICKED_UP')">
            ✅ Hand Over / Picked Up
          </button>
        `;
      } else {
        actionButtons = `
          <span style="font-size:0.8rem; color:#6B7280; font-weight:600; text-align:center; width:100%;">
            Order Picked Up & Completed
          </span>
        `;
      }

      const statusBadgeMap = {
        'PAID': '<span class="k-status-badge badge-paid">PAID • NEW</span>',
        'PREPARING': '<span class="k-status-badge badge-preparing">PREPARING</span>',
        'READY': '<span class="k-status-badge badge-ready">READY FOR PICKUP</span>',
        'PICKED_UP': '<span class="k-status-badge badge-picked">PICKED UP</span>'
      };

      return `
        <div class="kitchen-order-card status-${order.status}" data-token="${order.token}">
          <div class="k-card-header">
            <span class="k-token-num">${order.token}</span>
            ${statusBadgeMap[order.status] || ''}
          </div>

          <div class="k-card-meta">
            <span>⏰ ${order.timeFormatted} (${order.slot})</span>
            <span>⏱️ Est: ${order.estPrepTime}</span>
          </div>

          <div class="k-card-items">
            ${order.items.map(item => `
              <div class="k-item-row">
                <div>
                  <span class="k-item-title">${item.qty}x ${item.name}</span>
                  ${item.customizations && item.customizations.length > 0 ? `<br><span class="k-item-customs">Custom: ${item.customizations.join(', ')}</span>` : ''}
                </div>
                <strong>₹${item.unitPrice * item.qty}</strong>
              </div>
            `).join('')}
            ${order.takeaway ? `<div style="font-size:0.75rem; color:#D97706; font-weight:700;">📦 Takeaway Packaging Requested</div>` : ''}
          </div>

          <div class="k-card-actions">
            ${actionButtons}
          </div>
        </div>
      `;
    }).join('');
  }

  advanceOrderStatus(token, targetStatus) {
    const updated = Store.updateOrderStatus(token, targetStatus);
    if (!updated) return;

    if (targetStatus === 'READY') {
      AudioEngine.playChime('ready');
      AudioEngine.announceToken(token, 'Counter 1');
      showToast(`Token ${token} is READY for pickup!`, 'success', '🔔');
    } else if (targetStatus === 'PREPARING') {
      showToast(`Token ${token} is now cooking in kitchen.`, 'info', '👨‍🍳');
    } else if (targetStatus === 'PICKED_UP') {
      showToast(`Token ${token} marked as picked up.`, 'info', '✅');
    }

    this.renderKitchenConsole();
    this.renderPickupDisplay();
    this.renderTracker();
  }

  renderPickupDisplay() {
    const orders = Store.getOrders();
    const prepGrid = document.getElementById('tvPreparingGrid');
    const readyGrid = document.getElementById('tvReadyGrid');
    const prepCount = document.getElementById('tvPreparingCount');
    const readyCount = document.getElementById('tvReadyCount');
    const prepEmpty = document.getElementById('tvPreparingEmpty');
    const readyEmpty = document.getElementById('tvReadyEmpty');

    if (!prepGrid || !readyGrid) return;

    const preparingOrders = orders.filter(o => o.status === 'PREPARING' || o.status === 'PAID');
    const readyOrders = orders.filter(o => o.status === 'READY');

    if (prepCount) prepCount.textContent = `${preparingOrders.length} In Kitchen`;
    if (readyCount) readyCount.textContent = `${readyOrders.length} Ready Now`;

    if (preparingOrders.length === 0) {
      prepGrid.innerHTML = '';
      if (prepEmpty) prepEmpty.style.display = 'block';
    } else {
      if (prepEmpty) prepEmpty.style.display = 'none';
      prepGrid.innerHTML = preparingOrders.map(o => `
        <div class="tv-token-card prep-card">
          <div class="tv-token-number">${o.token}</div>
          <div class="tv-token-items">${o.items.map(i => `${i.qty}x ${i.name}`).join(', ')}</div>
          <span class="tv-token-sub">${o.status === 'PAID' ? 'Queued' : 'Cooking Now'}</span>
        </div>
      `).join('');
    }

    if (readyOrders.length === 0) {
      readyGrid.innerHTML = '';
      if (readyEmpty) readyEmpty.style.display = 'block';
    } else {
      if (readyEmpty) readyEmpty.style.display = 'none';
      readyGrid.innerHTML = readyOrders.map(o => `
        <div class="tv-token-card ready-card">
          <div class="tv-token-number">${o.token}</div>
          <div class="tv-token-items">${o.items.map(i => `${i.qty}x ${i.name}`).join(', ')}</div>
          <span class="tv-token-sub">Pickup at Counter 1</span>
        </div>
      `).join('');
    }
  }

  renderTracker() {
    const lastToken = Store.getLastToken();
    const input = document.getElementById('trackTokenInput');
    const pillsContainer = document.getElementById('trackerRecentPills');

    const orders = Store.getOrders();
    const recentTokens = orders.slice(0, 5).map(o => o.token);

    if (pillsContainer) {
      pillsContainer.innerHTML = `<span class="recent-label">Recent Tokens:</span>`;
      if (recentTokens.length === 0) {
        pillsContainer.innerHTML += `<span style="color:#94A3B8; font-size:0.75rem;">No recent orders placed yet</span>`;
      } else {
        recentTokens.forEach(t => {
          const chip = document.createElement('span');
          chip.className = 'recent-token-chip';
          chip.textContent = t;
          chip.onclick = () => {
            if (input) input.value = t;
            this.trackToken(t);
          };
          pillsContainer.appendChild(chip);
        });
      }
    }

    const tokenToTrack = (input && input.value.trim()) || lastToken;
    if (tokenToTrack) {
      this.trackToken(tokenToTrack);
    }
  }

  trackToken(tokenQuery) {
    if (!tokenQuery) return;
    const cleanToken = sanitizeText(tokenQuery).toUpperCase().replace('#', '');
    const formattedToken = `#${cleanToken}`;

    const orders = Store.getOrders();
    const order = orders.find(o => o.token.toUpperCase() === formattedToken || o.token.toUpperCase().replace('#', '') === cleanToken);

    const resultBox = document.getElementById('trackingResultBox');
    const notFoundBox = document.getElementById('trackerNotFound');

    if (!order) {
      if (resultBox) resultBox.style.display = 'none';
      if (notFoundBox) notFoundBox.style.display = 'block';
      return;
    }

    if (notFoundBox) notFoundBox.style.display = 'none';
    if (resultBox) resultBox.style.display = 'block';

    const tokenDisplay = document.getElementById('trackDisplayToken');
    const slotDisplay = document.getElementById('trackDisplaySlot');
    const totalPaidEl = document.getElementById('trackTotalPaid');
    const itemsListEl = document.getElementById('trackItemsList');

    if (tokenDisplay) tokenDisplay.textContent = order.token;
    if (slotDisplay) slotDisplay.textContent = `Pickup Slot: ${order.slot}`;
    if (totalPaidEl) totalPaidEl.textContent = `₹${order.grandTotal}`;

    if (itemsListEl) {
      itemsListEl.innerHTML = order.items.map(i => `
        <div style="display:flex; justify-content:space-between;">
          <span><strong>${i.qty}x</strong> ${i.name} ${i.customizations && i.customizations.length > 0 ? `(${i.customizations.join(', ')})` : ''}</span>
          <span>₹${i.unitPrice * i.qty}</span>
        </div>
      `).join('');
    }

    const stepPaid = document.getElementById('step-paid');
    const stepPrep = document.getElementById('step-preparing');
    const stepReady = document.getElementById('step-ready');
    const stepPicked = document.getElementById('step-picked');

    const conn1 = document.getElementById('conn-1');
    const conn2 = document.getElementById('conn-2');
    const conn3 = document.getElementById('conn-3');

    const iconEl = document.getElementById('trackStatusIcon');
    const headlineEl = document.getElementById('trackStatusHeadline');
    const detailEl = document.getElementById('trackStatusDetail');

    [stepPaid, stepPrep, stepReady, stepPicked].forEach(s => {
      if (s) { s.classList.remove('active', 'completed'); }
    });
    [conn1, conn2, conn3].forEach(c => {
      if (c) { c.classList.remove('completed'); }
    });

    const status = order.status;

    if (status === 'PAID') {
      stepPaid.classList.add('active');
      if (iconEl) iconEl.textContent = '📋';
      if (headlineEl) headlineEl.textContent = 'Order Confirmed & Sent to Kitchen';
      if (detailEl) detailEl.textContent = 'Chef has received your order ticket and will start preparing shortly.';
    } else if (status === 'PREPARING') {
      stepPaid.classList.add('completed');
      conn1.classList.add('completed');
      stepPrep.classList.add('active');
      if (iconEl) iconEl.textContent = '👨‍🍳';
      if (headlineEl) headlineEl.textContent = 'Cooking in Progress!';
      if (detailEl) detailEl.textContent = `Your meal is being prepared fresh. Estimated cooking time: ~${order.estPrepTime}.`;
    } else if (status === 'READY') {
      stepPaid.classList.add('completed');
      conn1.classList.add('completed');
      stepPrep.classList.add('completed');
      conn2.classList.add('completed');
      stepReady.classList.add('active');
      if (iconEl) iconEl.textContent = '🔔';
      if (headlineEl) headlineEl.textContent = 'Ready for Pickup at Counter 1!';
      if (detailEl) detailEl.textContent = 'Please show your token number at the canteen pickup counter to collect your order.';
    } else if (status === 'PICKED_UP') {
      stepPaid.classList.add('completed');
      conn1.classList.add('completed');
      stepPrep.classList.add('completed');
      conn2.classList.add('completed');
      stepReady.classList.add('completed');
      conn3.classList.add('completed');
      stepPicked.classList.add('completed');
      if (iconEl) iconEl.textContent = '✨';
      if (headlineEl) headlineEl.textContent = 'Order Picked Up!';
      if (detailEl) detailEl.textContent = 'Thank you for dining at Campus Quick Bite! Enjoy your meal.';
    }
  }

  renderWallet() {
    const balance = Store.getWalletBalance();
    const transactions = Store.getWalletTransactions();

    const mainBalance = document.getElementById('walletMainBalance');
    const kioskBalance = document.getElementById('kioskWalletDisplay');
    const txList = document.getElementById('transactionList');

    if (mainBalance) mainBalance.textContent = `₹${balance.toFixed(2)}`;
    if (kioskBalance) kioskBalance.textContent = `₹${balance.toFixed(0)}`;

    if (txList) {
      if (transactions.length === 0) {
        txList.innerHTML = `<p style="color:#94A3B8; text-align:center; padding:1rem;">No transactions yet.</p>`;
        return;
      }
      txList.innerHTML = transactions.map(tx => `
        <div class="transaction-entry">
          <div class="tx-left">
            <span class="tx-icon ${tx.type}">${tx.type === 'credit' ? '↓' : '↑'}</span>
            <div>
              <div class="tx-desc">${tx.desc}</div>
              <div class="tx-date">${tx.time}</div>
            </div>
          </div>
          <span class="tx-amount ${tx.type}">${tx.type === 'credit' ? '+' : '−'} ₹${tx.amount.toFixed(2)}</span>
        </div>
      `).join('');
    }
  }

  topupWallet(amount) {
    const val = parseFloat(amount);
    if (isNaN(val) || val < 10 || val > 5000) {
      showToast('Top-up must be between ₹10 and ₹5,000.', 'error', '⚠️');
      return;
    }

    const current = Store.getWalletBalance();
    const updated = Math.round((current + val) * 100) / 100;
    Store.setWalletBalance(updated);
    Store.addWalletTransaction('credit', val, 'Student Top-Up Deposit');

    fetch('/api/wallet/topup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: val })
    }).catch(() => {});

    showToast(`Added ₹${val} to Canteen Wallet!`, 'success', '💳');
  }

  renderInventoryModal() {
    const tableBody = document.getElementById('inventoryTableBody');
    const searchInput = document.getElementById('inventorySearchInput');
    if (!tableBody) return;

    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    let items = [...DEFAULT_MENU_ITEMS];
    if (query) {
      items = items.filter(i => i.name.toLowerCase().includes(query) || i.category.toLowerCase().includes(query));
    }

    tableBody.innerHTML = items.map(item => {
      const isAvailable = Store.isAvailable(item.id);
      return `
        <tr>
          <td><strong>${item.name}</strong></td>
          <td><span style="font-size:0.75rem; color:#6B7280;">${item.category}</span></td>
          <td>₹${item.price}</td>
          <td>${item.prepTime} min</td>
          <td>
            <span style="font-size:0.78rem; font-weight:700; color:${isAvailable ? '#10B981' : '#EF4444'};">
              ${isAvailable ? '● In Stock' : '✕ Sold Out'}
            </span>
          </td>
          <td>
            <label class="stock-toggle-switch">
              <input type="checkbox" ${isAvailable ? 'checked' : ''} onchange="app.toggleItemStock('${item.id}', this.checked)">
              <span class="stock-slider"></span>
            </label>
          </td>
        </tr>
      `;
    }).join('');
  }

  toggleItemStock(itemId, isAvailable) {
    Store.setItemStock(itemId, isAvailable);
    const item = DEFAULT_MENU_ITEMS.find(i => i.id === itemId);
    showToast(`${item ? item.name : 'Item'} marked as ${isAvailable ? 'AVAILABLE' : 'SOLD OUT'}`, isAvailable ? 'success' : 'info', '📦');
    this.renderInventoryModal();
    this.renderMenu();
  }

  bindEvents() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        this.switchView(tab.dataset.view);
      });
    });

    const soundBtn = document.getElementById('globalSoundBtn');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        const settings = Store.getSettings();
        settings.soundEnabled = !settings.soundEnabled;
        Store.saveSettings(settings);
        soundBtn.textContent = settings.soundEnabled ? '🔊 Sound ON' : '🔇 Sound OFF';
        soundBtn.classList.toggle('muted', !settings.soundEnabled);
        showToast(`Sound chimes ${settings.soundEnabled ? 'enabled' : 'muted'}`, 'info', '🔊');
      });
    }

    const tvSpeechBtn = document.getElementById('toggleSpeechBtn');
    const tvSpeechStatusText = document.getElementById('tvSpeechStatusText');
    if (tvSpeechBtn) {
      tvSpeechBtn.addEventListener('click', () => {
        const settings = Store.getSettings();
        settings.voiceEnabled = !settings.voiceEnabled;
        Store.saveSettings(settings);
        if (tvSpeechStatusText) {
          tvSpeechStatusText.textContent = settings.voiceEnabled ? 'Voice Announcements: ACTIVE' : 'Voice Announcements: MUTED';
        }
        showToast(`Voice announcements ${settings.voiceEnabled ? 'active' : 'muted'}`, 'info', '🗣️');
      });
    }

    const searchInput = document.getElementById('menuSearchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = sanitizeText(e.target.value);
        if (clearSearchBtn) clearSearchBtn.style.display = this.searchQuery ? 'block' : 'none';
        this.renderMenu();
      });
    }
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        this.searchQuery = '';
        clearSearchBtn.style.display = 'none';
        this.renderMenu();
      });
    }

    document.querySelectorAll('.category-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentCategory = pill.dataset.category;
        this.renderMenu();
      });
    });

    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.sortBy = e.target.value;
        this.renderMenu();
      });
    }

    const openCartBtn = document.getElementById('openCartBtn');
    if (openCartBtn) openCartBtn.addEventListener('click', () => this.openCartDrawer());

    const closeCartBtn = document.getElementById('closeCartBtn');
    if (closeCartBtn) closeCartBtn.addEventListener('click', () => this.closeCartDrawer());

    const cartBackdrop = document.getElementById('cartDrawerBackdrop');
    if (cartBackdrop) cartBackdrop.addEventListener('click', () => this.closeCartDrawer());

    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) clearCartBtn.addEventListener('click', () => this.clearEntireCart());

    const returnToMenuBtn = document.getElementById('returnToMenuBtn');
    if (returnToMenuBtn) returnToMenuBtn.addEventListener('click', () => this.closeCartDrawer());

    const openWalletBtn = document.getElementById('openWalletBtn');
    if (openWalletBtn) openWalletBtn.addEventListener('click', () => this.switchView('wallet'));

    const quickTrackBtn = document.getElementById('quickTrackBtn');
    if (quickTrackBtn) quickTrackBtn.addEventListener('click', () => this.switchView('tracker'));

    const resetSearchBtn = document.getElementById('resetSearchBtn');
    if (resetSearchBtn) {
      resetSearchBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        this.searchQuery = '';
        this.currentCategory = 'all';
        document.querySelectorAll('.category-pill').forEach(p => p.classList.toggle('active', p.dataset.category === 'all'));
        this.renderMenu();
      });
    }

    const takeawayCheckbox = document.getElementById('takeawayCheckbox');
    if (takeawayCheckbox) {
      takeawayCheckbox.addEventListener('change', (e) => {
        const cart = Store.getCart();
        cart.takeaway = e.target.checked;
        Store.saveCart(cart);
      });
    }

    const pickupSlotSelect = document.getElementById('pickupSlotSelect');
    const slotNoticeText = document.getElementById('slotNoticeText');
    if (pickupSlotSelect) {
      pickupSlotSelect.addEventListener('change', (e) => {
        const cart = Store.getCart();
        cart.slot = e.target.value;
        Store.saveCart(cart);
        if (slotNoticeText) {
          slotNoticeText.textContent = e.target.value === 'Immediate'
            ? 'Immediate: Kitchen prepares upon payment'
            : `Pre-booked for ${e.target.value}: Food will be ready at this exact slot`;
        }
      });
    }

    const qtyMinus = document.getElementById('customQtyMinusBtn');
    const qtyPlus = document.getElementById('customQtyPlusBtn');
    const qtyVal = document.getElementById('customQtyValue');

    if (qtyMinus) {
      qtyMinus.addEventListener('click', () => {
        if (this.customizingQty > 1) {
          this.customizingQty -= 1;
          if (qtyVal) qtyVal.textContent = this.customizingQty;
          this.recalculateCustomizationPrice();
        }
      });
    }
    if (qtyPlus) {
      qtyPlus.addEventListener('click', () => {
        if (this.customizingQty < 10) {
          this.customizingQty += 1;
          if (qtyVal) qtyVal.textContent = this.customizingQty;
          this.recalculateCustomizationPrice();
        }
      });
    }

    document.querySelectorAll('input[name="bevSize"], input[name="bevMilk"], input[name="bevCustom"], input[name="foodCustom"]').forEach(input => {
      input.addEventListener('change', () => this.recalculateCustomizationPrice());
    });

    const closeCustomBtn = document.getElementById('closeCustomizationBtn');
    const cancelCustomBtn = document.getElementById('cancelCustomizationBtn');
    if (closeCustomBtn) closeCustomBtn.addEventListener('click', () => this.closeCustomization());
    if (cancelCustomBtn) cancelCustomBtn.addEventListener('click', () => this.closeCustomization());

    const confirmAddBtn = document.getElementById('confirmAddToCartBtn');
    if (confirmAddBtn) confirmAddBtn.addEventListener('click', () => this.confirmAddCustomizationToCart());

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', () => this.openCheckout());

    const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
    const cancelPaymentBtn = document.getElementById('cancelPaymentBtn');
    if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', () => this.closeCheckout());
    if (cancelPaymentBtn) cancelPaymentBtn.addEventListener('click', () => this.closeCheckout());

    document.querySelectorAll('.payment-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => this.setPaymentMethod(btn.dataset.method));
    });

    const copyUpiBtn = document.getElementById('copyUpiBtn');
    if (copyUpiBtn) {
      copyUpiBtn.addEventListener('click', () => {
        const upiId = document.getElementById('mockUpiId').textContent;
        navigator.clipboard.writeText(upiId).then(() => {
          showToast('UPI ID copied to clipboard!', 'info', '📋');
        });
      });
    }

    const payNowBtn = document.getElementById('payNowBtn');
    if (payNowBtn) payNowBtn.addEventListener('click', () => this.processPayment());

    const receiptTrackBtn = document.getElementById('receiptTrackBtn');
    if (receiptTrackBtn) {
      receiptTrackBtn.addEventListener('click', () => {
        this.closeReceipt();
        this.switchView('tracker');
      });
    }

    const receiptViewKitchenBtn = document.getElementById('receiptViewKitchenBtn');
    if (receiptViewKitchenBtn) {
      receiptViewKitchenBtn.addEventListener('click', () => {
        this.closeReceipt();
        this.switchView('kitchen');
      });
    }

    const receiptNewOrderBtn = document.getElementById('receiptNewOrderBtn');
    if (receiptNewOrderBtn) {
      receiptNewOrderBtn.addEventListener('click', () => {
        this.closeReceipt();
        this.switchView('kiosk');
      });
    }

    const kitchenSearch = document.getElementById('kitchenSearchInput');
    if (kitchenSearch) {
      kitchenSearch.addEventListener('input', () => this.renderKitchenConsole());
    }

    const clearCompletedBtn = document.getElementById('clearCompletedBtn');
    if (clearCompletedBtn) {
      clearCompletedBtn.addEventListener('click', () => {
        if (confirm('Clear all picked-up orders from the active queue?')) {
          Store.clearCompletedOrders();
          showToast('Completed orders cleared', 'info', '🗑️');
          this.renderKitchenConsole();
        }
      });
    }

    document.querySelectorAll('.stat-card').forEach(card => {
      card.addEventListener('click', () => {
        const filter = card.dataset.statusFilter;
        this.kitchenFilter = filter;
        document.querySelectorAll('.stat-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        document.querySelectorAll('.kitchen-tab-btn').forEach(tb => tb.classList.toggle('active', tb.dataset.filter === filter));
        this.renderKitchenConsole();
      });
    });

    document.querySelectorAll('.kitchen-tab-btn').forEach(tb => {
      tb.addEventListener('click', () => {
        this.kitchenFilter = tb.dataset.filter;
        document.querySelectorAll('.kitchen-tab-btn').forEach(b => b.classList.remove('active'));
        tb.classList.add('active');
        this.renderKitchenConsole();
      });
    });

    const toggleInventoryModalBtn = document.getElementById('toggleInventoryModalBtn');
    const inventoryModal = document.getElementById('inventoryModal');
    const closeInventoryBtn = document.getElementById('closeInventoryBtn');
    const doneInventoryBtn = document.getElementById('doneInventoryBtn');
    const inventorySearchInput = document.getElementById('inventorySearchInput');
    const markAllInStockBtn = document.getElementById('markAllInStockBtn');

    if (toggleInventoryModalBtn && inventoryModal) {
      toggleInventoryModalBtn.addEventListener('click', () => {
        this.renderInventoryModal();
        inventoryModal.style.display = 'flex';
      });
    }
    if (closeInventoryBtn && inventoryModal) {
      closeInventoryBtn.addEventListener('click', () => { inventoryModal.style.display = 'none'; });
    }
    if (doneInventoryBtn && inventoryModal) {
      doneInventoryBtn.addEventListener('click', () => { inventoryModal.style.display = 'none'; });
    }
    if (inventorySearchInput) {
      inventorySearchInput.addEventListener('input', () => this.renderInventoryModal());
    }
    if (markAllInStockBtn) {
      markAllInStockBtn.addEventListener('click', () => {
        Store.resetAllStock();
        showToast('All 20 menu items restored to In Stock!', 'success', '📦');
        this.renderInventoryModal();
        this.renderMenu();
      });
    }

    const trackInput = document.getElementById('trackTokenInput');
    const trackSubmitBtn = document.getElementById('trackOrderSubmitBtn');
    if (trackSubmitBtn && trackInput) {
      trackSubmitBtn.addEventListener('click', () => {
        this.trackToken(trackInput.value);
      });
      trackInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.trackToken(trackInput.value);
      });
    }

    document.querySelectorAll('.topup-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.topupWallet(btn.dataset.amount);
      });
    });

    const customTopupBtn = document.getElementById('customTopupBtn');
    const customTopupInput = document.getElementById('customTopupInput');
    if (customTopupBtn && customTopupInput) {
      customTopupBtn.addEventListener('click', () => {
        const val = customTopupInput.value;
        if (val && parseFloat(val) > 0) {
          this.topupWallet(val);
          customTopupInput.value = '';
        }
      });
    }

    const resetWalletBtn = document.getElementById('resetWalletBtn');
    if (resetWalletBtn) {
      resetWalletBtn.addEventListener('click', () => {
        Store.setWalletBalance(500.0);
        Store.addWalletTransaction('credit', 500.0, 'Reset allowance to ₹500');
        showToast('Wallet balance reset to ₹500', 'info', '💳');
      });
    }
  }

  renderAllViews() {
    this.renderMenu();
    this.renderCart();
    this.renderKitchenConsole();
    this.renderPickupDisplay();
    this.renderTracker();
    this.renderWallet();

    const lastToken = Store.getLastToken();
    const kioskRecentTokenDisplay = document.getElementById('kioskRecentTokenDisplay');
    if (kioskRecentTokenDisplay) {
      kioskRecentTokenDisplay.textContent = lastToken || 'Track';
    }
  }
}

const app = new CanteenApp();
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
