import { Atom, Brain, Dna, Zap } from "lucide-react";

export function ResearchAreas() {
  const areas = [
    {
      title: "Quantum Computing",
      description:
        "Exploring quantum algorithms and their applications in cryptography, optimization, and machine learning.",
      icon: Atom,
    },
    {
      title: "Artificial Intelligence",
      description:
        "Developing novel neural architectures and advancing interpretable AI systems for real-world applications.",
      icon: Brain,
    },
    {
      title: "Computational Biology",
      description:
        "Leveraging computational methods to understand biological systems and accelerate drug discovery.",
      icon: Dna,
    },
    {
      title: "Sustainable Energy",
      description:
        "Researching next-generation materials and systems for clean energy production and storage.",
      icon: Zap,
    },
  ];

  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Research Areas
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl text-pretty">
            Our interdisciplinary teams push the boundaries of science across
            multiple domains
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {areas.map((area, index) => {
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
  );
}
