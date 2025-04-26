// src/components/sections/Skills.tsx
"use client";

import SectionTitle from "@/components/shared/SectionTitle";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Skill {
  name: string;
  level: number;
  category: string;
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");
  const contentRef = useScrollAnimation<HTMLDivElement>({
    type: "fade-in",
    threshold: 0.1,
  });

  const skills: Skill[] = [
    // Frontend
    { name: "JavaScript", level: 90, category: "frontend" },
    { name: "React", level: 90, category: "frontend" },
    { name: "Next.js", level: 85, category: "frontend" },
    { name: "TypeScript", level: 80, category: "frontend" },
    { name: "HTML5/CSS3", level: 90, category: "frontend" },
    { name: "Redux Toolkit", level: 80, category: "frontend" },
    { name: "Tailwind CSS", level: 85, category: "frontend" },
    { name: "Flutter", level: 70, category: "frontend" },

    // Backend
    { name: "Node.js", level: 80, category: "backend" },
    { name: "Express.js", level: 85, category: "backend" },
    { name: "Python", level: 75, category: "backend" },
    { name: "Flask", level: 65, category: "backend" },
    { name: "FastAPI", level: 60, category: "backend" },
    { name: "RESTful APIs", level: 90, category: "backend" },
    { name: "GraphQL", level: 70, category: "backend" },

    // Database
    { name: "PostgreSQL", level: 80, category: "database" },
    { name: "MySQL", level: 75, category: "database" },
    { name: "MongoDB", level: 85, category: "database" },
    { name: "Supabase", level: 75, category: "database" },
    { name: "Firebase", level: 80, category: "database" },

    // Tools
    { name: "Git", level: 90, category: "tools" },
    { name: "Docker", level: 70, category: "tools" },
    { name: "CI/CD", level: 65, category: "tools" },
    { name: "JWT", level: 80, category: "tools" },
    { name: "OAuth", level: 75, category: "tools" },
    { name: "Stripe", level: 70, category: "tools" },
  ];

  const filteredSkills = skills.filter((skill) => skill.category === activeTab);

  const categories = [
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "database", label: "Database" },
    { id: "tools", label: "Tools" },
  ];

  return (
    <section id="skills" className="py-20 ">
      <div className="container px-4 mx-auto">
        <SectionTitle
          title="Skills & Expertise"
          subtitle="Technologies I work with"
          align="center"
        />

        <div className="mt-8 mb-12">
          <Tabs
            defaultValue="frontend"
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

            <div ref={contentRef} className="mt-12">
              <TabsContent value={activeTab} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {filteredSkills.map((skill, index) => (
                    <AnimatedSkill
                      key={skill.name}
                      skill={skill}
                      index={index}
                    />
                  ))}
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

interface AnimatedSkillProps {
  skill: Skill;
  index: number;
}

function AnimatedSkill({ skill, index }: AnimatedSkillProps) {
  const [displayedValue, setDisplayedValue] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const skillRef = useRef(null);
  const isAnimated = useRef(false);

  useEffect(() => {
    // Reset animation state when skill changes
    setDisplayedValue(0);
    setProgressValue(0);
    isAnimated.current = false;
  }, [skill.name]);

  useEffect(() => {
    // Store the current value of the ref in a variable
    const currentRef = skillRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimated.current) {
          isAnimated.current = true;

          const progressDuration = 500;
          const progressStartTime = Date.now();

          const animateProgress = () => {
            const elapsedTime = Date.now() - progressStartTime;
            const progress = Math.min(elapsedTime / progressDuration, 1);
            const newValue = Math.floor(progress * skill.level);

            setProgressValue(newValue);
            setDisplayedValue(newValue);

            if (progress < 1) {
              requestAnimationFrame(animateProgress);
            } else {
              setProgressValue(skill.level);
              setDisplayedValue(skill.level);
            }
          };

          requestAnimationFrame(animateProgress);
        }
      },
      { threshold: 0.2 }
    );

    // Use the stored value instead of skillRef.current
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      // Use the stored value in the cleanup function
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [skill.level]);

  return (
    <motion.div
      ref={skillRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="mb-2 flex justify-between">
        <h3 className="font-medium">{skill.name}</h3>
        <span className="text-sm text-muted-foreground">{displayedValue}%</span>
      </div>
      <Progress value={progressValue} className="h-2" />
    </motion.div>
  );
}
