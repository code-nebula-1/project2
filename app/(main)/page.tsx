"use client";

import { Hero } from "@/components/hero";
import { ResearchAreas } from "@/components/research-areas";
import { FeaturedProjects } from "@/components/featured-projects";
import { Publications } from "@/components/publications";
import { Contact } from "@/components/contact";
import { Values } from "@/components/value"
import { Header } from "@/components/header";

export default function Home() {
  return (
    <>
     <Header />
      <Hero />
      <ResearchAreas />
      <Values />
      <Contact />
    </>
  );
}
