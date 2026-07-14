import Hero from "@/components/hero/Hero";
import CategorySection from "@/components/CategorySection";
import FlashDealsSection from "@/components/flash-deal/FlashDealsSection";
import FlashDealProduct from "@/components/FlashDealProduct";
import TwoColumnCallout from "@/components/TwoColumnCallout";
import NewArrivalsSection from "@/components/NewArrivalsSection";
import DetailedCalloutSection from "@/components/DetailedCalloutSection";
import FeaturedCollectionSection from "@/components/FeaturedCollectionSection";
import CalloutBannerSection from "@/components/CalloutBannerSection";
import SectionDivider from "@/components/SectionDivider";

export default function LandingPage() {
  return (
    <div className="w-full bg-white font-['Outfit',sans-serif] text-black overflow-x-hidden">
      <Hero />
      <CategorySection />
      <FlashDealsSection />
      <FlashDealProduct />
      <TwoColumnCallout />
      <NewArrivalsSection />
      <DetailedCalloutSection />
      <FeaturedCollectionSection />
      <CalloutBannerSection />
      <SectionDivider />
    </div>
  );
}
