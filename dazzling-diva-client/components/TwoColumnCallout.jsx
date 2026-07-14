// const COLUMNS = [
//   {
//     label: "Everyday Wear",
//     heading: "Comfort Meets Style",
//     img: "/images/fs8_2.jpg",
//   },
//   {
//     label: "Festive Edit",
//     heading: "Celebrate In Colour",
//     img: "/images/fs8_12.jpg",
//   },
// ];

// export default function TwoColumnCallout() {
//   return (
//     <section className="flex w-full flex-col bg-white md:flex-row">
//       {COLUMNS.map((col) => (
//         <div
//           key={col.label}
//           className="flex min-h-[380px] flex-1 items-end bg-cover bg-center p-8 sm:min-h-[500px] md:p-12"
//           style={{
//             backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 50%, #000000 100%), url(${col.img})`,
//           }}
//         >
//           <div className="flex flex-col items-start gap-6">
//             <div className="flex flex-col gap-3">
//               <p className="text-[13px] uppercase text-white sm:text-[14px]">
//                 {col.label}
//               </p>
//               <h3 className="max-w-[520px] text-[30px] font-semibold capitalize leading-[1.2] tracking-[-0.03em] text-white sm:text-[44px]">
//                 {col.heading}
//               </h3>
//             </div>
//             <button className="rounded-full bg-white px-5 py-3 text-[16px] font-semibold capitalize text-[#5A0C3D] sm:text-[18px]">
//               Discover
//             </button>
//           </div>
//         </div>
//       ))}
//     </section>
//   );
// }

import Image from "next/image";
import Link from "next/link";

async function getTwoColumnSection() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_API}/api/two-column`,
    {
      next: {
        revalidate: 60,
      },
    },
  );

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  return data[0] || null;
}

export default async function TwoColumnCallout() {
  const section = await getTwoColumnSection();

  if (!section) return null;

  const columns = [section.left, section.right];

  return (
    <section className="flex w-full flex-col bg-white md:flex-row">
      {columns.map((column, index) => (
        <div
          key={index}
          className="relative flex  flex-1 items-end h-[900px] w-full overflow-hidden sm:min-h-[500px]"
        >
          {/* Background Image */}
          <Image
            src={column.image}
            alt={column.categoryName}
            fill
            priority={index === 0}
            sizes="(max-width:768px) 100vw, 70vw"
            className="object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-start gap-6 p-8 md:p-12">
            <div className="flex flex-col gap-3">
              <p className="text-[13px] uppercase text-white sm:text-[14px]">
                {column.categoryName}
              </p>

              <h3 className="max-w-[520px] text-[30px] font-semibold capitalize leading-[1.2] tracking-[-0.03em] text-white sm:text-[44px]">
                {column.title}
              </h3>
            </div>

            <Link
              href="/products"
              className="rounded-full bg-white px-5 py-3 text-[16px] font-semibold capitalize text-[#5A0C3D] transition hover:bg-gray-100 sm:text-[18px]"
            >
              {column.cta?.text || "Discover"}
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
