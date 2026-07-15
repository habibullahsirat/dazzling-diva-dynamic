import Image from "next/image";
import { ShoppingBag } from "lucide-react";

async function getFeaturedCollection() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_API}/api/featured-collection`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function FeaturedCollectionSection() {
  const collections = await getFeaturedCollection();

  if (!collections.length) return null;

  return (
    <section className="flex flex-col items-center gap-8 px-4 py-12 sm:px-8 md:gap-12 md:px-16">
      {/* Heading */}

      <div className="flex max-w-[912px] flex-col items-center gap-2 text-center">
        <p className="text-[16px] capitalize sm:text-[18px]">Curated</p>

        <h2 className="text-[30px] font-normal uppercase leading-tight sm:text-[40px] md:text-[48px] md:leading-[60px]">
          Featured Collection
        </h2>
      </div>

      {/* Images */}

      <div className="grid w-full max-w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((item) => (
          <div
            key={item._id}
            className="relative h-[420px] overflow-hidden sm:h-[560px] md:h-[650px] rounded-lg"
          >
            <Image
              src={item.image}
              alt="Featured Collection"
              fill
              sizes="(max-width:640px) 100vw,
                     (max-width:1024px) 50vw,
                     33vw"
              className="object-cover object-top"
            />

            <button
              aria-label="Add to cart"
              className="absolute bottom-6 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-2 border-black/20 bg-white sm:h-20 sm:w-20"
            >
              <ShoppingBag
                className="h-7 w-7 sm:h-9 sm:w-9"
                strokeWidth={1.6}
              />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
