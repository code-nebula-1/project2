export function Publications() {
  const publications = [
    {
      title: "Advances in Quantum Error Correction for Scalable Computing",
      authors: "Chen, S., Rodriguez, M., et al.",
      journal: "Nature Quantum Information",
      year: "2024",
      link: "#",
    },
    {
      title: "Deep Learning Approaches to Protein Structure Prediction",
      authors: "Patel, A., Liu, J., Chen, S.",
      journal: "Science",
      year: "2024",
      link: "#",
    },
    {
      title: "Novel Perovskite Materials for High-Efficiency Solar Cells",
      authors: "Liu, J., Rodriguez, M.",
      journal: "Nature Energy",
      year: "2023",
      link: "#",
    },
  ];

  return (
    <section className="relative py-24 px-4 bg-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Recent Publications
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl text-pretty">
            Our latest contributions to the scientific community
          </p>
        </div>

        <div className="space-y-6">
          {publications.map((pub, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-border bg-card hover:bg-card/80 hover:border-primary/50 transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-2 text-balance hover:text-primary transition-colors cursor-pointer">
                {pub.title}
              </h3>
              <p className="text-sm text-foreground/70 mb-2">{pub.authors}</p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-primary">{pub.journal}</span>
                <span className="text-foreground/50">{pub.year}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="px-6 py-3 rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300">
            View All Publications
          </button>
        </div>
      </div>
    </section>
  );
}
