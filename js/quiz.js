/**
 * Aura Botanica - Interactive Skin Diagnostic & Routine Builder
 */

const QUIZ_QUESTIONS = [
  {
    id: "skinType",
    title: "How does your skin feel midday?",
    subtitle: "Select the option that best describes your baseline skin behavior without heavy products.",
    options: [
      {
        value: "dry",
        label: "Tight, dry, or occasionally flaky",
        desc: "Lacks moisture & natural lipids; absorbs creams quickly",
        icon: "droplets"
      },
      {
        value: "oily",
        label: "Noticeable shine and excess oil across face",
        desc: "Prone to congestion and enlarged pores",
        icon: "sun"
      },
      {
        value: "combination",
        label: "Oily T-zone (forehead, nose) with dry or normal cheeks",
        desc: "Needs balancing hydration without heaviness",
        icon: "sparkles"
      },
      {
        value: "sensitive",
        label: "Easily flushed, tight, reactive to new products",
        desc: "Compromised barrier needing gentle, calming care",
        icon: "heart"
      },
      {
        value: "normal",
        label: "Balanced, neither uncomfortably dry nor overly oily",
        desc: "Comfortable texture; seeking preventative glow",
        icon: "smile"
      }
    ]
  },
  {
    id: "primaryConcern",
    title: "What is your primary skin intention?",
    subtitle: "Choose the target goal you want your botanical ritual to focus on first.",
    options: [
      {
        value: "hydration",
        label: "Deep Hydration & Glass-Skin Bounce",
        desc: "Quench dehydrated layers and restore plump, dewy elasticity",
        badge: "Most Common"
      },
      {
        value: "redness",
        label: "Calm Redness & Rebuild Skin Barrier",
        desc: "Soothe inflammation, sensitivity, and weather-triggered reactivity",
        badge: "Gentle Formula"
      },
      {
        value: "fine-lines",
        label: "Smoothing Fine Lines & Cellular Renewal",
        desc: "Promote collagen preservation with plant retinol alternatives",
        badge: "Age-Defying"
      },
      {
        value: "dullness",
        label: "Luminosity & Fading Hyperpigmentation",
        desc: "Ignite vibrant glow and fade stubborn sun or post-breakout marks",
        badge: "Antioxidant Rich"
      },
      {
        value: "acne",
        label: "Clarifying Pores & Blemish Defense",
        desc: "Decongest blackheads, balance sebum, and maintain clear complexion",
        badge: "Blemish Control"
      }
    ]
  },
  {
    id: "environment",
    title: "What surrounds your daily environment?",
    subtitle: "External stressors dictate how your epidermal barrier protects itself.",
    options: [
      {
        value: "urban",
        label: "City & Urban Environment",
        desc: "Frequent exposure to particulate pollution, smog, and screen blue light"
      },
      {
        value: "dry-climate",
        label: "Arid Climate / Indoor Air Conditioning",
        desc: "Continuous moisture evaporation from artificial heat or dry weather"
      },
      {
        value: "tropical",
        label: "Humid or Sun-Drenched Climate",
        desc: "High UV exposure and excess sweat production requiring weightless formulas"
      },
      {
        value: "stress",
        label: "High Stress & Irregular Sleep",
        desc: "Elevated cortisol leading to dullness, flare-ups, and barrier fatigue"
      }
    ]
  },
  {
    id: "routinePace",
    title: "What is your preferred ritual style?",
    subtitle: "The most effective skincare ritual is the one you enjoy doing consistently.",
    options: [
      {
        value: "minimalist",
        label: "The Minimalist Ritual (2-3 Steps)",
        desc: "Quick, efficient, high-performance essentials in under 3 minutes"
      },
      {
        value: "balanced",
        label: "The Balanced Ritual (3-4 Steps)",
        desc: "Mindful AM & PM regimen addressing prevention and active repair"
      },
      {
        value: "comprehensive",
        label: "The Holistic Ritual (Complete Spa Experience)",
        desc: "Multi-layered treatment ritual with serums, oils, and weekly mask"
      }
    ]
  }
];

class SkinQuiz {
  constructor() {
    this.currentStep = 0;
    this.answers = {};
    this.modalEl = document.getElementById("quiz-modal");
    this.containerEl = document.getElementById("quiz-step-container");
    this.progressFill = document.getElementById("quiz-progress-bar");
    this.stepCounter = document.getElementById("quiz-step-counter");
    this.initEventListeners();
  }

  initEventListeners() {
    const startQuizBtns = document.querySelectorAll("[data-open-quiz]");
    startQuizBtns.forEach(btn => {
      btn.addEventListener("click", () => this.open());
    });

    const closeQuizBtn = document.getElementById("quiz-close-btn");
    if (closeQuizBtn) {
      closeQuizBtn.addEventListener("click", () => this.close());
    }

    if (this.modalEl) {
      this.modalEl.addEventListener("click", (e) => {
        if (e.target === this.modalEl) this.close();
      });
    }
  }

  open() {
    if (!this.modalEl) return;
    this.currentStep = 0;
    this.answers = {};
    this.modalEl.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    this.renderStep();
  }

  close() {
    if (!this.modalEl) return;
    this.modalEl.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }

  selectOption(key, value) {
    this.answers[key] = value;
    if (this.currentStep < QUIZ_QUESTIONS.length - 1) {
      this.currentStep++;
      this.renderStep();
    } else {
      this.renderLoadingAndResults();
    }
  }

  renderStep() {
    const q = QUIZ_QUESTIONS[this.currentStep];
    const progressPercent = ((this.currentStep + 1) / QUIZ_QUESTIONS.length) * 100;
    
    if (this.progressFill) this.progressFill.style.width = `${progressPercent}%`;
    if (this.stepCounter) this.stepCounter.textContent = `Question ${this.currentStep + 1} of ${QUIZ_QUESTIONS.length}`;

    let html = `
      <div class="animate-fadeIn">
        <h3 class="text-2xl md:text-3xl font-serif text-earth-900 mb-2 leading-tight">${q.title}</h3>
        <p class="text-sm md:text-base text-earth-600 mb-6">${q.subtitle}</p>
        <div class="grid grid-cols-1 gap-3.5">
    `;

    q.options.forEach(opt => {
      const isSelected = this.answers[q.id] === opt.value;
      html += `
        <button type="button" 
          onclick="window.skinQuiz.selectOption('${q.id}', '${opt.value}')"
          class="text-left p-4 rounded-xl border transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between group hover:border-botanica-600 hover:bg-botanica-50/50 ${isSelected ? 'border-botanica-600 bg-botanica-50/70 ring-2 ring-botanica-600/20' : 'border-earth-200 bg-white'}">
          <div class="pr-4">
            <div class="flex items-center gap-2">
              <span class="font-medium text-earth-900 group-hover:text-botanica-700 transition">${opt.label}</span>
              ${opt.badge ? `<span class="text-[10px] uppercase tracking-wider font-semibold bg-terracotta-100 text-terracotta-800 px-2 py-0.5 rounded-full">${opt.badge}</span>` : ''}
            </div>
            <p class="text-xs md:text-sm text-earth-500 mt-1">${opt.desc}</p>
          </div>
          <div class="mt-2 md:mt-0 flex items-center text-xs font-semibold text-botanica-700 opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
            Select &rarr;
          </div>
        </button>
      `;
    });

    html += `
        </div>
        ${this.currentStep > 0 ? `
          <button type="button" onclick="window.skinQuiz.prevStep()" class="mt-6 text-xs text-earth-500 hover:text-earth-900 flex items-center gap-1 font-medium transition">
            &larr; Back to previous question
          </button>
        ` : ''}
      </div>
    `;

    this.containerEl.innerHTML = html;
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.renderStep();
    }
  }

  renderLoadingAndResults() {
    if (this.progressFill) this.progressFill.style.width = '100%';
    if (this.stepCounter) this.stepCounter.textContent = 'Diagnostic Complete';

    this.containerEl.innerHTML = `
      <div class="py-12 text-center animate-fadeIn">
        <div class="inline-block w-12 h-12 border-4 border-botanica-200 border-t-botanica-600 rounded-full animate-spin mb-4"></div>
        <h4 class="text-xl font-serif text-earth-900 mb-2">Formulating Your Botanical Protocol...</h4>
        <p class="text-xs text-earth-500">Matching bio-compatible active botanicals to your skin profile</p>
      </div>
    `;

    setTimeout(() => {
      this.displayResults();
    }, 1100);
  }

  displayResults() {
    const skinType = this.answers.skinType || "combination";
    const concern = this.answers.primaryConcern || "hydration";
    const ritualPace = this.answers.routinePace || "balanced";

    // Select recommended products based on user profile
    const matchedProducts = [];

    // Always include gentle cleanser
    const cleanser = PRODUCTS.find(p => p.id === "prod-4");
    if (cleanser) matchedProducts.push({ prod: cleanser, step: "Step 1: Purify & Prep", timing: "AM + PM" });

    // Serum tailored to concern
    if (concern === "dullness") {
      matchedProducts.push({ prod: PRODUCTS.find(p => p.id === "prod-5"), step: "Step 2: Brighten & Defend", timing: "AM" });
    } else {
      matchedProducts.push({ prod: PRODUCTS.find(p => p.id === "prod-1"), step: "Step 2: Deep Hydrate & Plump", timing: "AM + PM" });
    }

    // Barrier cream
    const cream = PRODUCTS.find(p => p.id === "prod-2");
    if (cream) matchedProducts.push({ prod: cream, step: "Step 3: Seal Barrier", timing: "AM + PM" });

    // For holistic or anti-aging/blemish, add phyto-retinol oil or mask
    if (ritualPace === "comprehensive" || concern === "fine-lines" || concern === "acne") {
      const oil = PRODUCTS.find(p => p.id === "prod-3");
      if (oil) matchedProducts.push({ prod: oil, step: "Step 4: Cellular Renewal", timing: "PM Only" });
    }

    const totalPrice = matchedProducts.reduce((sum, item) => sum + item.prod.price, 0);
    const bundleDiscount = 0.15; // 15% discount for full ritual
    const discountedPrice = (totalPrice * (1 - bundleDiscount)).toFixed(2);
    const savings = (totalPrice * bundleDiscount).toFixed(2);

    let html = `
      <div class="animate-fadeIn pb-4">
        <!-- Results Header -->
        <div class="bg-botanica-50 border border-botanica-200/80 rounded-2xl p-5 mb-6 text-center">
          <span class="inline-block text-[11px] font-bold uppercase tracking-widest text-botanica-800 bg-white border border-botanica-200 px-3 py-1 rounded-full mb-2">
            98% Bio-Compatible Match
          </span>
          <h3 class="text-2xl md:text-3xl font-serif text-earth-900 capitalize mb-1">
            Your Custom ${concern.replace("-", " ")} & ${skinType} Ritual
          </h3>
          <p class="text-xs md:text-sm text-earth-600 max-w-lg mx-auto">
            Formulated to restore cellular lipid balance, neutralize environmental oxidative stress, and stimulate luminous vitality.
          </p>
        </div>

        <!-- Curated Routine Steps -->
        <div class="space-y-3.5 mb-6">
          <h4 class="text-xs uppercase tracking-wider font-bold text-earth-500 mb-2">Curated ${matchedProducts.length}-Step Daily Regimen</h4>
    `;

    matchedProducts.forEach(item => {
      html += `
        <div class="p-3.5 bg-white border border-earth-200 rounded-xl flex items-center justify-between gap-4 hover:shadow-sm transition">
          <div class="flex items-center gap-3.5">
            <img src="${item.prod.image}" alt="${item.prod.name}" class="w-14 h-14 object-cover rounded-lg flex-shrink-0 bg-earth-100" />
            <div>
              <div class="flex items-center gap-2">
                <span class="text-[10px] font-semibold text-botanica-700 bg-botanica-100/60 px-2 py-0.5 rounded">${item.step}</span>
                <span class="text-[10px] text-earth-500 font-medium">${item.timing}</span>
              </div>
              <h5 class="text-sm font-semibold text-earth-900 mt-1 leading-snug">${item.prod.name}</h5>
              <p class="text-xs text-earth-500 line-clamp-1">${item.prod.subtitle}</p>
            </div>
          </div>
          <div class="text-right flex-shrink-0">
            <span class="text-sm font-bold text-earth-900">$${item.prod.price.toFixed(2)}</span>
            <button onclick="window.cart.addItem('${item.prod.id}')" class="block text-[11px] font-semibold text-botanica-700 hover:text-botanica-800 mt-1 underline">
              Add Item
            </button>
          </div>
        </div>
      `;
    });

    const ritualProductIds = JSON.stringify(matchedProducts.map(i => i.prod.id));

    html += `
        </div>

        <!-- Bundle Checkout Box -->
        <div class="bg-earth-900 text-white rounded-2xl p-5 mb-4 shadow-lg">
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-bold uppercase tracking-wider text-botanica-300">Bundle & Save 15%</span>
                <span class="bg-terracotta-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Save $${savings}</span>
              </div>
              <div class="flex items-baseline gap-2">
                <span class="text-2xl font-serif font-bold text-cream-100">$${discountedPrice}</span>
                <span class="text-sm text-earth-400 line-through">$${totalPrice.toFixed(2)}</span>
              </div>
              <p class="text-xs text-earth-300">Includes complimentary botanical canvas tote & free express shipping</p>
            </div>
            <button 
              onclick='window.skinQuiz.addBundleToCart(${ritualProductIds})'
              class="w-full sm:w-auto px-6 py-3 bg-botanica-500 hover:bg-botanica-400 text-white rounded-xl font-medium text-sm transition shadow-sm hover:shadow flex items-center justify-center gap-2">
              <span>Add Complete Ritual to Cart</span>
              &rarr;
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between pt-2">
          <button onclick="window.skinQuiz.open()" class="text-xs text-earth-500 hover:text-earth-900 font-medium">
            ↺ Retake Consultation Quiz
          </button>
          <button onclick="window.skinQuiz.close()" class="text-xs text-botanica-700 font-semibold hover:underline">
            Explore All Products Instead &rarr;
          </button>
        </div>
      </div>
    `;

    this.containerEl.innerHTML = html;
  }

  addBundleToCart(productIds) {
    if (!window.cart) return;
    productIds.forEach(id => {
      window.cart.addItem(id, false); // false = don't open drawer on every item
    });
    // Open drawer once after all are added
    window.cart.openDrawer();
    window.showToast("Personalized Ritual Bundle added with 15% discount applied!");
    this.close();
  }
}

// Instantiate on load
window.addEventListener("DOMContentLoaded", () => {
  window.skinQuiz = new SkinQuiz();
});
