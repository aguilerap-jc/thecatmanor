import { Product } from '../types/product';

// Native products (static data)
export const nativeProducts: Product[] = [
  {
    id: 'modular-perch-oak',
    name: 'Modular Wall Perch System',
    price: '$589',
    image: 'images/products/perch1.jpg',
    description:
      'A sophisticated modular wall-mounted system featuring sustainably sourced white oak and premium wool felt. Expands from single perch to complete climbing wall.',
    collection: 'Signature',
    materials: ['White Oak', 'Merino Wool Felt', 'Brass Hardware'],
    dimensions: '24" × 12" × 8" (expandable)',
    type: 'native',
  },
  {
    id: 'floating-steps-walnut',
    name: 'Floating Steps Collection',
    price: '$429',
    image: 'images/products/steps1.jpg',
    description:
      'Minimalist floating steps crafted from American black walnut. Clean lines and hidden mounting system create the illusion of steps floating on your wall.',
    collection: 'Essential',
    materials: ['American Black Walnut', 'Stainless Steel', 'Hidden Brackets'],
    dimensions: 'Set of 5: 18" × 8" × 2" each',
    type: 'native',
  },
  {
    id: 'luxury-lounger-sage',
    name: 'Executive Lounger',
    price: '$1,249',
    image: 'images/products/sofa1.webp',
    description:
      'Our flagship piece featuring hand-selected maple wood frame with sage linen upholstery. Includes integrated scratching surfaces and removable cushions.',
    collection: 'Signature',
    materials: ['Canadian Maple', 'Belgian Linen', 'Natural Sisal', 'Memory Foam'],
    dimensions: '48" × 24" × 16"',
    type: 'native',
  },
  {
    id: 'tower-system-bamboo',
    name: 'Vertical Tower System',
    price: '$899',
    image: 'images/products/tower1.webp',
    description:
      'Floor-to-ceiling modular tower system in sustainable bamboo. Multiple configurations possible with integrated planters and hideaways.',
    collection: 'Eco',
    materials: ['Bamboo', 'Organic Cotton', 'Cork', 'Recycled Steel'],
    dimensions: '78" × 20" × 20" (adjustable height)',
    type: 'native',
  },
];

// Function to get all products (native + dynamically fetched Shopify products)
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    // Dynamic import to avoid circular dependency
    const { shopifyProductManager } = await import('../lib/shopifyProductManager');
    const { shopifyProductConfigs, shopifyCollectionConfigs } = await import('../config/shopify');

    // Fetch individual Shopify products
    const shopifyProducts = await Promise.all(
      shopifyProductConfigs.map(async config => {
        try {
          return await shopifyProductManager.fetchProductData(config);
        } catch (error) {
          console.error(`❌ Failed to fetch individual product: ${config.id}`, error);
          // Return fallback for this specific product
          return shopifyProductManager.createFallbackProduct(config);
        }
      })
    );

    // Fetch Shopify collection products
    const collectionProducts = await Promise.all(
      shopifyCollectionConfigs.map(async config => {
        try {
          return await shopifyProductManager.fetchCollectionProducts(config);
        } catch (error) {
          console.error(`❌ Failed to fetch collection: ${config.id}`, error);
          return [];
        }
      })
    );

    // Flatten collection products
    const flatCollectionProducts = collectionProducts.flat();

    // Combine all products (native + individual Shopify + collection products)
    return [...nativeProducts, ...shopifyProducts, ...flatCollectionProducts];
  } catch (error) {
    console.error('❌ Failed to load Shopify products, using native only:', error);
    return nativeProducts;
  }
};
