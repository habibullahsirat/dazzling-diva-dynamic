import Image from "next/image";

export default function SectionDivider() {
  return (
    <>
      <Image
        src="/images/section-divider-1.png"
        alt="Section Divider Image"
        width={2000}
        height={1000}
        className="object-top"
      />
    </>
  );
}
