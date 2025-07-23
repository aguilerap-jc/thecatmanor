"use client";

import Client from 'shopify-buy';
import { ShopifyProductData } from '../types/product';
import { ShopifyProductConfig } from '../config/shopify';

class ShopifyProductManager {
  private client: any = null;
  private cache: Map<string, ShopifyProductData> = new Map();

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeClient();
    }
  }

  private initializeClient() {
    try {
      const domain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'your-store.myshopify.com';
      const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'your-storefront-access-token';
      
      console.log('🔧 [DEBUG] Initializing Shopify client:', {
        domain,
        hasToken: !!token,
        tokenPrefix: token ? token.substring(0, 8) + '...' : 'none',
        envDomain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,
        envToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ? 'set' : 'not set',
        windowExists: typeof window !== 'undefined'
      });
      
      if (!domain || !token) {
        throw new Error('Missing Shopify domain or access token');
      }
      
      this.client = Client.buildClient({
        domain,
        storefrontAccessToken: token,
        apiVersion: '2023-01' // Using older stable version for better compatibility
      });
      
      console.log('✅ [DEBUG] Shopify client initialized successfully', {
        clientType: typeof this.client,
        hasProductFetch: typeof this.client?.product?.fetch === 'function'
      });
      
      // Test the connection with a simple query
      if (typeof window !== 'undefined') {
        this.testConnection();
      }
    } catch (error) {
      console.error('❌ [DEBUG] Failed to initialize Shopify client:', error);
      this.client = null;
    }
  }

  private async testConnection() {
    if (!this.client) return;
    
    try {
      console.log('🧪 [DEBUG] Testing Shopify connection...');
      // Try to fetch shop info to test the connection
      const shop = await this.client.shop.fetchInfo();
      console.log('✅ [DEBUG] Shopify connection test successful:', {
        shopName: shop.name,
        domain: shop.domain,
        description: shop.description
      });
    } catch (testError) {
      console.log('⚠️ [DEBUG] Shop info test failed:', testError);
    }
    
    // Always try to fetch available products to see what exists
    try {
      console.log('🛍️ [DEBUG] Fetching available products...');
      const products = await this.client.product.fetchAll(5); // Fetch up to 5 products
      console.log('✅ [DEBUG] Available products in store:', products.map((p: any) => ({
        id: p.id,
        title: p.title,
        handle: p.handle,
        variants: p.variants.length
      })));
      
      if (products.length > 0) {
        console.log('💡 [DEBUG] Example product IDs you could use:');
        products.forEach((p: any) => {
          console.log(`  - ID: ${p.id} | Title: "${p.title}" | Handle: "${p.handle}"`);
        });
      }
      
    } catch (productsError) {
      console.log('❌ [DEBUG] Could not fetch products:', productsError);
    }
  }

  async fetchProductData(config: ShopifyProductConfig): Promise<ShopifyProductData> {
    console.log('🚀 [DEBUG] fetchProductData called with config:', {
      id: config.id,
      shopifyProductId: config.shopifyProductId,
      shopifyVariantId: config.shopifyVariantId,
      shopifyHandle: config.shopifyHandle
    });

    // Check cache first
    if (this.cache.has(config.shopifyProductId)) {
      console.log('💾 [DEBUG] Returning cached product for:', config.shopifyProductId);
      return this.cache.get(config.shopifyProductId)!;
    }

    // Ensure client is initialized (client-side only)
    if (typeof window !== 'undefined' && !this.client) {
      console.log('🔄 [DEBUG] Client not initialized, initializing now...');
      this.initializeClient();
    }

    // If no client available, return fallback data
    if (!this.client) {
      console.log('⚠️ [DEBUG] No Shopify client available, using fallback data');
      console.log('🔧 [DEBUG] Client initialization status:', {
        clientExists: !!this.client,
        windowDefined: typeof window !== 'undefined',
        isServer: typeof window === 'undefined'
      });
      return this.createFallbackProduct(config);
    }

    try {
      console.log('🛒 [DEBUG] Fetching Shopify product:', config.shopifyProductId);
      
      // Try different methods to fetch the product
      let shopifyProduct;
      
      // Method 1: Try using the product handle first (most reliable)
      if (config.shopifyHandle) {
        try {
          console.log('🔄 [DEBUG] Trying to fetch by handle:', config.shopifyHandle);
          const products = await this.client.product.fetchAll();
          shopifyProduct = products.find((p: any) => p.handle === config.shopifyHandle);
          if (shopifyProduct) {
            console.log('✅ [DEBUG] Success fetching by handle');
          } else {
            console.log('⚠️ [DEBUG] Product not found by handle');
          }
        } catch (handleError) {
          console.log('⚠️ [DEBUG] Handle fetch failed:', handleError);
        }
      }
      
      // Method 2: Try numeric ID if handle method failed
      if (!shopifyProduct) {
        // Extract numeric ID from GID format (Buy SDK typically expects numeric ID)
        let productIdToFetch: string;
        
        if (config.shopifyProductId.startsWith('gid://shopify/Product/')) {
          productIdToFetch = config.shopifyProductId.replace('gid://shopify/Product/', '');
          console.log('🔄 [DEBUG] Extracted numeric ID from GID:', productIdToFetch);
        } else {
          productIdToFetch = config.shopifyProductId;
          console.log('🔄 [DEBUG] Using provided ID as-is:', productIdToFetch);
        }
        
        // Validate the ID is numeric
        if (!/^\d+$/.test(productIdToFetch)) {
          throw new Error(`Invalid product ID format: ${productIdToFetch}. Expected numeric ID.`);
        }
        
        console.log('🔄 [DEBUG] Attempting to fetch product with numeric ID:', productIdToFetch);
        shopifyProduct = await this.client.product.fetch(productIdToFetch);
      }
      
      console.log('✅ [DEBUG] Shopify product fetched successfully:', {
        id: shopifyProduct.id,
        title: shopifyProduct.title,
        variantsCount: shopifyProduct.variants?.length
      });
      
      const transformedProduct = this.transformShopifyProduct(shopifyProduct, config);
      
      // Cache the result
      this.cache.set(config.shopifyProductId, transformedProduct);
      
      return transformedProduct;
    } catch (error) {
      console.log('❌ [DEBUG] Error fetching Shopify product:', {
        productId: config.shopifyProductId,
        numericId: config.shopifyProductId.replace('gid://shopify/Product/', ''),
        error: error instanceof Error ? error.message : String(error),
        errorStack: error instanceof Error ? error.stack : undefined,
        clientExists: !!this.client,
        hasToken: !!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        domain: process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN,
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        fullError: error,
        errorJSON: JSON.stringify(error, null, 2)
      });
      
      // Log the GraphQL errors specifically if they exist
      if (error && typeof error === 'object' && 'graphQLErrors' in error) {
        console.log('🔍 [DEBUG] GraphQL Errors:', error.graphQLErrors);
      }
      
      // Log network errors specifically
      if (error && typeof error === 'object' && 'networkError' in error) {
        console.log('🌐 [DEBUG] Network Error:', error.networkError);
      }
      
      console.log('🔄 [DEBUG] Falling back to default product data');
      return this.createFallbackProduct(config);
    }
  }

  private transformShopifyProduct(shopifyProduct: any, config: ShopifyProductConfig): ShopifyProductData {
    const mainVariant = shopifyProduct.variants[0];
    const mainImage = shopifyProduct.images[0];

    // Extract materials from product tags or description
    const materials = this.extractMaterials(shopifyProduct);
    
    // Extract dimensions from product description or variant title
    const dimensions = this.extractDimensions(shopifyProduct);

    // Determine collection from product tags
    const collection = this.extractCollection(shopifyProduct);

    // Fix image URL if it has protocol issues
    let imageUrl = mainImage?.src || config.fallbackData?.image || '/images/placeholder.jpg';
    console.log('🖼️ [DEBUG] Original image URL:', imageUrl);
    
    if (typeof imageUrl === 'string') {
      // Fix common protocol issues
      if (imageUrl.startsWith('https:/') && !imageUrl.startsWith('https://')) {
        imageUrl = imageUrl.replace('https:/', 'https://');
        console.log('🔧 [DEBUG] Fixed protocol, new URL:', imageUrl);
      }
      // Ensure it starts with https:// for external URLs
      else if (imageUrl.includes('cdn.shopify.com') && !imageUrl.startsWith('https://')) {
        imageUrl = 'https://' + imageUrl.replace(/^https?:\/\//, '');
        console.log('🔧 [DEBUG] Ensured https protocol, new URL:', imageUrl);
      }
    }
    
    console.log('🖼️ [DEBUG] Final image URL:', imageUrl);

    return {
      id: config.id,
      name: shopifyProduct.title,
      price: `$${parseFloat(mainVariant?.price?.amount || '0').toFixed(0)}`,
      image: imageUrl,
      description: shopifyProduct.description || config.fallbackData?.description || '',
      collection: collection || config.fallbackData?.collection || 'Shopify',
      materials: materials.length > 0 ? materials : config.fallbackData?.materials,
      dimensions: dimensions || config.fallbackData?.dimensions,
      type: 'shopify' as const,
      shopifyProductId: config.shopifyProductId,
      // Always store numeric variant ID for Buy SDK compatibility
      shopifyVariantId: this.extractNumericId(config.shopifyVariantId || mainVariant?.id),
      shopifyHandle: config.shopifyHandle || shopifyProduct.handle
    };
  }

  private extractMaterials(shopifyProduct: any): string[] {
    const materials: string[] = [];
    
    // Check if tags exist before accessing them
    if (shopifyProduct.tags && Array.isArray(shopifyProduct.tags)) {
      // Look for material-related tags
      shopifyProduct.tags.forEach((tag: string) => {
        if (tag.toLowerCase().includes('material:')) {
          materials.push(tag.replace(/material:/i, '').trim());
        } else if (['wood', 'oak', 'bamboo', 'steel', 'fabric', 'wool', 'cotton', 'linen'].some(material => 
          tag.toLowerCase().includes(material))) {
          materials.push(tag);
        }
      });
    }

    return materials;
  }

  private extractDimensions(shopifyProduct: any): string | undefined {
    // Look for dimensions in description
    const description = shopifyProduct.description || '';
    const dimensionMatch = description.match(/(\d+["']?\s*[×x]\s*\d+["']?\s*[×x]\s*\d+["']?)/i);
    
    if (dimensionMatch) {
      return dimensionMatch[1];
    }

    // Look for dimensions in variant titles
    for (const variant of shopifyProduct.variants) {
      const variantMatch = variant.title.match(/(\d+["']?\s*[×x]\s*\d+["']?\s*[×x]\s*\d+["']?)/i);
      if (variantMatch) {
        return variantMatch[1];
      }
    }

    return undefined;
  }

  private extractCollection(shopifyProduct: any): string | undefined {
    // Look for collection-related tags
    if (shopifyProduct.tags && Array.isArray(shopifyProduct.tags)) {
      const collectionTag = shopifyProduct.tags.find((tag: string) => 
        tag.toLowerCase().includes('collection:') || 
        ['signature', 'essential', 'eco', 'premium', 'luxury'].includes(tag.toLowerCase())
      );

      if (collectionTag) {
        return collectionTag.replace(/collection:/i, '').trim();
      }
    }

    // Use product type if available
    if (shopifyProduct.productType) {
      return shopifyProduct.productType;
    }

    return undefined;
  }

  private extractNumericId(id: string | undefined): string | undefined {
    if (!id) return undefined;
    
    // If it's already numeric, return as-is
    if (/^\d+$/.test(id)) return id;
    
    // If it's in GID format, extract the numeric part
    if (id.startsWith('gid://shopify/')) {
      return id.replace(/gid:\/\/shopify\/(Product|ProductVariant)\//, '');
    }
    
    return id;
  }

  public createFallbackProduct(config: ShopifyProductConfig): ShopifyProductData {
    return {
      id: config.id,
      name: config.fallbackData?.name || 'Shopify Product',
      price: config.fallbackData?.price || 'Price TBD',
      image: config.fallbackData?.image || '/images/placeholder.jpg',
      description: config.fallbackData?.description || 'Product information loading...',
      collection: config.fallbackData?.collection || 'Shopify',
      materials: config.fallbackData?.materials,
      dimensions: config.fallbackData?.dimensions,
      type: 'shopify' as const,
      shopifyProductId: config.shopifyProductId,
      shopifyVariantId: config.shopifyVariantId,
      shopifyHandle: config.shopifyHandle
    };
  }

  clearCache() {
    this.cache.clear();
  }
}

export const shopifyProductManager = new ShopifyProductManager();
