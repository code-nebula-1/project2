"use client";

import { Hero } from "@/components/hero";
import { ResearchAreas } from "@/components/research-areas";
import { FeaturedProjects } from "@/components/featured-projects";
import { Publications } from "@/components/publications";
import { Contact } from "@/components/contact";
import { Values } from "@/components/value"

export default function Home() {
  return (
    <>
      <Hero />
      <ResearchAreas />
      <FeaturedProjects />
      <Publications />
      <Values />
    </>
  );
}
