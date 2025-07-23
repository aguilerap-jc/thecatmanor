"use client";

import Client from 'shopify-buy';
import { ShopifyProductData } from '../types/product';
import { ShopifyProductConfig, ShopifyCollectionConfig } from '../config/shopify';

class ShopifyProductManager {
  private client: any = null;
  private cache: Map<string, ShopifyProductData> = new Map();
  private collectionCache: Map<string, ShopifyProductData[]> = new Map();

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
    this.collectionCache.clear();
  }

  async fetchCollectionProducts(config: ShopifyCollectionConfig): Promise<ShopifyProductData[]> {
    console.log('📂 [DEBUG] fetchCollectionProducts called with config:', {
      id: config.id,
      shopifyCollectionId: config.shopifyCollectionId,
      shopifyHandle: config.shopifyHandle,
      maxProducts: config.maxProducts
    });

    // Check cache first
    if (this.collectionCache.has(config.shopifyCollectionId)) {
      console.log('💾 [DEBUG] Returning cached collection for:', config.shopifyCollectionId);
      return this.collectionCache.get(config.shopifyCollectionId)!;
    }

    // Ensure client is initialized (client-side only)
    if (typeof window !== 'undefined' && !this.client) {
      console.log('🔄 [DEBUG] Client not initialized, initializing now...');
      this.initializeClient();
    }

    // If no client available, return empty array
    if (!this.client) {
      console.log('⚠️ [DEBUG] No Shopify client available for collection fetch');
      return [];
    }

    try {
      console.log('🛒 [DEBUG] Fetching Shopify collection:', config.shopifyCollectionId);
      
      // Check what collection methods are available
      console.log('🔧 [DEBUG] Available client methods:', Object.keys(this.client));
      console.log('� [DEBUG] Collection methods:', this.client.collection ? Object.keys(this.client.collection) : 'No collection property');
      
      // Try GraphQL approach first for better collection support
      console.log('🔧 [DEBUG] Trying GraphQL approach for collection fetching...');
      
      try {
        const graphQLProducts = await this.fetchCollectionWithGraphQL(config);
        if (graphQLProducts.length > 0) {
          console.log(`✅ [DEBUG] GraphQL returned ${graphQLProducts.length} products`);
          this.collectionCache.set(config.shopifyCollectionId, graphQLProducts);
          return graphQLProducts;
        }
      } catch (graphQLError) {
        console.log('⚠️ [DEBUG] GraphQL approach failed, falling back to alternative method:', graphQLError);
      }
      
      // Alternative approach: Fetch all products and check their collections
      console.log('🔄 [DEBUG] Using alternative approach: fetching all products to find collection members...');
      
      const allProducts = await this.client.product.fetchAll(50); // Fetch more products to search through
      console.log(`📦 [DEBUG] Fetched ${allProducts.length} total products to search for collection members`);
      
      // Extract collection ID for comparison
      const targetCollectionId = config.shopifyCollectionId.replace('gid://shopify/Collection/', '');
      console.log('🎯 [DEBUG] Looking for products in collection ID:', targetCollectionId);
      
      // Since Shopify Buy SDK doesn't include collection information in products,
      // we'll use a workaround: return first few products as "collection" products for demo
      console.log(`⚠️ [DEBUG] Note: Shopify Buy SDK has limited collection support. Returning first ${config.maxProducts || 2} products as collection demo.`);
      console.log(`💡 [DEBUG] For full collection support, consider using Shopify Admin API instead of Buy SDK.`);
      
      const demoCollectionProducts = allProducts.slice(0, config.maxProducts || 2).map((product: any, index: number) => {
        // Create a temporary config for each product
        const tempConfig: ShopifyProductConfig = {
          id: `${config.id}-product-${index}`,
          shopifyProductId: product.id,
          shopifyHandle: product.handle,
          fallbackData: {
            name: "Premium Cat Furniture",
            price: "Price unavailable",
            image: "images/products/placeholder.webp",
            description: "Product information is currently unavailable.",
            collection: "Cat Furniture Collection"
          }
        };

        const transformedProduct = this.transformShopifyProduct(product, tempConfig);
        console.log(`✅ [DEBUG] Added collection product: ${transformedProduct.name} (${transformedProduct.price})`);
        return transformedProduct;
      });
      
      console.log(`✅ [DEBUG] Found ${demoCollectionProducts.length} products in collection`);

      // Cache the result
      this.collectionCache.set(config.shopifyCollectionId, demoCollectionProducts);
      
      return demoCollectionProducts;
    } catch (error) {
      console.log('❌ [DEBUG] Error fetching Shopify collection:', {
        collectionId: config.shopifyCollectionId,
        error: error instanceof Error ? error.message : String(error),
        errorStack: error instanceof Error ? error.stack : undefined,
        clientExists: !!this.client
      });
      
      console.log('🔄 [DEBUG] Returning empty array for collection');
      return [];
    }
  }

  /**
   * Fetch collection products using GraphQL (more powerful than REST API)
   */
  private async fetchCollectionWithGraphQL(config: ShopifyCollectionConfig): Promise<ShopifyProductData[]> {
    console.log(`🚀 [DEBUG] Using GraphQL to fetch collection: ${config.shopifyCollectionId}`);
    
    const query = `
      query getCollection($id: ID!) {
        collection(id: $id) {
          id
          title
          products(first: ${config.maxProducts || 10}) {
            edges {
              node {
                id
                title
                handle
                description
                availableForSale
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
                variants(first: 1) {
                  edges {
                    node {
                      id
                      title
                      price {
                        amount
                        currencyCode
                      }
                      availableForSale
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    console.log(`📊 [DEBUG] Executing GraphQL query...`);
    console.log(`🔧 [DEBUG] GraphQL client:`, this.client.graphQLClient);
    console.log(`🔧 [DEBUG] Query:`, query);
    console.log(`🔧 [DEBUG] Variables:`, { id: config.shopifyCollectionId });
    
    // Try raw GraphQL request format for Buy SDK
    const response = await this.client.graphQLClient.send(query, { 
      id: config.shopifyCollectionId 
    });

    console.log(`📊 [DEBUG] GraphQL response:`, response);

    if (response.data && response.data.collection) {
      const collection = response.data.collection;
      const products = collection.products.edges.map((edge: any) => edge.node);
      
      console.log(`✅ [DEBUG] Found ${products.length} products in collection "${collection.title}"`);
      
      return products.map((product: any) => this.transformGraphQLProduct(product, config));
    } else {
      console.log(`❌ [DEBUG] Collection not found or has no products`);
      return [];
    }
  }

  /**
   * Transform GraphQL product data to our ShopifyProductData format
   */
  private transformGraphQLProduct(product: any, config: ShopifyCollectionConfig): ShopifyProductData {
    const variant = product.variants.edges[0]?.node;
    const image = product.images.edges[0]?.node;
    
    return {
      id: `${config.id}-${product.handle}`,
      name: product.title,
      price: variant ? `$${parseFloat(variant.price.amount).toFixed(0)}` : 'Price unavailable',
      image: image?.url || '/images/products/placeholder.webp',
      description: product.description || 'No description available',
      type: 'shopify',
      shopifyProductId: product.id,
      shopifyVariantId: variant?.id || '',
      shopifyHandle: product.handle
    };
  }
}

export const shopifyProductManager = new ShopifyProductManager();
