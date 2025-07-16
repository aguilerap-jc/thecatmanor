import React from "react";

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-xl shadow border border-dusty flex flex-col overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="h-56 w-full object-cover bg-dusty"
      />
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-charcoal mb-2">{product.name}</h3>
        <p className="text-ash mb-4 flex-1">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-terracotta">{product.price}</span>
          <button className="bg-sage text-snow px-4 py-2 rounded hover:bg-terracotta hover:text-snow transition font-medium">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}