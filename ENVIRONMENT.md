# 🔧 Environment Variables Setup

## Required Environment Variables

### Local Development (`.env.local`)

Create a `.env.local` file in the root of your project:

```bash
# Shopify Configuration
NEXT_PUBLIC_SHOPIFY_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
```

### Getting Shopify Credentials

1. **Go to your Shopify Admin**
   - Navigate to: Apps → Develop apps → Create an app

2. **Configure Storefront API**
   - Enable Storefront API access
   - Select required permissions:
     - `unauthenticated_read_product_listings`
     - `unauthenticated_read_product_inventory`
     - `unauthenticated_read_product_tags`
     - `unauthenticated_read_collection_listings`

3. **Get your credentials**
   - **Domain**: `your-store.myshopify.com`
   - **Storefront Access Token**: Copy the generated token

## CI/CD Environment Variables

### GitHub Actions Secrets

For production deployments, add these secrets to your GitHub repository:

1. **Go to Repository Settings → Secrets and variables → Actions**

2. **Add Repository Secrets**:
   ```
   NEXT_PUBLIC_SHOPIFY_DOMAIN = your-store.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN = your_token
   ```

3. **Optional: Vercel Integration Secrets** (for auto-deployment):
   ```
   VERCEL_TOKEN = your_vercel_token
   VERCEL_ORG_ID = your_organization_id
   VERCEL_PROJECT_ID = your_project_id
   ```

### Vercel Environment Variables

If deploying to Vercel manually:

1. **Go to Vercel Dashboard → Your Project → Settings → Environment Variables**

2. **Add Variables**:
   ```
   NEXT_PUBLIC_SHOPIFY_DOMAIN = your-store.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN = your_token
   ```

3. **Set for all environments**: Production, Preview, Development

## How CI Handles Missing Variables

### Graceful Degradation

The application is designed to work without Shopify credentials:

1. **CI Build Process**:
   - Uses `npm run build:ci` with dummy values
   - Shopify client initialization is skipped
   - Falls back to static product data
   - Build completes successfully

2. **Runtime Behavior**:
   - Detects dummy/missing credentials
   - Shows fallback product data
   - Displays appropriate error messages
   - Doesn't break the application

### Build Scripts

```bash
# Development (requires .env.local)
npm run dev

# Production build (requires real env vars)
npm run build

# CI build (uses dummy values, always works)
npm run build:ci

# Preview build (can work with or without real data)
npm run start
```

## Environment Detection

The app automatically detects the environment:

```typescript
// Detected as CI/dummy environment:
- domain.includes('dummy-store')
- token.includes('dummy-token')
- domain === 'your-store.myshopify.com'
- token === 'your-storefront-access-token'
```

## Security Best Practices

### ✅ Do's
- Store real credentials in GitHub Secrets
- Use environment-specific variables
- Never commit `.env.local` to git
- Use `NEXT_PUBLIC_` prefix for client-side variables

### ❌ Don'ts
- Don't put credentials in source code
- Don't commit `.env` files
- Don't use production tokens in development
- Don't expose sensitive data in client-side code

## Troubleshooting

### Build Fails in CI
```bash
# Check if using correct build script
npm run build:ci  # ✅ Works without real credentials
npm run build     # ❌ Might fail without credentials
```

### Development Issues
```bash
# Check your .env.local file exists and has correct format
cat .env.local

# Verify environment variables are loaded
npm run dev
# Check browser console for Shopify connection status
```

### Production Deployment Issues
1. Verify GitHub secrets are set correctly
2. Check Vercel environment variables
3. Ensure variable names match exactly
4. Verify Shopify API permissions

---

## Quick Setup Checklist

- [ ] Create `.env.local` with Shopify credentials
- [ ] Test local development: `npm run dev`
- [ ] Test CI build: `npm run build:ci`
- [ ] Add GitHub repository secrets
- [ ] Configure Vercel environment variables
- [ ] Test production deployment

🎉 **Your environment is ready for development and deployment!**
