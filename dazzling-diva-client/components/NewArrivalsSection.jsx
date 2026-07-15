import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

async function getNewArrivals() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_API}/api/new-arrivals`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch new arrivals");
  }

  return res.json();
}

export default async function NewArrivalsSection() {
  const products = await getNewArrivals();

  return (
    <section className="flex flex-col items-center gap-8 px-4 py-12 sm:px-8 md:gap-12 md:px-16">
      {/* Heading */}
      <div className="flex max-w-[610px] flex-col items-center gap-2 text-center">
        <p className="text-[16px] capitalize sm:text-[18px]">Fresh drops</p>

        <h2 className="text-[30px] font-normal uppercase leading-tight sm:text-[40px] md:text-[48px] md:leading-[60px]">
          New Arrivals
        </h2>
      </div>

      {/* Products */}
      <div className="grid grid-cols-4 w-full max-w-full justify-center gap-3">
        {products.map((product) => (
          <div
            key={product._id}
            className="w-full min-w-[260px] max-w-full flex-1 basis-[280px] "
          >
            <div className="relative h-[380px] overflow-hidden bg-[#F7F7F7] sm:h-[420px] rounded-lg">
              <Image
                src={product.image}
                alt={product.title}
                width={400}
                height={400}
                // fill
                // sizes="(max-width:768px) 100vw, 320px"
                className="object-contain object-top"
              />

              {/* Bottom Card */}
              <div className="absolute inset-x-4 bottom-3 flex items-center justify-between gap-2 bg-white px-3 py-2.5 shadow">
                <div className="flex flex-col gap-1">
                  <p className="truncate text-[12px] font-medium capitalize">
                    {product.title}
                  </p>

                  <span className="text-[14px] font-semibold text-black/50">
                    ৳ {Number(product.price).toLocaleString()}
                  </span>
                </div>

                <button
                  aria-label="Add to cart"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/20 bg-white"
                >
                  <ShoppingBag
                    className="h-[18px] w-[18px]"
                    strokeWidth={1.3}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <Link href="/products/new-arrivals">
        <button className="rounded-lg bg-[#5A0C3D] px-6 py-3 text-[16px] font-semibold capitalize text-white sm:text-[18px]">
          View All Products
        </button>
      </Link>
    </section>
  );
}
