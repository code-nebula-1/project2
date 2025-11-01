"use client";

import { Pill } from "@/components/pill";
import { CTAButton } from "@/components/ui/cta-button";
import {
  Atom,
  Brain,
  Dna,
  Zap,
  Target,
  Users,
  Award,
  Lightbulb,
} from "lucide-react";

export function Values() {

  const values = [
    {
      title: "Innovation",
      description:
        "We push the boundaries of what's possible through creative problem-solving and cutting-edge research methodologies.",
      icon: Lightbulb,
    },
    {
      title: "Collaboration",
      description:
        "We believe in the power of teamwork and diverse perspectives to drive meaningful progress across disciplines.",
      icon: Users,
    },
    {
      title: "Excellence",
      description:
        "We maintain the highest standards in research quality, ethical practices, and scientific rigor.",
      icon: Award,
    },
    {
      title: "Impact",
      description:
        "We focus on research that creates real-world solutions and advances the field of robotics.",
      icon: Target,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Core Values */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Core Values
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl text-pretty">
              Our core values guide every aspect of our research and
              collaboration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                  <p className="text-foreground/70 text-pretty">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
