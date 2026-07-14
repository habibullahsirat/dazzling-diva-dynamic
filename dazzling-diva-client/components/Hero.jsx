"use client";

import { useState, useEffect } from "react";

export default function Hero() {
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHeroSlide((s) => (s + 1) % 5), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="relative h-[320px] w-full bg-cover bg-center sm:h-[420px] md:h-[525px]"
      style={{ backgroundImage: "url(/images/hero.jpg)" }}
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-start gap-2.5 p-2.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <button
            key={i}
            onClick={() => setHeroSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1 rounded-full bg-white transition-all ${
              i === heroSlide ? "w-[45px] sm:w-[180px] opacity-100" : "w-[12px] sm:w-[50px] opacity-60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
