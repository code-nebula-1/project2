"use client";

import Link from "next/link";
import { Pill } from "./pill";
import { CTAButton } from "./ui/cta-button";

export function Hero() {
  return (
    <div className="flex flex-col h-svh justify-center text-center relative">
      <div className="pb-16">
        <Pill className="mb-6">RESEARCH & INNOVATION</Pill>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient">
          Advancing the <br />
          <i className="font-light">frontiers</i> of science
        </h1>
        <p className="font-mono text-sm sm:text-base text-foreground/60 text-balance mt-8 max-w-[440px] mx-auto">
          Pioneering breakthrough discoveries through interdisciplinary research
          and collaboration
        </p>

        <CTAButton href="/contact" className="mt-14 max-sm:hidden" size="lg">
          [Join Our Research]
        </CTAButton>
        <CTAButton href="/contact" className="mt-14 sm:hidden" size="sm">
          [Join Our Research]
        </CTAButton>
      </div>
    </div>
  );
}
