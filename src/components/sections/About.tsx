// src/components/sections/About.tsx
"use client";

import SectionTitle from "@/components/shared/SectionTitle";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "framer-motion";
import { Code, Globe, Laptop, Zap } from "lucide-react";

export default function About() {
  const contentRef = useScrollAnimation<HTMLDivElement>({
    type: "slide-right",
    threshold: 0.1,
  });

  const statsRef = useScrollAnimation<HTMLDivElement>({
    type: "fade-in",
    threshold: 0.1,
    delay: 300,
  });

  return (
    <section id="about" className="py-20  bg-muted/30">
      <div className="container px-4 mx-auto">
        <SectionTitle
          title="About Me"
          subtitle="Get to know me better"
          align="center"
        />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square w-full max-w-md mx-auto relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Placeholder image - replace with your own */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/60 flex items-center justify-center">
                <span className="text-9xl font-display font-bold text-white/90">
                  K
                </span>
              </div>
            </div>
          </motion.div>

          <div ref={contentRef} className="space-y-6 mr-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-lg leading-relaxed text-justify hyphens-auto break-words"
            >
              I'm a Full-stack Software Developer with a passion for creating
              innovative and user-friendly digital solutions. With expertise in
              both frontend and backend technologies, I specialize in building
              robust applications that solve real-world problems.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg leading-relaxed text-justify hyphens-auto break-words"
            >
              My journey in software development started during my engineering
              studies, where I discovered my love for coding and
              problem-solving. Since then, I've worked on various projects, from
              developing enterprise applications to creating intuitive user
              interfaces.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-4 pt-4 max-lg:hidden"
            >
              <div className="flex items-start">
                <div className="mr-4 p-2 bg-primary/10 rounded-lg text-primary">
                  <Code size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Frontend</h3>
                  <p className="text-sm text-muted-foreground">
                    Creating beautiful interfaces
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 p-2 bg-primary/10 rounded-lg text-primary">
                  <Laptop size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Backend</h3>
                  <p className="text-sm text-muted-foreground">
                    Building robust systems
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 p-2 bg-primary/10 rounded-lg text-primary">
                  <Globe size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Mobile</h3>
                  <p className="text-sm text-muted-foreground">
                    Cross-platform experiences
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 p-2 bg-primary/10 rounded-lg text-primary">
                  <Zap size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Optimization</h3>
                  <p className="text-sm text-muted-foreground">
                    Fast and efficient code
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 max-sm:grid-cols-1 max-sm:w-fit max-sm:mx-auto gap-4 gap-y-8 lg:hidden "
            >
              <div className="flex items-start md:mx-auto">
                <div className="mr-4 p-2 bg-primary/10 rounded-lg text-primary">
                  <Code size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Frontend</h3>
                  <p className="text-sm text-muted-foreground">
                    Creating beautiful interfaces
                  </p>
                </div>
              </div>

              <div className="flex items-start md:mx-auto">
                <div className="mr-4 p-2 bg-primary/10 rounded-lg text-primary">
                  <Laptop size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Backend</h3>
                  <p className="text-sm text-muted-foreground">
                    Building robust systems
                  </p>
                </div>
              </div>

              <div className="flex items-start md:mx-auto">
                <div className="mr-4 p-2 bg-primary/10 rounded-lg text-primary">
                  <Globe size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Mobile</h3>
                  <p className="text-sm text-muted-foreground">
                    Cross-platform experiences
                  </p>
                </div>
              </div>

              <div className="flex items-start md:mx-auto">
                <div className="mr-4 p-2 bg-primary/10 rounded-lg text-primary">
                  <Zap size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Optimization</h3>
                  <p className="text-sm text-muted-foreground">
                    Fast and efficient code
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {[
            { number: "2+", label: "Years Experience" },
            { number: "5+", label: "Projects Completed" },
            { number: "5+", label: "Happy Clients" },
            { number: "2", label: "Open Source Contributions" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 rounded-lg bg-card shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl font-display font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground max-sm:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
