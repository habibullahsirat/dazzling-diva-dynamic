"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function TopPromoBar() {
  const [showPromo, setShowPromo] = useState(true);

  if (!showPromo) return null;

  return (
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
  );
}
