// src/components/sections/Experience.tsx
"use client";

import SectionTitle from "@/components/shared/SectionTitle";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Calendar,
  Code,
  Laptop,
  Monitor,
  Star,
} from "lucide-react";

// Icon mapping based on company or position
const iconMap = {
  "QNext AI": <Code size={14} />,
  "Maangal.com": <Monitor size={14} />,
  Senior: <Star size={14} />,
  Software: <Laptop size={14} />,
  default: <Briefcase size={14} />,
};

// Function to determine which icon to use
const getIcon = (title: string, company: string) => {
  if (title.includes("Senior")) return iconMap["Senior"];
  if (company === "QNext AI") return iconMap["QNext AI"];
  if (company === "Maangal.com") return iconMap["Maangal.com"];
  if (title.includes("Software")) return iconMap["Software"];
  return iconMap["default"];
};

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
  current?: boolean;
  index: number;
}

function ExperienceItem({
  title,
  company,
  period,
  description,
  skills,
  current = false,
  index,
}: ExperienceItemProps) {
  // Determine the icon based on company or position
  const icon = getIcon(title, company);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={cn(
        "relative pl-8  border-l",
        current ? "border-primary" : "border-muted-foreground/20 "
      )}
    >
      <motion.div
        className="absolute -left-3 top-0"
        initial={{ scale: 0, rotate: -45 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
          delay: index * 0.2,
          type: "spring",
          stiffness: 200,
        }}
      >
        <div
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center",
            current
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground "
          )}
        >
          {icon}
        </div>
      </motion.div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          {current && (
            <Badge
              variant="outline"
              className="bg-primary/10 text-primary border-primary/30"
            >
              Current
            </Badge>
          )}
        </div>

        <div className="text-lg font-display text-primary">{company}</div>

        <div className="flex items-center text-muted-foreground">
          <Calendar size={14} className="mr-2" />
          <span className="text-sm">{period}</span>
        </div>

        <motion.ul
          className="space-y-2 text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
        >
          {description.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 + i * 0.1 + 0.4 }}
              className="relative pl-5 before:content-['•'] before:absolute before:left-0 before:text-primary"
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="flex flex-wrap gap-2 pt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
        >
          {skills.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: index * 0.1 + i * 0.05 + 0.6,
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
            >
              <Badge variant="secondary" className="bg-secondary/50">
                {skill}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {index == 3 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 0.36 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.3,
            delay: index * 0.1 + 0.6,
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
          className="absolute -bottom-8 -translate-x-16 w-16 h-16 bg-muted rounded-full flex items-center justify-center"
        >
          <ArrowUpRight size={32} className="text-muted-foreground" />
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Experience() {
  const experiences = [
    {
      title: "Senior Software Development Engineer",
      company: "QNext AI",
      period: "Jan 2024 - Present",
      description: [
        "Spearheaded the development lifecycle from concept to client acquisition, driving business growth.",
        "Led the design and deployment of major products, increasing web traffic by 40%.",
        "Mentored junior developers and improved code quality through automated testing frameworks.",
      ],
      skills: ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL"],
      current: true,
    },
    {
      title: "Software Development Engineer",
      company: "QNext AI",
      period: "May 2023 - Dec 2023",
      description: [
        "Implemented payment integration and authentication systems using Stripe, Clerk, and Firebase.",
        "Boosted subscription revenue by 25% through improved user experience and conversion flows.",
        "Collaborated with product team to ship new features on time and within specifications.",
      ],
      skills: ["React", "Firebase", "Stripe", "Authentication", "UI/UX"],
    },
    {
      title: "Software Development Engineer Intern",
      company: "QNext AI",
      period: "Feb 2023 - Apr 2023",
      description: [
        "Assisted in the development of core product features and functionality.",
        "Contributed to frontend and backend codebases, working with React and Node.js.",
        "Participated in code reviews and implemented feedback to improve code quality.",
      ],
      skills: ["JavaScript", "React", "Node.js", "Git", "RESTful APIs"],
    },
    {
      title: "Flutter Developer Intern",
      company: "Maangal.com",
      period: "Sep 2022 - Dec 2022",
      description: [
        "Developed the Maangal.com app, supporting 1 lakh users across the global Uttarakhandi community.",
        "Updated the old codebase with Flutter, increasing app performance by 50%.",
        "Integrated Riverpod and WebSocket, improving app stability and retention by 20%.",
      ],
      skills: [
        "Flutter",
        "Dart",
        "Riverpod",
        "WebSockets",
        "Mobile Development",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle
            title="Work Experience"
            subtitle="My professional journey"
            align="center"
          />
        </motion.div>

        <div className="max-w-3xl mx-auto mt-16">
          {experiences.map((exp, index) => (
            <ExperienceItem key={index} {...exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
