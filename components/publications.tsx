import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  FileText,
  Calendar,
  Users,
  Quote,
  Download,
  Eye,
} from "lucide-react";

export function Publications() {
  const publications = [
    {
      title: "Advances in Quantum Error Correction for Scalable Computing",
      authors: "Chen, S., Rodriguez, M., et al.",
      journal: "Nature Quantum Information",
      year: "2024",
      month: "March",
      link: "#",
      doi: "10.1038/s41534-024-00845-2",
      citations: 127,
      category: "Quantum Computing",
      abstract:
        "This paper presents novel approaches to quantum error correction that significantly improve the scalability of quantum computing systems...",
      pdf: "#",
      featured: true,
    },
    {
      title: "Deep Learning Approaches to Protein Structure Prediction",
      authors: "Patel, A., Liu, J., Chen, S.",
      journal: "Science",
      year: "2024",
      month: "February",
      link: "#",
      doi: "10.1126/science.adk1234",
      citations: 89,
      category: "Machine Learning",
      abstract:
        "We introduce a new deep learning framework for predicting protein structures with unprecedented accuracy...",
      pdf: "#",
      featured: true,
    },
    {
      title: "Novel Perovskite Materials for High-Efficiency Solar Cells",
      authors: "Liu, J., Rodriguez, M.",
      journal: "Nature Energy",
      year: "2023",
      month: "December",
      link: "#",
      doi: "10.1038/s41560-023-01345-6",
      citations: 156,
      category: "Materials Science",
      abstract:
        "This study demonstrates the development of new perovskite materials that achieve record-breaking solar cell efficiency...",
      pdf: "#",
      featured: false,
    },
    {
      title: "Robust Control Systems for Autonomous Vehicles",
      authors: "Kumar, A., Johnson, S., et al.",
      journal: "IEEE Transactions on Robotics",
      year: "2023",
      month: "November",
      link: "#",
      doi: "10.1109/TRO.2023.3321456",
      citations: 73,
      category: "Robotics",
      abstract:
        "We present a novel robust control framework for autonomous vehicles operating in dynamic environments...",
      pdf: "#",
      featured: false,
    },
    {
      title: "Swarm Intelligence in Distributed Computing Systems",
      authors: "Williams, E., Brown, K., Chen, S.",
      journal: "ACM Computing Surveys",
      year: "2023",
      month: "October",
      link: "#",
      doi: "10.1145/3587123",
      citations: 94,
      category: "Distributed Systems",
      abstract:
        "This comprehensive survey explores the application of swarm intelligence principles in distributed computing...",
      pdf: "#",
      featured: false,
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      "Quantum Computing":
        "bg-purple-500/10 text-purple-600 border-purple-500/20",
      "Machine Learning": "bg-blue-500/10 text-blue-600 border-blue-500/20",
      "Materials Science": "bg-green-500/10 text-green-600 border-green-500/20",
      Robotics: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      "Distributed Systems": "bg-red-500/10 text-red-600 border-red-500/20",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-500/10 text-gray-600 border-gray-500/20"
    );
  };

  const featuredPublications = publications.filter((pub) => pub.featured);
  const otherPublications = publications.filter((pub) => !pub.featured);

  return (
    <section className="relative py-24 px-4 bg-muted/20">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Recent Publications
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl text-pretty">
            Our latest contributions to the scientific community and
            breakthrough research findings
          </p>
        </div>

        {/* Featured Publications */}
        {featuredPublications.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <Quote className="w-5 h-5 text-primary" />
              <h3 className="text-2xl font-semibold">Featured Publications</h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPublications.map((pub, index) => (
                <Card
                  key={index}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border bg-card hover:bg-card/95"
                >
                  <CardContent className="p-6">
                    {/* Category Badge */}
                    <div className="mb-4">
                      <Badge
                        variant="outline"
                        className={`text-xs ${getCategoryColor(pub.category)}`}
                      >
                        {pub.category}
                      </Badge>
                    </div>

                    {/* Title */}
                    <CardTitle className="text-xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                      {pub.title}
                    </CardTitle>

                    {/* Authors */}
                    <p className="text-sm text-muted-foreground mb-4">
                      {pub.authors}
                    </p>

                    {/* Journal and Date */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="font-medium text-primary">
                        {pub.journal}
                      </span>
                      <span>•</span>
                      <span>
                        {pub.month} {pub.year}
                      </span>
                      <span>•</span>
                      <span>{pub.citations} citations</span>
                    </div>

                    {/* Abstract */}
                    <p className="text-sm text-foreground/80 leading-relaxed mb-6 line-clamp-3">
                      {pub.abstract}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground font-mono">
                        {pub.doi}
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="p-2 rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-colors"
                          onClick={() => window.open(pub.pdf, "_blank")}
                          title="Download PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-colors"
                          onClick={() => window.open(pub.link, "_blank")}
                          title="View Publication"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Other Publications */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-8">All Publications</h3>
          <div className="space-y-6">
            {otherPublications.map((pub, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-border bg-card hover:bg-card/95"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1">
                      {/* Category and Citations */}
                      <div className="flex items-center gap-3 mb-3">
                        <Badge
                          variant="outline"
                          className={`text-xs ${getCategoryColor(
                            pub.category
                          )}`}
                        >
                          {pub.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {pub.citations} citations
                        </span>
                      </div>

                      {/* Title */}
                      <h4 className="text-lg font-semibold group-hover:text-primary transition-colors leading-tight mb-3">
                        {pub.title}
                      </h4>

                      {/* Authors */}
                      <p className="text-sm text-muted-foreground mb-3">
                        {pub.authors}
                      </p>

                      {/* Journal and Date */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="font-medium text-primary">
                          {pub.journal}
                        </span>
                        <span>•</span>
                        <span>
                          {pub.month} {pub.year}
                        </span>
                      </div>

                      {/* Abstract */}
                      <p className="text-sm text-foreground/80 leading-relaxed line-clamp-2">
                        {pub.abstract}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 lg:min-w-[100px]">
                      <button
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-colors text-sm"
                        onClick={() => window.open(pub.pdf, "_blank")}
                      >
                        <Download className="w-4 h-4" />
                        PDF
                      </button>
                      <button
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-colors text-sm"
                        onClick={() => window.open(pub.link, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="group px-8 py-4 rounded-lg border border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 font-medium">
            <span className="flex items-center gap-2">
              View All Publications
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
