/**
 * Aura Botanica - Product Catalog Data
 * Rich data structure for luxury botanical skincare products
 */

const PRODUCTS = [
  {
    id: "prod-1",
    name: "Celestial Dew Hydrating Serum",
    subtitle: "Triple Hyaluronic Acid + Tremella Mushroom",
    category: "serums",
    categoryName: "Serums",
    price: 68.00,
    rating: 4.9,
    reviewCount: 342,
    badge: "Bestseller",
    isBestSeller: true,
    size: "30 ml / 1.0 fl. oz.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
    description: "A weightless, multi-depth moisture surge that floods thirsty skin with bio-fermented Tremella Mushroom, peptide-rich Marine Algae, and three weights of botanical Hyaluronic Acid.",
    benefits: [
      "Provides continuous 72-hour deep cellular hydration",
      "Visibly plumps fine lines and restores bounce",
      "Strengthens the lipid barrier against environmental stressors"
    ],
    keyIngredients: [
      { name: "Tremella Fuciformis (Snow Mushroom)", desc: "Holds 500x its weight in water with smaller particle size than synthetic HA for deeper penetration." },
      { name: "Triple Molecular Hyaluronic Acid", desc: "Penetrates high, medium, and low epidermal layers for multi-depth moisture." },
      { name: "Niacinamide (Vitamin B3) 4%", desc: "Refines pore appearance and evens skin tone without irritation." }
    ],
    usage: "Dispense 3-4 drops onto damp skin every morning and evening. Gently press into face, neck, and décolletage before applying your moisturizer.",
    skinTypes: ["dry", "combination", "sensitive", "normal", "oily"],
    skinConcerns: ["hydration", "fine-lines", "dullness"]
  },
  {
    id: "prod-2",
    name: "Velvet Cloud Barrier Cream",
    subtitle: "Ceramides Complex + Squalane + Centella",
    category: "moisturizers",
    categoryName: "Moisturizers",
    price: 74.00,
    rating: 4.8,
    reviewCount: 289,
    badge: "Award Winner",
    isBestSeller: true,
    size: "50 ml / 1.7 fl. oz.",
    image: "https://images.unsplash.com/photo-1608248597359-009772bf2a64?auto=format&fit=crop&w=800&q=80",
    description: "An ultra-nourishing, non-greasy lipid replenishment cream crafted with bio-identical ceramides, sugarcane squalane, and wild Centella Asiatica to restore compromised barriers.",
    benefits: [
      "Instantly soothes redness, tight feeling, and irritation",
      "Locks in moisture without clogging pores or feeling heavy",
      "Clinically proven barrier recovery within 48 hours"
    ],
    keyIngredients: [
      { name: "Ceramide NP, AP, EOP Complex", desc: "Bio-identical lipids that rebuild the cellular mortar of the skin barrier." },
      { name: "Sugarcane Squalane", desc: "Pure plant-derived emollient that mimics skin's natural sebum." },
      { name: "Centella Asiatica (Cica)", desc: "Potent botanical extract packed with madecassoside to calm inflammation." }
    ],
    usage: "Warm a dime-sized amount between fingertips and massage gently into face and neck in upward motions as the final moisturizing step.",
    skinTypes: ["dry", "sensitive", "normal", "combination"],
    skinConcerns: ["redness", "hydration", "fine-lines"]
  },
  {
    id: "prod-3",
    name: "Golden Elixir Phyto-Retinol Oil",
    subtitle: "1.5% Bakuchiol + Rosehip + Blue Tansy",
    category: "oils",
    categoryName: "Oils & Treatments",
    price: 82.00,
    rating: 5.0,
    reviewCount: 418,
    badge: "Clean Beauty Pick",
    isBestSeller: true,
    size: "30 ml / 1.0 fl. oz.",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=800&q=80",
    description: "A transformative botanical night oil featuring medicinal Ayurvedic Bakuchiol, high-potency cold-pressed Rosehip Seed oil, and calming Moroccan Blue Tansy for smooth, radiant skin without retinoid flaking.",
    benefits: [
      "Smooths skin texture and diminishes signs of sun damage",
      "Gentle alternative to synthetic retinol—zero peeling or photosensitivity",
      "Balances sebum production and clarifies breakout-prone skin"
    ],
    keyIngredients: [
      { name: "Bakuchiol 1.5%", desc: "Clinically validated botanical retinol alternative derived from the Babchi plant." },
      { name: "Cold-Pressed Rosehip Seed Oil", desc: "Rich in trans-retinoic acid, linoleic acid, and Vitamin C." },
      { name: "Moroccan Blue Tansy", desc: "High in chamazulene, renowned for its cooling, soothing, and anti-inflammatory properties." }
    ],
    usage: "At night, press 2-3 drops into clean skin or blend directly into your moisturizer as the closing step of your evening ritual.",
    skinTypes: ["oily", "combination", "normal", "dry", "sensitive"],
    skinConcerns: ["fine-lines", "acne", "dullness", "redness"]
  },
  {
    id: "prod-4",
    name: "Pure Bloom Gentle Gel Cleanser",
    subtitle: "Camellia Seed + Green Tea EGCG + Papaya Enzymes",
    category: "cleansers",
    categoryName: "Cleansers",
    price: 44.00,
    rating: 4.7,
    reviewCount: 195,
    badge: "Daily Essential",
    isBestSeller: false,
    size: "150 ml / 5.1 fl. oz.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    description: "A pH-balanced 5.5 botanical gel that melts away makeup, SPF, and urban pollutants while preserving the skin's essential microbiome and acid mantle.",
    benefits: [
      "Thoroughly cleanses without stripping or leaving tight sensation",
      "Enzyme-based micro-exfoliation removes dull surface cells",
      "Soothes with Japanese green tea antioxidants"
    ],
    keyIngredients: [
      { name: "Green Tea EGCG Extract", desc: "Shields skin from oxidative free radicals and calms inflammation." },
      { name: "Camellia Sinensis Seed Oil", desc: "Nourishing oil that breaks down water-resistant sunscreen without pore-blocking." },
      { name: "Fermented Papaya Enzymes", desc: "Gentle proteolytic enzymes that buff away dead skin cells without physical abrasives." }
    ],
    usage: "Massage 1-2 pumps onto damp face for 60 seconds with circular motions. Rinse thoroughly with lukewarm water.",
    skinTypes: ["normal", "dry", "combination", "oily", "sensitive"],
    skinConcerns: ["acne", "dullness", "hydration"]
  },
  {
    id: "prod-5",
    name: "Luminescence Vitamin C Brightening Essence",
    subtitle: "10% Ethyl Ascorbic Acid + Kakadu Plum",
    category: "serums",
    categoryName: "Serums",
    price: 76.00,
    rating: 4.9,
    reviewCount: 264,
    badge: "New Launch",
    isBestSeller: false,
    size: "50 ml / 1.7 fl. oz.",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80",
    description: "A hyper-stable brightening essence utilizing ultra-stable 3-O-Ethyl Ascorbic Acid and wild-harvested Australian Kakadu Plum—the world's richest natural source of Vitamin C.",
    benefits: [
      "Fades stubborn hyperpigmentation, sun spots, and post-acne marks",
      "Ignites natural glow and evens uneven tone",
      "Photoprotective antioxidant shield against blue light and pollution"
    ],
    keyIngredients: [
      { name: "Kakadu Plum Extract", desc: "Boasts up to 100 times more Vitamin C concentration than fresh oranges." },
      { name: "10% 3-O-Ethyl Ascorbic Acid", desc: "Highly stable Vitamin C ether that converts directly to L-ascorbic acid in skin." },
      { name: "Ferulic Acid & Vitamin E", desc: "Synergistic antioxidant network boosting photoprotection effectiveness 8-fold." }
    ],
    usage: "Apply 4-5 drops onto cleansed skin each morning. Follow with moisturizer and always apply broad-spectrum SPF 30+.",
    skinTypes: ["normal", "combination", "oily", "dry"],
    skinConcerns: ["dullness", "fine-lines", "acne"]
  },
  {
    id: "prod-6",
    name: "Botanical Restorative Clay Mask",
    subtitle: "French Green Clay + Matcha + Willow Bark",
    category: "masks",
    categoryName: "Masks & Treatments",
    price: 52.00,
    rating: 4.8,
    reviewCount: 153,
    badge: "Detox Ritual",
    isBestSeller: false,
    size: "75 ml / 2.5 fl. oz.",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
    description: "A purifying, non-drying treatment mask combining nutrient-dense French Montmorillonite clay with ceremonial Uji matcha and natural Salicin from white willow bark to decongest pores.",
    benefits: [
      "Draws out impurities and clears clogged sebaceous filaments",
      "Reduces excess shine while maintaining comfortable moisture balance",
      "Leaves skin noticeably refined, soft, and refreshed"
    ],
    keyIngredients: [
      { name: "French Montmorillonite Green Clay", desc: "Mineral-rich clay that attracts positively-charged toxins and sebum like a magnet." },
      { name: "Ceremonial Uji Matcha", desc: "Packed with chlorophyll and polyphenols to revitalize tired, stressed complexion." },
      { name: "White Willow Bark Extract", desc: "Natural salicylic acid precursor that penetrates deep into sebum-filled pores." }
    ],
    usage: "Smooth an even layer over clean skin 1-2 times weekly. Relax for 10-15 minutes until semi-dry. Rinse with warm water using a soft muslin cloth.",
    skinTypes: ["oily", "combination", "normal"],
    skinConcerns: ["acne", "dullness"]
  }
];

// Product lookup helper
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}
