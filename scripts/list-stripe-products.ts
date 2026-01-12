import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-01-27.acacia',
});

async function listProducts() {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Error: STRIPE_SECRET_KEY is not set.');
    process.exit(1);
  }

  console.log('Fetching products from Stripe...');
  
  const products = await stripe.products.list({ limit: 100, active: true });
  
  console.log(`Found ${products.data.length} active products.`);
  
  for (const product of products.data) {
    console.log(`- ${product.name} (ID: ${product.id})`);
    
    // Fetch prices for this product
    const prices = await stripe.prices.list({ product: product.id, active: true });
    if (prices.data.length > 0) {
      prices.data.forEach(price => {
        console.log(`  Price: ${(price.unit_amount || 0) / 100} ${price.currency.toUpperCase()} (ID: ${price.id})`);
      });
    } else {
      console.log('  No active prices found.');
    }
  }
}

listProducts().catch(console.error);
