import {
  Users,
  Cpu,
  HandHeart,
  Eye,
  Brain,
  Zap,
  Shield,
  Target,
  Network,
  Layers,
  Workflow,
} from "lucide-react";

export function ResearchAreas() {
  const featuredArea = {
    title: "Human-Robot Interaction",
    description:
      "Investigating how humans and robots can work together effectively in collaborative environments, focusing on trust, communication, and intuitive interfaces that bridge the gap between human cognition and robotic capabilities.",
    icon: Users,
    keyFocus: [
      "Trust and Communication",
      "Intuitive Interfaces",
      "Collaborative Environments",
      "Human Cognition Integration",
    ],
    applications: [
      "Manufacturing",
      "Healthcare",
      "Service Industries",
      "Research Labs",
    ],
  };

  const featureCards = [
    {
      title: "Human-Computer Interaction",
      description:
        "Designing and evaluating user interfaces that enhance human capabilities, with emphasis on accessibility, usability, and user experience in complex systems.",
      icon: Cpu,
      keyAreas: [
        "Accessibility Design",
        "Usability Testing",
        "User Experience",
        "Complex Systems",
      ],
    },
    {
      title: "Collaborative Robotics",
      description:
        "Developing robotic systems that can safely and effectively collaborate with human workers in manufacturing, healthcare, and service environments.",
      icon: HandHeart,
      keyAreas: [
        "Safety Protocols",
        "Manufacturing",
        "Healthcare",
        "Service Industries",
      ],
    },
    {
      title: "User Experience Research",
      description:
        "Studying how people interact with technology through empirical research methods, usability testing, and user-centered design approaches.",
      icon: Eye,
      keyAreas: [
        "Empirical Methods",
        "Usability Testing",
        "User-Centered Design",
        "Technology Interaction",
      ],
    },
  ];

  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header Content */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary mb-4 tracking-wide uppercase">
            RESEARCH EXCELLENCE
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
            Elevate your research to the next level
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto text-pretty">
            Whether you're managing complex projects, collaborating with your
            team, or customizing your research workflow, our interdisciplinary
            approach empowers you to work smarter and accomplish more.
          </p>
        </div>

        {/* Featured Card */}
        <div className="mb-12">
          <div className="relative group">
            <div className="relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300">
              {/* Background Element */}
              <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 rounded-xl" />
              </div>

              {/* Content */}
              <div className="relative p-8 md:p-12">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <featuredArea.icon className="w-6 h-6 text-primary" />
                      <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors">
                        {featuredArea.title}
                      </h3>
                    </div>
                    <p className="text-foreground/70 text-lg leading-relaxed max-w-2xl">
                      {featuredArea.description}
                    </p>
                  </div>

                  {/* Research Focus Areas */}
                  <div className="w-full lg:w-96 space-y-6">
                    {/* Key Focus Areas */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-foreground/80 uppercase tracking-wide">
                        Key Focus Areas
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {featuredArea.keyFocus.map((focus, index) => (
                          <div
                            key={index}
                            className="p-3 rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 border border-border/50"
                          >
                            <div className="text-sm font-medium text-foreground/90 mb-1">
                              {focus}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Applications */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-foreground/80 uppercase tracking-wide">
                        Applications
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {featuredArea.applications.map((app, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((card, index) => (
            <div key={index} className="relative group">
              <div className="relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 h-full">
                {/* Background Element */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 rounded-xl" />
                </div>

                {/* Content */}
                <div className="relative p-6 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <card.icon className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {card.title}
                    </h3>
                  </div>
                  <p className="text-foreground/70 leading-relaxed mb-6 flex-1">
                    {card.description}
                  </p>

                  {/* Key Areas */}
                  <div className="mt-auto space-y-3">
                    <h4 className="text-xs font-medium text-foreground/80 uppercase tracking-wide">
                      Key Areas
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {card.keyAreas.map((area, areaIndex) => (
                        <span
                          key={areaIndex}
                          className="px-2 py-1 text-xs font-medium bg-foreground/5 text-foreground/70 rounded border border-foreground/10"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
