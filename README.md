# 🎣 UmpanKu Rental — Website Sewa Alat Pancing

Website penyewaan alat pancing untuk pemancing pemula hingga hobiis di Indonesia.
Dibangun murni dengan **HTML5 + CSS3 + Vanilla JavaScript** (ES6+), tanpa framework dan tanpa backend.

---

## 📁 Struktur Folder

```
umpanku-rental/
├── index.html       ← Halaman utama (semua section)
├── style.css        ← Semua styling (tema Lake & Sunrise)
├── script.js        ← Semua logika interaktif
├── data.js          ← Data produk, paket, testimoni, FAQ
├── images/          ← Folder gambar produk
│   ├── joran-shimano-fx.jpg
│   ├── joran-shimano-fx-2.jpg
│   ├── joran-shimano-fx-3.jpg
│   ├── joran-daiwa-crossfire.jpg
│   ├── joran-daiwa-crossfire-2.jpg
│   ├── joran-daiwa-crossfire-3.jpg
│   ├── joran-teleskopik.jpg
│   ├── joran-teleskopik-2.jpg
│   ├── joran-teleskopik-3.jpg
│   ├── reel-shimano-sienna.jpg
│   ├── reel-shimano-sienna-2.jpg
│   ├── reel-shimano-sienna-3.jpg
│   ├── reel-daiwa-fuego.jpg
│   ├── reel-daiwa-fuego-2.jpg
│   ├── reel-daiwa-fuego-3.jpg
│   ├── reel-abu-garcia.jpg
│   ├── reel-abu-garcia-2.jpg
│   ├── reel-abu-garcia-3.jpg
│   ├── set-kail-senar.jpg
│   ├── set-kail-senar-2.jpg
│   ├── set-kail-senar-3.jpg
│   ├── umpan-soft-lure.jpg
│   ├── umpan-soft-lure-2.jpg
│   ├── umpan-soft-lure-3.jpg
│   ├── umpan-hard-lure.jpg
│   ├── umpan-hard-lure-2.jpg
│   ├── umpan-hard-lure-3.jpg
│   ├── tackle-box-plano.jpg
│   ├── tackle-box-plano-2.jpg
│   ├── tackle-box-plano-3.jpg
│   ├── kursi-lipat.jpg
│   ├── kursi-lipat-2.jpg
│   ├── kursi-lipat-3.jpg
│   ├── jaring-landing-net.jpg
│   ├── jaring-landing-net-2.jpg
│   ├── jaring-landing-net-3.jpg
│   ├── ember-lipat.jpg
│   ├── ember-lipat-2.jpg
│   ├── ember-lipat-3.jpg
│   ├── topi-pancing.jpg
│   ├── topi-pancing-2.jpg
│   ├── topi-pancing-3.jpg
│   ├── tas-ransel-pancing.jpg
│   ├── tas-ransel-pancing-2.jpg
│   └── tas-ransel-pancing-3.jpg
└── README.md
```

---

## 🚀 Cara Menjalankan

**Metode 1 — Live Server (Direkomendasikan)**
1. Buka folder `umpanku-rental/` di VS Code.
2. Klik kanan `index.html` → **"Open with Live Server"**.
3. Website otomatis terbuka di browser.

**Metode 2 — Python HTTP Server**
```bash
cd umpanku-rental
python3 -m http.server 5500
```
Buka browser ke `http://localhost:5500`

**Metode 3 — Buka langsung**
Double-click `index.html` di file manager untuk membuka di browser.
*(Catatan: Google Fonts tidak akan termuat tanpa koneksi internet)*

---

## 🔐 Kredensial Admin

| Field | Nilai Default |
|-------|--------------|
| PIN Admin | `1234` |

> PIN dapat diubah dari Panel Admin → Tab **Pengaturan**.

---

## ✨ Daftar Fitur Lengkap

### 1. Navbar Sticky
- Logo, menu navigasi 6 link dengan smooth scroll
- Scroll spy (link aktif berubah otomatis saat scroll)
- Ikon keranjang dengan badge jumlah item
- Tombol Admin
- Toggle mode gelap/terang (preferensi disimpan localStorage)
- Hamburger menu responsif untuk mobile

### 2. Hero Section
- Headline, subheadline, 2 tombol CTA
- Latar tema danau & matahari terbit
- 3 kartu statistik dengan animasi count-up saat terlihat di viewport

### 3. Katalog Alat Pancing (15 produk)
**Kategori:** Joran (3), Reel (3), Kail & Senar (1), Umpan (2), Tackle Box (1), Perlengkapan (5)
- Kartu produk dengan gambar, badge status, harga, rating bintang
- Fallback placeholder emoji bila gambar gagal dimuat
- Tombol Detail dan Sewa

### 4. Filter, Search & Sort
- **Search real-time** berdasarkan nama produk
- **Filter chip** berdasarkan kategori
- **Dual-range slider** untuk rentang harga per hari
- **Sort:** harga termurah, termahal, rating tertinggi, nama A–Z
- Empty state dengan tombol reset filter

### 5. Modal Detail Produk
- Galeri 3 gambar dengan thumbnail yang bisa diklik
- Deskripsi lengkap + tabel spesifikasi teknis per kategori
- Pemilih durasi (jam/hari) + jumlah unit
- Kalkulasi total otomatis
- Tombol Tambah ke Keranjang

### 6. Panel Admin (dilindungi PIN)
- **Tab Produk:** Edit harga/jam, harga/hari, stok, status langsung dari tabel
- **Tab Tambah Produk:** Form lengkap untuk produk baru
- **Tab Pengaturan Global:**
  - Slider diskon 0–50%
  - Biaya deposit
  - Denda keterlambatan per jam
  - Ubah PIN admin
- Tombol Reset ke Default, Simpan, dan Export JSON
- Perubahan langsung terlihat di katalog dan keranjang

### 7. Keranjang Sewa (Drawer)
- Slide dari kanan dengan overlay backdrop
- Ubah jumlah (+/-) dan hapus item
- Rincian biaya: subtotal, diskon, deposit, total bayar
- Validasi jumlah tidak melebihi stok
- Data tersimpan di localStorage (tetap ada setelah reload)

### 8. Form Booking & Konfirmasi
- Field: nama, nomor WhatsApp, tanggal ambil, metode, catatan
- Validasi real-time dengan pesan error
- Setelah submit: ringkasan pesanan dengan kode booking acak
- Tombol "Kirim via WhatsApp" dengan pesan otomatis (link wa.me)

### 9. Paket Bundling
- 3 paket: **Pemula**, **Hobiis**, **Keluarga**
- Harga paket vs harga satuan + persentase hemat dihitung otomatis
- Tombol "Pilih Paket" menambahkan semua item ke keranjang sekaligus

### 10. Section Pendukung
- **Cara Sewa:** 4 langkah dengan ikon besar
- **Testimoni:** 3 kartu pelanggan
- **FAQ:** Accordion animasi (buka/tutup)
- **Lokasi & Jam Operasional:** Info kontak + placeholder peta
- **Footer:** Navigasi, kontak, sosmed, copyright

---

## 🎨 Tema Desain

| Token | Nilai |
|-------|-------|
| Primary (Biru Danau) | `#0B6E8A` |
| Secondary (Hijau) | `#1F8A5B` |
| Accent (Amber) | `#F59E0B` |
| Background | `#F6FAFB` |
| Teks | `#12303A` |
| Font Heading | Poppins |
| Font Body | Inter |
| Border Radius Kartu | 14px |

---

## 🖼️ Gambar yang Perlu Disiapkan

Letakkan file gambar ke folder `images/`. Setiap produk membutuhkan 3 foto.
Bila foto tidak tersedia, website otomatis menampilkan **placeholder ikon emoji**.

| File | Deskripsi |
|------|-----------|
| `joran-shimano-fx.jpg` | Joran spinning Shimano FX tampak samping |
| `joran-shimano-fx-2.jpg` | Detail handle/grip joran |
| `joran-shimano-fx-3.jpg` | Joran terpasang di joran holder |
| `joran-daiwa-crossfire.jpg` | Joran Daiwa Crossfire tampak penuh |
| `joran-daiwa-crossfire-2.jpg` | Detail tip joran carbon |
| `joran-daiwa-crossfire-3.jpg` | Joran dikombinasikan dengan reel |
| `joran-teleskopik.jpg` | Joran teleskopik dalam kondisi memanjang |
| `joran-teleskopik-2.jpg` | Joran teleskopik dalam kondisi terlipat |
| `joran-teleskopik-3.jpg` | Detail sistem teleskopik |
| `reel-shimano-sienna.jpg` | Reel Shimano Sienna tampak depan |
| `reel-shimano-sienna-2.jpg` | Detail body reel |
| `reel-shimano-sienna-3.jpg` | Reel terpasang di joran |
| `reel-daiwa-fuego.jpg` | Reel Daiwa Fuego tampak depan |
| `reel-daiwa-fuego-2.jpg` | Detail spool reel |
| `reel-daiwa-fuego-3.jpg` | Reel tampak belakang |
| `reel-abu-garcia.jpg` | Reel baitcasting Abu Garcia tampak atas |
| `reel-abu-garcia-2.jpg` | Detail braking system |
| `reel-abu-garcia-3.jpg` | Reel terpasang di joran casting |
| `set-kail-senar.jpg` | Koleksi kail & senar dalam kotak |
| `set-kail-senar-2.jpg` | Detail berbagai ukuran kail |
| `set-kail-senar-3.jpg` | Senar nylon dalam gulungan |
| `umpan-soft-lure.jpg` | Koleksi soft lure berbagai warna |
| `umpan-soft-lure-2.jpg` | Detail tekstur soft lure |
| `umpan-soft-lure-3.jpg` | Soft lure dipasang di kail |
| `umpan-hard-lure.jpg` | Set hard lure minnow dalam kotak |
| `umpan-hard-lure-2.jpg` | Detail treble hook hard lure |
| `umpan-hard-lure-3.jpg` | Hard lure di permukaan air |
| `tackle-box-plano.jpg` | Tackle box Plano tampak tertutup |
| `tackle-box-plano-2.jpg` | Tackle box terbuka dengan isi |
| `tackle-box-plano-3.jpg` | Detail kompartemen adjustable |
| `kursi-lipat.jpg` | Kursi lipat dalam kondisi terbuka |
| `kursi-lipat-2.jpg` | Detail bahan dan jahitan |
| `kursi-lipat-3.jpg` | Kursi dalam kondisi terlipat |
| `jaring-landing-net.jpg` | Landing net dengan gagang terentang |
| `jaring-landing-net-2.jpg` | Detail jaring PE lembut |
| `jaring-landing-net-3.jpg` | Landing net sedang digunakan |
| `ember-lipat.jpg` | Ember lipat dalam kondisi terbuka |
| `ember-lipat-2.jpg` | Ember lipat dalam kondisi terlipat |
| `ember-lipat-3.jpg` | Detail material EVA |
| `topi-pancing.jpg` | Topi pancing tampak depan |
| `topi-pancing-2.jpg` | Detail ventilasi mesh |
| `topi-pancing-3.jpg` | Topi dipakai saat mancing |
| `tas-ransel-pancing.jpg` | Tas ransel tampak depan |
| `tas-ransel-pancing-2.jpg` | Tas terbuka menampilkan kompartemen |
| `tas-ransel-pancing-3.jpg` | Detail holder joran & waterproof |

---

## 🛠️ Teknologi

- **HTML5** — Elemen semantik, ARIA attributes, accessible markup
- **CSS3** — Custom Properties, Grid, Flexbox, IntersectionObserver, Animasi
- **JavaScript ES6+** — Modules terorganisasi, localStorage, Form validation

## 📱 Responsif

| Breakpoint | Target |
|-----------|--------|
| < 480px | Mobile kecil |
| < 768px | Tablet / mobile besar |
| < 1024px | Laptop kecil |
| ≥ 1024px | Desktop |

---

*© 2025 UmpanKu Rental — Sewa alat pancing, raih pengalaman terbaik.*
