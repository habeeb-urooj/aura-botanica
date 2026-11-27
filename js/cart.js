/**
 * Aura Botanica - Shopping Cart Drawer & State Management
 */

class ShoppingCart {
  constructor() {
    this.items = this.loadCart();
    this.promoCode = localStorage.getItem("aura_promo") || null;
    this.discountRate = this.promoCode === "AURA15" ? 0.15 : 0;
    this.drawerEl = document.getElementById("cart-drawer");
    this.overlayEl = document.getElementById("cart-overlay");
    this.itemsContainerEl = document.getElementById("cart-items-container");
    this.emptyStateEl = document.getElementById("cart-empty-state");
    this.footerEl = document.getElementById("cart-footer");
    this.cartCountBadges = document.querySelectorAll(".cart-count-badge");
    this.freeShippingThreshold = 75.00;

    this.initEventListeners();
    this.render();
  }

  loadCart() {
    try {
      const stored = localStorage.getItem("aura_cart");
      return stored ? JSON.parse(stored) : [
        // Seed with 1 initial hero item for instant delightful preview
        { productId: "prod-1", quantity: 1 }
      ];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem("aura_cart", JSON.stringify(this.items));
    } catch (e) {}
  }

  initEventListeners() {
    // Open cart drawer triggers
    document.querySelectorAll("[data-open-cart]").forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        this.openDrawer();
      });
    });

    // Close cart drawer triggers
    const closeBtn = document.getElementById("cart-close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeDrawer());
    }

    if (this.overlayEl) {
      this.overlayEl.addEventListener("click", () => this.closeDrawer());
    }

    // Promo code apply
    const promoBtn = document.getElementById("apply-promo-btn");
    const promoInput = document.getElementById("promo-input");
    if (promoBtn && promoInput) {
      promoBtn.addEventListener("click", () => {
        const code = promoInput.value.trim().toUpperCase();
        if (code === "AURA15" || code === "GLOW15") {
          this.promoCode = code;
          this.discountRate = 0.15;
          localStorage.setItem("aura_promo", code);
          this.render();
          window.showToast("Promo code '15% Off' applied successfully!");
        } else if (code === "") {
          window.showToast("Please enter a valid promo code.");
        } else {
          window.showToast("Invalid code. Try 'AURA15' for 15% off!", "error");
        }
      });
    }

    // Checkout button
    const checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        this.openCheckoutModal();
      });
    }
  }

  openDrawer() {
    if (!this.drawerEl || !this.overlayEl) return;
    this.drawerEl.classList.remove("translate-x-full");
    this.overlayEl.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  }

  closeDrawer() {
    if (!this.drawerEl || !this.overlayEl) return;
    this.drawerEl.classList.add("translate-x-full");
    this.overlayEl.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }

  addItem(productId, shouldOpen = true) {
    const existing = this.items.find(item => item.productId === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ productId, quantity: 1 });
    }
    this.saveCart();
    this.render();

    const prod = getProductById(productId);
    if (prod && shouldOpen) {
      window.showToast(`Added "${prod.name}" to your ritual bag.`);
      this.openDrawer();
    }
  }

  updateQuantity(productId, delta) {
    const item = this.items.find(item => item.productId === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.items = this.items.filter(i => i.productId !== productId);
    }
    this.saveCart();
    this.render();
  }

  removeItem(productId) {
    this.items = this.items.filter(i => i.productId !== productId);
    this.saveCart();
    this.render();
    window.showToast("Item removed from your bag.");
  }

  getTotals() {
    let subtotal = 0;
    let itemCount = 0;

    this.items.forEach(item => {
      const prod = getProductById(item.productId);
      if (prod) {
        subtotal += prod.price * item.quantity;
        itemCount += item.quantity;
      }
    });

    const discount = subtotal * this.discountRate;
    const isFreeShipping = subtotal >= this.freeShippingThreshold;
    const shipping = isFreeShipping || subtotal === 0 ? 0 : 7.95;
    const total = Math.max(0, subtotal - discount + shipping);

    return {
      subtotal,
      discount,
      shipping,
      isFreeShipping,
      total,
      itemCount
    };
  }

  render() {
    const { subtotal, discount, shipping, isFreeShipping, total, itemCount } = this.getTotals();

    // Update badges
    this.cartCountBadges.forEach(badge => {
      badge.textContent = itemCount;
      badge.classList.toggle("hidden", itemCount === 0);
    });

    if (this.items.length === 0) {
      if (this.emptyStateEl) this.emptyStateEl.classList.remove("hidden");
      if (this.itemsContainerEl) this.itemsContainerEl.innerHTML = "";
      if (this.footerEl) this.footerEl.classList.add("hidden");
      return;
    }

    if (this.emptyStateEl) this.emptyStateEl.classList.add("hidden");
    if (this.footerEl) this.footerEl.classList.remove("hidden");

    // Render Free Shipping Bar
    const shippingBarEl = document.getElementById("free-shipping-progress");
    const shippingNoticeEl = document.getElementById("free-shipping-text");
    if (shippingBarEl && shippingNoticeEl) {
      if (isFreeShipping) {
        shippingBarEl.style.width = "100%";
        shippingNoticeEl.innerHTML = `<span class="text-botanica-700 font-semibold">✨ You've unlocked Complimentary Carbon-Neutral Shipping!</span>`;
      } else {
        const remaining = (this.freeShippingThreshold - subtotal).toFixed(2);
        const percent = Math.min(100, (subtotal / this.freeShippingThreshold) * 100);
        shippingBarEl.style.width = `${percent}%`;
        shippingNoticeEl.innerHTML = `Add <strong>$${remaining}</strong> more for <strong>Complimentary Express Shipping</strong>`;
      }
    }

    // Render Items
    if (this.itemsContainerEl) {
      this.itemsContainerEl.innerHTML = this.items.map(item => {
        const prod = getProductById(item.productId);
        if (!prod) return "";
        const itemTotal = (prod.price * item.quantity).toFixed(2);

        return `
          <div class="py-4 border-b border-earth-100 flex gap-3.5 group">
            <img src="${prod.image}" alt="${prod.name}" class="w-20 h-20 object-cover rounded-xl bg-earth-50 flex-shrink-0" />
            <div class="flex-1 flex flex-col justify-between">
              <div>
                <div class="flex justify-between items-start gap-2">
                  <h4 class="text-sm font-medium text-earth-900 leading-snug">${prod.name}</h4>
                  <button onclick="window.cart.removeItem('${prod.id}')" class="text-earth-400 hover:text-earth-700 transition p-0.5" title="Remove item">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
                <p class="text-xs text-earth-500 mt-0.5">${prod.size}</p>
              </div>

              <div class="flex items-center justify-between mt-2.5">
                <!-- Quantity selector -->
                <div class="flex items-center border border-earth-200 rounded-lg overflow-hidden bg-white">
                  <button onclick="window.cart.updateQuantity('${prod.id}', -1)" class="px-2 py-1 text-earth-600 hover:bg-earth-100 transition text-xs font-bold leading-none">-</button>
                  <span class="px-2.5 py-1 text-xs font-medium text-earth-900">${item.quantity}</span>
                  <button onclick="window.cart.updateQuantity('${prod.id}', 1)" class="px-2 py-1 text-earth-600 hover:bg-earth-100 transition text-xs font-bold leading-none">+</button>
                </div>
                <!-- Price -->
                <div class="text-right">
                  <span class="text-sm font-semibold text-earth-900">$${itemTotal}</span>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join("");
    }

    // Update Totals
    const subtotalEl = document.getElementById("cart-subtotal");
    const discountRow = document.getElementById("cart-discount-row");
    const discountEl = document.getElementById("cart-discount-val");
    const shippingEl = document.getElementById("cart-shipping-val");
    const totalEl = document.getElementById("cart-total");

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

    if (discountRow && discountEl) {
      if (discount > 0) {
        discountRow.classList.remove("hidden");
        discountEl.textContent = `-$${discount.toFixed(2)}`;
      } else {
        discountRow.classList.add("hidden");
      }
    }

    if (shippingEl) {
      shippingEl.textContent = isFreeShipping ? "FREE" : `$${shipping.toFixed(2)}`;
    }

    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
  }

  openCheckoutModal() {
    const { total, subtotal, discount, shipping, itemCount } = this.getTotals();
    const modal = document.getElementById("checkout-modal");
    if (!modal) return;

    const modalSummaryEl = document.getElementById("checkout-order-summary");
    if (modalSummaryEl) {
      modalSummaryEl.innerHTML = `
        <div class="bg-earth-50 rounded-xl p-4 mb-4 text-xs space-y-2">
          <div class="flex justify-between"><span>Items (${itemCount}):</span><span>$${subtotal.toFixed(2)}</span></div>
          ${discount > 0 ? `<div class="flex justify-between text-terracotta-700"><span>Botanical Privilege (-15%):</span><span>-$${discount.toFixed(2)}</span></div>` : ''}
          <div class="flex justify-between"><span>Carbon-Neutral Delivery:</span><span>${shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span></div>
          <div class="border-t border-earth-200 pt-2 flex justify-between font-bold text-sm text-earth-900">
            <span>Estimated Total:</span>
            <span>$${total.toFixed(2)}</span>
          </div>
        </div>
      `;
    }

    modal.classList.remove("hidden");
  }
}

// Global Toast utility
window.showToast = function(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `p-3.5 px-4 rounded-xl shadow-lg border text-xs font-medium flex items-center gap-2 transform transition-all duration-300 translate-y-2 opacity-0 ${
    type === "error" 
      ? "bg-red-50 text-red-800 border-red-200" 
      : "bg-earth-900 text-white border-earth-700"
  }`;
  
  toast.innerHTML = `
    <span class="inline-block w-2 h-2 rounded-full ${type === "error" ? "bg-red-500" : "bg-botanica-400"}"></span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-2", "opacity-0");
  });

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 3200);
};

// Instantiate on load
window.addEventListener("DOMContentLoaded", () => {
  window.cart = new ShoppingCart();
});
