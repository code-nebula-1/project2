import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Team() {
  const members = [
    {
      name: "Dr. Sarah Chen",
      role: "Principal Investigator",
      specialty: "Quantum Computing",
      image: "/professional-scientist-portrait.png",
    },
    {
      name: "Dr. Marcus Rodriguez",
      role: "Senior Researcher",
      specialty: "Artificial Intelligence",
      image: "/professional-researcher-portrait.png",
    },
    {
      name: "Dr. Aisha Patel",
      role: "Research Scientist",
      specialty: "Computational Biology",
      image: "/professional-scientist-portrait.png",
    },
    {
      name: "Dr. James Liu",
      role: "Research Scientist",
      specialty: "Sustainable Energy",
      image: "/professional-researcher-portrait.png",
    },
  ];

  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Our Team
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl text-pretty">
            World-class researchers dedicated to advancing scientific knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border bg-card hover:bg-card/80"
            >
              <CardContent className="p-0">
                <div className="relative mb-4 overflow-hidden aspect-square bg-card">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="text-sm mb-2 bg-primary/10 text-primary border-primary/20"
                  >
                    {member.role}
                  </Badge>
                  <p className="text-sm text-foreground/60">
                    {member.specialty}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
