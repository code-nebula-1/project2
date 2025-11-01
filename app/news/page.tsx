"use client";

import { CTAButton } from "@/components/ui/cta-button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  User,
  FileText,
  Award,
  DollarSign,
  Handshake,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

export default function News() {
  const newsItems = [
    {
      id: 1,
      title: "Breakthrough in Autonomous Navigation Systems",
      excerpt:
        "Our research team has achieved a significant milestone in developing next-generation autonomous navigation algorithms that can operate in complex, dynamic environments with unprecedented accuracy.",
      date: "2024-01-15",
      category: "Research",
      author: "Dr. Sarah Chen",
      featured: true,
    },
    {
      id: 2,
      title: "New Partnership with TechCorp for Industrial Robotics",
      excerpt:
        "We're excited to announce a new collaboration with TechCorp to develop advanced industrial robotics solutions for manufacturing applications.",
      date: "2024-01-10",
      category: "Partnership",
      author: "Dr. Michael Rodriguez",
      featured: true,
    },
    {
      id: 3,
      title: "PhD Student Sarah Johnson Wins Best Paper Award",
      excerpt:
        "Congratulations to Sarah Johnson for receiving the Best Paper Award at the International Conference on Human-Robot Interaction for her work on collaborative manufacturing robots.",
      date: "2024-01-08",
      category: "Awards",
      author: "Research Team",
      featured: false,
    },
    {
      id: 4,
      title: "Lab Receives $2M Grant for Swarm Robotics Research",
      excerpt:
        "The National Science Foundation has awarded our lab a $2 million grant to advance research in swarm robotics and multi-agent coordination systems.",
      date: "2024-01-05",
      category: "Funding",
      author: "Dr. Alex Kumar",
      featured: false,
    },
    {
      id: 5,
      title: "New Publication: Machine Learning for Robotic Manipulation",
      excerpt:
        "Our latest research paper on machine learning approaches for robotic manipulation has been accepted for publication in the Journal of Robotics Research.",
      date: "2024-01-03",
      category: "Publication",
      author: "Dr. James Park",
      featured: false,
    },
    {
      id: 6,
      title: "Robotics Conference 2024: Call for Papers",
      excerpt:
        "We're organizing the 2024 International Conference on Advanced Robotics, and we're now accepting paper submissions for the conference program.",
      date: "2024-01-01",
      category: "Events",
      author: "Conference Committee",
      featured: false,
    },
  ];

  const publications = [
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
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Research":
        return FileText;
      case "Partnership":
        return Handshake;
      case "Awards":
        return Award;
      case "Funding":
        return DollarSign;
      case "Publication":
        return FileText;
      case "Events":
        return Calendar;
      default:
        return FileText;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Research":
        return "bg-blue-100 text-blue-800";
      case "Partnership":
        return "bg-green-100 text-green-800";
      case "Awards":
        return "bg-yellow-100 text-yellow-800";
      case "Funding":
        return "bg-purple-100 text-purple-800";
      case "Publication":
        return "bg-indigo-100 text-indigo-800";
      case "Events":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const featuredNews = newsItems.filter((item) => item.featured);
  const regularNews = newsItems.filter((item) => !item.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-[20svh]">
      </section>
      {/* blog post */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Blog Post
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredNews.map((item) => {
              const Icon = getCategoryIcon(item.category);
              return (
                <Card
                  key={item.id}
                  className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border bg-card hover:bg-card/80"
                >
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <Badge
                          variant="secondary"
                          className={`text-xs font-medium ${getCategoryColor(
                            item.category
                          )}`}
                        >
                          {item.category}
                        </Badge>
                      </div>
                      <span className="text-sm text-foreground/60 font-mono">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed text-pretty mb-6">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-foreground/60">
                        By {item.author}
                      </span>
                      <CTAButton size="sm" className="group/btn" textStyle="default">
                        Read More
                        <ExternalLink className="ml-2 w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                      </CTAButton>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* All News */}
      <section className="relative py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              All News
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl text-pretty">
              Complete archive of our research updates and announcements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map((item) => {
              const Icon = getCategoryIcon(item.category);
              return (
                <Card
                  key={item.id}
                  className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border bg-card hover:bg-card/80"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4 text-primary" />
                        <Badge
                          variant="secondary"
                          className={`text-xs font-medium ${getCategoryColor(
                            item.category
                          )}`}
                        >
                          {item.category}
                        </Badge>
                      </div>
                      <span className="text-xs text-foreground/60 font-mono">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-foreground/70 mb-4 line-clamp-3 text-pretty">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-foreground/60">
                        {item.author}
                      </span>
                      <CTAButton size="sm" className="group/btn" textStyle="default">
                        Read More
                        <ArrowRight className="ml-1 w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                      </CTAButton>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

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
  );
}
