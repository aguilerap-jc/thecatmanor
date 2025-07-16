import Link from "next/link";

export default function Home() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-charcoal">
        The Cat Manor
      </h1>
      <p className="text-lg md:text-xl mb-8 text-ash">
        Modern cat perches, wall steps, and furniture designed to blend seamlessly with minimalistic, Scandinavian, and contemporary apartment styles.
      </p>
      <Link
        href="/products"
        className="inline-block bg-terracotta text-snow px-6 py-3 rounded-lg font-semibold shadow hover:bg-dusty transition"
      >
        Shop Cat Furniture
      </Link>
    </section>
  );
}