"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight, Play, Pause } from "lucide-react";

export function FeaturedProjects() {
  const [activeCard, setActiveCard] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const projects = [
    {
      id: 1,
      title: "Autonomous Navigation System",
      description:
        "Advanced AI-powered navigation system for autonomous vehicles with real-time obstacle detection and path planning capabilities.",
      category: "AI/ML",
      status: "Active",
      technologies: ["Python", "TensorFlow", "ROS", "OpenCV"],
      image: "/placeholder.jpg",
      link: "#",
      github: "#",
    },
    {
      id: 2,
      title: "Human-Robot Collaboration Platform",
      description:
        "Revolutionary platform enabling seamless collaboration between humans and robots in manufacturing environments.",
      category: "Robotics",
      status: "Completed",
      technologies: ["C++", "ROS2", "Unity", "Python"],
      image: "/placeholder.jpg",
      link: "#",
      github: "#",
    },
    {
      id: 3,
      title: "Swarm Intelligence Framework",
      description:
        "Distributed intelligence system for coordinating multiple autonomous agents in complex environments.",
      category: "Distributed Systems",
      status: "Research",
      technologies: ["Go", "Docker", "Kubernetes", "gRPC"],
      image: "/placeholder.jpg",
      link: "#",
      github: "#",
    },
    {
      id: 4,
      title: "Computer Vision Pipeline",
      description:
        "Real-time computer vision system for industrial quality control and automated inspection processes.",
      category: "Computer Vision",
      status: "Active",
      technologies: ["Python", "PyTorch", "OpenCV", "FastAPI"],
      image: "/placeholder.jpg",
      link: "#",
      github: "#",
    },
  ];

  // Auto-animation effect
  useEffect(() => {
    if (isAutoPlaying && !isHovered) {
      intervalRef.current = setInterval(() => {
        setActiveCard((prev) => (prev + 1) % projects.length);
      }, 3000); // Change card every 3 seconds
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, isHovered, projects.length]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "Completed":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "Research":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            Featured Projects
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl text-pretty">
            Explore our cutting-edge research projects and innovative solutions
          </p>
        </div>

        {/* Auto-play Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-card/80 transition-colors"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                Pause Auto-play
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Auto-play
              </>
            )}
          </button>
        </div>

        {/* Stacked Cards Container */}
        <div
          className="relative h-[600px] flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {projects.map((project, index) => {
            const isActive = activeCard === index;
            const isBehind = index < activeCard;
            const isAhead = index > activeCard;

            // Calculate z-index and positioning
            let zIndex = projects.length - index;
            let translateX = 0;
            let translateY = 0;
            let scale = 1;
            let opacity = 1;
            let rotate = 0;

            if (isActive) {
              zIndex = projects.length + 1;
              scale = 1;
              opacity = 1;
            } else if (isBehind) {
              // Cards behind the active one
              const behindIndex = activeCard - index;
              translateX = -behindIndex * 20;
              translateY = behindIndex * 10;
              scale = 1 - behindIndex * 0.05;
              opacity = 0.7 - behindIndex * 0.1;
              rotate = -behindIndex * 2;
            } else if (isAhead) {
              // Cards ahead of the active one
              const aheadIndex = index - activeCard;
              translateX = aheadIndex * 20;
              translateY = aheadIndex * 10;
              scale = 1 - aheadIndex * 0.05;
              opacity = 0.7 - aheadIndex * 0.1;
              rotate = aheadIndex * 2;
            }

            return (
              <Card
                key={project.id}
                className={`
                  absolute cursor-pointer transition-all duration-500 ease-out
                  hover:scale-105 hover:shadow-2xl
                  ${isActive ? "shadow-2xl" : "shadow-lg"}
                `}
                style={{
                  zIndex,
                  transform: `translate(${translateX}px, ${translateY}px) scale(${scale}) rotate(${rotate}deg)`,
                  opacity: Math.max(opacity, 0.3),
                }}
                onClick={() => setActiveCard(index)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${getStatusColor(project.status)}`}
                    >
                      {project.status}
                    </Badge>
                    <div className="flex gap-2">
                      <button
                        className="p-1 hover:bg-muted rounded-md transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.github, "_blank");
                        }}
                      >
                        <Github className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 hover:bg-muted rounded-md transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.link, "_blank");
                        }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <Badge variant="secondary" className="w-fit text-xs">
                    {project.category}
                  </Badge>
                </CardHeader>

                <CardContent className="pt-0">
                  <CardDescription className="text-sm leading-relaxed mb-4">
                    {project.description}
                  </CardDescription>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="outline"
                        className="text-xs px-2 py-1"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                      <div className="w-6 h-6 bg-primary/30 rounded" />
                    </div>
                    <button
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.link, "_blank");
                      }}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Card Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${
                  activeCard === index
                    ? "bg-primary scale-125"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }
              `}
              onClick={() => setActiveCard(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
