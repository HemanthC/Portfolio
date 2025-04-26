"use client";

import SectionTitle from "@/components/shared/SectionTitle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import { Code, ExternalLink, Eye } from "lucide-react";
import { useState } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
  category: string;
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState("all");
  const contentRef = useScrollAnimation<HTMLDivElement>({
    type: "fade-in",
    threshold: 0.1,
  });

  const projects: Project[] = [
    {
      id: "docs-clone",
      title: "Google Docs Clone",
      description:
        "Real-time collaborative rich text editor built using Tiptap and Next.js 15, enabling seamless live editing between multiple users.",
      image: "/api/placeholder/800/450",
      tags: ["Next.js", "Tiptap", "Liveblocks", "Convex", "TypeScript"],
      liveUrl: "https://google-docs-clone-lovat.vercel.app/",
      codeUrl: "https://github.com/Kartik-Murthy/google-docs-clone",
      category: "web",
    },
    {
      id: "factinator",
      title: "Factinator",
      description:
        "Mobile app designed to deliver random facts and quotes to engage users with interesting content using Flutter and OpenAI API.",
      image: "/api/placeholder/800/450",
      tags: ["Flutter", "Dart", "OpenAI API", "Mobile"],
      codeUrl: "https://github.com/Kartik-Murthy/Factinator",
      category: "mobile",
    },
    {
      id: "portfolio",
      title: "Portfolio Website",
      description:
        "Modern portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion for smooth animations.",
      image: "/api/placeholder/800/450",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      category: "web",
    },
    {
      id: "contribution",
      title: "MUI Contribution",
      description:
        "Fixed a spacing issue in the AvatarGroup component for Material-UI v7, ensuring spacing={0} is properly respected.",
      image: "/api/placeholder/800/450",
      tags: ["React", "Material-UI", "Open Source"],
      codeUrl: "https://github.com/mui/material-ui/pull/45797",
      category: "open-source",
    },
  ];

  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((project) => project.category === activeTab);

  const categories = [
    { id: "all", label: "All" },
    { id: "web", label: "Web" },
    { id: "mobile", label: "Mobile" },
    { id: "open-source", label: "Open Source" },
  ];

  // Helper function to determine the project URL (live URL has priority)
  const getProjectUrl = (project: Project) => {
    return project.liveUrl || project.codeUrl || "#";
  };

  // Check if a project is clickable (has either live or code URL)
  const isClickable = (project: Project) => {
    return !!(project.liveUrl || project.codeUrl);
  };

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <SectionTitle
          title="Featured Projects"
          subtitle="Explore my recent work"
          align="center"
        />

        <div className="mt-8 mb-12">
          <Tabs
            defaultValue="all"
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="flex justify-center">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-md h-full">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="text-sm cursor-pointer data-[state=inactive]:text-muted-foreground"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>
        </div>

        <div
          ref={contentRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
            >
              <a
                href={getProjectUrl(project)}
                target="_blank"
                rel="noopener noreferrer"
                className={`block h-full ${
                  isClickable(project) ? "" : "pointer-events-none"
                }`}
              >
                <Card
                  className={`overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 relative
                    ${
                      isClickable(project)
                        ? "hover:scale-[1.02] hover:border-primary/50 cursor-pointer group"
                        : ""
                    }`}
                >
                  {/* Action buttons in top-right corner */}
                  <div className="absolute top-3 right-3 z-10 flex gap-2">
                    {project.liveUrl && (
                      <Button
                        variant="secondary"
                        size="icon"
                        className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          window.open(project.liveUrl, "_blank");
                        }}
                        title="View Live"
                      >
                        <ExternalLink size={14} />
                      </Button>
                    )}
                    {project.codeUrl && (
                      <Button
                        variant="secondary"
                        size="icon"
                        className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          window.open(project.codeUrl, "_blank");
                        }}
                        title="View Code"
                      >
                        <Code size={14} />
                      </Button>
                    )}
                  </div>

                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background/10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-display font-bold text-foreground/80">
                        {project.title.charAt(0)}
                      </span>
                    </div>

                    {/* "You are here" badge for portfolio project */}
                    {project.id === "portfolio" && (
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-primary text-primary-foreground flex items-center gap-1 px-3 py-1 shadow-md">
                          <Eye size={14} />
                          <span>You are here</span>
                        </Badge>
                      </div>
                    )}

                    {/* Hover overlay with "View Project" text */}
                    {isClickable(project) && (
                      <div className="absolute inset-0 bg-primary/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-primary-foreground font-medium flex items-center gap-2">
                          {project.liveUrl ? "View Live Project" : "View Code"}
                          <ExternalLink size={16} />
                        </span>
                      </div>
                    )}
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl font-display">
                      {project.title}
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="bg-secondary/50"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
