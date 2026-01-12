import Stripe from 'stripe';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-01-27.acacia',
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Product data paths
const DATA_DIR = path.join(__dirname, '../client/src');
const UTINTS_PATH = path.join(DATA_DIR, 'utints.json');
const POLYTINTS_PATH = path.join(DATA_DIR, 'polytints.json');
const SLIP_RESISTANT_PATH = path.join(DATA_DIR, 'slipresistant.json');

async function syncProducts() {
  console.log('Starting Stripe product sync...');

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Error: STRIPE_SECRET_KEY is not set.');
    process.exit(1);
  }

  // Sync U-Tints
  await syncCategory(UTINTS_PATH, 'U-Tint', 3200); // $32.00

  // Sync Poly Tints
  await syncCategory(POLYTINTS_PATH, 'Poly Tint', 3200); // $32.00

  // Sync Slip Resistant
  await syncCategory(SLIP_RESISTANT_PATH, 'Slip Resistant', null); // Price varies

  console.log('Sync completed successfully.');
}

async function syncCategory(filePath: string, categoryName: string, defaultPriceCents: number | null) {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }

  const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  let updated = false;

  console.log(`Syncing ${categoryName}...`);

  for (const product of products) {
    if (product.stripePriceId) {
      console.log(`Skipping ${product.name} (already synced)`);
      continue;
    }

    console.log(`Creating product: ${product.name}`);

    try {
      // Create Product
      const stripeProduct = await stripe.products.create({
        name: `${categoryName} - ${product.name}`,
        metadata: {
          ghlProductId: product.ghlProductId,
          category: categoryName,
        },
      });

      // Determine Price
      const priceCents = defaultPriceCents || Math.round((product.price || 0) * 100);

      // Create Price
      const stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: priceCents,
        currency: 'usd',
      });

      // Update local data
      product.stripeProductId = stripeProduct.id;
      product.stripePriceId = stripePrice.id;
      updated = true;
      console.log(`Synced ${product.name}: ${stripePrice.id}`);
    } catch (error) {
      console.error(`Failed to sync ${product.name}:`, error);
    }
  }

  if (updated) {
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    console.log(`Updated ${filePath}`);
  }
}

syncProducts().catch(console.error);
