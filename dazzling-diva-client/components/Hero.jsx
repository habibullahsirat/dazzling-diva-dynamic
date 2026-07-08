"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [heroes, setHeroes] = useState([]);
  const [heroSlide, setHeroSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch Hero Images from Admin Project
  useEffect(() => {
    async function fetchHeroes() {
      try {
        // const res = await fetch("http://localhost:3000/api/heroes");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_ADMIN_API}/api/heroes`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch heroes");
        }

        const data = await res.json();

        setHeroes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchHeroes();
  }, []);

  // Auto Slider
  useEffect(() => {
    if (heroes.length <= 1) return;

    const interval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroes.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [heroes]);

  if (loading) {
    return (
      <section className="flex h-[320px] items-center justify-center bg-gray-100 sm:h-[420px] md:h-[525px]">
        Loading...
      </section>
    );
  }

  if (heroes.length === 0) {
    return (
      <section className="flex h-[320px] items-center justify-center bg-gray-100 sm:h-[420px] md:h-[525px]">
        No Hero Found
      </section>
    );
  }

  return (
    <section className="relative h-[320px] w-full overflow-hidden sm:h-[420px] md:h-[525px]">
      {/* Hero Image */}
      <Image
        src={heroes[heroSlide].image}
        alt={`Hero ${heroSlide + 1}`}
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Slider Indicator */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2.5 p-2.5">
        {heroes.map((_, index) => (
          <button
            key={index}
            onClick={() => setHeroSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1 rounded-full bg-white transition-all duration-300 ${
              index === heroSlide
                ? "w-[45px] opacity-100 sm:w-[180px]"
                : "w-[12px] opacity-60 sm:w-[50px]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
