import Image from "next/image";
import ProductCard from "./ProductCard";
import { ShoppingBag } from "lucide-react";

export default function ProductGrid({ title, subtitle, products }) {
  return (
    <section className="flex flex-col items-center gap-8 px-4 py-12 sm:px-8 md:gap-12 md:px-16">
      {/* Heading */}
      <div className="flex max-w-[610px] flex-col items-center gap-2 text-center">
        <p className="text-[16px] capitalize sm:text-[18px]">{subtitle}</p>

        <h1 className="text-[30px] font-normal uppercase leading-tight sm:text-[40px] md:text-[48px] md:leading-[60px]">
          {title}
        </h1>
      </div>

      {/* Products */}
      {products.length === 0 ? (
        <p className="py-20 text-center text-lg text-gray-500">
          No products found.
        </p>
      ) : (
        <div className="grid w-full max-w-[1400px] grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        // </div>
      )}
    </section>
  );
}
