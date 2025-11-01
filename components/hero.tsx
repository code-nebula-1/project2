"use client";

import { useEffect, useState } from "react";

import { CTAButton } from "./ui/cta-button";

export function Hero() {
  const [current, setCurrent] = useState(0);

  const images = [
    "/Photos/Other photos/IMG1.jpg",
    "/Photos/Other photos/IMG2.jpg",
    "/Photos/Other photos/IMG3.jpg",
    "/Photos/Other photos/IMG4.jpg"
]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000); // Change video every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-svh justify-center text-center relative overflow-hidden">
      {/* Video Carousel Background */}
      <div className="absolute inset-0 z-0">
        {
          <img
            src = {images[current]}
            alt = "Slideshow"
            style = {{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 1s ease-in-out"
            }}/>
        }
      </div>

      {/* Content */}
      <div className="relative z-10 pb-16">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient text-white">
          Advancing the <br />
          <i className="font-light">frontiers</i> of science
        </h1>
        <p className="font-mono text-sm sm:text-base text-white/80 text-balance mt-8 max-w-[440px] mx-auto">
          Pioneering breakthrough discoveries through interdisciplinary research
          and collaboration
        </p>

        <CTAButton href="/contact" className="mt-14 max-sm:hidden" size="lg" textStyle="bracket">
          Join Our Research
        </CTAButton>
        <CTAButton href="/contact" className="mt-14 sm:hidden" size="sm" textStyle="bracket">
          Join Our Research
        </CTAButton>
      </div>
    </div>
  );
}