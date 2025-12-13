"use client";

import { useEffect, useState } from "react";
import { CTAButton } from "./ui/cta-button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FloatingLocationMap } from "./floating-location-map";
import { useTranslation } from "@/lib/i18n";

interface HeroProps {
  showMap?: boolean;
  mapData?: {
    name: string;
    lat: number;
    lng: number;
  };
}

const imageDescriptions = [
  "Researchers collaborating in the PIERS Lab workspace",
  "Team members conducting experiments with advanced equipment",
  "PIERS Lab group discussion and brainstorming session",
  "Laboratory equipment and research tools in use",
];

export function Hero({ showMap = true, mapData }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const { t } = useTranslation();

  const images = [
    "/Photos/Other photos/IMG1.jpg",
    "/Photos/Other photos/IMG2.jpg",
    "/Photos/Other photos/IMG3.jpg",
    "/Photos/Other photos/IMG4.jpg",
  ];

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, images.length]);

  const nextSlide = () => {
    setIsAutoPlay(false);
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIsAutoPlay(false);
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlay(false);
    setCurrent(index);
  };

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-black"
      aria-roledescription="carousel"
      aria-label="PIERS Lab image carousel showcasing our research environment"
    >
      {/* Screen reader announcement for slide changes */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        Slide {current + 1} of {images.length}: {imageDescriptions[current]}
      </div>

      {/* Image Slides with Dark Background */}
      <div className="absolute inset-0 bg-black" aria-hidden="true">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"
              }`}
            aria-hidden={index !== current}
          >
            <img
              src={image}
              alt={imageDescriptions[index]}
              className="w-full h-full object-cover"
            />
            {/* Dark Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-10 max-w-5xl leading-tight">
            {t("hero.welcome")}
          </h1>
        </div>
      </div>

      {/* Floating Location Map Widget - Right Side */}
      {showMap && (
        <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
          <FloatingLocationMap
            personName={mapData?.name || "Research Lab"}
            latitude={mapData?.lat}
            longitude={mapData?.lng}
          />
        </div>
      )}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-200 group"
        aria-label={`Previous slide. Currently on slide ${current + 1} of ${images.length}`}
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" aria-hidden="true" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-200 group"
        aria-label={`Next slide. Currently on slide ${current + 1} of ${images.length}`}
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" aria-hidden="true" />
      </button>

      {/* Dot Indicators */}
      <nav
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2"
        role="tablist"
        aria-label="Carousel slide indicators"
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            role="tab"
            aria-selected={index === current}
            aria-label={`Go to slide ${index + 1} of ${images.length}`}
            className={`transition-all duration-300 rounded-full ${index === current
              ? "bg-white w-8 h-2"
              : "bg-white/50 w-2 h-2 hover:bg-white/75"
              }`}
          />
        ))}
      </nav>
    </section>
  );
}