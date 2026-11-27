# AURA BOTANICA — High-Performance Botanical Skincare

An aesthetic, responsive e-commerce web application for a luxury botanical skincare brand, featuring an interactive Skin Consultation Quiz, product catalog, ingredient science spotlights, slide-out shopping cart drawer, and order simulation.

---

## 📍 Project Location
This project is located at:
```
C:\Users\habee\.gemini\antigravity\scratch\skincare-brand
```

> **Recommended:** Set this directory as your active workspace in your editor or Antigravity!

---

## 🚀 How to View Your Website

### Option 1: Open Directly in Your Browser (Instant)
Simply open the file in your preferred web browser:
- Double-click `index.html` in your file explorer, OR
- Paste this path into your browser address bar:
  ```
  file:///C:/Users/habee/.gemini/antigravity/scratch/skincare-brand/index.html
  ```

### Option 2: Run via Local Python Server
Open PowerShell in this directory and run:
```powershell
python -m http.server 8080
```
Then visit:
```
http://localhost:8080
```

---

## ✨ Features Included

1. **Interactive Skin Consultation & Routine Quiz**:
   - 4-step diagnostic analyzing skin type, primary dermal intention, climate/environment, and preferred ritual pace.
   - Generates a personalized daily regimen (AM & PM steps with custom matched products).
   - Bundle discount checkout button (15% savings).

2. **Luxury Botanical Product Showcase**:
   - Filterable categories: All, Serums, Moisturizers, Oils, Cleansers.
   - High-resolution editorial beauty imagery.
   - Interactive **Quick View** modal detailing clinical benefits, bio-active ingredients, and application ritual.

3. **Slide-Out Shopping Cart Drawer**:
   - Dynamic item increment/decrement and removal.
   - Free shipping progress meter (unlocks at $75).
   - Promo code validation (e.g., `AURA15` for 15% discount).
   - Simulated checkout modal with order confirmation.

4. **Hero Actives & Ingredient Science Deep-Dive**:
   - Tremella Snow Mushroom (dermal hydration).
   - Ayurvedic Bakuchiol (gentle phyto-retinol).
   - Moroccan Blue Tansy (anti-inflammatory azulene).

5. **Customer Reviews & Clean Beauty Manifesto**:
   - Verified buyer testimonials with skin type badges.
   - Sustainability pledge, Miron violet glass explanation, and interactive FAQ accordion.

---

## 📁 File Structure
- `index.html` — Semantic HTML5 layout with Tailwind CSS styling and Lucide icons
- `css/styles.css` — Custom luxury serif typography, animations, and design tokens
- `js/products.js` — Catalog data, ingredients, pricing, and skin compatibility
- `js/quiz.js` — Skin consultation quiz engine & personalized routine builder
- `js/cart.js` — Reactive shopping cart with localStorage persistence & promo discounts
- `js/app.js` — Category filters, Quick View modal, mobile navigation, and interactive components
