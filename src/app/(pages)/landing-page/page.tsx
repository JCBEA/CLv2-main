import { GallerySection } from "@/app/user-interface/landing-page/GallerySection";
import { HeroPage } from "@/app/user-interface/landing-page/HeroPage";
import { Malikhain } from "@/app/user-interface/landing-page/Malikhain";
import { Events } from "@/components/reusable-component/LandingEventsPage";
import { Infinite } from "@/components/reusable-component/Infinite";
import { Subscribe } from "@/components/reusable-component/Subscribe";
import { Transcribed } from "@/components/reusable-component/Transcribed";


export default function LandingPage() {
    return (
      <main className="w-full h-fit text-primary-2">
        <HeroPage />
        {/* <CreativeDirectory /> */}
        <Events />
        <GallerySection />
        <Malikhain />
        <Transcribed />
        <Infinite />
        <Subscribe />
      </main>
    );
  }