import Image from "next/image";
import Link from "next/link";
import { MapPin, Mail, Copy } from "lucide-react";

// Facebook, Twitter, Instagram

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="/images/footer-background.png"
        alt="Footer Background"
        fill
        className="object-cover opacity-90"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#5A0C3D]/95" />

      {/* Main Footer */}
      <div className="relative z-10">
        <div className="flex flex-col items-center px-6 pt-12 md:px-16 lg:px-24">
          {/* Logo */}
          <Image
            src="/images/color-logo.png"
            alt="Logo"
            width={180}
            height={180}
            className="mb-4 h-auto"
          />

          {/* Description */}
          <p className="max-w-[560px] text-center text-lg leading-8 text-white">
            We Only Carry Designs We Believe In Ethically And Aesthetically –
            Original, Authentic Pieces That Are Made To Last.
          </p>

          {/* Content */}
          <div className="mt-16 grid w-full grid-cols-1 gap-10 md:grid-cols-5">
            {/* Contact */}
            <div className="space-y-5">
              <div className="flex items-start gap-3 text-white">
                <MapPin className="mt-1 h-5 w-5 shrink-0" strokeWidth={1.3} />
                <div className="text-sm leading-6">
                  29 SE 2nd Ave,
                  <br />
                  Miami Florida 33131,
                  <br />
                  United States
                </div>
              </div>

              <div className="flex items-center gap-3 text-white">
                <Mail className="h-5 w-5" strokeWidth={1.3} />
                <span className="text-sm">info@dazzling.com</span>
                <Copy className="h-4 w-4 cursor-pointer" strokeWidth={1.3} />
              </div>

              <p className="text-2xl font-bold text-white">(+92) 3942 7879</p>
            </div>

            {/* Pages */}
            <div>
              <h3 className="mb-5 text-lg font-bold uppercase text-white">
                Pages
              </h3>

              <div className="flex flex-col gap-3 text-sm text-white">
                <Link href="/">About Us</Link>
                <Link href="/">Gift Cards</Link>
                <Link href="/">Bundle Products</Link>
                <Link href="/">Blogs</Link>
              </div>
            </div>

            {/* Shopping */}
            <div>
              <h3 className="mb-5 text-lg font-bold uppercase text-white">
                Shopping
              </h3>

              <div className="flex flex-col gap-3 text-sm text-white">
                <Link href="/">Wishlist</Link>
                <Link href="/">Cart</Link>
                <Link href="/">Shop by Category</Link>
              </div>
            </div>

            {/* Information */}
            <div>
              <h3 className="mb-5 text-lg font-bold uppercase text-white">
                Information
              </h3>

              <div className="flex flex-col gap-3 text-sm text-white">
                <Link href="/">Track My Order</Link>
                <Link href="/">Corporate Enquires</Link>
                <Link href="/">FAQs</Link>
              </div>
            </div>

            {/* Account */}
            <div>
              <h3 className="mb-5 text-lg font-bold uppercase text-white">
                Account
              </h3>

              <div className="flex flex-col gap-3 text-sm text-white">
                <Link href="/">My Account</Link>
                <Link href="/">My Orders</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 border-t border-white/10 bg-[#830554]/70">
          <div className="flex flex-col items-center justify-between gap-6 px-6 py-6 md:flex-row md:px-16 lg:px-24">
            {/* Copyright */}
            <p className="text-sm font-medium text-white">
              Copyright ©{" "}
              <span className="text-[#9F77FF] font-semibold">Orbixon</span>{" "}
              2026. All rights reserved.
            </p>

            {/* Social */}
            {/* <div className="flex items-center gap-6">
              <Facebook className="h-5 w-5 cursor-pointer text-white transition hover:text-gray-300" />
              <Twitter className="h-5 w-5 cursor-pointer text-white transition hover:text-gray-300" />
              <Instagram className="h-5 w-5 cursor-pointer text-white transition hover:text-gray-300" />
            </div> */}

            {/* Policies */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-white">
              <Link href="/">Teams &amp; Condition</Link>
              <Link href="/">Privacy &amp; Policy</Link>
              <Link href="/">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
