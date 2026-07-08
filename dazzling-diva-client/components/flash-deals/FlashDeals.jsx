import { ShoppingBag } from "lucide-react";

export default function FlashDeals() {
  return (
    <>
      <section
        className="relative flex flex-col items-center gap-10 overflow-hidden bg-[#5A0C3D] bg-cover bg-center px-4 py-16 sm:px-8 md:px-16"
        style={{
          backgroundImage:
            "linear-gradient(270deg, rgba(90,12,61,0) 0%, rgba(90,12,61, 1) 100%), url(/images/fd1.jpg)",
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
      </section>
    </>
  );
}
