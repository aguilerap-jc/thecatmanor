import { products } from "../../data/products";
import ProductCard from "../../components/ProductCard";

export default function ProductsPage() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-10 text-charcoal text-center">
        Shop Cat Furniture
      </h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}