import Stripe from 'stripe';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-01-27.acacia',
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../client/src');
const FILES = {
  'U-Tint': path.join(DATA_DIR, 'utints.json'),
  'Poly Tint': path.join(DATA_DIR, 'polytints.json'),
  'Slip Resistant': path.join(DATA_DIR, 'slipresistant.json'),
};

async function updateLocalData() {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Error: STRIPE_SECRET_KEY is not set.');
    process.exit(1);
  }

  console.log('Fetching products from Stripe...');
  const stripeProducts = await stripe.products.list({ limit: 100, active: true });
  
  // Create a map of "Category - Name" -> { productId, priceId }
  const productMap = new Map();

  for (const product of stripeProducts.data) {
    const prices = await stripe.prices.list({ product: product.id, active: true });
    if (prices.data.length > 0) {
      productMap.set(product.name, {
        stripeProductId: product.id,
        stripePriceId: prices.data[0].id,
      });
    }
  }

  // Update each file
  for (const [categoryPrefix, filePath] of Object.entries(FILES)) {
    if (!fs.existsSync(filePath)) continue;

    console.log(`Updating ${path.basename(filePath)}...`);
    const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    let updatedCount = 0;

    for (const product of products) {
      // Construct the expected Stripe product name
      const stripeName = `${categoryPrefix} - ${product.name}`;
      const stripeData = productMap.get(stripeName);

      if (stripeData) {
        product.stripeProductId = stripeData.stripeProductId;
        product.stripePriceId = stripeData.stripePriceId;
        updatedCount++;
      } else {
        console.warn(`  No Stripe match found for: ${stripeName}`);
      }
    }

    if (updatedCount > 0) {
      fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
      console.log(`  Updated ${updatedCount} items in ${path.basename(filePath)}`);
    } else {
      console.log(`  No updates for ${path.basename(filePath)}`);
    }
  }
}

updateLocalData().catch(console.error);
