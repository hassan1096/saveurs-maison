// Single source of truth for the e-book. Edit price/description/visuals here.
export const PRODUCT = {
  id: "ebook-20-recettes",
  title: "20 recettes rapides, gourmandes & appétissantes",
  priceCents: 990,
  currency: "EUR",
  description:
    "Des idées gourmandes et accessibles pour varier tes repas, te faire plaisir et trouver facilement l'inspiration en cuisine.",
  features: [
    "20 recettes",
    "Ingrédients et quantités",
    "Étapes de préparation détaillées",
    "Des idées gourmandes pour cuisiner au quotidien",
    "Format numérique consultable sur les appareils compatibles",
  ],
};

// Set to true only once a real payment provider + digital delivery are connected.
export const PAYMENT_ENABLED = false;

// Real contact address — leave empty until configured.
export const CONTACT_EMAIL = "";

export const formatPrice = (cents: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(cents / 100);
