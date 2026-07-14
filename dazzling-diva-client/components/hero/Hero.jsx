import HeroSlider from "./HeroSlider";

async function getHeroes() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/api/heroes`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch heroes:", error);
    return [];
  }
}

export default async function Hero() {
  const heroes = await getHeroes();

  if (heroes.length === 0) {
    return (
      <section className="flex h-[320px] items-center justify-center bg-gray-100 sm:h-[420px] md:h-[525px]">
        No Hero Found
      </section>
    );
  }

  return <HeroSlider heroes={heroes} />;
}
