import Image from "next/image";
import Link from "next/link";

async function getCallout() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_API}/api/callout`,
      {
        cache: "no-store",
      },
    );

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    return data[0] || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function CalloutBannerSection() {
  const callout = await getCallout();

  if (!callout) return null;

  return (
    <section className="relative flex min-h-[420px] w-full items-end justify-center overflow-hidden px-4 py-10 sm:px-12 md:px-16 h-[521px]">
      {/* Background Image */}

      <Image
        src={callout.image}
        alt={callout.title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
      />

      {/* Gradient Overlay */}

      <div className="absolute inset-0" />

      {/* Content */}

      <div className="relative z-10 flex max-w-[1030px] flex-col items-center gap-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <p className="text-[13px] uppercase text-white sm:text-[14px]">
            {callout.category}
          </p>

          <h3 className="text-[26px] font-semibold capitalize leading-[1.2] tracking-[-0.03em] text-white sm:text-[44px]">
            {callout.title}
          </h3>
        </div>

        <Link
          href={callout.cta?.href || "#"}
          className="rounded-full bg-white px-6 py-3 text-[16px] font-semibold capitalize text-[#5A0C3D] transition hover:bg-gray-100 sm:text-[18px]"
        >
          {callout.cta?.text || "Discover"}
        </Link>
      </div>
    </section>
  );
}
