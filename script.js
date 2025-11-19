// -----------------------------
// Demo Data: 20 products with images
// -----------------------------
const products = [
  { id:1, name:"Explorer Backpack", price:59.99, desc:"Durable 25L backpack for everyday use.", img:"https://i.pinimg.com/736x/09/e3/19/09e319a10acfbacad6db61e6ad50887a.jpg" },
  { id:2, name:"Wireless Headset", price:89.99, desc:"Comfortable headset with long battery life.", img:"https://i.pinimg.com/736x/e3/a0/12/e3a0122f2a153da0f4adf5cf235a10bc.jpg" },
  { id:3, name:"Smartwatch X", price:149.99, desc:"Track your health and notifications.", img:"https://i.pinimg.com/736x/0e/96/2c/0e962cff8a85691f9bae125fb0ecff81.jpg" },
  { id:4, name:"Running Shoes", price:74.99, desc:"Lightweight shoes for daily runs.", img:"https://i.pinimg.com/736x/e0/38/bf/e038bf336935109d2a136538799aa929.jpg" },
  { id:5, name:"Travel Mug", price:19.99, desc:"Insulated stainless steel travel mug.", img:"https://i.pinimg.com/1200x/4c/84/c1/4c84c16b91a2b9883cc0948e9dd75320.jpg" },
  { id:6, name:"Bluetooth Speaker", price:49.99, desc:"Portable speaker with crisp sound.", img:"https://i.pinimg.com/1200x/3b/1c/4b/3b1c4b4635da8c62809aaf5ef6801b67.jpg" },
  { id:7, name:"Desk Lamp", price:34.99, desc:"LED lamp with adjustable brightness.", img:"https://i.pinimg.com/1200x/62/5a/88/625a882ce9fa8ed9ba5d1149b1c19f6d.jpg" },
  { id:8, name:"Fitness Bands", price:24.99, desc:"Set of resistance bands for workouts.", img:"https://i.pinimg.com/736x/a8/50/64/a850648dede28cff5375884f1eb41b71.jpg" },
  { id:9, name:"Sunglasses", price:29.99, desc:"Polarized sunglasses with UV protection.", img:"https://i.pinimg.com/1200x/d0/33/79/d03379646bd81d4fd73e7867220b4c40.jpg" },
  { id:10, name:"Leather Wallet", price:39.99, desc:"Compact leather wallet with RFID block.", img:"https://i.pinimg.com/736x/1b/b8/e2/1bb8e2267dfcf1cfdd1c3d9a49964484.jpg" },
  { id:11, name:"Wireless Charger", price:27.99, desc:"Fast wireless charging pad.", img:"https://i.pinimg.com/1200x/cf/9f/53/cf9f53bc9057596b81d9f7e0c4f95a36.jpg" },
  { id:12, name:"Camera Tripod", price:44.99, desc:"Lightweight tripod for steady shots.", img:"https://i.pinimg.com/736x/20/67/f0/2067f08538378db275b704aaabeb7d5d.jpg" },
  { id:13, name:"Water Bottle", price:14.99, desc:"BPA-free reusable water bottle.", img:"https://i.pinimg.com/1200x/57/82/9e/57829e29a74fc50884a93864adab2792.jpg" },
  { id:14, name:"Notebook Set", price:12.99, desc:"Set of 3 pocket notebooks.", img:"https://i.pinimg.com/1200x/5f/fe/8e/5ffe8ec3558773ef3e058f28f5ed5a7e.jpg" },
  { id:15, name:"Gaming Mouse", price:59.99, desc:"High precision mouse with RGB.", img:"https://i.pinimg.com/1200x/89/85/f7/8985f72fc74130f8c5b890f7a85eb05c.jpg" },
  { id:16, name:"Portable SSD", price:129.99, desc:"Fast external SSD for backups.", img:"https://i.pinimg.com/736x/22/b8/1a/22b81a81e216083eed77af65138c4517.jpg" },
  { id:17, name:"Kitchen Knife", price:34.50, desc:"Sharp chef knife with ergonomic handle.", img:"https://i.pinimg.com/736x/1e/70/3a/1e703a351b859d4dc1ed9b785baf83ef.jpg" },
  { id:18, name:"Yoga Mat", price:22.00, desc:"Eco-friendly non-slip yoga mat.", img:"https://i.pinimg.com/736x/0e/55/69/0e55697e3dee530d9dd3c3cb2b447930.jpg" },
  { id:19, name:"Coffee Beans (1kg)", price:18.75, desc:"Fresh roasted coffee beans.", img:"https://i.pinimg.com/1200x/a2/0a/a5/a20aa5b35e1761c9036e4572fe055d9a.jpg" },
  { id:20, name:"Wireless Keyboard", price:49.50, desc:"Slim wireless keyboard with long battery.", img:"https://i.pinimg.com/736x/b0/e6/39/b0e639b42c96b83b30f15e2bd921c6b2.jpg" }
];

// -----------------------------
// DOM elements
// -----------------------------
const productListEl = document.getElementById('product-list');
const cartEl = document.getElementById('cart');
const totalEl = document.getElementById('total');
const cartCountEl = document.getElementById('cart-count');
const checkoutFormEl = document.getElementById('checkout-form');
const cartBtn = document.getElementById('cart-btn');
const loginBtn = document.getElementById('login-btn');
const searchInput = document.getElementById('search-input');

// modal elements
let loginModal, productModal;
document.addEventListener('DOMContentLoaded', () => {
  loginModal = new bootstrap.Modal(document.getElementById('login-modal'));
  productModal = new bootstrap.Modal(document.getElementById('product-modal'));
});

// -----------------------------
// Cart (persisted in localStorage)
// -----------------------------
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() { localStorage.setItem('cart', JSON.stringify(cart)); }

// -----------------------------
// Auth (demo; not secure)
// -----------------------------
function setUser(email) {
  localStorage.setItem('user', JSON.stringify({ email }));
  updateLoginUI();
}
function getUser() {
  return JSON.parse(localStorage.getItem('user') || 'null');
}
function logout() {
  localStorage.removeItem('user');
  updateLoginUI();
}
function updateLoginUI() {
  const user = getUser();
  if (user) {
    loginBtn.textContent = `Hi, ${user.email.split('@')[0]}`;
    loginBtn.classList.remove('btn-outline-secondary');
    loginBtn.classList.add('btn-secondary');
    loginBtn.onclick = () => { if (confirm('Logout?')) logout(); };
  } else {
    loginBtn.textContent = 'Login';
    loginBtn.classList.remove('btn-secondary');
    loginBtn.classList.add('btn-outline-secondary');
    loginBtn.onclick = () => loginModal.show();
  }
}

// wire up login modal
document.getElementById('do-login').addEventListener('click', () => {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;
  if (!email || !pass) { alert('Enter email and password (any values for demo).'); return; }
  setUser(email);
  loginModal.hide();
});

// -----------------------------
// Render products
// -----------------------------
function renderProducts(filter = '') {
  const q = filter.trim().toLowerCase();
  productListEl.innerHTML = '';
  const filtered = products.filter(p => !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  filtered.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${p.img}" class="card-img-top" alt="${p.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text product-desc">${p.desc}</p>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <div><strong>$${p.price.toFixed(2)}</strong></div>
            <div class="btn-group">
              <button class="btn btn-sm btn-outline-secondary" data-id="${p.id}" data-action="view">View</button>
              <button class="btn btn-sm btn-primary" data-id="${p.id}" data-action="add">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    `;
    productListEl.appendChild(col);
  });

  // Attach product card buttons (delegation alternative)
  productListEl.querySelectorAll('button[data-action]').forEach(btn => {
    const id = Number(btn.dataset.id);
    if (btn.dataset.action === 'add') btn.addEventListener('click', () => addToCart(id));
    if (btn.dataset.action === 'view') btn.addEventListener('click', () => openProductModal(id));
  });
}

// -----------------------------
// Product modal
// -----------------------------
function openProductModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  document.getElementById('modal-img').src = p.img;
  document.getElementById('modal-name').textContent = p.name;
  document.getElementById('modal-desc').textContent = p.desc;
  document.getElementById('modal-price').textContent = p.price.toFixed(2);
  document.getElementById('modal-qty').value = 1;
  document.getElementById('modal-add').onclick = () => {
    const qty = Math.max(1, Number(document.getElementById('modal-qty').value));
    addToCart(id, qty);
    productModal.hide();
  };
  productModal.show();
}

// -----------------------------
// Add / Remove / Update cart
// -----------------------------
function addToCart(id, qty = 1) {
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty += qty;
  else {
    const p = products.find(x => x.id === id);
    cart.push({ id: p.id, name: p.name, price: p.price, qty });
  }
  saveCart();
  renderCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else saveCart();
  renderCart();
}

// -----------------------------
// Render Cart UI
// -----------------------------
function renderCart() {
  cartEl.innerHTML = '';
  let total = 0;
  if (!cart.length) {
    cartEl.innerHTML = `<li class="list-group-item">Your cart is empty</li>`;
  } else {
    cart.forEach(item => {
      total += item.price * item.qty;
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
        <div>
          <strong>${item.name}</strong><br>
          $${item.price.toFixed(2)} × ${item.qty}
        </div>
        <div class="btn-group" role="group">
          <button class="btn btn-sm btn-warning" data-action="dec" data-id="${item.id}">−</button>
          <button class="btn btn-sm btn-success" data-action="inc" data-id="${item.id}">+</button>
          <button class="btn btn-sm btn-danger" data-action="rem" data-id="${item.id}">Remove</button>
        </div>
      `;
      cartEl.appendChild(li);
    });
  }

  totalEl.innerText = total.toFixed(2);
  cartCountEl.innerText = cart.reduce((s, i) => s + i.qty, 0);

  // Attach handlers
  cartEl.querySelectorAll('button[data-action]').forEach(btn => {
    const id = Number(btn.dataset.id);
    if (btn.dataset.action === 'dec') btn.addEventListener('click', () => updateQty(id, -1));
    if (btn.dataset.action === 'inc') btn.addEventListener('click', () => updateQty(id, +1));
    if (btn.dataset.action === 'rem') btn.addEventListener('click', () => removeFromCart(id));
  });

  checkoutFormEl.style.display = cart.length ? 'block' : 'none';
}

// -----------------------------
// Checkout flow (simulated POST)
// -----------------------------
document.getElementById('confirm-checkout').addEventListener('click', async () => {
  const name = document.getElementById('customer-name').value.trim();
  const email = document.getElementById('customer-email').value.trim();
  const address = document.getElementById('customer-address').value.trim();

  if (!name || !email || !address) { alert('Please complete checkout fields.'); return; }
  if (!cart.length) { alert('Cart is empty.'); return; }

  const order = { customer:{name,email,address}, items: cart, total: Number(totalEl.innerText) };

  try {
    // Simulate a backend POST. If you have a server, change the URL.
    const res = await fetch('http://localhost:3000/checkout', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(order)
    });

    // If no server running, treat it as success (for demo)
    if (!res.ok) {
      // if server not present, simulate success
      if (res.status === 0) throw new Error('no server');
      throw new Error('Server error');
    }

    const data = await res.json();
    alert('Order placed! ID: ' + (data.orderID || 'N/A'));
    cart = []; saveCart(); renderCart();
  } catch (err) {
    console.warn('Checkout fallback (simulated):', err.message);
    // Simulate success and clear cart
    alert('Order placed (simulated). Thank you!');
    cart = []; saveCart(); renderCart();
  }

  // clear form
  document.getElementById('customer-name').value = '';
  document.getElementById('customer-email').value = '';
  document.getElementById('customer-address').value = '';
});

// optional clear cart
document.getElementById('clear-cart').addEventListener('click', () => {
  if (!cart.length) return;
  if (!confirm('Clear cart?')) return;
  cart = []; saveCart(); renderCart();
});

// -----------------------------
// Contact form (demo)
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Message sent (demo). Thank you!');
  document.getElementById('contact-name').value = '';
  document.getElementById('contact-email').value = '';
  document.getElementById('contact-msg').value = '';
});

// -----------------------------
// UI helpers
// -----------------------------
cartBtn.addEventListener('click', () => {
  document.getElementById('cart-section').scrollIntoView({behavior:'smooth'});
});

searchInput.addEventListener('input', (e) => renderProducts(e.target.value));

// initialize UI
updateLoginUI();
renderProducts();
renderCart();




