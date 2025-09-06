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
  "BETSOL": <Code size={14} />,
  "Avaya": <Monitor size={14} />,
  Senior: <Star size={14} />,
  Software: <Laptop size={14} />,
  default: <Briefcase size={14} />,
};

// Function to determine which icon to use
const getIcon = (title: string, company: string) => {
  if (title.includes("Senior")) return iconMap["Senior"];
  if (company === "BETSOL") return iconMap["BETSOL"];
  if (company === "Avaya") return iconMap["Avaya"];
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
      title: "Software Engineer",
      company: "BETSOL",
      period: "Jan 2025 - Present",
      description: [
        "Developed and optimized Apex classes, triggers, and test classes, consistently maintaining 95% code coverage, ensuring system stability and compliance with Salesforce best practices.",
        "Designed and customized Lightning Web Components (LWC) and Visualforce pages, improving UI efficiency and reducing user clicks by 25%, enhancing productivity for 100+ users.",
        "Automated business processes using Salesforce Flows and implemented REST API integrations with external systems, reducing manual data entry by 40% and improving data accuracy.",
      ],
      skills: ["Salesforce", "Apex", "LWC", "Visualforce", "REST APIs"],
      current: true,
    },
    {
      title: "Associate Software Engineer",
      company: "BETSOL",
      period: "Jul 2023 - Dec 2024",
      description: [
        "Built full-stack features with Spring Boot (APIs, Redis, Kafka, cron jobs) and React + Redux Toolkit, improving reusability by 30% and speeding up delivery by 20%",
        "Enhanced testing with 200+ JUnit tests (90% coverage), Cucumber BDD, WireMock, Playwright, and Appium, cutting manual testing by 50%.",
        "Improved app quality by fixing React UI/i18n bugs and integrating Meta API with attachment handling for seamless functionality.",
      ],
      skills: ["Spring Boot", "React", "Redux Toolkit", "Redis", "Kafka", "JUnit", "Cucumber BDD"],
    },
    {
      title: "Software Engineer Trainee",
      company: "BETSOL",
      period: "Feb 2023 - Mar 2023",
      description: [
        "Worked with Linux, Docker, Kubernetes, Flask, and Django, gaining hands-on experience in containerization, orchestration, and scalable web application development.",
        "Enhanced and optimized APIs in Django microservices, improving performance, scalability, and reliability while documenting endpoints with Swagger.",
        "Applied microservice architecture best practices, breaking down monolithic applications into independent services for better scalability and efficiency.",
      ],
      skills: ["Docker", "Kubernetes", "Django", "Flask", "Linux", "Microservices"],
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
