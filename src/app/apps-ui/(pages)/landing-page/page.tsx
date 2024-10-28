"use client";

import { Infinite } from "@/components/reusable-component/Infinite";
import { Subscribe } from "@/components/reusable-component/Subscribe";
import { Transcribed } from "@/components/reusable-component/Transcribed";
import { useState } from "react";
import { PofconModal } from "@/components/reusable-component/PofconModal";
import { Events } from "./landing-page/EventsCarousel";
import { GallerySection } from "./landing-page/GallerySection";
import { HeroPage } from "./landing-page/HeroPage";
import { Malikhain } from "./landing-page/Malikhain";



export default function LandingPage() {
  const [showPofconModal, setShowPofconModal] = useState(false); // Modal state
    return (
      <main className="w-full h-fit text-primary-2">
        <HeroPage setShowPofconModal={setShowPofconModal} />
        {showPofconModal && <PofconModal setShowPofconModal={setShowPofconModal} />}
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

  