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
    title: "PIERS",
    description:
      "Also known as People, Intelligence, Environments, Robots, and Social outcomes (PIERS) Lab. Broadly, we seek to understand how robots, conversational agents, and other emerging technologies can be appropriately integrated into socially complex scenarios.",
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
      title: "Studying",
      description:
        "How robots’ behaviors influence humans’ trust, acceptance, and decision-making.",
      icon: Cpu,
    },
    {
      title: "Simulating",
      description:
        "Interactions in future smart environments to determine how people and robots might work productively and live well within them.",
      icon: Cpu,
    },
    {
      title: "Designing",
      description:
        "Intelligent systems that leverage both human-like and non-human-like interaction capabilities toward positive social outcomes.",
      icon: Cpu,
    },
  ];

  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto max-w-7xl">

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
                    <p className="text-foreground/70 text-lg leading-relaxed">
                      {featuredArea.description}
                    </p>
                  </div>

                  {/* Research Focus Areas
                  <div className="w-full lg:w-96 space-y-6">
                    {/* Key Focus Areas
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

                    {/* Applications
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
                  </div>*/}
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
