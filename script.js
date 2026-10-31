/**
 * script.js — UmpanKu Rental
 * Semua logika interaktif: katalog, filter, keranjang, modal,
 * admin panel, booking, testimoni, FAQ, dan animasi.
 */

'use strict';

/* ═══════════════════════════════════════════════════════════════════
   STATE APLIKASI
   ═══════════════════════════════════════════════════════════════════ */
let products  = [];
let settings  = {};
let cart      = [];          // [{ produkId, nama, gambar, jumlah, durasi, satuan, hargaSatuan }]
let filterState = {
  search:   '',
  kategori: 'semua',
  priceMin: 0,
  priceMax: 75000,
  sort:     'default',
};
let currentProductId = null; // ID produk yang sedang dibuka di modal

/* ═══════════════════════════════════════════════════════════════════
   INISIALISASI
   ═══════════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initData();
  initTheme();
  initNavbar();
  renderProducts();
  renderPackages();
  renderTestimonials();
  renderFAQ();
  initFilter();
  initCart();
  initModal();
  initAdmin();
  initBooking();
  initScrollReveal();
  initCountUp();
  initScrollSpy();
});

/* ── Muat data dari localStorage / data.js ─────────────────────── */
function initData() {
  products = loadProducts();
  settings = loadSettings();
  cart     = loadCart();
}

function loadCart() {
  try {
    const saved = localStorage.getItem('umpanku_cart');
    return saved ? JSON.parse(saved) : [];
  } catch { return []; }
}

function saveCart() {
  try {
    localStorage.setItem('umpanku_cart', JSON.stringify(cart));
  } catch (e) { console.warn('localStorage tidak tersedia:', e); }
}

/* ── Format Rupiah ─────────────────────────────────────────────── */
function formatRupiah(num) {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

/* ── Buat bintang rating ────────────────────────────────────────── */
function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating - full >= 0.4;
  let html = '';
  for (let i = 0; i < full; i++) html += '★';
  if (half) html += '½';
  const empty = 5 - full - (half ? 1 : 0);
  for (let i = 0; i < empty; i++) html += '☆';
  return html;
}

/* ─── Placeholder ikon per kategori ──────────────────────────── */
function categoryIcon(cat) {
  const map = {
    'Joran': '🪄', 'Reel': '⚙️', 'Kail & Senar': '🪝',
    'Umpan': '🐛', 'Tackle Box': '📦', 'Perlengkapan': '🎒',
  };
  return map[cat] || '🎣';
}

/* ═══════════════════════════════════════════════════════════════════
   NAVBAR & THEME
   ═══════════════════════════════════════════════════════════════════ */
function initNavbar() {
  const hamburger = document.getElementById('hamburgerBtn');
  const navMenu   = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Tutup menu saat link diklik (mobile)
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Tutup menu saat klik di luar (mobile)
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

function initTheme() {
  const html   = document.documentElement;
  const btn    = document.getElementById('themeToggle');
  const icon   = btn.querySelector('.theme-icon');
  const saved  = localStorage.getItem('umpanku_theme') || 'light';

  html.setAttribute('data-theme', saved);
  icon.textContent = saved === 'dark' ? '☀️' : '🌙';

  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    icon.textContent = next === 'dark' ? '☀️' : '🌙';
    try { localStorage.setItem('umpanku_theme', next); } catch {}
  });
}

/* ─── Scroll Spy (aktifkan nav link sesuai section) ────────────── */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-50% 0px -40% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ═══════════════════════════════════════════════════════════════════
   KATALOG — RENDER PRODUK
   ═══════════════════════════════════════════════════════════════════ */
function renderProducts(list) {
  const grid       = document.getElementById('productGrid');
  const emptyState = document.getElementById('emptyState');
  const items      = list || getFilteredProducts();

  grid.innerHTML = '';

  if (items.length === 0) {
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  items.forEach(p => {
    const card = createProductCard(p);
    grid.appendChild(card);
  });
}

function createProductCard(p) {
  const badgeMap   = { tersedia: 'Tersedia', menipis: 'Stok Menipis', habis: 'Habis' };
  const badgeClass = { tersedia: 'badge--tersedia', menipis: 'badge--menipis', habis: 'badge--habis' };
  const imgSrc     = Array.isArray(p.gambar) ? p.gambar[0] : p.gambar;

  const card = document.createElement('article');
  card.className = 'product-card reveal';
  card.innerHTML = `
    <div class="product-card__img-wrap">
      <img src="${imgSrc}" alt="Foto ${p.nama}" class="product-card__img" loading="lazy"
           onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" />
      <div class="product-card__img-placeholder" style="display:none" aria-hidden="true">
        ${categoryIcon(p.kategori)}
      </div>
      <span class="badge ${badgeClass[p.status] || 'badge--tersedia'}">${badgeMap[p.status] || 'Tersedia'}</span>
    </div>
    <div class="product-card__body">
      <span class="product-card__cat">${p.kategori}</span>
      <h3 class="product-card__name">${p.nama}</h3>
      <div class="product-card__rating">
        <span class="stars" aria-label="Rating ${p.rating} dari 5">${renderStars(p.rating)}</span>
        <span>${p.rating} (${p.ulasan || 0})</span>
      </div>
      <div class="product-card__price">
        <div class="price-main" aria-label="Harga per hari">${formatRupiah(p.hargaHari)}/hari</div>
        <div class="price-alt">${formatRupiah(p.hargaJam)}/jam</div>
      </div>
    </div>
    <div class="product-card__actions">
      <button class="btn-detail" data-id="${p.id}" aria-label="Lihat detail ${p.nama}">Detail</button>
      <button class="btn-add-cart" data-id="${p.id}"
        ${p.status === 'habis' ? 'disabled aria-disabled="true"' : ''}
        aria-label="Tambah ${p.nama} ke keranjang">
        🛒 Sewa
      </button>
    </div>
  `;

  // Tombol Detail
  card.querySelector('.btn-detail').addEventListener('click', () => openProductModal(p.id));
  // Tombol Tambah ke Keranjang (cepat, 1 unit 1 hari)
  const addBtn = card.querySelector('.btn-add-cart');
  if (!addBtn.disabled) {
    addBtn.addEventListener('click', () => {
      addToCart(p.id, 1, 1, 'hari');
    });
  }

  // Trigger reveal
  setTimeout(() => card.classList.add('visible'), 50);
  return card;
}

/* ─── Filter & Sort ─────────────────────────────────────────── */
function getFilteredProducts() {
  let list = [...products];

  if (filterState.kategori !== 'semua') {
    list = list.filter(p => p.kategori === filterState.kategori);
  }
  if (filterState.search.trim()) {
    const q = filterState.search.toLowerCase();
    list = list.filter(p => p.nama.toLowerCase().includes(q));
  }
  list = list.filter(p =>
    p.hargaHari >= filterState.priceMin && p.hargaHari <= filterState.priceMax
  );

  switch (filterState.sort) {
    case 'price-asc':   list.sort((a, b) => a.hargaHari - b.hargaHari); break;
    case 'price-desc':  list.sort((a, b) => b.hargaHari - a.hargaHari); break;
    case 'rating-desc': list.sort((a, b) => b.rating - a.rating);       break;
    case 'name-asc':    list.sort((a, b) => a.nama.localeCompare(b.nama, 'id')); break;
  }
  return list;
}

function initFilter() {
  const searchInput  = document.getElementById('searchInput');
  const sortSelect   = document.getElementById('sortSelect');
  const chips        = document.querySelectorAll('.chip');
  const priceMin     = document.getElementById('priceMin');
  const priceMax     = document.getElementById('priceMax');
  const priceLabel   = document.getElementById('priceRangeLabel');
  const resetBtn     = document.getElementById('resetFilterBtn');

  // Real-time search
  searchInput.addEventListener('input', () => {
    filterState.search = searchInput.value;
    renderProducts();
  });

  // Sort
  sortSelect.addEventListener('change', () => {
    filterState.sort = sortSelect.value;
    renderProducts();
  });

  // Chips kategori
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => { c.classList.remove('chip--active'); c.setAttribute('aria-pressed', 'false'); });
      chip.classList.add('chip--active');
      chip.setAttribute('aria-pressed', 'true');
      filterState.kategori = chip.dataset.cat;
      renderProducts();
    });
  });

  // Slider harga (dual-range sederhana)
  function updatePriceRange() {
    let min = parseInt(priceMin.value);
    let max = parseInt(priceMax.value);
    if (min > max) { [min, max] = [max, min]; }
    filterState.priceMin = min;
    filterState.priceMax = max;
    priceLabel.textContent = `${formatRupiah(min)} – ${formatRupiah(max)}`;
    renderProducts();
  }
  priceMin.addEventListener('input', updatePriceRange);
  priceMax.addEventListener('input', updatePriceRange);

  // Reset filter
  resetBtn.addEventListener('click', () => {
    filterState = { search: '', kategori: 'semua', priceMin: 0, priceMax: 75000, sort: 'default' };
    searchInput.value = '';
    sortSelect.value = 'default';
    priceMin.value = 0;
    priceMax.value = 75000;
    priceLabel.textContent = 'Rp 0 – Rp 75.000';
    chips.forEach(c => { c.classList.remove('chip--active'); c.setAttribute('aria-pressed', 'false'); });
    chips[0].classList.add('chip--active');
    chips[0].setAttribute('aria-pressed', 'true');
    renderProducts();
  });
}

/* ═══════════════════════════════════════════════════════════════════
   MODAL DETAIL PRODUK
   ═══════════════════════════════════════════════════════════════════ */
function initModal() {
  const modal    = document.getElementById('productModal');
  const closeBtn = document.getElementById('modalClose');

  closeBtn.addEventListener('click', closeProductModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeProductModal(); });

  // Durasi & jumlah controls
  document.getElementById('productModal').addEventListener('click', (e) => {
    const type = e.target.dataset.type;
    if (!type) return;
    const durInput  = document.getElementById('modalDurasi');
    const jmlInput  = document.getElementById('modalJumlah');
    if (type === 'durasiMinus') durInput.value = Math.max(1, parseInt(durInput.value) - 1);
    if (type === 'durasiPlus')  durInput.value = parseInt(durInput.value) + 1;
    if (type === 'jumlahMinus') jmlInput.value = Math.max(1, parseInt(jmlInput.value) - 1);
    if (type === 'jumlahPlus')  jmlInput.value = parseInt(jmlInput.value) + 1;
    updateModalTotal();
  });

  document.getElementById('modalDurasi').addEventListener('input', updateModalTotal);
  document.getElementById('modalJumlah').addEventListener('input', updateModalTotal);
  document.getElementById('modalDurasiSatuan').addEventListener('change', updateModalTotal);

  // Tambah ke keranjang dari modal
  document.getElementById('modalAddCart').addEventListener('click', () => {
    const durasi  = Math.max(1, parseInt(document.getElementById('modalDurasi').value) || 1);
    const jumlah  = Math.max(1, parseInt(document.getElementById('modalJumlah').value) || 1);
    const satuan  = document.getElementById('modalDurasiSatuan').value;
    addToCart(currentProductId, jumlah, durasi, satuan);
    closeProductModal();
  });
}

function openProductModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  currentProductId = id;

  const modal = document.getElementById('productModal');

  // Galeri
  const images = Array.isArray(p.gambar) ? p.gambar : [p.gambar];
  const mainImg = document.getElementById('galleryMain');
  mainImg.src = images[0];
  mainImg.alt = `Foto ${p.nama}`;

  const thumbs = document.getElementById('galleryThumbs');
  thumbs.innerHTML = images.map((src, i) => `
    <img src="${src}" alt="Foto ${p.nama} ${i + 1}" class="gallery-thumb ${i === 0 ? 'active' : ''}"
         loading="lazy" data-idx="${i}"
         onerror="this.style.display='none'" />
  `).join('');

  thumbs.querySelectorAll('.gallery-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      mainImg.src = images[thumb.dataset.idx];
      thumbs.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
    });
    thumb.addEventListener('error', () => { thumb.style.display = 'none'; });
  });
  mainImg.onerror = () => {
    mainImg.style.display = 'none';
    // placeholder
  };

  // Teks
  document.getElementById('modalCategory').textContent  = p.kategori;
  document.getElementById('modalProductName').textContent = p.nama;
  document.getElementById('modalDesc').textContent       = p.deskripsi || '';
  document.getElementById('modalHargaJam').textContent   = formatRupiah(p.hargaJam) + '/jam';
  document.getElementById('modalHargaHari').textContent  = formatRupiah(p.hargaHari) + '/hari';
  document.getElementById('modalRating').innerHTML =
    `<span class="stars">${renderStars(p.rating)}</span> ${p.rating} (${p.ulasan || 0} ulasan)`;
  document.getElementById('modalStock').textContent =
    `Stok tersedia: ${p.stok} unit`;

  // Spesifikasi
  const specsBody = document.getElementById('specsBody');
  specsBody.innerHTML = '';
  const specs = p.spesifikasi || {};
  const labelMap = {
    panjang: 'Panjang', bahan: 'Bahan', sambungan: 'Jumlah Sambungan',
    power: 'Power', action: 'Action', berat: 'Berat', cocokUntuk: 'Cocok Untuk',
    tipe: 'Tipe', ukuran: 'Ukuran', gearRatio: 'Gear Ratio',
    bearing: 'Bearing', kapasitasSenar: 'Kapasitas Senar', dragMaksimal: 'Drag Maks.',
    dimensi: 'Dimensi', kapasitas: 'Kapasitas',
  };
  Object.entries(specs).forEach(([k, v]) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${labelMap[k] || k}</td><td>${v}</td>`;
    specsBody.appendChild(tr);
  });

  // Reset input
  document.getElementById('modalDurasi').value = 1;
  document.getElementById('modalJumlah').value = 1;
  document.getElementById('modalDurasiSatuan').value = 'hari';
  updateModalTotal();

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modal.querySelector('.modal__close').focus();
}

function closeProductModal() {
  document.getElementById('productModal').hidden = true;
  document.body.style.overflow = '';
  currentProductId = null;
}

function updateModalTotal() {
  if (!currentProductId) return;
  const p      = products.find(x => x.id === currentProductId);
  if (!p) return;
  const durasi = Math.max(1, parseInt(document.getElementById('modalDurasi').value) || 1);
  const jumlah = Math.max(1, parseInt(document.getElementById('modalJumlah').value) || 1);
  const satuan = document.getElementById('modalDurasiSatuan').value;
  const harga  = satuan === 'jam' ? p.hargaJam : p.hargaHari;
  const total  = harga * durasi * jumlah;
  document.getElementById('modalTotal').textContent = formatRupiah(total);
}

/* ESC tutup modal */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!document.getElementById('productModal').hidden)  closeProductModal();
    if (!document.getElementById('bookingModal').hidden)  closeModal('bookingModal');
    if (!document.getElementById('confirmModal').hidden)  closeModal('confirmModal');
    if (!document.getElementById('adminPinModal').hidden) closeModal('adminPinModal');
    if (!document.getElementById('adminModal').hidden)    closeModal('adminModal');
    closeCart();
  }
});

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) { el.hidden = true; document.body.style.overflow = ''; }
}

/* ═══════════════════════════════════════════════════════════════════
   KERANJANG SEWA
   ═══════════════════════════════════════════════════════════════════ */
function initCart() {
  document.getElementById('cartToggle').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  document.getElementById('checkoutBtn').addEventListener('click', openBookingModal);
  updateCartBadge();
}

function openCart() {
  const drawer  = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  drawer.classList.add('open');
  overlay.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  renderCart();
  drawer.querySelector('#cartClose').focus();
}

function closeCart() {
  const drawer  = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function addToCart(produkId, jumlah, durasi, satuan) {
  const p = products.find(x => x.id === produkId);
  if (!p) return;
  if (p.status === 'habis') { showToast('Stok habis!', 'error'); return; }

  const existing = cart.find(i => i.produkId === produkId && i.satuan === satuan && i.durasi === durasi);
  const maxQty   = p.stok;

  if (existing) {
    if (existing.jumlah + jumlah > maxQty) {
      showToast(`Stok tersisa hanya ${maxQty} unit`, 'warning');
      existing.jumlah = maxQty;
    } else {
      existing.jumlah += jumlah;
    }
  } else {
    if (jumlah > maxQty) {
      showToast(`Stok tersisa hanya ${maxQty} unit`, 'warning');
      jumlah = maxQty;
    }
    cart.push({
      produkId,
      nama:       p.nama,
      gambar:     Array.isArray(p.gambar) ? p.gambar[0] : p.gambar,
      jumlah,
      durasi,
      satuan,
      hargaSatuan: satuan === 'jam' ? p.hargaJam : p.hargaHari,
    });
  }

  saveCart();
  updateCartBadge();
  showToast(`${p.nama} ditambahkan ke keranjang!`, 'success');
}

function renderCart() {
  const body    = document.getElementById('cartBody');
  const summary = document.getElementById('cartSummary');
  const checkout= document.getElementById('checkoutBtn');

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <span class="cart-empty-icon">🛒</span>
        <p>Keranjangmu masih kosong.<br />Yuk pilih alat pancing!</p>
      </div>`;
    summary.innerHTML = '';
    checkout.disabled = true;
    return;
  }
  checkout.disabled = false;

  body.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <img src="${item.gambar}" alt="${item.nama}" class="cart-item__img" loading="lazy"
           onerror="this.style.background='var(--clr-surface-2)';this.style.display='flex'" />
      <div class="cart-item__info">
        <div class="cart-item__name">${item.nama}</div>
        <div class="cart-item__meta">${item.durasi} ${item.satuan} × ${formatRupiah(item.hargaSatuan)}</div>
        <div class="cart-item__controls">
          <button class="btn-qty" onclick="changeCartQty(${idx}, -1)" aria-label="Kurangi jumlah">−</button>
          <span class="cart-qty-display">${item.jumlah}</span>
          <button class="btn-qty" onclick="changeCartQty(${idx}, 1)" aria-label="Tambah jumlah">+</button>
          <button class="btn-remove" onclick="removeCartItem(${idx})" aria-label="Hapus item">Hapus</button>
        </div>
      </div>
      <div class="cart-item__price">${formatRupiah(item.hargaSatuan * item.durasi * item.jumlah)}</div>
    </div>
  `).join('');

  // Rincian biaya
  const subtotal = cart.reduce((s, i) => s + i.hargaSatuan * i.durasi * i.jumlah, 0);
  const diskon   = Math.round(subtotal * (settings.discount || 0) / 100);
  const deposit  = settings.deposit || 50000;
  const total    = subtotal - diskon + deposit;

  summary.innerHTML = `
    <div class="summary-row"><span class="summary-label">Subtotal</span><span class="summary-val">${formatRupiah(subtotal)}</span></div>
    ${settings.discount > 0 ? `<div class="summary-row"><span class="summary-label">Diskon ${settings.discount}%</span><span class="summary-val" style="color:var(--clr-secondary)">− ${formatRupiah(diskon)}</span></div>` : ''}
    <div class="summary-row"><span class="summary-label">Deposit (refundable)</span><span class="summary-val">${formatRupiah(deposit)}</span></div>
    <div class="summary-row total"><span>Total Bayar</span><span>${formatRupiah(total)}</span></div>
  `;
}

function changeCartQty(idx, delta) {
  const item = cart[idx];
  if (!item) return;
  const p   = products.find(x => x.id === item.produkId);
  const max = p ? p.stok : 99;
  item.jumlah = Math.min(max, Math.max(1, item.jumlah + delta));
  saveCart();
  updateCartBadge();
  renderCart();
}

function removeCartItem(idx) {
  cart.splice(idx, 1);
  saveCart();
  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  const badge = document.getElementById('cartBadge');
  const count = cart.reduce((s, i) => s + i.jumlah, 0);
  badge.textContent = count;
  badge.dataset.count = count;
}

/* ═══════════════════════════════════════════════════════════════════
   FORM BOOKING & KONFIRMASI
   ═══════════════════════════════════════════════════════════════════ */
function openBookingModal() {
  if (cart.length === 0) { showToast('Keranjang masih kosong!', 'warning'); return; }
  closeCart();
  const modal = document.getElementById('bookingModal');
  modal.hidden = false;
  document.body.style.overflow = 'hidden';

  // Set tanggal minimum hari ini
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('bookDate').min = today;

  modal.querySelector('.modal__close').focus();
}

function initBooking() {
  document.getElementById('bookingModalClose').addEventListener('click', () => closeModal('bookingModal'));
  document.getElementById('bookingModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('bookingModal')) closeModal('bookingModal');
  });

  document.getElementById('confirmModalClose').addEventListener('click', () => closeModal('confirmModal'));
  document.getElementById('confirmModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('confirmModal')) closeModal('confirmModal');
  });
  document.getElementById('newOrderBtn').addEventListener('click', () => {
    closeModal('confirmModal');
    cart = [];
    saveCart();
    updateCartBadge();
    renderProducts();
  });

  // Validasi real-time
  const fields = ['bookName', 'bookPhone', 'bookDate'];
  fields.forEach(id => {
    document.getElementById(id).addEventListener('blur', () => validateBookingField(id));
    document.getElementById(id).addEventListener('input', () => {
      document.getElementById(id).classList.remove('error');
      document.getElementById(id + 'Err').textContent = '';
    });
  });

  document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    submitBooking();
  });
}

function validateBookingField(id) {
  const input = document.getElementById(id);
  const err   = document.getElementById(id + 'Err');
  let msg = '';

  if (id === 'bookName') {
    if (!input.value.trim()) msg = 'Nama tidak boleh kosong.';
    else if (input.value.trim().length < 3) msg = 'Nama minimal 3 karakter.';
  }
  if (id === 'bookPhone') {
    const num = input.value.replace(/\D/g, '');
    if (!num) msg = 'Nomor WhatsApp tidak boleh kosong.';
    else if (num.length < 10) msg = 'Nomor WhatsApp minimal 10 digit.';
    else if (!/^(08|628)/.test(num)) msg = 'Masukkan nomor WhatsApp yang valid (awali dengan 08 atau 628).';
  }
  if (id === 'bookDate') {
    const today = new Date(); today.setHours(0,0,0,0);
    const sel   = new Date(input.value);
    if (!input.value) msg = 'Tanggal ambil tidak boleh kosong.';
    else if (sel < today) msg = 'Tanggal tidak boleh di masa lalu.';
  }

  err.textContent = msg;
  input.classList.toggle('error', !!msg);
  return !msg;
}

function submitBooking() {
  const nameOk  = validateBookingField('bookName');
  const phoneOk = validateBookingField('bookPhone');
  const dateOk  = validateBookingField('bookDate');
  if (!nameOk || !phoneOk || !dateOk) return;

  const nama    = document.getElementById('bookName').value.trim();
  const phone   = document.getElementById('bookPhone').value.replace(/\D/g, '');
  const date    = document.getElementById('bookDate').value;
  const metode  = document.querySelector('input[name="bookMethod"]:checked').value;
  const catatan = document.getElementById('bookNote').value.trim();

  // Generate kode booking
  const kode = 'UK-' + Date.now().toString(36).toUpperCase().slice(-6);

  // Hitung total
  const subtotal = cart.reduce((s, i) => s + i.hargaSatuan * i.durasi * i.jumlah, 0);
  const diskon   = Math.round(subtotal * (settings.discount || 0) / 100);
  const deposit  = settings.deposit || 50000;
  const total    = subtotal - diskon + deposit;

  // Ringkasan produk
  const itemLines = cart.map(i => `  - ${i.nama} (${i.jumlah}x, ${i.durasi} ${i.satuan}): ${formatRupiah(i.hargaSatuan * i.durasi * i.jumlah)}`).join('\n');

  // Tutup booking modal, buka konfirmasi
  closeModal('bookingModal');
  document.getElementById('confirmCode').textContent = kode;
  document.getElementById('confirmSummary').innerHTML = `
    <strong>Nama:</strong> ${nama}<br />
    <strong>Tanggal Ambil:</strong> ${date}<br />
    <strong>Metode:</strong> ${metode === 'ambil' ? 'Ambil di Lokasi' : 'Diantar'}<br />
    <strong>Total Bayar:</strong> ${formatRupiah(total)}<br />
    ${catatan ? `<strong>Catatan:</strong> ${catatan}` : ''}
  `;

  // WhatsApp link
  const waMsg = encodeURIComponent(
    `Halo UmpanKu Rental! Saya ingin konfirmasi pesanan:\n\n` +
    `Kode Booking: *${kode}*\nNama: ${nama}\nWA: ${phone}\n` +
    `Tanggal Ambil: ${date}\nMetode: ${metode === 'ambil' ? 'Ambil di Lokasi' : 'Diantar'}\n\n` +
    `Detail Sewa:\n${itemLines}\n\n` +
    `Total Bayar: ${formatRupiah(total)}\n` +
    `${catatan ? `Catatan: ${catatan}` : ''}\n\nMohon konfirmasinya. Terima kasih!`
  );
  document.getElementById('whatsappBtn').href = `https://wa.me/6281234567890?text=${waMsg}`;

  const confirmModal = document.getElementById('confirmModal');
  confirmModal.hidden = false;
  document.body.style.overflow = 'hidden';

  // Reset form
  document.getElementById('bookingForm').reset();
}

/* ═══════════════════════════════════════════════════════════════════
   PAKET BUNDLING
   ═══════════════════════════════════════════════════════════════════ */
function renderPackages() {
  const grid = document.getElementById('paketGrid');
  grid.innerHTML = '';

  DEFAULT_PACKAGES.forEach((pkg, idx) => {
    // Hitung harga asli
    let hargaAsli = 0;
    const itemDetails = pkg.items.map(item => {
      const p = products.find(x => x.id === item.produkId);
      if (!p) return null;
      hargaAsli += p.hargaHari * item.jumlah;
      return `${item.jumlah}× ${p.nama}`;
    }).filter(Boolean);

    const hemat = hargaAsli - pkg.hargaPaket;
    const persen = hargaAsli > 0 ? Math.round(hemat / hargaAsli * 100) : 0;

    const card = document.createElement('div');
    card.className = `paket-card reveal${idx === 1 ? ' paket-card--featured' : ''}`;
    card.innerHTML = `
      <div class="paket-ikon">${pkg.ikon}</div>
      <h3 class="paket-nama">${pkg.nama}</h3>
      <p class="paket-desc">${pkg.deskripsi}</p>
      <div class="paket-items">
        ${itemDetails.map(d => `<div class="paket-item">${d}</div>`).join('')}
      </div>
      <div class="paket-pricing">
        <div class="paket-harga-asli">${formatRupiah(hargaAsli)}</div>
        <div class="paket-harga-paket">${formatRupiah(pkg.hargaPaket)}/hari</div>
        <span class="paket-hemat">Hemat ${persen}%</span>
      </div>
      <button class="btn btn--primary btn--full" data-pkg="${pkg.id}" aria-label="Pilih ${pkg.nama}">
        🎣 Pilih Paket
      </button>
    `;
    card.querySelector('button').addEventListener('click', () => addPackageToCart(pkg));
    grid.appendChild(card);
    setTimeout(() => card.classList.add('visible'), 100 * idx);
  });
}

function addPackageToCart(pkg) {
  let added = 0;
  pkg.items.forEach(item => {
    const p = products.find(x => x.id === item.produkId);
    if (!p || p.status === 'habis') return;
    addToCart(item.produkId, item.jumlah, 1, 'hari');
    added++;
  });
  if (added > 0) showToast(`${pkg.nama} ditambahkan ke keranjang!`, 'success');
}

/* ═══════════════════════════════════════════════════════════════════
   TESTIMONI
   ═══════════════════════════════════════════════════════════════════ */
function renderTestimonials() {
  const grid = document.getElementById('testimoniGrid');
  grid.innerHTML = TESTIMONIALS.map(t => `
    <article class="testi-card reveal">
      <div class="testi-header">
        <div class="testi-avatar" aria-hidden="true">${t.avatar}</div>
        <div>
          <div class="testi-nama">${t.nama}</div>
          <div class="testi-kota">${t.kota}</div>
          <div class="testi-rating" aria-label="Rating ${t.rating} dari 5">${'★'.repeat(t.rating)}</div>
        </div>
      </div>
      <p class="testi-teks">${t.teks}</p>
      <div class="testi-tanggal">${t.tanggal}</div>
    </article>
  `).join('');
  grid.querySelectorAll('.testi-card').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 100 * i);
  });
}

/* ═══════════════════════════════════════════════════════════════════
   FAQ ACCORDION
   ═══════════════════════════════════════════════════════════════════ */
function renderFAQ() {
  const accordion = document.getElementById('accordion');
  accordion.innerHTML = FAQS.map((faq, i) => `
    <div class="accordion-item reveal" role="listitem">
      <button class="accordion-btn" aria-expanded="false" aria-controls="faq-body-${i}" id="faq-btn-${i}">
        ${faq.pertanyaan}
        <span class="accordion-icon" aria-hidden="true">+</span>
      </button>
      <div class="accordion-body" id="faq-body-${i}" role="region" aria-labelledby="faq-btn-${i}">
        ${faq.jawaban}
      </div>
    </div>
  `).join('');

  accordion.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item     = btn.closest('.accordion-item');
      const isOpen   = item.classList.contains('open');
      const body     = item.querySelector('.accordion-body');

      // Tutup semua
      accordion.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-btn').setAttribute('aria-expanded', 'false');
        i.querySelector('.accordion-body').style.maxHeight = '0';
      });

      // Buka item ini jika belum terbuka
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
    btn.addEventListener('click', () => setTimeout(() => btn.classList.add('visible'), 80));
  });

  accordion.querySelectorAll('.accordion-item').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 80 * i);
  });
}

/* ═══════════════════════════════════════════════════════════════════
   ADMIN PANEL
   ═══════════════════════════════════════════════════════════════════ */
function initAdmin() {
  const adminBtn      = document.getElementById('adminBtn');
  const pinModal      = document.getElementById('adminPinModal');
  const pinForm       = document.getElementById('pinForm');
  const pinClose      = document.getElementById('adminPinClose');
  const adminModal    = document.getElementById('adminModal');
  const adminClose    = document.getElementById('adminModalClose');

  // Buka PIN modal
  adminBtn.addEventListener('click', () => {
    pinModal.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('pinInput').value = '';
    document.getElementById('pinErr').textContent = '';
    document.getElementById('pinInput').focus();
  });

  pinClose.addEventListener('click', () => closeModal('adminPinModal'));
  pinModal.addEventListener('click', (e) => { if (e.target === pinModal) closeModal('adminPinModal'); });

  // Verifikasi PIN
  pinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const pin = document.getElementById('pinInput').value;
    if (pin === (settings.adminPin || '1234')) {
      closeModal('adminPinModal');
      openAdminModal();
    } else {
      document.getElementById('pinErr').textContent = 'PIN salah. Coba lagi.';
      document.getElementById('pinInput').value = '';
      document.getElementById('pinInput').focus();
    }
  });

  adminClose.addEventListener('click', () => closeModal('adminModal'));
  adminModal.addEventListener('click', (e) => { if (e.target === adminModal) closeModal('adminModal'); });

  // Tab switching
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab').forEach(t => {
        t.classList.remove('admin-tab--active');
        t.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.admin-panel').forEach(p => p.classList.add('admin-panel--hidden'));
      tab.classList.add('admin-tab--active');
      tab.setAttribute('aria-selected', 'true');
      document.getElementById('tab' + capitalize(tab.dataset.tab)).classList.remove('admin-panel--hidden');
    });
  });

  // Tambah produk baru
  document.getElementById('addProductForm').addEventListener('submit', (e) => {
    e.preventDefault();
    addNewProduct();
  });

  // Simpan pengaturan global
  document.getElementById('settingsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    saveGlobalSettings();
  });

  // Slider diskon
  const discSlider = document.getElementById('settDiscount');
  discSlider.addEventListener('input', () => {
    document.getElementById('settDiscountVal').textContent = discSlider.value + '%';
  });

  // Reset default
  document.getElementById('resetDefaultBtn').addEventListener('click', () => {
    if (!confirm('Reset semua data ke default? Perubahan tidak bisa dibatalkan.')) return;
    localStorage.removeItem('umpanku_products');
    localStorage.removeItem('umpanku_settings');
    products  = [...DEFAULT_PRODUCTS];
    settings  = { ...DEFAULT_SETTINGS };
    renderProducts();
    renderPackages();
    showToast('Data berhasil direset ke default.', 'success');
    closeModal('adminModal');
  });

  // Export JSON
  document.getElementById('exportJsonBtn').addEventListener('click', () => {
    const data = JSON.stringify({ products, settings }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'umpanku-data.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data berhasil diekspor.', 'success');
  });
}

function openAdminModal() {
  renderAdminTable();
  loadSettingsForm();

  const modal = document.getElementById('adminModal');
  modal.hidden = false;
  document.body.style.overflow = 'hidden';

  // Reset ke tab pertama
  document.querySelectorAll('.admin-tab').forEach((t, i) => {
    t.classList.toggle('admin-tab--active', i === 0);
    t.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
  });
  document.querySelectorAll('.admin-panel').forEach((p, i) => {
    p.classList.toggle('admin-panel--hidden', i !== 0);
  });
}

function renderAdminTable() {
  const tbody = document.getElementById('adminProductTable');
  tbody.innerHTML = products.map(p => `
    <tr data-id="${p.id}">
      <td title="${p.nama}">${p.nama.length > 22 ? p.nama.slice(0, 22) + '…' : p.nama}</td>
      <td>${p.kategori}</td>
      <td><input type="number" class="admin-input" value="${p.hargaJam}" data-field="hargaJam" min="1000" aria-label="Harga per jam" /></td>
      <td><input type="number" class="admin-input" value="${p.hargaHari}" data-field="hargaHari" min="5000" aria-label="Harga per hari" /></td>
      <td><input type="number" class="admin-input" value="${p.stok}" data-field="stok" min="0" aria-label="Stok" /></td>
      <td>
        <select class="admin-select" data-field="status" aria-label="Status ketersediaan">
          <option value="tersedia" ${p.status === 'tersedia' ? 'selected' : ''}>Tersedia</option>
          <option value="menipis"  ${p.status === 'menipis'  ? 'selected' : ''}>Menipis</option>
          <option value="habis"    ${p.status === 'habis'    ? 'selected' : ''}>Habis</option>
        </select>
      </td>
      <td>
        <button class="btn-save-row"   data-id="${p.id}">💾 Simpan</button>
        <button class="btn-delete-row" data-id="${p.id}">🗑️ Hapus</button>
      </td>
    </tr>
  `).join('');

  // Simpan baris
  tbody.querySelectorAll('.btn-save-row').forEach(btn => {
    btn.addEventListener('click', () => saveAdminRow(parseInt(btn.dataset.id)));
  });
  // Hapus baris
  tbody.querySelectorAll('.btn-delete-row').forEach(btn => {
    btn.addEventListener('click', () => deleteProduct(parseInt(btn.dataset.id)));
  });
}

function saveAdminRow(id) {
  const row = document.querySelector(`#adminProductTable tr[data-id="${id}"]`);
  if (!row) return;
  const p = products.find(x => x.id === id);
  if (!p) return;

  p.hargaJam  = parseInt(row.querySelector('[data-field="hargaJam"]').value)  || p.hargaJam;
  p.hargaHari = parseInt(row.querySelector('[data-field="hargaHari"]').value) || p.hargaHari;
  p.stok      = parseInt(row.querySelector('[data-field="stok"]').value)      ?? p.stok;
  p.status    = row.querySelector('[data-field="status"]').value;

  // Auto-set status berdasarkan stok
  if (p.stok === 0) p.status = 'habis';
  else if (p.stok <= 3) p.status = 'menipis';

  saveProducts(products);
  renderProducts();
  renderPackages();
  showToast('Perubahan disimpan!', 'success');
}

function deleteProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  if (!confirm(`Hapus produk "${p.nama}"? Tindakan ini tidak bisa dibatalkan.`)) return;
  products = products.filter(x => x.id !== id);
  saveProducts(products);
  renderAdminTable();
  renderProducts();
  showToast(`${p.nama} dihapus.`, 'warning');
}

function addNewProduct() {
  const nama     = document.getElementById('apNama').value.trim();
  const kat      = document.getElementById('apKategori').value;
  const hargaJam = parseInt(document.getElementById('apHargaJam').value);
  const hargaHari= parseInt(document.getElementById('apHargaHari').value);
  const stok     = parseInt(document.getElementById('apStok').value);
  const gambar   = document.getElementById('apGambar').value.trim() || 'images/placeholder.jpg';
  const deskripsi= document.getElementById('apDeskripsi').value.trim();

  if (!nama || !kat || !hargaJam || !hargaHari || isNaN(stok)) {
    showToast('Lengkapi semua field wajib!', 'error');
    return;
  }

  const newId = Math.max(...products.map(p => p.id), 0) + 1;
  products.push({
    id: newId, nama, kategori: kat,
    hargaJam, hargaHari, stok,
    status: stok === 0 ? 'habis' : stok <= 3 ? 'menipis' : 'tersedia',
    rating: 5.0, ulasan: 0,
    gambar: [gambar], deskripsi,
    spesifikasi: {},
  });
  saveProducts(products);
  document.getElementById('addProductForm').reset();
  renderAdminTable();
  renderProducts();
  showToast(`${nama} berhasil ditambahkan!`, 'success');
}

function loadSettingsForm() {
  document.getElementById('settDiscount').value  = settings.discount || 0;
  document.getElementById('settDiscountVal').textContent = (settings.discount || 0) + '%';
  document.getElementById('settDeposit').value   = settings.deposit  || 50000;
  document.getElementById('settLateFee').value   = settings.lateFee  || 5000;
  document.getElementById('settPin').value       = '';
}

function saveGlobalSettings() {
  settings.discount = parseInt(document.getElementById('settDiscount').value) || 0;
  settings.deposit  = parseInt(document.getElementById('settDeposit').value)  || 50000;
  settings.lateFee  = parseInt(document.getElementById('settLateFee').value)  || 5000;
  const newPin = document.getElementById('settPin').value;
  if (newPin.trim()) settings.adminPin = newPin;

  saveSettings(settings);
  renderProducts();
  renderCart();
  showToast('Pengaturan disimpan!', 'success');
}

/* ═══════════════════════════════════════════════════════════════════
   SCROLL REVEAL (IntersectionObserver)
   ═══════════════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════════════════
   COUNT-UP ANIMASI STATISTIK
   ═══════════════════════════════════════════════════════════════════ */
function initCountUp() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el      = entry.target;
      const target  = parseFloat(el.dataset.target);
      const decimal = parseInt(el.dataset.decimal || 0);
      const duration = 1400;
      const step     = 16;
      const steps    = duration / step;
      let current    = 0;
      const inc      = target / steps;

      const timer = setInterval(() => {
        current += inc;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = decimal > 0 ? current.toFixed(decimal) : Math.floor(current);
      }, step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════════════════
   TOAST NOTIFIKASI
   ═══════════════════════════════════════════════════════════════════ */
function showToast(message, type = 'success', duration = 3000) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  const ikon = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  toast.className = `toast toast--${type}`;
  toast.style.setProperty('--toast-dur', (duration / 1000 - 0.3) + 's');
  toast.innerHTML = `<span aria-hidden="true">${ikon[type] || '✅'}</span> ${message}`;
  container.appendChild(toast);

  setTimeout(() => { toast.remove(); }, duration);
}

/* ═══════════════════════════════════════════════════════════════════
   HELPER
   ═══════════════════════════════════════════════════════════════════ */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
