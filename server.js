const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: '50kb' }));

// Basic security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Serve frontend static assets
app.use(express.static(path.join(__dirname)));

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const STOCK_FILE = path.join(DATA_DIR, 'stock.json');
const WALLET_FILE = path.join(DATA_DIR, 'wallet.json');

function readJsonFile(file, fallback) {
  try {
    if (!fs.existsSync(file)) return fallback;
    const raw = fs.readFileSync(file, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return fallback;
  }
}

function writeJsonFile(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed writing file:', file, err.message);
  }
}

// In-memory / persistent stores
let orders = readJsonFile(ORDERS_FILE, []);
let stock = readJsonFile(STOCK_FILE, {});
let walletState = readJsonFile(WALLET_FILE, {
  balance: 500.0,
  transactions: [
    {
      id: 'tx-init',
      type: 'credit',
      amount: 500,
      desc: 'Initial Semester Canteen Allowance',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]
});

// Canonical menu definitions for server-side verification
const MENU_CATALOG = {
  'samosa': { price: 15, prepTime: 3 },
  'veg-puff': { price: 20, prepTime: 4 },
  'egg-puff': { price: 25, prepTime: 4 },
  'masala-maggi': { price: 35, prepTime: 6 },
  'cheese-maggi': { price: 50, prepTime: 7 },
  'veg-sandwich': { price: 35, prepTime: 5 },
  'paneer-sandwich': { price: 50, prepTime: 6 },
  'idli': { price: 30, prepTime: 5 },
  'masala-dosa': { price: 50, prepTime: 8 },
  'plain-dosa': { price: 40, prepTime: 7 },
  'vada': { price: 15, prepTime: 3 },
  'poori': { price: 40, prepTime: 6 },
  'veg-fried-rice': { price: 60, prepTime: 8 },
  'veg-noodles': { price: 55, prepTime: 8 },
  'chai': { price: 10, prepTime: 2 },
  'filter-coffee': { price: 20, prepTime: 3 },
  'cold-coffee': { price: 40, prepTime: 5 },
  'lemon-juice': { price: 20, prepTime: 2 },
  'milkshake': { price: 50, prepTime: 5 },
  'ice-cream': { price: 30, prepTime: 2 }
};

const ADDON_PRICES = {
  'Large': 15,
  'Large Size': 15,
  'Oat / Almond Milk': 10,
  'Extra Cheese': 15,
  'Extra Butter': 10,
  'Extra Masala': 5,
  'Extra Ice Cream': 15,
  'Extra Shot': 10
};

function calculateAddonExtra(customizations = []) {
  if (!Array.isArray(customizations)) return 0;
  return customizations.reduce((sum, tag) => {
    for (const [key, cost] of Object.entries(ADDON_PRICES)) {
      if (typeof tag === 'string' && tag.includes(key)) {
        return sum + cost;
      }
    }
    return sum;
  }, 0);
}

function getNextTokenNumber() {
  const count = orders.length + 1;
  return `#B-${String(count).padStart(3, '0')}`;
}

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Campus Quick Bite API', time: new Date().toISOString() });
});

app.get('/api/menu/stock', (req, res) => {
  res.json({ success: true, stock });
});

app.patch('/api/menu/:id/stock', (req, res) => {
  const { id } = req.params;
  const { isAvailable } = req.body;
  if (!MENU_CATALOG[id]) {
    return res.status(404).json({ success: false, error: 'Unknown menu item' });
  }
  stock[id] = Boolean(isAvailable);
  writeJsonFile(STOCK_FILE, stock);
  res.json({ success: true, id, isAvailable: stock[id] });
});

app.get('/api/orders', (req, res) => {
  res.json({ success: true, count: orders.length, orders });
});

// Server-side validation of order items, prices, and totals
app.post('/api/orders', (req, res) => {
  const { items, takeaway, slot, paymentMethod, submittedTotal } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, error: 'Order must contain at least one item.' });
  }

  // Recalculate everything strictly on the server to prevent tampering
  let calculatedSubtotal = 0;
  const validatedItems = [];
  let maxPrepTime = 2;

  for (const raw of items) {
    const catalogItem = MENU_CATALOG[raw.id];
    if (!catalogItem) {
      return res.status(400).json({ success: false, error: `Invalid item: ${raw.name || raw.id}` });
    }

    if (stock[raw.id] === false) {
      return res.status(400).json({ success: false, error: `Item currently out of stock: ${raw.name || raw.id}` });
    }

    const qty = Math.max(1, Math.min(20, parseInt(raw.qty, 10) || 1));
    const addons = Array.isArray(raw.customizations) ? raw.customizations : [];
    const unitPrice = catalogItem.price + calculateAddonExtra(addons);
    const lineTotal = unitPrice * qty;

    calculatedSubtotal += lineTotal;
    if (catalogItem.prepTime > maxPrepTime) {
      maxPrepTime = catalogItem.prepTime;
    }

    validatedItems.push({
      id: raw.id,
      name: raw.name || raw.id,
      qty,
      basePrice: catalogItem.price,
      unitPrice,
      customizations: addons,
      lineTotal
    });
  }

  const packagingFee = Boolean(takeaway) ? 5 : 0;
  const grandTotal = calculatedSubtotal + packagingFee;

  if (typeof submittedTotal === 'number' && Math.abs(submittedTotal - grandTotal) > 0.01) {
    return res.status(400).json({
      success: false,
      error: 'Price integrity check failed. Submitted total does not match server calculation.',
      calculated: grandTotal,
      submitted: submittedTotal
    });
  }

  const token = getNextTokenNumber();
  const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);

  const orderRecord = {
    token,
    orderId,
    createdAt: new Date().toISOString(),
    timeFormatted: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    items: validatedItems,
    subtotal: calculatedSubtotal,
    packagingFee,
    grandTotal,
    takeaway: Boolean(takeaway),
    slot: typeof slot === 'string' && slot.trim() ? slot.trim() : 'Immediate',
    paymentMethod: paymentMethod === 'wallet' ? 'Student Wallet (Simulated)' : 'Mock UPI (Paid)',
    status: 'PAID',
    estPrepTime: `${maxPrepTime} minutes`,
    statusTimestamps: {
      PAID: new Date().toISOString()
    }
  };

  orders.unshift(orderRecord);
  writeJsonFile(ORDERS_FILE, orders);

  res.status(201).json({ success: true, order: orderRecord });
});

app.patch('/api/orders/:token/status', (req, res) => {
  const { token } = req.params;
  const { status } = req.body;
  const allowed = ['PAID', 'PREPARING', 'READY', 'PICKED_UP'];

  if (!allowed.includes(status)) {
    return res.status(400).json({ success: false, error: 'Invalid order status transition' });
  }

  const target = orders.find(o => o.token.toUpperCase() === token.toUpperCase());
  if (!target) {
    return res.status(404).json({ success: false, error: 'Order not found' });
  }

  target.status = status;
  target.statusTimestamps = target.statusTimestamps || {};
  target.statusTimestamps[status] = new Date().toISOString();
  writeJsonFile(ORDERS_FILE, orders);

  res.json({ success: true, order: target });
});

// Wallet balance & payment verification
app.get('/api/wallet', (req, res) => {
  res.json({
    success: true,
    balance: walletState.balance,
    transactions: walletState.transactions
  });
});

app.post('/api/wallet/pay', (req, res) => {
  const amount = Number(req.body.amount);
  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ success: false, error: 'Invalid deduction amount' });
  }

  if (walletState.balance < amount) {
    return res.status(400).json({
      success: false,
      error: 'Insufficient wallet balance',
      currentBalance: walletState.balance,
      required: amount
    });
  }

  walletState.balance = Math.round((walletState.balance - amount) * 100) / 100;
  walletState.transactions.unshift({
    id: 'tx-' + Date.now(),
    type: 'debit',
    amount,
    desc: req.body.desc || 'Canteen Meal Order',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })
  });

  writeJsonFile(WALLET_FILE, walletState);
  res.json({ success: true, newBalance: walletState.balance });
});

app.post('/api/wallet/topup', (req, res) => {
  const amount = Number(req.body.amount);
  if (isNaN(amount) || amount < 10 || amount > 5000) {
    return res.status(400).json({ success: false, error: 'Top-up amount must be between ₹10 and ₹5000' });
  }

  walletState.balance = Math.round((walletState.balance + amount) * 100) / 100;
  walletState.transactions.unshift({
    id: 'tx-' + Date.now(),
    type: 'credit',
    amount,
    desc: 'Student Top-Up Deposit',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })
  });

  writeJsonFile(WALLET_FILE, walletState);
  res.json({ success: true, newBalance: walletState.balance });
});

// Start listener if executed directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Campus Quick Bite Server listening at http://localhost:${PORT}`);
  });
}

module.exports = app;
