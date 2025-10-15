export function FeaturedProjects() {
  const projects = [
    {
      title: "Neural Architecture Search",
      category: "AI Research",
      description:
        "Automated discovery of optimal neural network architectures using evolutionary algorithms.",
      year: "2024",
      status: "Ongoing",
    },
    {
      title: "Quantum Error Correction",
      category: "Quantum Computing",
      description:
        "Novel error correction codes for fault-tolerant quantum computation.",
      year: "2024",
      status: "Published",
    },
    {
      title: "Protein Folding Prediction",
      category: "Computational Biology",
      description:
        "Deep learning models for accurate protein structure prediction and drug target identification.",
      year: "2023",
      status: "Published",
    },
    {
      title: "Perovskite Solar Cells",
      category: "Sustainable Energy",
      description:
        "High-efficiency solar cells using novel perovskite materials and manufacturing techniques.",
      year: "2024",
      status: "Ongoing",
    },
  ];

  return (
    <section className="relative py-24 px-4 bg-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Featured Projects
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl text-pretty">
            Breakthrough research driving innovation across scientific
            disciplines
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group p-8 rounded-lg border border-border bg-card hover:bg-card/80 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-sm font-mono text-primary">
                  {project.category}
                </span>
                <span className="text-sm text-foreground/50">
                  {project.year}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed mb-4 text-pretty">
                {project.description}
              </p>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    project.status === "Published"
                      ? "bg-accent/20 text-accent"
                      : "bg-secondary/20 text-secondary"
                  }`}
                >
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
