import { CTAButton } from "@/components/ui/cta-button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Publication } from "@/actions/publications";

export function Publications({ publications }: { publications: Publication[] }) {
 /*  const publications = [
    {
      title:
        "Deep Learning for Autonomous Robot Navigation in Dynamic Environments",
      authors: "Chen, S., Rodriguez, M., & Park, J.",
      journal: "Journal of Robotics Research",
      year: "2024",
      doi: "10.1007/s12345-024-00123-4",
    },
    {
      title: "Human-Robot Collaboration in Manufacturing: A Survey",
      authors: "Watson, E., Johnson, S., & Thompson, L.",
      journal: "IEEE Transactions on Robotics",
      year: "2024",
      doi: "10.1109/TRO.2024.0012345",
    },
    {
      title: "Swarm Intelligence for Multi-Robot Coordination",
      authors: "Kumar, A., Santos, M., & Wilson, T.",
      journal: "Autonomous Robots",
      year: "2023",
      doi: "10.1007/s10514-023-00123-4",
    },
    {
      title: "Machine Learning Approaches for Robotic Manipulation",
      authors: "Park, J., Chen, D., & Kim, R.",
      journal: "International Journal of Robotics Research",
      year: "2023",
      doi: "10.1177/02783649231234567",
    },
  ]; */

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

  return (
    <section className="relative py-6 px-4 bg-muted/20">
      <div className="container mx-auto max-w-7xl">
        {/* Publications */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Recent Publications
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl text-pretty">
              Our latest research contributions to the robotics community
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {publications.map((pub, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border bg-card hover:bg-card/80"
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {pub.title}
                    </h3>
                    <div className="space-y-2">
                      <p className="text-foreground/70">
                        <span className="font-medium">Authors:</span>{" "}
                        {pub.authors}
                      </p>
                      <p className="text-foreground/70">
                        <span className="font-medium">Journal:</span>{" "}
                        {pub.journal}, {pub.year}
                      </p>
                      <p className="text-sm text-primary font-mono">
                        <span className="font-medium">DOI:</span> {pub.doi}
                      </p>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <CTAButton size="sm" className="group/btn" textStyle="default">
                        View Paper
                        <ExternalLink className="ml-2 w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                      </CTAButton>
                      <CTAButton size="sm" textStyle="default">Cite</CTAButton>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      </div>
    </section>
  );
}
