// src/hooks/useScrollAnimation.tsx
"use client";

import { useEffect, useRef } from "react";

type AnimationType = "fade-in" | "slide-up" | "slide-left" | "slide-right";

interface ScrollAnimationOptions {
  type: AnimationType;
  threshold?: number;
  delay?: number;
  root?: Element | null;
  rootMargin?: string;
}

export function useScrollAnimation<T extends HTMLElement>({
  type = "fade-in",
  threshold = 0.1,
  delay = 0,
  root = null,
  rootMargin = "0px",
}: ScrollAnimationOptions) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("active");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      let classes = ["reveal"];

      switch (type) {
        case "fade-in":
          break;
        case "slide-up":
          classes.push("translate-y-20");
          break;
        case "slide-left":
          classes.push("slide-left");
          break;
        case "slide-right":
          classes.push("slide-right");
          break;
      }

      classes.forEach((cls) => currentRef.classList.add(cls));
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [type, threshold, delay, root, rootMargin]);

  return ref;
}
