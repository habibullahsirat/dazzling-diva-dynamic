import Image from "next/image";
import { ShoppingBag } from "lucide-react";

async function getFlashDealProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_API}/api/flash-deal-products`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch flash deal products");
  }

  return res.json();
}

export default async function FlashDealProduct() {
  const products = await getFlashDealProducts();

  return (
    <div className="-mt-2 bg-white py-10">
      <div className="mx-auto grid max-w-full gap-6 px-[64px] md:grid-cols-2 lg:grid-cols-4">
        {products.map((item) => {
          const discount = Math.round(
            ((item.originalPrice - item.discountedPrice) / item.originalPrice) *
              100,
          );

          return (
            <div key={item._id}>
              <div className="group relative overflow-hidden rounded-xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={700}
                  className="h-auto w-full object-cover transition duration-300 group-hover:scale-105"
                />

                {/* Discount */}
                <span className="absolute left-0 top-0 rounded-br-lg bg-red-600 px-3 py-1 text-sm font-bold text-white">
                  -{discount}%
                </span>

                {/* Cart */}
                <button className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">
                  <ShoppingBag size={18} />
                </button>

                {/* CTA */}
                <button className="absolute bottom-3 left-3 right-3 rounded-md bg-white py-3 text-sm font-medium transition hover:bg-black hover:text-white">
                  {item.ctaText}
                </button>
              </div>

              <h3 className="mt-4 line-clamp-1 text-lg font-medium text-gray-900">
                {item.title}
              </h3>

              <div className="mt-2 flex items-center gap-3">
                <span className="text-xl font-bold">
                  ৳{item.discountedPrice}
                </span>

                <span className="text-gray-400 line-through">
                  ৳{item.originalPrice}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
