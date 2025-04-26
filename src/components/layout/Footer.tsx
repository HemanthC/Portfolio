// src/components/layout/Footer.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { scrollToElement, scrollToTop } = useSmoothScroll();

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/Kartik-Murthy",
      icon: <FontAwesomeIcon icon={faGithub} size="lg" />,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/kartik10",
      icon: <FontAwesomeIcon icon={faLinkedin} size="lg" />,
    },

    {
      name: "Email",
      url: "mailto:kartik.spgk@gmail.com",
      icon: <Mail className="h-5 w-5" />,
    },
  ];

  const footerLinks = [
    { name: "Home", href: "hero" },
    { name: "About", href: "about" },
    { name: "Experience", href: "experience" },
    { name: "Projects", href: "projects" },
    { name: "Skills", href: "skills" },
    { name: "Contact", href: "contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();

    if (sectionId === "hero") {
      scrollToTop();
    } else {
      scrollToElement(sectionId);
    }
  };

  return (
    <footer className="bg-card text-card-foreground py-10">
      <div className="container mx-auto px-8">
        {/* Navigation Section */}
        <div className="flex flex-col items-center mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-lg font-medium mb-6 relative after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-12 after:h-0.5 after:bg-primary after:mt-2 pb-3"
          >
            Navigation
          </motion.h3>

          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-8 lg:gap-12"
          >
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-muted-foreground hover:text-primary relative transition-colors after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-primary after:left-0 after:-bottom-1 hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </motion.nav>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-8">
          {/* Left Column: About */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 max-lg:mx-auto max-lg:text-center"
          >
            <h2 className="text-2xl font-bold">Kartik Murthy</h2>
            <p className="text-muted-foreground max-w-md">
              Full-stack developer specializing in building exceptional digital
              experiences. Available for freelance work and open to new
              opportunities.
            </p>

            <div className="flex items-center pt-2 max-lg:justify-center">
              <div className="h-px bg-border w-20 lg:hidden lg:mr-4"></div>
              <h3 className="text-sm uppercase tracking-wider font-medium mr-4 text-muted-foreground">
                Connect
              </h3>
              <div className="h-px bg-border w-20"></div>
            </div>

            <div className="flex gap-3 max-lg:justify-center">
              {socialLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="outline"
                  size="icon"
                  className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors dark:hover:bg-primary dark:hover:text-primary-foreground"
                  asChild
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                  >
                    {link.icon}
                  </a>
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:text-right space-y-6 max-lg:mx-auto max-lg:text-center"
          >
            <h3 className="text-2xl font-bold relative inline-block   ">
              Contact
            </h3>

            <div className="space-y-0.5">
              <p className="text-muted-foreground">
                Available for freelance projects
              </p>
              <a
                href="mailto:kartik.spgk@gmail.com"
                className="text-primary hover:underline block font-medium"
              >
                kartik.spgk@gmail.com
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-center"
        >
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} Kartik Murthy. All rights reserved.
          </p>
          <div className=" flex md:justify-end">
            <div className="text-sm text-muted-foreground flex items-center">
              <span>Designed & Built using Next.js & Tailwind CSS</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
