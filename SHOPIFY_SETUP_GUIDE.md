# Shopify Configuration Guide for Headless Setup

## 1. Shopify Admin Setup (Storefront API - NOT Buy Button)

### Step 1: Create a Private App
1. Go to your Shopify Admin
2. Settings → Apps and sales channels
3. Develop apps → Create an app
4. Name it "Cat Manor Headless Store" or similar

### Step 2: Configure Storefront API Access
1. In your app → Configuration
2. Storefront API access → Configure
3. Enable these permissions:
   - ✅ Read products
   - ✅ Read product listings
   - ✅ Read inventory
   - ✅ Read collections
   - ✅ Access to checkout creation
   - ✅ Access to cart creation

### Step 3: Get Your Credentials
1. API credentials → Storefront access token
2. Copy the token (starts with something like "shpca_" or similar)
3. Your domain is: yourstore.myshopify.com

### Step 4: Publish Products to Sales Channel
1. Products → Select your product
2. Sales channels → Make sure "Headless" or "Point of Sale" is enabled
3. Product must be "Active" status

## 2. Alternative: Use Buy Button (Simpler but Less Flexible)

If you want the easier route:
1. Sales channels → Shop → Buy Button
2. Create buy button for your product
3. Use the generated embed code

But this loses your custom React integration and styling.

## 3. Common Issues

### Product Not Found Errors:
- Product might not be published to the correct sales channel
- Product ID format might be wrong
- Storefront API access not configured properly

### Access Token Issues:
- Using Admin API token instead of Storefront API token
- Token doesn't have correct permissions
- Token expired or invalid

## 4. Quick Test

Use your browser to test the API directly:
POST https://yourstore.myshopify.com/api/2024-01/graphql.json

Headers:
X-Shopify-Storefront-Access-Token: your-token-here

Body:
{
  "query": "{ shop { name } }"
}

Should return your shop name if configured correctly.
