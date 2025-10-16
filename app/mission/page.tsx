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

export default function Mission() {
  const researchAreas = [
    {
      title: "Autonomous Systems",
      description:
        "Developing intelligent robots that can operate independently in complex environments",
      icon: Atom,
    },
    {
      title: "Human-Robot Interaction",
      description:
        "Creating seamless collaboration between humans and robotic systems",
      icon: Users,
    },
    {
      title: "AI & Machine Learning",
      description:
        "Advanced algorithms powering next-generation robotics capabilities",
      icon: Brain,
    },
    {
      title: "Robotic Manipulation",
      description:
        "Precision control and manipulation capabilities for industrial applications",
      icon: Zap,
    },
  ];

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

  const stats = [
    { number: "2020", label: "Established" },
    { number: "25+", label: "Researchers" },
    { number: "12+", label: "Active Projects" },
    { number: "50+", label: "Publications" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col h-svh justify-center text-center relative">
        <div className="pb-16">
          <Pill className="mb-6">OUR MISSION</Pill>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient">
            Advancing the <br />
            <i className="font-light">frontiers</i> of robotics
          </h1>
          <p className="font-mono text-sm sm:text-base text-foreground/60 text-balance mt-8 max-w-[440px] mx-auto">
            Pioneering breakthrough discoveries through interdisciplinary
            research and collaboration in robotics
          </p>
          <CTAButton className="mt-14" size="lg" textStyle="bracket">
            Join Our Mission
          </CTAButton>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Our Mission Statement
              </h2>
              <p className="text-lg text-foreground/70 max-w-3xl text-pretty">
                To advance the field of robotics through groundbreaking
                research, innovative technology development, and collaborative
                partnerships that create intelligent systems capable of solving
                complex real-world challenges.
              </p>
            </div>

            <div className="p-8 rounded-lg border border-border bg-card">
              <p className="text-lg text-foreground/80 leading-relaxed text-pretty">
                We strive to bridge the gap between theoretical research and
                practical applications, ensuring our work has meaningful impact
                on society. Our interdisciplinary approach combines cutting-edge
                technology with human-centered design to create robots that
                enhance human capabilities and improve quality of life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="relative py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Research Focus
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl text-pretty">
              We focus on cutting-edge research areas that drive the future of
              robotics technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {researchAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div
                  key={index}
                  className="group p-8 rounded-lg border border-border bg-card hover:bg-card/80 transition-all duration-300"
                >
                  <Icon className="w-10 h-10 mb-4 text-primary" />
                  <h3 className="text-2xl font-bold mb-3">{area.title}</h3>
                  <p className="text-foreground/70 leading-relaxed text-pretty">
                    {area.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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

      {/* Lab Statistics */}
      <section className="relative py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Lab Impact
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl text-pretty">
              Numbers that reflect our commitment to advancing robotics research
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-16">
              <Pill className="mb-6">OUR VISION</Pill>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Shaping the Future of{" "}
                <span className="text-primary">Robotics</span>
              </h2>
              <p className="text-lg text-foreground/70 max-w-3xl text-pretty">
                We envision a future where intelligent robots seamlessly
                integrate into human society, enhancing our capabilities and
                improving quality of life. Our research aims to create robots
                that are not just tools, but true partners in solving the
                world's most pressing challenges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Ethical AI and robotics development</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Sustainable and accessible technology</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Human-centered design principles</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Global collaboration and knowledge sharing</span>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Atom className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Future Robotics</h3>
                    <p className="text-foreground/70">
                      Innovation for Humanity
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <CTAButton variant="primary" size="lg" textStyle="bracket">
              Join Our Mission
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
