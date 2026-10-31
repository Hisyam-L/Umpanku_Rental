/**
 * data.js — Data produk default UmpanKu Rental
 * Semua data produk, paket, dan pengaturan global tersimpan di sini.
 * Data aktif diambil dari localStorage bila tersedia.
 */

const DEFAULT_SETTINGS = {
  discount: 0,          // diskon global dalam persen (0-50)
  deposit: 50000,       // biaya deposit (dapat dikembalikan), satuan Rupiah
  lateFee: 5000,        // denda keterlambatan per jam, satuan Rupiah
  adminPin: '1234',     // PIN panel admin
};

const DEFAULT_PRODUCTS = [
  // ─── JORAN ───────────────────────────────────────────────────────────────
  {
    id: 1,
    nama: 'Joran Shimano FX XT 2.1m',
    kategori: 'Joran',
    hargaJam: 5000,
    hargaHari: 25000,
    stok: 5,
    status: 'tersedia',   // tersedia | menipis | habis
    rating: 4.8,
    ulasan: 142,
    gambar: ['images/joran-shimano-fx.jpg', 'images/joran-shimano-fx-2.jpg', 'images/joran-shimano-fx-3.jpg'],
    deskripsi: 'Joran spinning entry-level andalan Shimano. Ringan, sensitif, dan cocok untuk pemancing pemula maupun hobiis di kolam dan sungai.',
    spesifikasi: {
      panjang: '2,1 meter',
      bahan: 'Fiberglass composite',
      sambungan: '2 bagian',
      power: 'Medium',
      action: 'Fast',
      berat: '128 gram',
      cocokUntuk: 'Kolam, Sungai, Danau'
    }
  },
  {
    id: 2,
    nama: 'Joran Daiwa Crossfire 2.4m',
    kategori: 'Joran',
    hargaJam: 6000,
    hargaHari: 30000,
    stok: 3,
    status: 'menipis',
    rating: 4.6,
    ulasan: 89,
    gambar: ['images/joran-daiwa-crossfire.jpg', 'images/joran-daiwa-crossfire-2.jpg', 'images/joran-daiwa-crossfire-3.jpg'],
    deskripsi: 'Joran Daiwa dengan teknologi HVF Carbon membuatnya sangat ringan dan kuat. Ideal untuk casting jarak jauh di danau.',
    spesifikasi: {
      panjang: '2,4 meter',
      bahan: 'HVF Carbon',
      sambungan: '2 bagian',
      power: 'Medium-Heavy',
      action: 'Moderate Fast',
      berat: '115 gram',
      cocokUntuk: 'Danau, Laut pinggir, Sungai besar'
    }
  },
  {
    id: 3,
    nama: 'Joran Teleskopik Pesca 3.6m',
    kategori: 'Joran',
    hargaJam: 4000,
    hargaHari: 20000,
    stok: 8,
    status: 'tersedia',
    rating: 4.3,
    ulasan: 67,
    gambar: ['images/joran-teleskopik.jpg', 'images/joran-teleskopik-2.jpg', 'images/joran-teleskopik-3.jpg'],
    deskripsi: 'Joran teleskopik praktis dan mudah dibawa. Cocok untuk pemancing pemula yang baru belajar teknik dasar mancing.',
    spesifikasi: {
      panjang: '3,6 meter (dilipat: 70 cm)',
      bahan: 'Fiberglass',
      sambungan: 'Teleskopik (6 bagian)',
      power: 'Light',
      action: 'Slow',
      berat: '180 gram',
      cocokUntuk: 'Kolam, Empang, Sungai kecil'
    }
  },

  // ─── REEL ────────────────────────────────────────────────────────────────
  {
    id: 4,
    nama: 'Reel Shimano Sienna FE 2500',
    kategori: 'Reel',
    hargaJam: 6000,
    hargaHari: 30000,
    stok: 6,
    status: 'tersedia',
    rating: 4.9,
    ulasan: 201,
    gambar: ['images/reel-shimano-sienna.jpg', 'images/reel-shimano-sienna-2.jpg', 'images/reel-shimano-sienna-3.jpg'],
    deskripsi: 'Reel spinning Shimano Sienna FE dengan sistem Propulsion Line Management untuk lemparan presisi. Favorit para pemancing danau.',
    spesifikasi: {
      tipe: 'Spinning',
      ukuran: '2500',
      gearRatio: '5.0:1',
      bearing: '3+1 BB',
      kapasitasSenar: 'Mono 0.20mm / 240m',
      dragMaksimal: '3 kg'
    }
  },
  {
    id: 5,
    nama: 'Reel Daiwa Fuego LT 3000',
    kategori: 'Reel',
    hargaJam: 8000,
    hargaHari: 40000,
    stok: 4,
    status: 'tersedia',
    rating: 4.7,
    ulasan: 156,
    gambar: ['images/reel-daiwa-fuego.jpg', 'images/reel-daiwa-fuego-2.jpg', 'images/reel-daiwa-fuego-3.jpg'],
    deskripsi: 'Reel LT (Light & Tough) dari Daiwa dengan body aluminium. Sangat ringan namun bertenaga, cocok untuk teknik jigging ringan.',
    spesifikasi: {
      tipe: 'Spinning',
      ukuran: '3000',
      gearRatio: '6.2:1',
      bearing: '6+1 BB',
      kapasitasSenar: 'PE 1.0 / 200m',
      dragMaksimal: '10 kg'
    }
  },
  {
    id: 6,
    nama: 'Reel Baitcasting Abu Garcia Black Max',
    kategori: 'Reel',
    hargaJam: 10000,
    hargaHari: 50000,
    stok: 2,
    status: 'menipis',
    rating: 4.5,
    ulasan: 74,
    gambar: ['images/reel-abu-garcia.jpg', 'images/reel-abu-garcia-2.jpg', 'images/reel-abu-garcia-3.jpg'],
    deskripsi: 'Reel baitcasting Abu Garcia Black Max untuk pemancing yang ingin belajar teknik casting dengan akurasi tinggi.',
    spesifikasi: {
      tipe: 'Baitcasting',
      ukuran: 'Standard',
      gearRatio: '6.4:1',
      bearing: '4+1 BB',
      kapasitasSenar: 'Mono 0.35mm / 115m',
      dragMaksimal: '8 kg'
    }
  },

  // ─── KAIL & SENAR ─────────────────────────────────────────────────────────
  {
    id: 7,
    nama: 'Set Kail & Senar Lengkap',
    kategori: 'Kail & Senar',
    hargaJam: 2000,
    hargaHari: 10000,
    stok: 20,
    status: 'tersedia',
    rating: 4.4,
    ulasan: 312,
    gambar: ['images/set-kail-senar.jpg', 'images/set-kail-senar-2.jpg', 'images/set-kail-senar-3.jpg'],
    deskripsi: 'Paket kail dan senar lengkap: senar nylon 0.25mm 50m, 10 pcs kail ukuran #6 dan #8, 5 pcs pemberat timah, 5 pcs pelampung kecil.',
    spesifikasi: {
      bahan: 'Baja anti karat & Nylon',
      dimensi: 'Kotak plastik 12x8x3 cm',
      kapasitas: '10 kail, 50m senar, 5 pemberat, 5 pelampung',
      berat: '150 gram'
    }
  },

  // ─── UMPAN ────────────────────────────────────────────────────────────────
  {
    id: 8,
    nama: 'Umpan Buatan Set Soft Lure',
    kategori: 'Umpan',
    hargaJam: 3000,
    hargaHari: 15000,
    stok: 15,
    status: 'tersedia',
    rating: 4.6,
    ulasan: 98,
    gambar: ['images/umpan-soft-lure.jpg', 'images/umpan-soft-lure-2.jpg', 'images/umpan-soft-lure-3.jpg'],
    deskripsi: 'Set 10 buah soft lure berbagai ukuran dan warna. Imitasi cacing, udang, dan ikan kecil. Efektif untuk mancing ikan bass dan nila.',
    spesifikasi: {
      bahan: 'Karet silikon food-grade',
      dimensi: 'Ukuran 3-7 cm',
      kapasitas: '10 pcs per set',
      berat: '80 gram'
    }
  },
  {
    id: 9,
    nama: 'Umpan Hard Lure Minnow Set',
    kategori: 'Umpan',
    hargaJam: 4000,
    hargaHari: 20000,
    stok: 10,
    status: 'tersedia',
    rating: 4.5,
    ulasan: 63,
    gambar: ['images/umpan-hard-lure.jpg', 'images/umpan-hard-lure-2.jpg', 'images/umpan-hard-lure-3.jpg'],
    deskripsi: 'Set 5 buah hard lure minnow dengan treble hook tajam. Gerakan renang realistis menarik perhatian ikan predator.',
    spesifikasi: {
      bahan: 'ABS plastik keras',
      dimensi: 'Panjang 7-10 cm',
      kapasitas: '5 pcs per set',
      berat: '120 gram'
    }
  },

  // ─── TACKLE BOX ───────────────────────────────────────────────────────────
  {
    id: 10,
    nama: 'Tackle Box Plano 3600',
    kategori: 'Tackle Box',
    hargaJam: 3000,
    hargaHari: 15000,
    stok: 7,
    status: 'tersedia',
    rating: 4.7,
    ulasan: 185,
    gambar: ['images/tackle-box-plano.jpg', 'images/tackle-box-plano-2.jpg', 'images/tackle-box-plano-3.jpg'],
    deskripsi: 'Tackle box Plano 3600 dengan 27 kompartemen yang bisa diatur sesuai kebutuhan. Material tebal dan tahan benturan.',
    spesifikasi: {
      bahan: 'Polypropylene tebal',
      dimensi: '36 x 23 x 9 cm',
      kapasitas: '27 kompartemen adjustable',
      berat: '680 gram'
    }
  },

  // ─── PERLENGKAPAN ─────────────────────────────────────────────────────────
  {
    id: 11,
    nama: 'Kursi Lipat Pancing Portable',
    kategori: 'Perlengkapan',
    hargaJam: 4000,
    hargaHari: 20000,
    stok: 10,
    status: 'tersedia',
    rating: 4.6,
    ulasan: 220,
    gambar: ['images/kursi-lipat.jpg', 'images/kursi-lipat-2.jpg', 'images/kursi-lipat-3.jpg'],
    deskripsi: 'Kursi lipat ringan dengan dudukan empuk dan sandaran. Dilengkapi tempat gelas dan holder joran kecil di sisi kanan.',
    spesifikasi: {
      bahan: 'Rangka aluminium + kain Oxford 600D',
      dimensi: 'Buka: 50x45x85 cm | Lipat: 50x15x85 cm',
      kapasitas: 'Beban maks 120 kg',
      berat: '2,1 kg'
    }
  },
  {
    id: 12,
    nama: 'Jaring Angkat Lipat (Landing Net)',
    kategori: 'Perlengkapan',
    hargaJam: 3000,
    hargaHari: 15000,
    stok: 6,
    status: 'tersedia',
    rating: 4.4,
    ulasan: 77,
    gambar: ['images/jaring-landing-net.jpg', 'images/jaring-landing-net-2.jpg', 'images/jaring-landing-net-3.jpg'],
    deskripsi: 'Landing net lipat dengan gagang teleskopik 1,2 meter. Jaring lembut anti melukai ikan, cocok untuk catch & release.',
    spesifikasi: {
      bahan: 'Rangka aluminium + jaring PE',
      dimensi: 'Diameter jaring 40 cm | Gagang 1,2 m',
      kapasitas: 'Ikan maks 5 kg',
      berat: '450 gram'
    }
  },
  {
    id: 13,
    nama: 'Ember Pancing Lipat 10L',
    kategori: 'Perlengkapan',
    hargaJam: 2000,
    hargaHari: 12000,
    stok: 12,
    status: 'tersedia',
    rating: 4.3,
    ulasan: 54,
    gambar: ['images/ember-lipat.jpg', 'images/ember-lipat-2.jpg', 'images/ember-lipat-3.jpg'],
    deskripsi: 'Ember lipat multifungsi 10 liter untuk menyimpan ikan tangkapan. Material EVA food-grade, tidak bau, mudah dibersihkan.',
    spesifikasi: {
      bahan: 'EVA food-grade',
      dimensi: 'Ø 30 cm x Tinggi 25 cm (dilipat: 5 cm)',
      kapasitas: '10 liter',
      berat: '320 gram'
    }
  },
  {
    id: 14,
    nama: 'Topi Pancing Outdoor Breathable',
    kategori: 'Perlengkapan',
    hargaJam: 2000,
    hargaHari: 10000,
    stok: 0,
    status: 'habis',
    rating: 4.5,
    ulasan: 139,
    gambar: ['images/topi-pancing.jpg', 'images/topi-pancing-2.jpg', 'images/topi-pancing-3.jpg'],
    deskripsi: 'Topi lebar UPF 50+ dengan ventilasi udara di mahkota. Melindungi wajah dan leher dari terik matahari saat mancing seharian.',
    spesifikasi: {
      bahan: 'Polyester breathable + mesh',
      dimensi: 'Lingkar kepala 56-62 cm (adjustable)',
      kapasitas: 'Universal size',
      berat: '120 gram'
    }
  },
  {
    id: 15,
    nama: 'Tas Ransel Pancing Multifungsi',
    kategori: 'Perlengkapan',
    hargaJam: 5000,
    hargaHari: 25000,
    stok: 4,
    status: 'tersedia',
    rating: 4.8,
    ulasan: 93,
    gambar: ['images/tas-ransel-pancing.jpg', 'images/tas-ransel-pancing-2.jpg', 'images/tas-ransel-pancing-3.jpg'],
    deskripsi: 'Tas ransel pancing 30L dengan kompartemen khusus tackle box, holder joran, dan lapisan waterproof. Nyaman dibawa hiking ke spot mancing.',
    spesifikasi: {
      bahan: '600D Oxford waterproof',
      dimensi: '30 x 20 x 45 cm',
      kapasitas: '30 liter',
      berat: '800 gram'
    }
  }
];

// ─── PAKET BUNDLING ────────────────────────────────────────────────────────
const DEFAULT_PACKAGES = [
  {
    id: 'pkg-1',
    nama: 'Paket Pemula',
    deskripsi: 'Semua yang kamu butuhkan untuk pengalaman mancing pertama. Sudah termasuk joran, reel, dan perlengkapan dasar.',
    ikon: '🎣',
    items: [
      { produkId: 3, jumlah: 1 },  // Joran Teleskopik
      { produkId: 4, jumlah: 1 },  // Reel Shimano Sienna
      { produkId: 7, jumlah: 1 },  // Set Kail & Senar
      { produkId: 13, jumlah: 1 }, // Ember Lipat
    ],
    hargaAsli: 0,   // dihitung dinamis
    hargaPaket: 45000,
    durasi: 'hari',
  },
  {
    id: 'pkg-2',
    nama: 'Paket Hobiis',
    deskripsi: 'Setup lengkap untuk hobiis yang serius. Joran carbon premium, reel berkualitas, lure set, dan tackle box.',
    ikon: '🏆',
    items: [
      { produkId: 2, jumlah: 1 },  // Joran Daiwa Crossfire
      { produkId: 5, jumlah: 1 },  // Reel Daiwa Fuego
      { produkId: 8, jumlah: 1 },  // Soft Lure Set
      { produkId: 10, jumlah: 1 }, // Tackle Box Plano
      { produkId: 11, jumlah: 1 }, // Kursi Lipat
    ],
    hargaAsli: 0,
    hargaPaket: 100000,
    durasi: 'hari',
  },
  {
    id: 'pkg-3',
    nama: 'Paket Keluarga',
    deskripsi: 'Cocok untuk liburan mancing bersama keluarga. Dua set joran-reel, perlengkapan lengkap, dan kursi nyaman.',
    ikon: '👨‍👩‍👧‍👦',
    items: [
      { produkId: 3, jumlah: 2 },  // 2x Joran Teleskopik
      { produkId: 4, jumlah: 2 },  // 2x Reel Shimano
      { produkId: 7, jumlah: 2 },  // 2x Set Kail & Senar
      { produkId: 11, jumlah: 2 }, // 2x Kursi Lipat
      { produkId: 13, jumlah: 1 }, // Ember Lipat
      { produkId: 12, jumlah: 1 }, // Landing Net
    ],
    hargaAsli: 0,
    hargaPaket: 130000,
    durasi: 'hari',
  }
];

// ─── TESTIMONI ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    nama: 'Budi Santoso',
    kota: 'Bandung',
    rating: 5,
    teks: 'Alat mancingnya lengkap dan terawat banget! Pertama kali mancing langsung dapat ikan nila besar. Pelayanannya ramah, proses sewanya gampang. Pasti balik lagi!',
    avatar: 'BS',
    tanggal: '15 Okt 2025'
  },
  {
    nama: 'Rina Maharani',
    kota: 'Jakarta',
    rating: 5,
    teks: 'Cocok banget buat yang baru mau coba mancing kayak saya. Ga perlu beli alat dulu, tinggal sewa dan langsung bisa mancing di spot keren. Recommended!',
    avatar: 'RM',
    tanggal: '2 Nov 2025'
  },
  {
    nama: 'Agus Permana',
    kota: 'Bogor',
    rating: 4,
    teks: 'Harga sewa terjangkau, kualitas alat bagus. Sewa Paket Keluarga untuk liburan bareng anak-anak, seru banget! Minus sedikit: antrian checkout agak lama pas weekend.',
    avatar: 'AP',
    tanggal: '20 Nov 2025'
  }
];

// ─── FAQ ───────────────────────────────────────────────────────────────────
const FAQS = [
  {
    pertanyaan: 'Berapa lama minimal sewa alat pancing?',
    jawaban: 'Minimal sewa adalah 2 jam. Untuk sewa harian, minimal 1 hari (dihitung 24 jam dari waktu pengambilan).'
  },
  {
    pertanyaan: 'Apakah deposit bisa dikembalikan?',
    jawaban: 'Ya, deposit 100% dikembalikan selama alat dikembalikan dalam kondisi baik dan tepat waktu. Jika terlambat, akan dikenakan denda Rp 5.000 per jam. Jika ada kerusakan, biaya perbaikan dipotong dari deposit.'
  },
  {
    pertanyaan: 'Bagaimana cara memesan dan membayar?',
    jawaban: 'Pilih alat di katalog, isi form pemesanan, lalu kirim konfirmasi via WhatsApp. Pembayaran bisa dilakukan tunai di lokasi atau transfer bank. DP 50% untuk konfirmasi pemesanan lebih dari 2 hari ke depan.'
  },
  {
    pertanyaan: 'Apakah bisa request antar alat ke lokasi mancing?',
    jawaban: 'Bisa! Layanan antar tersedia dalam radius 20 km dari toko kami di Bandung. Biaya antar mulai Rp 15.000 tergantung jarak. Hubungi kami via WhatsApp untuk konfirmasi.'
  },
  {
    pertanyaan: 'Bagaimana jika alat rusak saat disewa?',
    jawaban: 'Kerusakan akibat kelalaian penyewa akan dibebankan biaya perbaikan/penggantian yang dipotong dari deposit. Kerusakan akibat cacat produk tidak dibebankan ke penyewa. Segera laporkan kerusakan sebelum dikembalikan.'
  }
];

/**
 * Memuat data produk dari localStorage, fallback ke DEFAULT_PRODUCTS.
 * @returns {Array} Array produk aktif
 */
function loadProducts() {
  try {
    const saved = localStorage.getItem('umpanku_products');
    return saved ? JSON.parse(saved) : [...DEFAULT_PRODUCTS];
  } catch {
    return [...DEFAULT_PRODUCTS];
  }
}

/**
 * Memuat pengaturan dari localStorage, fallback ke DEFAULT_SETTINGS.
 * @returns {Object} Objek pengaturan aktif
 */
function loadSettings() {
  try {
    const saved = localStorage.getItem('umpanku_settings');
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : { ...DEFAULT_SETTINGS };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

/**
 * Menyimpan data produk ke localStorage.
 * @param {Array} products
 */
function saveProducts(products) {
  try {
    localStorage.setItem('umpanku_products', JSON.stringify(products));
  } catch (e) {
    console.warn('localStorage tidak tersedia:', e);
  }
}

/**
 * Menyimpan pengaturan ke localStorage.
 * @param {Object} settings
 */
function saveSettings(settings) {
  try {
    localStorage.setItem('umpanku_settings', JSON.stringify(settings));
  } catch (e) {
    console.warn('localStorage tidak tersedia:', e);
  }
}
