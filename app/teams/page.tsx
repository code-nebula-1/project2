"use client";

import { CTAButton } from "@/components/ui/cta-button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  GraduationCap,
  Users,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

export default function Teams() {
  const teamMember = {
    name: "Dr. Samantha Reig",
    role: "Assistant Professor",
    email: "Sam_Reig@uml.edu",
    phone: "978-934-3654",
    office: "Dandeneau Hall",
    department: "Miner School of Computer & Information Sciences",
    college: "Kennedy College of Sciences",
    bio: "Dr. Samantha Reig is an Assistant Professor in the Miner School of Computer & Information Sciences at UMass Lowell. Her research focuses on Human-Robot Interaction and Human-Computer Interaction, bridging the gap between technology and human experience.",
    expertise: ["Human-Robot Interaction", "Human-Computer Interaction"],
    education: [
      {
        degree: "Doctor of Philosophy (Ph.D.)",
        field: "Human-Computer Interaction",
        institution: "Carnegie Mellon University",
      },
      {
        degree: "Bachelor of Arts (B.A.)",
        field: "Information Science, Psychology",
        institution: "Cornell University",
      },
    ],
    pronouns: "she/her/hers",
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-[20svh]">
      </section>

      {/* Main Profile Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Profile Image and Basic Info */}
            <div className="lg:col-span-1">
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border bg-card hover:bg-card/80">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-[4/5] overflow-hidden">
                      <Image
                        src="https://www.uml.edu/Images/Reig-Samantha_tcm18-376192.jpg?w=x"
                        alt={`${teamMember.name} - ${teamMember.role}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        width={400}
                        height={500}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-2xl font-semibold">
                        {teamMember.name}
                      </h3>
                      <p className="text-lg opacity-90">{teamMember.role}</p>
                      <p className="text-sm opacity-75 font-mono">
                        {teamMember.pronouns}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-4 h-4 text-primary" />
                        <a
                          href={`mailto:${teamMember.email}`}
                          className="text-sm text-primary hover:underline transition-colors"
                        >
                          {teamMember.email}
                        </a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-primary" />
                        <a
                          href={`tel:${teamMember.phone}`}
                          className="text-sm text-primary hover:underline transition-colors"
                        >
                          {teamMember.phone}
                        </a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground/60">
                          {teamMember.office}
                        </span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-foreground/60">
                        <span className="font-medium">Department:</span>{" "}
                        {teamMember.department}
                      </p>
                      <p className="text-sm text-foreground/60">
                        <span className="font-medium">College:</span>{" "}
                        {teamMember.college}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Information */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bio */}
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border bg-card hover:bg-card/80">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold flex items-center space-x-2 group-hover:text-primary transition-colors">
                      <Users className="w-6 h-6 text-primary" />
                      <span>About</span>
                    </h2>
                    <p className="text-foreground/70 leading-relaxed text-pretty">
                      {teamMember.bio}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Expertise */}
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border bg-card hover:bg-card/80">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold flex items-center space-x-2 group-hover:text-primary transition-colors">
                      <BookOpen className="w-6 h-6 text-primary" />
                      <span>Research Expertise</span>
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {teamMember.expertise.map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-sm px-4 py-2 bg-primary/10 text-primary border-primary/20"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border bg-card hover:bg-card/80">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold flex items-center space-x-2 group-hover:text-primary transition-colors">
                      <GraduationCap className="w-6 h-6 text-primary" />
                      <span>Education</span>
                    </h2>
                    <div className="space-y-4">
                      {teamMember.education.map((edu, index) => (
                        <div
                          key={index}
                          className="border-l-2 border-primary/20 pl-4 hover:border-primary/40 transition-colors"
                        >
                          <h3 className="font-semibold text-lg">
                            {edu.degree}
                          </h3>
                          <p className="text-primary font-medium">
                            {edu.field}
                          </p>
                          <p className="text-foreground/60">
                            {edu.institution}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
