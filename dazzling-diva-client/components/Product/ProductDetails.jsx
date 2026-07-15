"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

export default function ProductDetails({ product }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8 lg:px-16">
        {/* Breadcrumb */}
        <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#5A0C3D]">
            Home
          </Link>

          <span>/</span>

          <Link
            href={product.category?.href || "/products"}
            className="hover:text-[#5A0C3D]"
          >
            {product.category?.name || "Products"}
          </Link>

          <span>/</span>

          <span className="font-medium text-black">{product.title}</span>
        </div>

        <div className="grid gap-14 lg:grid-cols-2">
          {/* Left Side */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-xl  bg-[#F8F8F8]">
              <Image
                src={product.image}
                alt={product.title}
                fill
                priority
                className="object-contain p-6"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col">
            {/* Category */}
            <p className="mb-2 text-sm uppercase tracking-widest text-gray-500">
              {product.category?.name}
            </p>

            {/* Title */}
            <h1 className="text-4xl font-semibold leading-tight">
              {product.title}
            </h1>

            {/* Price */}
            <p className="mt-5 text-4xl font-bold text-[#5A0C3D]">
              ৳ {Number(product.price).toLocaleString()}
            </p>

            {/* Stock */}
            <p className="mt-2 text-green-600 font-medium">✓ In Stock</p>

            {/* Badges */}
            <div className="mt-6 flex flex-wrap gap-3">
              {product.isNewArrival && (
                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                  New Arrival
                </span>
              )}

              {product.isFlashDeal && (
                <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700">
                  Flash Deal
                </span>
              )}

              {product.isMostLoved && (
                <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-medium text-pink-700">
                  Most Loved
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="my-8 border-t border-[#5A0C3D]" />

            {/* Quantity */}
            <div>
              <p className="mb-3 font-medium">Quantity</p>

              <div className="flex w-fit items-center rounded-lg border border-[#5A0C3D]">
                <button className="px-4 py-2 text-xl">−</button>

                <span className="border-x border-[#5A0C3D] px-6 py-2">1</span>

                <button className="px-4 py-2 text-xl">+</button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#5A0C3D] px-6 py-4 font-semibold text-white transition hover:bg-[#43092E]">
                <ShoppingBag size={20} />
                Add to Cart
              </button>

              <button className="flex flex-1 items-center justify-center rounded-lg border border-[#5A0C3D] px-6 py-4 font-semibold text-[#5A0C3D] transition hover:bg-[#5A0C3D] hover:text-white">
                Buy Now
              </button>

              <button className="flex h-14 w-14 items-center justify-center rounded-lg border border-[#5A0C3D] transition hover:bg-[#5A0C3D] hover:text-white">
                <Heart />
              </button>
            </div>

            {/* Description */}
            <div className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold">Product Description</h2>

              <p className="leading-8 text-gray-600">
                Elevate your style with this premium collection from Dazzling
                Diva. Crafted with attention to detail using high-quality
                materials for elegance, comfort, and everyday sophistication.
              </p>
            </div>

            {/* Features */}
            <div className="mt-8 rounded-xl border border-[#5A0C3D] bg-gray-50 p-6">
              <h3 className="mb-4 text-xl font-semibold">Product Highlights</h3>

              <ul className="space-y-3 text-gray-600">
                <li>✔ Premium Quality Fabric</li>
                <li>✔ Elegant Modern Design</li>
                <li>✔ Comfortable Fit</li>
                <li>✔ Perfect for Every Occasion</li>
                <li>✔ Durable & Easy Care</li>
              </ul>
            </div>

            {/* Service Info */}
            <div className="mt-8 grid gap-4 rounded-xl border border-[#5A0C3D] p-6 sm:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <Truck className="mb-3 text-[#5A0C3D]" />

                <p className="font-semibold">Fast Delivery</p>

                <span className="text-sm text-gray-500">
                  Nationwide Shipping
                </span>
              </div>

              <div className="flex flex-col items-center text-center">
                <RotateCcw className="mb-3 text-[#5A0C3D]" />

                <p className="font-semibold">Easy Returns</p>

                <span className="text-sm text-gray-500">Within 7 Days</span>
              </div>

              <div className="flex flex-col items-center text-center">
                <ShieldCheck className="mb-3 text-[#5A0C3D]" />

                <p className="font-semibold">Secure Payment</p>

                <span className="text-sm text-gray-500">
                  100% Safe Checkout
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
