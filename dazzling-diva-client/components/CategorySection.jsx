// import { ArrowRight } from "lucide-react";
// import { CATEGORY_CARDS } from "./data";

// export default function CategorySection() {
//   return (
//     <section className="flex flex-col items-center gap-8 px-4 py-12 sm:px-8 md:gap-12 md:px-16">
//       <div className="flex max-w-[610px] flex-col items-center gap-2 text-center">
//         <p className="text-[16px] capitalize sm:text-[18px]">Shop by</p>
//         <h2 className="text-[30px] font-normal uppercase leading-tight sm:text-[40px] md:text-[48px] md:leading-[60px]">
//           Category
//         </h2>
//       </div>

//       <div className="grid w-full max-w-[1312px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
//         {CATEGORY_CARDS.map((card) => (
//           <div
//             key={card.name}
//             className="relative flex h-[380px] items-end rounded-xl bg-cover bg-center p-6 sm:h-[447px]"
//             style={{
//               backgroundImage: `linear-gradient(179.94deg, rgba(0,0,0,0) 60.06%, #000000 99.95%), url(${card.img})`,
//             }}
//           >
//             <div className="flex flex-col gap-2.5">
//               <p className="text-[22px] font-semibold capitalize text-white sm:text-[26px]">
//                 {card.name}
//               </p>
//               <a href="#" className="flex items-center gap-2.5 text-[14px] capitalize text-white">
//                 Explore
//                 <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.3} />
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

async function getCategories() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_API}/api/categories`,
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

export default async function CategorySection() {
  const categories = await getCategories();

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col items-center gap-8 px-4 py-12 sm:px-8 md:gap-12 md:px-16">
      {/* Heading */}
      <div className="flex max-w-[610px] flex-col items-center gap-2 text-center">
        <p className="text-[16px] capitalize sm:text-[18px]">Shop by</p>

        <h2 className="text-[30px] font-normal uppercase leading-tight sm:text-[40px] md:text-[48px] md:leading-[60px]">
          Category
        </h2>
      </div>

      {/* Category Grid */}
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <div
            key={category._id}
            className="group relative h-[380px] overflow-hidden rounded-xl sm:h-[447px]"
          >
            {/* Image */}
            <Image
              src={category.image}
              alt={category.name}
              fill
              priority
              sizes="(max-width:768px)100vw,(max-width:1024px)50vw,25vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />

            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 z-10 flex flex-col gap-2.5 p-6">
              <p className="text-[22px] font-semibold capitalize text-white sm:text-[26px]">
                {category.name}
              </p>

              <Link
                href="/products"
                className="flex items-center gap-2.5 text-[14px] capitalize text-white"
              >
                {category.cta?.text || "Explore"}

                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.3} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
