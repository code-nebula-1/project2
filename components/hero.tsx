"use client";

import { useEffect, useState } from "react";
import { CTAButton } from "./ui/cta-button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const slides = [
    {
      image: "/Photos/Other photos/IMG1.jpg",
      title: "Advancing the Frontiers of Science",
      subtitle: "Pioneering breakthrough discoveries through interdisciplinary research and collaboration",
    },
    {
      image: "/Photos/Other photos/IMG2.jpg",
      title: "Innovation Through Research",
      subtitle: "Exploring new horizons in scientific discovery and technological advancement",
    },
    {
      image: "/Photos/Other photos/IMG3.jpg",
      title: "Collaborative Excellence",
      subtitle: "Building partnerships that drive groundbreaking research and innovation",
    },
    {
      image: "/Photos/Other photos/IMG4.jpg",
      title: "Shaping Tomorrow's Solutions",
      subtitle: "Transforming ideas into impactful scientific achievements",
    },
  ];

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, slides.length]);

  const nextSlide = () => {
    setIsAutoPlay(false);
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIsAutoPlay(false);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlay(false);
    setCurrent(index);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Image Slides with Dark Background */}
      <div className="absolute inset-0 bg-black">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"
              }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Dark Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div
          key={current}
          className="animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-5xl leading-tight">
            {slides[current].title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 font-light">
            {slides[current].subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

            <CTAButton
              href="/publication"
              className="bg-transparent  text-white hover:bg-white/10 transition-colors"
              size="lg"
            >
              View Publications
            </CTAButton>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-200 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-200 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${index === current
              ? "bg-white w-8 h-2"
              : "bg-white/50 w-2 h-2 hover:bg-white/75"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}