"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingBag, User, MapPin, Tag, ArrowRight, X } from "lucide-react";
import Image from "next/image";

// const ADMIN_API = process.env.NEXT_PUBLIC_ADMIN_API || "http://localhost:3000";
const ADMIN_API = process.env.NEXT_PUBLIC_ADMIN_API;

export default function Navbar() {
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const url = `${ADMIN_API}/api/navbar-categories`;
      console.log("Fetching categories from:", url);

      try {
        const res = await fetch(url, { cache: "no-store" });

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const data = await res.json();
        console.log("Navbar Categories:", data);

        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Navbar fetch error:", error.message);
        setCategories([]);
      }
    }

    fetchCategories();
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 items-center px-3 py-3 sm:px-6 sm:py-4 md:px-10 md:py-5 lg:px-16 lg:py-6">
        {/* Left - Hamburger */}
        <div className="flex justify-start">
          <button
            aria-label="Open categories menu"
            onClick={() => setCategoryMenuOpen(true)}
            className="flex shrink-0 flex-col items-start justify-center gap-1 sm:gap-1.5"
          >
            <span className="block h-[2px] w-6 bg-black sm:w-8 md:w-10 lg:w-[59px]" />
            <span className="block h-[2px] w-5 bg-black sm:w-7 md:w-8 lg:w-[48px]" />
            <span className="block h-[2px] w-3.5 bg-black sm:w-5 md:w-6 lg:w-[36px]" />
          </button>
        </div>

        {/* Center Logo */}
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src="/images/Logo.png"
              alt="Logo"
              width={320}
              height={32}
              className="h-auto w-[130px] sm:w-[160px] md:w-[200px] lg:w-[260px]"
              priority
            />
          </Link>
        </div>

        {/* Right */}
        <div className="flex justify-end">
          {/* Tablet & Desktop */}
          <div className="hidden items-center gap-1 sm:flex md:gap-2">
            <Link
              href="/track-order"
              aria-label="Track Order"
              className="flex items-center gap-1.5 rounded-full px-2 py-2 text-[14px] font-medium hover:bg-white md:px-3 lg:text-[16px]"
            >
              <MapPin
                className="h-[16px] w-[16px] shrink-0 lg:h-[18px] lg:w-[18px]"
                strokeWidth={1.3}
              />
              <span className="hidden lg:inline">Track Order</span>
            </Link>

            <Link
              href="/compare"
              aria-label="Compare"
              className="flex items-center gap-1.5 rounded-full px-2 py-2 text-[14px] font-medium hover:bg-white md:px-3 lg:text-[16px]"
            >
              <Tag
                className="h-[16px] w-[16px] shrink-0 lg:h-[18px] lg:w-[18px]"
                strokeWidth={1.3}
              />
              <span className="hidden lg:inline">Compare</span>
            </Link>

            <div className="ml-1 flex items-center gap-2 md:ml-2 md:gap-3">
              <button
                aria-label="Cart"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/20 bg-white md:h-10 md:w-10"
              >
                <ShoppingBag
                  className="h-4 w-4 lg:h-[18px] lg:w-[18px]"
                  strokeWidth={1.3}
                />
              </button>

              <button
                aria-label="Account"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/20 bg-white md:h-10 md:w-10"
              >
                <User
                  className="h-4 w-4 lg:h-[18px] lg:w-[18px]"
                  strokeWidth={1.3}
                />
              </button>
            </div>
          </div>

          {/* Mobile only */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              aria-label="Cart"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-black/20 bg-white"
            >
              <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.3} />
            </button>

            <button
              aria-label="Account"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-black/20 bg-white"
            >
              <User className="h-3.5 w-3.5" strokeWidth={1.3} />
            </button>
          </div>
        </div>
      </div>

      {/* Category Drawer */}
      {categoryMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setCategoryMenuOpen(false)}
          />

          <div className="relative flex h-full w-[85%] max-w-[320px] flex-col bg-white p-5 shadow-xl sm:max-w-[360px] sm:p-6 md:max-w-[380px]">
            <div className="mb-5 flex items-center justify-between sm:mb-6">
              <span className="text-lg font-bold text-[#5A0C3D] sm:text-xl">
                Categories
              </span>

              <button
                aria-label="Close categories menu"
                onClick={() => setCategoryMenuOpen(false)}
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-col divide-y divide-black/10 overflow-y-auto">
              {categories
                .filter((category) => category?.href)
                .map((category) => (
                  <Link
                    key={category._id}
                    href={category.href}
                    onClick={() => setCategoryMenuOpen(false)}
                    className="flex items-center justify-between py-3.5 text-[15px] font-medium capitalize transition hover:text-[#5A0C3D] sm:py-4 sm:text-[17px]"
                  >
                    {category.name}
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </Link>
                ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
