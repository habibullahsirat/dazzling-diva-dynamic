import FlashDealsClient from "./FlashDealsClient";

async function getFlashDeal() {
  const res = await fetch("http://localhost:3000/api/flash-deals", {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();

  return data[0];
}

export default async function FlashDealsSection() {
  const flashDeal = await getFlashDeal();

  if (!flashDeal) return null;

  return <FlashDealsClient flashDeal={flashDeal} />;
}
