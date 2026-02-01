// collections.js - Koleksiyonlar sayfası işlevleri

// Ürün verileri (gerçek uygulamada API'den gelecek)
const productsData = {
  all: [
    {
      id: 1,
      name: "Sabrina",
      code: "2203",
      category: "women",
      image: "assets/images/hero-bottle.png",
      badge: "EXTRAIT",
      price: 2490,
    },
    {
      id: 2,
      name: "Brielle",
      code: "2C08",
      category: "women",
      image: "assets/images/hero-bottle.png",
      badge: "EXTRAIT",
      price: 2690,
    },
    {
      id: 3,
      name: "Naomi",
      code: "2208",
      category: "women",
      image: "assets/images/hero-bottle.png",
      badge: "EXTRAIT",
      price: 2490,
    },
    {
      id: 4,
      name: "Luna",
      code: "2209",
      category: "women",
      image: "assets/images/hero-bottle.png",
      badge: "EXTRAIT",
      price: 2790,
    },
    {
      id: 5,
      name: "Aurora",
      code: "2210",
      category: "women",
      image: "assets/images/hero-bottle.png",
      badge: "EXTRAIT",
      price: 2590,
    },
    {
      id: 6,
      name: "Marcus",
      code: "3101",
      category: "men",
      image: "assets/images/hero-bottle.png",
      badge: "EXTRAIT",
      price: 2490,
    },
    {
      id: 7,
      name: "Alexander",
      code: "3102",
      category: "men",
      image: "assets/images/hero-bottle.png",
      badge: "EXTRAIT",
      price: 2690,
    },
    {
      id: 8,
      name: "Victor",
      code: "3103",
      category: "men",
      image: "assets/images/hero-bottle.png",
      badge: "EXTRAIT",
      price: 2490,
    },
    {
      id: 9,
      name: "Noir",
      code: "4101",
      category: "unisex",
      image: "assets/images/hero-bottle.png",
      badge: "LIMITED",
      price: 3290,
    },
    {
      id: 10,
      name: "Eclipse",
      code: "4102",
      category: "unisex",
      image: "assets/images/hero-bottle.png",
      badge: "EXTRAIT",
      price: 2590,
    },
    {
      id: 11,
      name: "Zenith",
      code: "4103",
      category: "unisex",
      image: "assets/images/hero-bottle.png",
      badge: "EXTRAIT",
      price: 2490,
    },
    {
      id: 12,
      name: "Celeste",
      code: "2211",
      category: "women",
      image: "assets/images/hero-bottle.png",
      badge: "EXTRAIT",
      price: 2790,
    },
  ],
  women: [],
  men: [],
  unisex: [],
};

// Kategorilere göre ürünleri filtrele
productsData.women = productsData.all.filter((p) => p.category === "women");
productsData.men = productsData.all.filter((p) => p.category === "men");
productsData.unisex = productsData.all.filter((p) => p.category === "unisex");

// DOM elementleri
const tabs = document.querySelectorAll(".collection-tab");
const productsGrid = document.getElementById("products-grid");
let currentCategory = "all";

// Kategori isimlerini Türkçe'ye çevir
const categoryNames = {
  women: "KADIN",
  men: "ERKEK",
  unisex: "UNISEX",
};

// Fiyat formatla
function formatPrice(price) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// Ürün kartı oluştur
function createProductCard(product) {
  const card = document.createElement("a");
  card.href = `#product-${product.id}`;
  card.className = "collection-product-card";
  card.setAttribute("data-category", product.category);

  card.innerHTML = `
    <div class="collection-product-card__image">
      <span class="collection-product-card__badge">${product.badge}</span>
      <img src="${product.image}" alt="${product.name} Parfüm" loading="lazy" />
    </div>
    <div class="collection-product-card__content">
      <h3 class="collection-product-card__name">${product.name}</h3>
      <p class="collection-product-card__code">${product.code}</p>
      <div class="collection-product-card__price">${formatPrice(product.price)}</div>
      <span class="collection-product-card__category">${categoryNames[product.category]}</span>
    </div>
  `;

  return card;
}

// Ürünleri göster
function displayProducts(category) {
  productsGrid.innerHTML = "";

  const products =
    category === "all" ? productsData.all : productsData[category];

  if (products.length === 0) {
    productsGrid.innerHTML = `
      <div class="collections-grid__empty">
        <h3>Henüz ürün bulunmuyor</h3>
        <p>Bu kategoride şu anda ürün bulunmamaktadır.</p>
      </div>
    `;
    return;
  }

  products.forEach((product) => {
    const card = createProductCard(product);
    productsGrid.appendChild(card);
  });
}

// Tab değiştirme
function switchTab(category) {
  // Tüm tab'ları pasif yap
  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  // Seçili tab'ı aktif yap
  const activeTab = document.querySelector(
    `.collection-tab[data-category="${category}"]`
  );
  if (activeTab) {
    activeTab.classList.add("active");
  }

  // Kategoriyi güncelle
  currentCategory = category;

  // Ürünleri göster
  displayProducts(category);
}

// Tab'lara event listener ekle
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const category = tab.getAttribute("data-category");
    switchTab(category);
  });
});

// URL parametresinden kategori kontrolü
function initFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get("category");

  if (categoryParam && ["all", "women", "men", "unisex"].includes(categoryParam)) {
    switchTab(categoryParam);
  } else {
    // Varsayılan olarak "all" göster
    displayProducts("all");
  }
}

// Sayfa yüklendiğinde başlat
document.addEventListener("DOMContentLoaded", () => {
  initFromURL();
});
