"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

function pad(value) {
  return String(value).padStart(2, "0");
}

export default function FlashDealsClient({ flashDeal }) {
  const [countdown, setCountdown] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });

  useEffect(() => {
    function updateCountdown() {
      const target = new Date(flashDeal.countdown).getTime();
      const now = Date.now();

      const diff = target - now;

      if (diff <= 0) {
        setCountdown({
          d: 0,
          h: 0,
          m: 0,
          s: 0,
        });
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));

      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({
        d,
        h,
        m,
        s,
      });
    }

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [flashDeal]);

  return (
    <section className="w-full">
      <div className="relative h-[620px] overflow-hidden">
        <Image
          src={flashDeal.image}
          alt={flashDeal.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#5A0C3D]/95 via-[#5A0C3D]/75 to-transparent" />

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-12">
            <div className="max-w-2xl">
              {/* Heading */}

              <h2 className="text-5xl font-extrabold uppercase text-white lg:text-6xl">
                {flashDeal.title}
              </h2>

              {/* Countdown */}

              <div className="mt-10 flex flex-wrap items-center gap-4">
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

              {/* Discount */}

              <h3 className="mt-8 text-3xl font-semibold uppercase text-white">
                {flashDeal.discountAmount}
              </h3>

              {/* Description */}

              <p className="mt-5 text-lg text-white whitespace-pre-line">
                {flashDeal.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
