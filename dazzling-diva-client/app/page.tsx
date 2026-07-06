"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ShoppingBag,
  User,
  Search,
  ChevronDown,
  MapPin,
  Mail,
  Copy,
  Tag,
  Star,
  // Facebook,
  // Twitter,
  // Instagram,
  ArrowRight,
} from "lucide-react";

/* -------------------------------------------------------------------------
   STATIC DATA
   Replace the `img` paths below with your real asset paths — filenames
   match the ones referenced in the original Figma CSS (e.g. fs4_2_1.png,
   fs8_hero.png, Untitled-1-04.png) so you can drop this straight into your
   /public/images folder.
------------------------------------------------------------------------- */

const CATEGORIES = [
  "Tops",
  "Stitched Dress",
  "Blouse & Inskirt",
  "Co-Ord",
  "Unstitched Dress",
  "Single Kamiz",
  "Orna",
  "Sharee",
];

const CATEGORY_CARDS = [
  { name: "Sharee", img: "/images/card1.jpg" },
  { name: "Unstitched", img: "/images/card2.jpg" },
  { name: "Co-Ord Sets", img: "/images/card3.jpg" },
  { name: "Single Kamiz", img: "/images/card4.jpg" },
];

const FLASH_DEAL_PRODUCTS = [
  {
    name: "Cotton Sharee",
    img: "/images/fs4_2_1.png",
    price: 1450,
    oldPrice: 2100,
    discount: "30%",
  },
  {
    name: "Silk Blouse",
    img: "/images/fs4_1_2.png",
    price: 890,
    oldPrice: 1200,
    discount: "26%",
  },
  {
    name: "Co-Ord Set",
    img: "/images/fs4_3_1.png",
    price: 2100,
    oldPrice: 2800,
    discount: "25%",
  },
  {
    name: "Kamiz Set",
    img: "/images/fs4_7_2.png",
    price: 1650,
    oldPrice: 2400,
    discount: "31%",
  },
];

const NEW_ARRIVALS = [
  { name: "Printed Sharee", img: "/images/fs4_2_1.png", price: 1650 },
  { name: "Embroidered Blouse", img: "/images/fs4_1_2.png", price: 950 },
  { name: "Festive Co-Ord", img: "/images/fs4_3_1.png", price: 2350 },
  { name: "Chikankari Kamiz", img: "/images/fs8_testi_4.png", price: 1800 },
  { name: "Handloom Sharee", img: "/images/fs4_4_2.png", price: 2100 },
  { name: "Party Blouse", img: "/images/fs4_2_2.png", price: 1100 },
  { name: "Casual Kamiz", img: "/images/fs4_3_2.png", price: 1400 },
];

const FEATURED_COLLECTION = [
  { img: "/images/fs4_1_2.png" },
  { img: "/images/fs4_2_2.png" },
  { img: "/images/fs4_3_2.png" },
];

const DETAIL_CALLOUTS = [
  {
    title: "New In",
    text: "Festive Sharee Edit",
    img: "/images/fs8_testi_1.png",
  },
  {
    title: "Trending",
    text: "Everyday Co-Ord",
    img: "/images/fs8_testi_2.png",
  },
  {
    title: "Limited",
    text: "Hand-Embroidered",
    img: "/images/fs8_testi_3.png",
  },
  {
    title: "Popular",
    text: "Single Kamiz Sets",
    img: "/images/fs8_testi_4.png",
  },
];

function pad(n) {
  return n.toString().padStart(2, "0");
}

/* -------------------------------------------------------------------------
   MAIN COMPONENT
------------------------------------------------------------------------- */

export default function LandingPage() {
  const [showPromo, setShowPromo] = useState(true);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);

  const [countdown, setCountdown] = useState({ d: 1, h: 12, m: 45, s: 30 });

  useEffect(() => {
    const t = setInterval(() => {
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
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setHeroSlide((s) => (s + 1) % 5), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full bg-white font-['Outfit',sans-serif] text-black overflow-x-hidden">
      {/* ---------------------------------------------------------------
          TOP PROMO BAR
      --------------------------------------------------------------- */}
      {showPromo && (
        <div className="flex items-center justify-center gap-3 bg-[#5A0C3D] px-4 py-2.5 text-center sm:px-8 md:px-16">
          <p className="text-[12px] leading-[18px] text-white sm:text-[14px]">
            Free delivery on orders over ৳2000 — Limited time offer
          </p>
          <button
            aria-label="Close promo banner"
            onClick={() => setShowPromo(false)}
            className="flex h-[18px] w-[18px] shrink-0 items-center justify-center"
          >
            <X className="h-3.5 w-3.5 text-white" strokeWidth={1.5} />
          </button>
        </div>
      )}

      {/* ---------------------------------------------------------------
          NAVBAR
      --------------------------------------------------------------- */}
      <header className="sticky top-0 z-40 w-full bg-[#F8F8F8]">
        <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-8 md:px-16 md:py-6">
          {/* Hamburger */}
          <button
            aria-label="Open categories menu"
            onClick={() => setCategoryMenuOpen(true)}
            className="flex flex-col items-start justify-center gap-[6px] shrink-0"
          >
            <span className="block h-[2px] w-[36px] bg-black md:w-[59px]" />
            <span className="block h-[2px] w-[28px] bg-black md:w-[48px]" />
            <span className="block h-[2px] w-[20px] bg-black md:w-[36px]" />
          </button>

          {/* Logo */}
          {/* <a
            href="/"
            className="text-lg font-bold tracking-tight text-[#5A0C3D] sm:text-2xl"
          >
            PRO&nbsp;SHOP
          </a> */}

          {/* Desktop nav links */}
          <div className="hidden items-center gap-2 md:flex">
            <a
              href="#"
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-[16px] font-medium hover:bg-white"
            >
              <MapPin className="h-[18px] w-[18px]" strokeWidth={1.3} />
              Track Order
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-[16px] font-medium hover:bg-white"
            >
              <Tag className="h-[18px] w-[18px]" strokeWidth={1.3} />
              Compare
            </a>
            <div className="ml-2 flex items-center gap-3">
              <button
                aria-label="Cart"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 bg-white"
              >
                <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.3} />
              </button>
              <button
                aria-label="Account"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/20 bg-white"
              >
                <User className="h-[18px] w-[18px]" strokeWidth={1.3} />
              </button>
            </div>
          </div>

          {/* Mobile: cart + account only */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              aria-label="Cart"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/20 bg-white"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.3} />
            </button>
            <button
              aria-label="Account"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-black/20 bg-white"
            >
              <User className="h-4 w-4" strokeWidth={1.3} />
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------------------
            BOTTOM UTILITY BAR: dropdown / new-in / offers / search / chips
        --------------------------------------------------------------- */}
        <div className="scrollbar-hide flex items-center gap-3 overflow-x-auto border-t border-black/5 bg-white px-4 py-3 sm:px-8 md:px-16">
          <button className="flex shrink-0 items-center gap-4 rounded-full border border-black/10 bg-[#F8F8F8] py-2 pl-3 pr-2 text-[14px] sm:text-[16px]">
            All Products
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white">
              <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
            </span>
          </button>

          <button className="flex shrink-0 items-center gap-2 rounded-full border border-black/20 bg-white px-3 py-2.5 text-[14px] sm:text-[16px]">
            <Star
              className="h-[18px] w-[18px] text-[#5A0C3D]"
              strokeWidth={1.3}
            />
            New In
          </button>

          <button className="flex shrink-0 items-center gap-2 rounded-full border border-black/20 bg-white px-3 py-2.5 text-[14px] sm:text-[16px]">
            <Tag
              className="h-[18px] w-[18px] text-[#5A0C3D]"
              strokeWidth={1.3}
            />
            Offers
          </button>

          <div className="flex shrink-0 items-center gap-3 rounded-full border border-black/20 bg-[#F8F8F8] py-2 pl-3 pr-2">
            <input
              placeholder="search"
              className="w-[70px] bg-transparent text-[14px] lowercase outline-none placeholder:text-black sm:w-[90px] sm:text-[16px]"
            />
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5A0C3D]">
              <Search className="h-3.5 w-3.5 text-white" strokeWidth={2} />
            </span>
          </div>

          {CATEGORIES.map((c) => (
            <button
              key={c}
              className="shrink-0 rounded-full border border-black/20 bg-white px-4 py-2.5 text-[14px] whitespace-nowrap sm:text-[16px]"
            >
              {c}
            </button>
          ))}
        </div>
      </header>

      {/* ---------------------------------------------------------------
          CATEGORY SLIDE-OVER MENU (hamburger click)
      --------------------------------------------------------------- */}
      {categoryMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setCategoryMenuOpen(false)}
          />
          <div className="relative flex h-full w-[85%] max-w-[380px] flex-col bg-white p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xl font-bold text-[#5A0C3D]">
                Categories
              </span>
              <button
                aria-label="Close categories menu"
                onClick={() => setCategoryMenuOpen(false)}
              >
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col divide-y divide-black/10">
              {CATEGORIES.map((c) => (
                <a
                  key={c}
                  href="#"
                  onClick={() => setCategoryMenuOpen(false)}
                  className="flex items-center justify-between py-4 text-[17px] font-medium capitalize hover:text-[#5A0C3D]"
                >
                  {c}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------------------
          HERO
      --------------------------------------------------------------- */}
      <section
        className="relative h-[320px] w-full bg-cover bg-center sm:h-[420px] md:h-[525px]"
        style={{ backgroundImage: "url(/images/source_image.png)" }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-start gap-2.5 p-2.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1 rounded-full bg-white transition-all ${
                i === heroSlide
                  ? "w-[45px] sm:w-[180px] opacity-100"
                  : "w-[12px] sm:w-[50px] opacity-60"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------
          CATEGORY SECTION
      --------------------------------------------------------------- */}
      <section className="flex flex-col items-center gap-8 px-4 py-12 sm:px-8 md:gap-12 md:px-16">
        <div className="flex max-w-[610px] flex-col items-center gap-2 text-center">
          <p className="text-[16px] capitalize sm:text-[18px]">Shop by</p>
          <h2 className="text-[30px] font-normal uppercase leading-tight sm:text-[40px] md:text-[48px] md:leading-[60px]">
            Category
          </h2>
        </div>

        <div className="grid w-full max-w-[1312px] grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_CARDS.map((card) => (
            <div
              key={card.name}
              className="relative flex h-[380px] items-end rounded-xl bg-cover bg-center p-6 sm:h-[447px]"
              style={{
                backgroundImage: `linear-gradient(179.94deg, rgba(0,0,0,0) 60.06%, #000000 99.95%), url(${card.img})`,
              }}
            >
              <div className="flex flex-col gap-2.5">
                <p className="text-[22px] font-semibold capitalize text-white sm:text-[26px]">
                  {card.name}
                </p>
                <a
                  href="#"
                  className="flex items-center gap-2.5 text-[14px] capitalize text-white"
                >
                  Explore
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.3} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------
          FLASH DEALS SECTION
      --------------------------------------------------------------- */}
      <section
        className="relative flex flex-col items-center gap-10 overflow-hidden bg-[#5A0C3D] bg-cover bg-center px-4 py-16 sm:px-8 md:px-16"
        style={{
          backgroundImage:
            "linear-gradient(270deg, rgba(90,12,61,0.85) 0%, #5A0C3D 100%), url(/images/fd1.jpg)",
        }}
      >
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="text-[32px] font-bold uppercase leading-none text-white sm:text-[48px]">
              Flash
            </span>
            <span className="relative flex items-center justify-center px-2">
              <span className="absolute inset-[-4px] -rotate-3 rounded bg-white" />
              <span
                className="relative z-10 text-[32px] italic text-[#5A0C3D] sm:text-[48px]"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                up to
              </span>
            </span>
            <span className="text-[32px] font-bold uppercase leading-none text-white sm:text-[48px]">
              Sale
            </span>
          </div>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-3">
            {[
              ["Days", countdown.d],
              ["Hours", countdown.h],
              ["Minutes", countdown.m],
              ["Seconds", countdown.s],
            ].map(([label, value], i) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center bg-white px-4 py-3 sm:px-[18px]">
                    <span className="text-[20px] font-bold uppercase text-[#5A0C3D] sm:text-[24px]">
                      {pad(value)}
                    </span>
                  </div>
                  <span className="mt-1 text-[12px] capitalize text-white sm:text-[16px]">
                    {label}
                  </span>
                </div>
                {i < 3 && <span className="mb-4 h-3.5 w-[5px] bg-white" />}
              </div>
            ))}
          </div>

          <p className="max-w-[560px] text-[16px] uppercase text-white sm:text-[22px]">
            Up to 40% off select styles
          </p>
          <p className="max-w-[301px] text-[14px] capitalize text-white sm:text-[16px]">
            While stocks last. Ends when the timer runs out.
          </p>
        </div>

        {/* Flash deal products */}
        <div className="grid w-full max-w-[1312px] grid-cols-2 gap-3 sm:grid-cols-4">
          {FLASH_DEAL_PRODUCTS.map((p) => (
            <div key={p.name} className="flex flex-col gap-3">
              <div
                className="relative h-[220px] rounded-xl bg-cover bg-center sm:h-[320px]"
                style={{ backgroundImage: `url(${p.img})` }}
              >
                <span className="absolute left-0 top-0 rounded-tl-xl rounded-br-lg bg-[#FF0000] px-3 py-1 text-[12px] font-bold capitalize text-white sm:text-[14px]">
                  -{p.discount}
                </span>
                <button
                  aria-label="Add to cart"
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-black/20 bg-white sm:h-10 sm:w-10"
                >
                  <ShoppingBag className="h-4 w-4" strokeWidth={1.3} />
                </button>
                <div className="absolute inset-x-2 bottom-2 flex items-center justify-center rounded-md bg-white py-2 text-[13px] capitalize sm:text-[14px]">
                  Options
                </div>
              </div>
              <p className="text-[15px] capitalize text-white sm:text-[18px]">
                {p.name}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-[16px] font-semibold capitalize text-white sm:text-[18px]">
                  ৳{p.price}
                </span>
                <span className="text-[13px] capitalize text-white/50 line-through sm:text-[14px]">
                  ৳{p.oldPrice}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------
          TWO COLUMN CALLOUT SECTION
      --------------------------------------------------------------- */}
      <section className="flex w-full flex-col bg-white md:flex-row">
        {[
          {
            label: "Everyday Wear",
            heading: "Comfort Meets Style",
            img: "/images/fs8_2.png",
          },
          {
            label: "Festive Edit",
            heading: "Celebrate In Colour",
            img: "/images/fs8_12.png",
          },
        ].map((col) => (
          <div
            key={col.label}
            className="flex min-h-[380px] flex-1 items-end bg-cover bg-center p-8 sm:min-h-[500px] md:p-12"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 50%, #000000 100%), url(${col.img})`,
            }}
          >
            <div className="flex flex-col items-start gap-6">
              <div className="flex flex-col gap-3">
                <p className="text-[13px] uppercase text-white sm:text-[14px]">
                  {col.label}
                </p>
                <h3 className="max-w-[520px] text-[30px] font-semibold capitalize leading-[1.2] tracking-[-0.03em] text-white sm:text-[44px]">
                  {col.heading}
                </h3>
              </div>
              <button className="rounded-full bg-white px-5 py-3 text-[16px] font-semibold capitalize text-[#5A0C3D] sm:text-[18px]">
                Discover
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* ---------------------------------------------------------------
          NEW ARRIVALS SECTION
      --------------------------------------------------------------- */}
      <section className="flex flex-col items-center gap-8 px-4 py-12 sm:px-8 md:gap-12 md:px-16">
        <div className="flex max-w-[610px] flex-col items-center gap-2 text-center">
          <p className="text-[16px] capitalize sm:text-[18px]">Fresh drops</p>
          <h2 className="text-[30px] font-normal uppercase leading-tight sm:text-[40px] md:text-[48px] md:leading-[60px]">
            New Arrivals
          </h2>
        </div>

        <div className="flex w-full max-w-[1312px] flex-wrap justify-center gap-3">
          {NEW_ARRIVALS.map((p) => (
            <div
              key={p.name}
              className="w-full min-w-[260px] max-w-[320px] flex-1 basis-[280px]"
            >
              <div
                className="relative h-[380px] bg-cover bg-center sm:h-[420px]"
                style={{ backgroundImage: `url(${p.img})` }}
              >
                <div className="absolute inset-x-4 bottom-3 flex items-center justify-between gap-2 bg-white px-3 py-2.5">
                  <div className="flex flex-col gap-1">
                    <p className="truncate text-[12px] font-medium capitalize">
                      {p.name}
                    </p>
                    <span className="text-[14px] font-semibold capitalize text-black/50">
                      ৳{p.price}
                    </span>
                  </div>
                  <button
                    aria-label="Add to cart"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/20 bg-white"
                  >
                    <ShoppingBag
                      className="h-[18px] w-[18px]"
                      strokeWidth={1.3}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="rounded-lg bg-[#5A0C3D] px-6 py-3 text-[16px] font-semibold capitalize text-white sm:text-[18px]">
          View All Products
        </button>
      </section>

      {/* ---------------------------------------------------------------
          DETAILED CALLOUT SECTION
      --------------------------------------------------------------- */}
      <section className="flex w-full flex-col bg-white lg:flex-row">
        <div
          className="flex min-h-[420px] flex-1 items-end bg-cover bg-center p-8 sm:min-h-[520px] md:p-12"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(0,0,0,0) 50%, #000000 100%), url(/images/fs4_4_2.png)",
          }}
        >
          <div className="flex flex-col items-start gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-[13px] uppercase text-white sm:text-[14px]">
                Edit
              </p>
              <h3 className="max-w-[520px] text-[30px] font-semibold capitalize leading-[1.2] tracking-[-0.03em] text-white sm:text-[44px]">
                Handpicked For You
              </h3>
            </div>
            <button className="rounded-full bg-white px-5 py-3 text-[16px] font-semibold capitalize text-[#5A0C3D] sm:text-[18px]">
              Discover
            </button>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
          {DETAIL_CALLOUTS.map((c) => (
            <div
              key={c.text}
              className="flex min-h-[260px] items-end bg-cover bg-center p-6 sm:min-h-[260px]"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 50%, #000000 100%), url(${c.img})`,
              }}
            >
              <div className="flex flex-col items-start gap-3">
                <div className="flex flex-col gap-1.5">
                  <p className="text-[11px] uppercase text-white sm:text-[12px]">
                    {c.title}
                  </p>
                  <p className="max-w-[280px] text-[20px] font-semibold capitalize leading-[1.2] tracking-[-0.03em] text-white sm:text-[28px]">
                    {c.text}
                  </p>
                </div>
                <button className="rounded-full bg-white px-4 py-2.5 text-[13px] font-semibold capitalize text-[#5A0C3D] sm:text-[14px]">
                  Discover
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------
          FEATURED COLLECTION SECTION
      --------------------------------------------------------------- */}
      <section className="flex flex-col items-center gap-8 px-4 py-12 sm:px-8 md:gap-12 md:px-16">
        <div className="flex max-w-[912px] flex-col items-center gap-2 text-center">
          <p className="text-[16px] capitalize sm:text-[18px]">Curated</p>
          <h2 className="text-[30px] font-normal uppercase leading-tight sm:text-[40px] md:text-[48px] md:leading-[60px]">
            Featured Collection
          </h2>
        </div>

        <div className="grid w-full max-w-[1312px] grid-cols-1 gap-3 sm:grid-cols-3">
          {FEATURED_COLLECTION.map((item, i) => (
            <div
              key={i}
              className="relative h-[420px] bg-cover bg-center sm:h-[560px] md:h-[650px]"
              style={{ backgroundImage: `url(${item.img})` }}
            >
              <button
                aria-label="Add to cart"
                className="absolute bottom-6 left-1/2 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-2 border-black/20 bg-white sm:h-20 sm:w-20"
              >
                <ShoppingBag
                  className="h-7 w-7 sm:h-9 sm:w-9"
                  strokeWidth={1.6}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------
          CALLOUT BANNER SECTION
      --------------------------------------------------------------- */}
      <section
        className="flex w-full items-end justify-center bg-cover bg-center px-4 py-10 sm:px-12 md:px-16"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(90,12,61,0) 50.1%, #5A0C3D 100%), url(/images/source_fs8_hero.png)",
          minHeight: "420px",
        }}
      >
        <div className="flex max-w-[1030px] flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <p className="text-[13px] uppercase text-white sm:text-[14px]">
              Pro Shop
            </p>
            <h3 className="text-[26px] font-semibold capitalize leading-[1.2] tracking-[-0.03em] text-white sm:text-[44px]">
              Effortless Style, Delivered To Your Door
            </h3>
          </div>
          <button className="rounded-full bg-white px-6 py-3 text-[16px] font-semibold capitalize text-[#5A0C3D] sm:text-[18px]">
            Discover
          </button>
        </div>
      </section>

      <div>
        <img src="/images/section_divider.png" alt="" />
      </div>

      {/* ---------------------------------------------------------------
          FOOTER
      --------------------------------------------------------------- */}
      <footer className="w-full">
        <div className="relative overflow-hidden bg-[#5A0C3D]">
          {/* Background Image */}
          <img
            src="/images/source_fs8_hero.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-65"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-[#5A0C3D]/90" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-10 px-4 py-12 sm:px-12 md:gap-12 md:px-32">
            <div className="flex max-w-[504px] flex-col items-center gap-3 text-center">
              <span className="text-2xl font-bold text-white">PRO SHOP</span>

              <p className="text-[16px] capitalize leading-[23px] text-white sm:text-[18px]">
                Bringing you thoughtfully made clothing, from everyday basics to
                festive statement pieces.
              </p>
            </div>

            <div className="flex w-full max-w-[1184px] flex-col flex-wrap items-start justify-between gap-10 sm:flex-row">
              {/* Contact */}
              <div className="flex flex-col items-start gap-5">
                <div className="flex items-center gap-2.5 text-[14px] text-white">
                  <MapPin className="h-[18px] w-[18px]" strokeWidth={1.2} />
                  <span>House 12, Road 5, Dhaka, Bangladesh</span>
                </div>

                <div className="flex items-center gap-2.5 text-[14px] text-white">
                  <Mail className="h-[18px] w-[18px]" strokeWidth={1.2} />
                  <span>hello@proshop.com</span>
                  <Copy className="h-[15px] w-[15px]" strokeWidth={1.2} />
                </div>

                <div className="text-[18px] font-bold tracking-wider text-white">
                  +880 1234 567890
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-10 sm:gap-16">
                <div className="flex flex-col items-start gap-5">
                  <span className="text-[16px] font-bold uppercase text-white">
                    Shop
                  </span>

                  <div className="flex flex-col items-start gap-2 text-[14px] text-white">
                    <a href="#">New In</a>
                    <a href="#">Offers</a>
                    <a href="#">Categories</a>
                    <a href="#">All</a>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-5">
                  <span className="text-[16px] font-bold uppercase text-white">
                    Company
                  </span>

                  <div className="flex flex-col items-start gap-2 text-[14px] text-white">
                    <a href="#">About</a>
                    <a href="#">Contact us</a>
                    <a href="#">Careers</a>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-5">
                  <span className="text-[16px] font-bold uppercase text-white">
                    Support
                  </span>

                  <div className="flex flex-col items-start gap-2 text-[14px] text-white">
                    <a href="#">Track order</a>
                    <a href="#">Returns</a>
                    <a href="#">FAQ</a>
                  </div>
                </div>
              </div>

              {/* Account */}
              <div className="flex flex-col items-start gap-5">
                <span className="text-[16px] font-bold uppercase text-white">
                  Account
                </span>

                <div className="flex flex-col items-start gap-2 text-[14px] text-white">
                  <a href="#">Sign in</a>
                  <a href="#">Wishlist</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center gap-4 bg-[#830554] px-4 py-6 sm:flex-row sm:justify-between sm:px-12 md:px-32">
          <p className="text-[14px] font-semibold text-white sm:text-[16px]">
            Copyright © 2026. Pro Shop. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {/* Social Icons */}
            {/* <Facebook className="h-5 w-5 text-white" /> */}
            {/* <Twitter className="h-5 w-5 text-white" /> */}
            {/* <Instagram className="h-5 w-5 text-white" /> */}
          </div>

          <div className="flex gap-6 text-[14px] font-semibold text-white sm:text-[16px]">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
