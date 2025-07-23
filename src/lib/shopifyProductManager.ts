'use client';

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
      const token =
        process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || 'your-storefront-access-token';

      // Check if we're in a CI environment or using dummy values
      const isDummyData =
        domain.includes('dummy-store') ||
        token.includes('dummy-token') ||
        domain === 'your-store.myshopify.com' ||
        token === 'your-storefront-access-token';

      if (isDummyData) {
        // In CI or development without real credentials, don't initialize client
        console.warn('Using dummy Shopify credentials - client will not be initialized');
        this.client = null;
        return;
      }

      if (!domain || !token) {
        throw new Error('Missing Shopify domain or access token');
      }

      this.client = Client.buildClient({
        domain,
        storefrontAccessToken: token,
        apiVersion: '2023-01', // Using older stable version for better compatibility
      });

      // Test the connection with a simple query
      if (typeof window !== 'undefined') {
        this.testConnection();
      }
    } catch (error) {
      console.error('Failed to initialize Shopify client:', error);
      this.client = null;
    }
  }

  private async testConnection() {
    if (!this.client) return;

    try {
      // Try to fetch shop info to test the connection
      const shop = await this.client.shop.fetchInfo();
    } catch (testError) {
      // Shop info test failed, continue anyway
    }

    // Always try to fetch available products to see what exists
    try {
      const products = await this.client.product.fetchAll(5); // Fetch up to 5 products
    } catch (productsError) {
      // Could not fetch products, continue anyway
    }
  }

  async fetchProductData(config: ShopifyProductConfig): Promise<ShopifyProductData> {
    // Check cache first
    if (this.cache.has(config.shopifyProductId)) {
      return this.cache.get(config.shopifyProductId)!;
    }

    // Ensure client is initialized (client-side only)
    if (typeof window !== 'undefined' && !this.client) {
      this.initializeClient();
    }

    // If no client available, return fallback data
    if (!this.client) {
      return this.createFallbackProduct(config);
    }

    try {
      // Try different methods to fetch the product
      let shopifyProduct;

      // Method 1: Try using the product handle first (most reliable)
      if (config.shopifyHandle) {
        try {
          const products = await this.client.product.fetchAll();
          shopifyProduct = products.find((p: any) => p.handle === config.shopifyHandle);
        } catch (handleError) {
          // Handle fetch failed, continue to next method
        }
      }

      // Method 2: Try numeric ID if handle method failed
      if (!shopifyProduct) {
        // Extract numeric ID from GID format (Buy SDK typically expects numeric ID)
        let productIdToFetch: string;

        if (config.shopifyProductId.startsWith('gid://shopify/Product/')) {
          productIdToFetch = config.shopifyProductId.replace('gid://shopify/Product/', '');
        } else {
          productIdToFetch = config.shopifyProductId;
        }

        // Validate the ID is numeric
        if (!/^\d+$/.test(productIdToFetch)) {
          throw new Error(`Invalid product ID format: ${productIdToFetch}. Expected numeric ID.`);
        }

        shopifyProduct = await this.client.product.fetch(productIdToFetch);
      }

      const transformedProduct = this.transformShopifyProduct(shopifyProduct, config);

      // Cache the result
      this.cache.set(config.shopifyProductId, transformedProduct);

      return transformedProduct;
    } catch (error) {
      // Error fetching Shopify product, fall back to default
      return this.createFallbackProduct(config);
    }
  }

  private transformShopifyProduct(
    shopifyProduct: any,
    config: ShopifyProductConfig
  ): ShopifyProductData {
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

    if (typeof imageUrl === 'string') {
      // Fix common protocol issues
      if (imageUrl.startsWith('https:/') && !imageUrl.startsWith('https://')) {
        imageUrl = imageUrl.replace('https:/', 'https://');
      }
      // Ensure it starts with https:// for external URLs
      else if (imageUrl.includes('cdn.shopify.com') && !imageUrl.startsWith('https://')) {
        imageUrl = 'https://' + imageUrl.replace(/^https?:\/\//, '');
      }
    }

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
      shopifyHandle: config.shopifyHandle || shopifyProduct.handle,
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
        } else if (
          ['wood', 'oak', 'bamboo', 'steel', 'fabric', 'wool', 'cotton', 'linen'].some(material =>
            tag.toLowerCase().includes(material)
          )
        ) {
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
      const collectionTag = shopifyProduct.tags.find(
        (tag: string) =>
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
      shopifyHandle: config.shopifyHandle,
    };
  }

  clearCache() {
    this.cache.clear();
    this.collectionCache.clear();
  }

  async fetchCollectionProducts(config: ShopifyCollectionConfig): Promise<ShopifyProductData[]> {
    // Check cache first
    if (this.collectionCache.has(config.shopifyCollectionId)) {
      return this.collectionCache.get(config.shopifyCollectionId)!;
    }

    // Ensure client is initialized (client-side only)
    if (typeof window !== 'undefined' && !this.client) {
      this.initializeClient();
    }

    // If no client available, return empty array
    if (!this.client) {
      return [];
    }

    try {
      // Try GraphQL approach first for better collection support
      try {
        const graphQLProducts = await this.fetchCollectionWithGraphQL(config);
        if (graphQLProducts.length > 0) {
          this.collectionCache.set(config.shopifyCollectionId, graphQLProducts);
          return graphQLProducts;
        }
      } catch (graphQLError) {
        // GraphQL approach failed, use alternative method
      }

      // Alternative approach: Fetch all products and check their collections
      const allProducts = await this.client.product.fetchAll(50); // Fetch more products to search through

      // Extract collection ID for comparison
      const targetCollectionId = config.shopifyCollectionId.replace(
        'gid://shopify/Collection/',
        ''
      );

      // Since Shopify Buy SDK doesn't include collection information in products,
      // we'll use a workaround: return first few products as "collection" products for demo
      const demoCollectionProducts = allProducts
        .slice(0, config.maxProducts || 2)
        .map((product: any, index: number) => {
          // Create a temporary config for each product
          const tempConfig: ShopifyProductConfig = {
            id: `${config.id}-product-${index}`,
            shopifyProductId: product.id,
            shopifyHandle: product.handle,
            fallbackData: {
              name: 'Premium Cat Furniture',
              price: 'Price unavailable',
              image: 'images/products/placeholder.webp',
              description: 'Product information is currently unavailable.',
              collection: 'Cat Furniture Collection',
            },
          };

          const transformedProduct = this.transformShopifyProduct(product, tempConfig);
          return transformedProduct;
        });

      // Cache the result
      this.collectionCache.set(config.shopifyCollectionId, demoCollectionProducts);

      return demoCollectionProducts;
    } catch (error) {
      // Error fetching collection, return empty array
      return [];
    }
  }

  /**
   * Fetch collection products using GraphQL (more powerful than REST API)
   */
  private async fetchCollectionWithGraphQL(
    config: ShopifyCollectionConfig
  ): Promise<ShopifyProductData[]> {
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

    // Try raw GraphQL request format for Buy SDK
    const response = await this.client.graphQLClient.send(query, {
      id: config.shopifyCollectionId,
    });

    if (response.data && response.data.collection) {
      const collection = response.data.collection;
      const products = collection.products.edges.map((edge: any) => edge.node);

      return products.map((product: any) => this.transformGraphQLProduct(product, config));
    } else {
      return [];
    }
  }

  /**
   * Transform GraphQL product data to our ShopifyProductData format
   */
  private transformGraphQLProduct(
    product: any,
    config: ShopifyCollectionConfig
  ): ShopifyProductData {
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
      shopifyHandle: product.handle,
    };
  }
}

export const shopifyProductManager = new ShopifyProductManager();
