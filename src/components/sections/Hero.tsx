// src/components/sections/Hero.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const { scrollToElement } = useSmoothScroll();
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();

    scrollToElement(sectionId);
  };
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden max-sm:my-10"
    >
      {/* Background animated shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 max-[380px]:mb-0">
              Full-Stack Software Developer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-center mb-6 max-[380px]:text-3xl"
          >
            Hi, I&apos;m <span className="hero-gradient">Kartik Murthy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground text-center max-w-2xl mx-auto mb-8 max-[380px]:text-base"
          >
            A passionate Software Developer specialized in designing and
            building exceptional digital experiences. Currently focused on
            creating innovative end-to-end solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="group">
              <Link href="#contact" onClick={(e) => handleClick(e, "contact")}>
                Get in touch
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link
                href="#projects"
                onClick={(e) => handleClick(e, "projects")}
              >
                View my work
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="/Kartik_Murthy_Resume.pdf" download>
                Download Resume
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center gap-6 mt-12"
          >
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/Kartik-Murthy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FontAwesomeIcon icon={faGithub} size="xl" />
              <span className="sr-only">GitHub</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="https://linkedin.com/in/kartik10"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <FontAwesomeIcon icon={faLinkedin} size="xl" />
              <span className="sr-only">LinkedIn</span>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:kartik.spgk@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail size={24} />
              <span className="sr-only">Email</span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <Link
                href="#about"
                onClick={(e) => handleClick(e, "about")}
                className="max-sm:hidden"
              >
                <div className="w-8 h-12 rounded-full border-2 border-muted-foreground/30 flex justify-center items-start p-1">
                  <div className="w-1 h-2 rounded-full bg-blue-500" />
                </div>
                <span className="sr-only">Scroll down</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
