"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import Image from "next/image";
import { Team } from "@/components/team"

export default function Teams() {
  const teamMember = {
    name: "Dr. Samantha Reig",
    role: "Assistant Professor, Miner School of Computer & Information Sciences",
    contact: "Sam_Reig@uml.edu",
    blurb: "Samantha Reig is a human-computer interaction (HCI) and human-robot interaction (HRI) researcher. Her research areas include human-autonomy trust, socially complex human-robot interaction, and personalized experiences with AI agents in services. Her areas of expertise include multi-embodiment interactions, social robotics, and experimental design. She received her Ph.D. in HCI from the Human-Computer Interaction Institute at Carnegie Mellon University in 2023 and her undergraduate degree from Cornell University. If she had to describe her interests in emoji, here’s what she’d say: 🤖💻😺🍜🗺️🌄🌲🥾🎶🎭📚",
    image: "/Photos/Headshots/sam-headshot.png"
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-[5svh]">
      </section>

      {/* Main Profile Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
            {/* Profile Image and Basic Info */}
              <Team />
        </div>
      </section>
    </div>
  );
}
