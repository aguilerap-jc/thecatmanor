// Helper script to get Shopify variant IDs
// Run with: node get-variant-ids.js

const query = `
  query getProduct($id: ID!) {
    product(id: $id) {
      id
      title
      handle
      variants(first: 10) {
        edges {
          node {
            id
            title
            price
            sku
            inventoryQuantity
          }
        }
      }
    }
  }
`;

const variables = {
  id: "gid://shopify/Product/YOUR_PRODUCT_ID_HERE" // Replace with your actual product ID
};

console.log("🔍 Use this GraphQL query in your Shopify Admin API:");
console.log("\nQuery:");
console.log(query);
console.log("\nVariables:");
console.log(JSON.stringify(variables, null, 2));

console.log("\n📝 Steps:");
console.log("1. Go to your Shopify Admin");
console.log("2. Apps → Develop apps → Create app");
console.log("3. Configure Admin API access → Add GraphQL Admin API");
console.log("4. Use the query above to get variant IDs");

console.log("\n💡 Or check your Shopify Admin product page for variant IDs directly!");
