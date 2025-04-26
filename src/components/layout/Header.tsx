// src/components/layout/Header.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollToElement } = useSmoothScroll();

  // Animation ref for the header
  const headerRef = useScrollAnimation<HTMLDivElement>({
    type: "fade-in",
    threshold: 0.1,
  });

  // Memoize the active section detection function to prevent it from being recreated on each render
  const detectActiveSection = useCallback(() => {
    const sections = navItems.map((item) => item.href.substring(1));

    // First check if we're at the top (hero section)
    if (window.scrollY < 200) {
      setActiveSection("hero");
      return;
    }

    // Find the section that takes up most of the viewport
    let maxVisibility = 0;
    let mostVisibleSection = "";

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate how much of the section is visible in the viewport
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(viewportHeight, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      // Consider the section visible if it occupies a significant portion of the viewport
      if (visibleHeight > maxVisibility) {
        maxVisibility = visibleHeight;
        mostVisibleSection = section;
      }
    });

    if (mostVisibleSection && mostVisibleSection !== activeSection) {
      setActiveSection(mostVisibleSection);
    }
  }, [activeSection]);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      detectActiveSection();
    };

    window.addEventListener("scroll", handleScroll);

    // Initialize the active section on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [detectActiveSection]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    // Extract the section ID from the href
    const sectionId = href.replace("#", "");

    // Set active section immediately to prevent flickering
    setActiveSection(sectionId);

    // Store these values outside the timeout to ensure we have the current values
    const currentIsScrolled = isScrolled;

    // Update URL without causing page jump
    window.history.pushState(null, "", href);

    // If we're on mobile and the menu is open
    if (isMobileMenuOpen) {
      // Close the mobile menu first
      setIsMobileMenuOpen(false);

      // Wait for the mobile menu to fully close (match the duration of the AnimatePresence exit animation)
      setTimeout(() => {
        scrollToElement(sectionId, {
          offset: currentIsScrolled ? 64 : 80,
          behavior: "smooth",
        });
      }, 350); // Set to slightly longer than the AnimatePresence exit duration (300ms)
    } else {
      // On desktop, just scroll immediately
      scrollToElement(sectionId, {
        offset: currentIsScrolled ? 64 : 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="font-display text-xl md:text-2xl font-bold text-primary"
          >
            Kartik<span className="text-foreground">.dev</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-1 items-center">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-colors relative",
                  activeSection === item.href.substring(1)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {item.name}
                {activeSection === item.href.substring(1) && (
                  <motion.span
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{
                      duration: 0.3,
                      layout: { duration: 0.3 },
                      ease: "easeInOut",
                    }}
                  />
                )}
              </a>
            </motion.div>
          ))}
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Navigation Button */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }} // 300ms animation duration
            className="md:hidden bg-background/95 backdrop-blur-md shadow-lg"
          >
            <nav className="container px-4 mx-auto py-4 flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "px-4 py-3 text-base font-medium border-b border-border/20",
                    activeSection === item.href.substring(1)
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  )}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
