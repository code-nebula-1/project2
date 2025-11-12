"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import Image from "next/image";
import { Publications } from "@/components/publications"

export default function Publication() {

  return (
    <div className="min-h-screen">

      {/* Main Profile Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
            {/* Profile Image and Basic Info */}
              <Publications />
        </div>
      </section>
    </div>
  );
}