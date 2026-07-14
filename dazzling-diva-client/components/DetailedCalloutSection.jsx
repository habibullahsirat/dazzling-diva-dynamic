// import { DETAIL_CALLOUTS } from "./data";

// export default function DetailedCalloutSection() {
//   return (
//     <section className="flex w-full flex-col bg-white lg:flex-row">
//       <div
//         className="flex min-h-[420px] flex-1 items-end bg-cover bg-center p-8 sm:min-h-[520px] md:p-12"
//         style={{
//           backgroundImage:
//             "linear-gradient(180deg, rgba(0,0,0,0) 50%, #000000 100%), url(/images/fs4_4_2.jpg)",
//         }}
//       >
//         <div className="flex flex-col items-start gap-6">
//           <div className="flex flex-col gap-3">
//             <p className="text-[13px] uppercase text-white sm:text-[14px]">Edit</p>
//             <h3 className="max-w-[520px] text-[30px] font-semibold capitalize leading-[1.2] tracking-[-0.03em] text-white sm:text-[44px]">
//               Handpicked For You
//             </h3>
//           </div>
//           <button className="rounded-full bg-white px-5 py-3 text-[16px] font-semibold capitalize text-[#5A0C3D] sm:text-[18px]">
//             Discover
//           </button>
//         </div>
//       </div>

//       <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
//         {DETAIL_CALLOUTS.map((c) => (
//           <div
//             key={c.text}
//             className="flex min-h-[260px] items-end bg-cover bg-center p-6 sm:min-h-[260px]"
//             style={{
//               backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 50%, #000000 100%), url(${c.img})`,
//             }}
//           >
//             <div className="flex flex-col items-start gap-3">
//               <div className="flex flex-col gap-1.5">
//                 <p className="text-[11px] uppercase text-white sm:text-[12px]">{c.title}</p>
//                 <p className="max-w-[280px] text-[20px] font-semibold capitalize leading-[1.2] tracking-[-0.03em] text-white sm:text-[28px]">
//                   {c.text}
//                 </p>
//               </div>
//               <button className="rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold capitalize text-[#5A0C3D] sm:text-[14px]">
//                 Discover
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import Image from "next/image";
import Link from "next/link";

async function getDetailedCallout() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_API}/api/detailed-callout`,
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function DetailedCalloutSection() {
  const response = await getDetailedCallout();

  if (!response.length) return null;

  const data = response[0];

  return (
    <section className="flex w-full flex-col bg-white lg:flex-row">
      {/* LEFT BANNER */}

      <div className="relative flex min-h-[420px] flex-1 items-end overflow-hidden sm:min-h-[520px] h-[912px]">
        <Image
          src={data.featured.image}
          alt={data.featured.title}
          fill
          priority
          sizes="(max-width:1024px) 100vw, 50vw"
          className="object-cover object-top"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        <div className="relative z-10 flex flex-col items-start gap-6 p-8 md:p-12">
          <div className="flex flex-col gap-3">
            <p className="text-[13px] uppercase text-white sm:text-[14px]">
              {data.featured.categoryName}
            </p>

            <h3 className="max-w-[520px] text-[30px] font-semibold capitalize leading-[1.2] tracking-[-0.03em] text-white sm:text-[44px]">
              {data.featured.title}
            </h3>
          </div>

          <Link href="/products">
            <button className="rounded-full bg-white px-5 py-3 text-[16px] font-semibold text-[#5A0C3D] sm:text-[18px]">
              {data.featured.cta.text}
            </button>
          </Link>
        </div>
      </div>

      {/* RIGHT GRID */}

      <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
        {data.items.map((item, index) => (
          <div
            key={index}
            className="relative flex min-h-[260px] items-end overflow-hidden"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width:640px) 100vw, 25vw"
              className="object-cover object-top"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            <div className="relative z-10 flex flex-col items-start gap-3 p-6">
              <div className="flex flex-col gap-1.5">
                <p className="text-[11px] uppercase text-white sm:text-[12px]">
                  {item.categoryName}
                </p>

                <p className="max-w-[280px] text-[20px] font-semibold capitalize leading-[1.2] tracking-[-0.03em] text-white sm:text-[28px]">
                  {item.title}
                </p>
              </div>

              <Link href="/products">
                <button className="rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold text-[#5A0C3D] sm:text-[14px]">
                  {item.cta.text}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
