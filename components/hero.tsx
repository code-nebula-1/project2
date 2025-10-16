"use client";

import { useEffect, useState } from "react";

import { CTAButton } from "./ui/cta-button";
import Link from "next/link";
import { Pill } from "./pill";

export function Hero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const videos = [
    {
      id: 1,
      url: "https://videos.pexels.com/video-files/8328042/8328042-uhd_2560_1440_25fps.mp4",
      title: "Human-Robot Interaction",
      fallback:
        "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      url: "https://videos.pexels.com/video-files/7868351/7868351-uhd_2560_1440_25fps.mp4",
      title: "Robotic Research",
      fallback:
        "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 3,
      url: "https://www.pexels.com/download/video/8328103/",
      title: "Robotic Research 3",
      fallback:
        "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
        setIsTransitioning(false);
      }, 500); // Half of transition duration
    }, 5000); // Change video every 5 seconds

    return () => clearInterval(interval);
  }, [videos.length]);

  return (
    <div className="flex flex-col h-svh justify-center text-center relative overflow-hidden">
      {/* Video Carousel Background */}
      <div className="absolute inset-0 z-0">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentVideoIndex && !isTransitioning
                ? "opacity-100"
                : "opacity-0"
            }`}
          >
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              onError={(e) => {
                // Fallback to image if video fails to load
                const target = e.target as HTMLVideoElement;
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = `<img src="${video.fallback}" alt="${video.title}" class="w-full h-full object-cover" />`;
                }
              }}
            >
              <source src={video.url} type="video/mp4" />
              <img
                src={video.fallback}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            </video>
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 pb-16">
        <Pill className="mb-6">RESEARCH & INNOVATION</Pill>
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

      {/* Video Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
        {videos.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentVideoIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentVideoIndex(index);
                setIsTransitioning(false);
              }, 500);
            }}
          />
        ))}
      </div>
    </div>
  );
}
