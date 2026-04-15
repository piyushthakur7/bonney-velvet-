/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Static enrichment data for products.
 * This data is merged with API products by ID to add highlights,
 * specs, and other detailed technical information that isn't
 * stored in WooCommerce.
 */

export interface ProductEnrichment {
  highlights?: string[];
  specs?: {
    info?: { label: string; value: string }[];
    features?: { label: string; value: string }[];
  };
}

/**
 * Map of product ID → enrichment data.
 * Add new products here as the user provides technical details.
 */
export const PRODUCT_ENRICHMENT: Record<string, ProductEnrichment> = {

  // ─── SPF 50 PA+++ Sunscreen ───────────────────────────────────
  "13": {
    highlights: [
      "SPF 50 PA+++ Broad Spectrum Sunscreen — Protects against harmful UVA & UVB rays with advanced UV filters including Tinosorb-M.",
      "Vitamin C 5% Brightening Formula — Helps brighten skin, reduce dark spots, and enhance natural radiance.",
      "Niacinamide 1% Oil Control Care — Refines pores, controls excess oil, and evens skin tone.",
      "Aloe Vera & Vitamin E Soothing — Hydrates, calms, and comforts sun-exposed skin.",
      "Lightweight Face & Body Use — Non-greasy, fast-absorbing sunscreen suitable for all skin types."
    ],
    specs: {
      info: [
        { label: "Product Benefits", value: "Brightening, Dark Spot Correction, Oil Control, Sunburn Relief, Ultra-Violet Protection" },
        { label: "Sun Protection Factor", value: "50 Sun Protection Factor (SPF)" },
        { label: "Item Weight", value: "50 Grams" },
        { label: "Number of Items", value: "1" },
        { label: "Net Quantity", value: "50.0 Milliliters" },
        { label: "Skin Type", value: "All" },
        { label: "Active Ingredients", value: "Aloe Vera, Vitamin E, Niacinamide" },
        { label: "Item Dimensions L×W×H", value: "50 × 40 × 155 Millimeters" },
        { label: "Brand", value: "BONNY VELVET" },
        { label: "Item Volume", value: "0.15 Kilograms" },
        { label: "Country of Origin", value: "India" },
        { label: "Manufacturer", value: "BIUMARK DERMACEUTICALS PVT.LTD. A-9 FIE 1st floor, Patparganj Industrial Area Delhi-110092 INDIA" },
        { label: "Packer", value: "BONNY VELVET Plot-No 19. Shri Ravalnath Krupa Patel Nagar, Near Rajeev Nagar Vidyanagar, HUBLI KARNATAKA 580031 ph-8884770044" }
      ],
      features: [
        { label: "Product Benefits", value: "Brightening, Dark Spot Correction, Oil Control, Sunburn Relief, Ultra-Violet Protection" },
        { label: "Sun Protection Factor", value: "50 Sun Protection Factor (SPF)" },
        { label: "Skin Type", value: "All" },
        { label: "Water Resistance Level", value: "Water Resistant" },
        { label: "Item Form", value: "Cream" },
        { label: "Target Use Body Part", value: "Face, Arm" },
        { label: "Material Features", value: "Cruelty Free, Non-Comedogenic, Vegan, Water Resistant" },
        { label: "Material Type Free", value: "Alcohol Free, Paraben Free, Sulphate Free" },
        { label: "Age Range Description", value: "Adult" },
        { label: "Recommended Uses", value: "Beach, Daily Protection, Sports, Under Makeup" }
      ]
    }
  },

  // ─── Velvera 6-in-1 Bond Repair Hair Mask ─────────────────────
  "9": {
    highlights: [
      "Amino Advanced Bond Repair Care — Powered by Amino Bond Technology, this intensive formula helps repair weakened hair bonds, reduce breakage and improve overall hair strength.",
      "Deep Conditioning for Dry & Damaged Hair — Rich, creamy texture penetrates deeply to restore moisture, softness and manageability from root to tip.",
      "Enriched with Kerazyme MB & Argan Oil — Kerazyme MB helps support hair structure while Argan Oil nourishes and adds natural shine without heaviness.",
      "Restores Smoothness, Strength & Shine — Controls frizz, improves elasticity and leaves hair visibly smoother, silkier and healthier-looking.",
      "Sulfate Free Gentle Formula — Free from harsh sulfates, making it suitable for dry, chemically treated and frizzy hair types. Safe for regular use."
    ],
    specs: {
      info: [
        { label: "Brand", value: "BONNY VELVET" },
        { label: "Item Form", value: "Cream" },
        { label: "Material Feature", value: "Cruelty Free, Natural, Recyclable" },
        { label: "Hair Type", value: "All" },
        { label: "Product Benefits", value: "Breakage Control, Conditioning, Damage Control, Frizz Control, Nourishing, pH Balance" },
        { label: "Age Range (Description)", value: "Adult" },
        { label: "Net Quantity", value: "200.0 Grams" },
        { label: "Number of Items", value: "1" },
        { label: "Scent", value: "Fresh" },
        { label: "Material Type Free", value: "Mineral Oil Free, Palm Oil Free, Paraben Free" },
        { label: "Item Weight", value: "200 g" },
        { label: "Item Dimensions L×W×H", value: "8 × 8 × 6.5 Centimeters" },
        { label: "Country of Origin", value: "India" }
      ],
      features: [
        { label: "Item Form", value: "Cream" },
        { label: "Hair Type", value: "All" },
        { label: "Product Benefits", value: "Breakage Control, Conditioning, Damage Control, Frizz Control, Nourishing, pH Balance" },
        { label: "Scent", value: "Fresh" },
        { label: "Additional Features", value: "Amino Bond Technology, Intensive Deep Care, Kerazyme MB Formula, Not Tested On Animals, Sulfate Free Formula" },
        { label: "Package Type", value: "Box" },
        { label: "Hair Conditioner Type", value: "Hair Conditioning Mask" },
        { label: "Brand", value: "BONNY VELVET" },
        { label: "Age Range Description", value: "Adult" },
        { label: "Manufacturer", value: "VARDA BIOLOGY PLOT NO. 88/A, SHIV INDUSTRIAL INFRA PARK, LAMDAPURA, savik, Gujarat, India-397775" },
        { label: "Item Type Name", value: "Hair Treatment Mask" },
        { label: "Packer", value: "Bonny Velvet Plot-no 19, Shri Ravalnath Krupa, Patel Nagar, Near Rajeev Nagar Vidyanagar, Hubli, Karnataka-580031" },
        { label: "Active Ingredients", value: "Amino Bond Technology (repairs bonds & reduces breakage), Argan Oil (nourishes & boosts shine), Kerazyme MB (supports structure & elasticity)" }
      ]
    }
  }
};
