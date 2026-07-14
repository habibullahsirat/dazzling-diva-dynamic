"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product._id}`}
      className="block w-full min-w-[260px] max-w-[320px] flex-1 basis-[280px]"
    >
      <div className="relative h-[380px] overflow-hidden bg-[#F7F7F7] transition hover:shadow-lg sm:h-[420px]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width:768px) 100vw, 320px"
          className="object-contain transition duration-300 hover:scale-105"
        />

        {/* Bottom Card */}
        <div className="absolute inset-x-4 bottom-3 flex items-center justify-between gap-2 bg-white px-3 py-2.5 shadow">
          <div>
            <p className="truncate text-[12px] font-medium capitalize">
              {product.title}
            </p>

            <p className="text-[14px] font-semibold text-black/60">
              ৳ {Number(product.price).toLocaleString()}
            </p>
          </div>

          <button
            onClick={(e) => e.preventDefault()}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 bg-white"
          >
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.3} />
          </button>
        </div>
      </div>
    </Link>
  );
}
