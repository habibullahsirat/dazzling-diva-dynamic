"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroSlider({ heroes }) {
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    if (heroes.length <= 1) return;

    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroes.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [heroes]);

  return (
    <section className="relative h-[320px] w-full overflow-hidden sm:h-[420px] md:h-[525px]">
      <Image
        src={heroes[heroSlide].image}
        alt={heroes[heroSlide].title || "Hero"}
        fill
        priority
        className="object-cover object-top"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Slider */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2.5">
        {heroes.map((_, index) => (
          <button
            key={index}
            onClick={() => setHeroSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1 rounded-full bg-white transition-all duration-300 ${
              heroSlide === index
                ? "w-[45px] opacity-100 sm:w-[180px]"
                : "w-[12px] opacity-60 sm:w-[50px]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
