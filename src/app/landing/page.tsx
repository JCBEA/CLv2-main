"use client";

import _HeroSection from "./_herosection";
import _Footer from "@/components/_footer";
import _FramerMotionWrapper from "@/components/animations/_framermotionwrapper";
import _GSAPAnimation from "@/components/animations/_gsapanimation";

const LandingPage = () => {
  return (
    <main className="container mx-auto p-8">
      {/* Hero Section Wrapped in Framer Motion Wrapper for Animation */}
      <_FramerMotionWrapper>
        <_HeroSection />
      </_FramerMotionWrapper>

      {/* Some Custom Section with GSAP Animation */}
      <_GSAPAnimation>
        <section className="text-center my-16 p-8 border rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Discover Creativity</h2>
          <p className="text-lg">Unlock the full potential of your creative journey with Creative Legazpi.</p>
        </section>
      </_GSAPAnimation>

      <_Footer />
    </main>
  );
};

export default LandingPage;
