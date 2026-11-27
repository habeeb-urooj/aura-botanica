/**
 * Aura Botanica - Main UI Interactivity & Component Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  renderProductGrid("all");
  initCategoryFilters();
  initMobileMenu();
  initQuickViewModal();
  initCheckoutModal();
  initNewsletterForm();
  initFaqAccordion();
});

/**
 * Render Product Grid based on Category Filter
 */
function renderProductGrid(filter = "all") {
  const gridEl = document.getElementById("products-grid");
  if (!gridEl) return;

  const filtered = filter === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  gridEl.innerHTML = filtered.map(prod => `
    <div class="product-card group bg-white rounded-2xl overflow-hidden border border-earth-100/80 hover:border-botanica-200 transition-all duration-300 hover:shadow-lg flex flex-col justify-between" data-category="${prod.category}">
      <div class="relative overflow-hidden bg-earth-50 aspect-square">
        ${prod.badge ? `
          <span class="absolute top-3 left-3 z-10 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-earth-800 border border-earth-200/50 shadow-sm">
            ${prod.badge}
          </span>
        ` : ''}

        <!-- Quick View Overlay Button -->
        <button 
          onclick="openQuickView('${prod.id}')"
          class="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 px-4 py-2 bg-white/95 backdrop-blur-sm text-earth-900 text-xs font-semibold rounded-full shadow-md hover:bg-earth-900 hover:text-white flex items-center gap-1.5 whitespace-nowrap">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
          Quick View
        </button>

        <!-- Product Image -->
        <img 
          src="${prod.image}" 
          alt="${prod.name}" 
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
          loading="lazy" 
        />
      </div>

      <!-- Card Details -->
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <!-- Category & Rating -->
          <div class="flex items-center justify-between text-xs text-earth-400 mb-1.5">
            <span class="uppercase tracking-wider text-[11px] font-medium text-botanica-700">${prod.categoryName}</span>
            <div class="flex items-center gap-1 text-earth-700">
              <span class="text-amber-500">★</span>
              <span class="font-semibold text-xs">${prod.rating}</span>
              <span class="text-[10px] text-earth-400">(${prod.reviewCount})</span>
            </div>
          </div>

          <h3 class="font-serif text-lg text-earth-900 font-medium group-hover:text-botanica-800 transition line-clamp-1">
            ${prod.name}
          </h3>
          <p class="text-xs text-earth-500 line-clamp-1 mt-0.5">
            ${prod.subtitle}
          </p>
        </div>

        <div class="mt-4 pt-4 border-t border-earth-100 flex items-center justify-between">
          <div>
            <span class="text-base font-semibold text-earth-900">$${prod.price.toFixed(2)}</span>
            <span class="text-[11px] text-earth-400 block">${prod.size}</span>
          </div>

          <button 
            onclick="window.cart.addItem('${prod.id}')"
            class="px-3.5 py-2 bg-botanica-50 hover:bg-botanica-700 text-botanica-800 hover:text-white rounded-xl text-xs font-semibold transition-all duration-200 border border-botanica-200 hover:border-transparent flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  `).join("");
}

/**
 * Filter Tabs
 */
function initCategoryFilters() {
  const tabs = document.querySelectorAll(".category-tab-btn");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => {
        t.classList.remove("bg-earth-900", "text-white");
        t.classList.add("bg-white", "text-earth-600", "hover:bg-earth-50");
      });
      tab.classList.remove("bg-white", "text-earth-600", "hover:bg-earth-50");
      tab.classList.add("bg-earth-900", "text-white");

      const category = tab.getAttribute("data-category");
      renderProductGrid(category);
    });
  });
}

/**
 * Quick View Modal
 */
let currentQuickViewId = null;

function initQuickViewModal() {
  const modal = document.getElementById("quickview-modal");
  const closeBtn = document.getElementById("quickview-close-btn");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeQuickView);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeQuickView();
    });
  }
}

window.openQuickView = function(productId) {
  const prod = getProductById(productId);
  if (!prod) return;
  currentQuickViewId = productId;

  const modal = document.getElementById("quickview-modal");
  const content = document.getElementById("quickview-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <div class="rounded-2xl overflow-hidden bg-earth-50 aspect-square">
        <img src="${prod.image}" alt="${prod.name}" class="w-full h-full object-cover" />
      </div>
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xs uppercase font-bold tracking-wider text-botanica-700 bg-botanica-50 px-2.5 py-1 rounded-full border border-botanica-200/50">${prod.categoryName}</span>
          <div class="flex items-center gap-1 text-xs text-earth-700">
            <span class="text-amber-500">★</span>
            <span class="font-bold">${prod.rating}</span>
            <span class="text-earth-400">(${prod.reviewCount} reviews)</span>
          </div>
        </div>

        <h3 class="text-2xl md:text-3xl font-serif text-earth-900 leading-tight">${prod.name}</h3>
        <p class="text-sm font-medium text-earth-500 mt-1 mb-3">${prod.subtitle}</p>
        
        <div class="flex items-baseline gap-2 mb-4">
          <span class="text-2xl font-bold text-earth-900">$${prod.price.toFixed(2)}</span>
          <span class="text-xs text-earth-400">${prod.size}</span>
        </div>

        <p class="text-xs md:text-sm text-earth-600 leading-relaxed mb-5">${prod.description}</p>

        <!-- Key Benefits -->
        <div class="mb-5">
          <h4 class="text-xs font-bold uppercase tracking-wider text-earth-800 mb-2">Key Clinical Benefits</h4>
          <ul class="text-xs text-earth-600 space-y-1.5">
            ${prod.benefits.map(b => `<li class="flex items-start gap-2"><span class="text-botanica-600 font-bold">✓</span> ${b}</li>`).join("")}
          </ul>
        </div>

        <!-- Hero Ingredients -->
        <div class="mb-5 bg-botanica-50/50 border border-botanica-100 rounded-xl p-3.5">
          <h4 class="text-xs font-bold uppercase tracking-wider text-botanica-900 mb-2">Hero Botanical Actives</h4>
          <div class="space-y-2">
            ${prod.keyIngredients.map(ing => `
              <div>
                <span class="text-xs font-bold text-earth-900">${ing.name}:</span>
                <span class="text-xs text-earth-600"> ${ing.desc}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- How to Use -->
        <div class="mb-6">
          <h4 class="text-xs font-bold uppercase tracking-wider text-earth-800 mb-1">Ritual Application</h4>
          <p class="text-xs text-earth-600 leading-relaxed">${prod.usage}</p>
        </div>

        <!-- Add to Cart CTA -->
        <div class="flex items-center gap-3">
          <button 
            onclick="window.cart.addItem('${prod.id}'); closeQuickView();"
            class="flex-1 py-3 px-6 bg-earth-900 hover:bg-botanica-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-sm flex items-center justify-center gap-2">
            <span>Add to Bag • $${prod.price.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
  document.body.classList.add("overflow-hidden");
};

function closeQuickView() {
  const modal = document.getElementById("quickview-modal");
  if (modal) modal.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
}

/**
 * Mobile Drawer Menu
 */
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-btn");
  const drawer = document.getElementById("mobile-menu-drawer");
  const close = document.getElementById("mobile-menu-close");
  const links = document.querySelectorAll(".mobile-nav-link");

  if (btn && drawer) {
    btn.addEventListener("click", () => {
      drawer.classList.remove("-translate-x-full");
      document.body.classList.add("overflow-hidden");
    });
  }

  const closeMenu = () => {
    if (drawer) drawer.classList.add("-translate-x-full");
    document.body.classList.remove("overflow-hidden");
  };

  if (close) close.addEventListener("click", closeMenu);
  links.forEach(l => l.addEventListener("click", closeMenu));
}

/**
 * Checkout Modal Simulation
 */
function initCheckoutModal() {
  const modal = document.getElementById("checkout-modal");
  const closeBtn = document.getElementById("checkout-close-btn");
  const form = document.getElementById("mock-checkout-form");

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("checkout-email")?.value;
      const modal = document.getElementById("checkout-modal");
      if (modal) modal.classList.add("hidden");

      // Clear cart
      localStorage.removeItem("aura_cart");
      window.cart.items = [];
      window.cart.render();
      window.cart.closeDrawer();

      // Show completion toast
      window.showToast(`Thank you! Order confirmed. Confirmation sent to ${email || 'your email'}.`);
    });
  }
}

/**
 * Newsletter Form
 */
function initNewsletterForm() {
  const form = document.getElementById("newsletter-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (input && input.value) {
        window.showToast("Welcome to the Botanica Circle! Code AURA15 copied to your clipboard.");
        navigator.clipboard?.writeText("AURA15").catch(() => {});
        input.value = "";
      }
    });
  }
}

/**
 * FAQ Accordion
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const trigger = item.querySelector(".faq-trigger");
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");

    if (trigger && answer) {
      trigger.addEventListener("click", () => {
        const isOpen = !answer.classList.contains("hidden");
        
        // Close all
        document.querySelectorAll(".faq-answer").forEach(a => a.classList.add("hidden"));
        document.querySelectorAll(".faq-icon").forEach(i => i.classList.remove("rotate-180"));

        if (!isOpen) {
          answer.classList.remove("hidden");
          if (icon) icon.classList.add("rotate-180");
        }
      });
    }
  });
}
