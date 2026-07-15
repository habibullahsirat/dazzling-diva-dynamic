"use client";

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { FLASH_DEAL_PRODUCTS } from "./data";
import { pad } from "./utils";

export default function FlashDealsSection() {
  const [countdown, setCountdown] = useState({
    d: 10,
    h: 3,
    m: 9,
    s: 50,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { d, h, m, s } = prev;

        if (s > 0) s--;
        else {
          s = 59;

          if (m > 0) m--;
          else {
            m = 59;

            if (h > 0) h--;
            else {
              h = 23;

              if (d > 0) d--;
            }
          }
        }

        return { d, h, m, s };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full">
      {/* ================= Banner ================= */}

      <div className="relative h-[520px] overflow-hidden">
        <Image
          src="/images/flash_deal_banner.jpg"
          alt="Flash Deals"
          fill
          priority
          // className="object-cover object-right-top scale-110"
          className="object-cover object-[90%_12%]"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#5A0C3D]/95 via-[#5A0C3D]/75 to-transparent" />

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
            <div className="max-w-2xl">
              {/* Heading */}

              <div className="flex items-center gap-5">
                <h2 className="text-6xl font-extrabold uppercase text-white">
                  Flash
                </h2>

                <span className="rotate-[-6deg] rounded bg-white px-3 py-1 font-serif text-5xl italic text-[#5A0C3D]">
                  Deals
                </span>

                <h2 className="text-6xl font-extrabold uppercase text-white">
                  Live Now
                </h2>
              </div>

              {/* Timer */}

              <div className="mt-10 flex items-center gap-4">
                {[
                  ["Days", countdown.d],
                  ["Hours", countdown.h],
                  ["Minutes", countdown.m],
                  ["Sec", countdown.s],
                ].map(([label, value], index) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="flex h-16 w-20 items-center justify-center bg-white">
                        <span className="text-3xl font-bold text-[#5A0C3D]">
                          {pad(value)}
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-white">{label}</p>
                    </div>

                    {index !== 3 && (
                      <span className="pb-6 text-4xl font-bold text-white">
                        :
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <h3 className="mt-8 text-3xl font-semibold uppercase text-white">
                UP TO <span className="text-yellow-300">50%</span> OFF
              </h3>

              <p className="mt-5 text-lg text-white">
                Because Every Woman Deserves To Shine.
                <br />
                Grab It Before It's Gone!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Products ================= */}

      <div className="-mt-2 bg-white py-10">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-4">
          {FLASH_DEAL_PRODUCTS.map((item) => (
            <div key={item.name}>
              <div className="group relative overflow-hidden rounded-xl">
                <Image
                  src={item.img}
                  alt={item.name}
                  width={500}
                  height={700}
                  className="w-full object-cover transition duration-300 group-hover:scale-105"
                />

                {/* Discount */}

                <span className="absolute left-0 top-0 rounded-br-lg bg-red-600 px-3 py-1 text-sm font-bold text-white">
                  -{item.discount}%
                </span>

                {/* Cart */}

                <button className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow">
                  <ShoppingBag size={18} />
                </button>

                {/* Button */}

                <button className="absolute bottom-3 left-3 right-3 rounded-md bg-white py-3 text-sm font-medium transition hover:bg-black hover:text-white">
                  Select Options
                </button>
              </div>

              <h3 className="mt-4 line-clamp-1 text-lg font-medium text-gray-900">
                {item.name}
              </h3>

              <div className="mt-2 flex items-center gap-3">
                <span className="text-xl font-bold">৳{item.price}</span>

                <span className="text-gray-400 line-through">
                  ৳{item.oldPrice}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
