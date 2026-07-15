"use client";

import { ChevronDown, Search, Star, Tag } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "../data";

// const ADMIN_API = process.env.NEXT_PUBLIC_ADMIN_API || "http://localhost:3000";
const ADMIN_API = process.env.NEXT_PUBLIC_ADMIN_API;

export default function BottomUtilityBar() {
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${ADMIN_API}/api/navbar-categories`, {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();

        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Category fetch error:", error);
        setCategories([]);
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-6 border-t border-black/5 bg-white px-4 py-3 sm:px-8 md:px-16">
      {/* Left Fixed Section */}
      <div className="flex shrink-0 items-center gap-3">
        {/* Category Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex w-[226px] items-center justify-between gap-4 rounded-full border border-black/10 bg-[#F8F8F8] py-2 pl-3 pr-2"
          >
            <span className="text-[14px] sm:text-[16px]">Select Category</span>

            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white">
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
                strokeWidth={1.5}
              />
            </span>
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 top-full z-50 mt-2 w-[226px] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <Link
                    key={category._id}
                    href={category.href}
                    onClick={() => setDropdownOpen(false)}
                    className="block border-b border-black/5 px-4 py-3 text-[15px] capitalize transition hover:bg-[#F8F8F8] last:border-b-0"
                  >
                    {category.name}
                  </Link>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500">
                  No categories found
                </div>
              )}
            </div>
          )}
        </div>

        {/* New In */}
        <Link href="/products/new-arrivals">
          <button className="flex items-center gap-2 rounded-full border border-black/20 bg-white px-3 py-2.5 text-[14px] sm:text-[16px]">
            <Star
              className="h-[18px] w-[18px] text-[#5A0C3D]"
              strokeWidth={1.3}
            />
            New In
          </button>
        </Link>

        {/* Offers */}
        <Link href="/">
          <button className="flex items-center gap-2 rounded-full border border-black/20 bg-white px-3 py-2.5 text-[14px] sm:text-[16px]">
            <Tag
              className="h-[18px] w-[18px] text-[#5A0C3D]"
              strokeWidth={1.3}
            />
            Offers
          </button>
        </Link>

        {/* Search */}
        <div className="flex h-[52px] w-[402px] items-center justify-between rounded-full border border-black/20 bg-[#F8F8F8] py-2 pl-3 pr-2">
          <input
            type="text"
            placeholder="search..."
            className="w-full bg-transparent text-[14px] lowercase outline-none placeholder:text-black sm:text-[16px]"
          />

          <span className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5A0C3D]">
            <Search className="h-4 w-4 text-white" strokeWidth={2} />
          </span>
        </div>
      </div>

      {/* Scrollable Category Pills */}
      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="scrollbar-hide flex items-center gap-3 overflow-x-auto whitespace-nowrap">
          {categories.map((c) => (
            <Link key={c._id} href="/products">
              <button className="shrink-0 rounded-full border border-black/20 bg-white px-4 py-2.5 text-[14px] transition-colors hover:bg-[#F8F8F8] sm:text-[16px]">
                {c.name}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
