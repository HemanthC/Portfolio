// src/hooks/useSmoothScroll.ts
import { useCallback } from "react";

interface SmoothScrollOptions {
  offset?: number;
  behavior?: ScrollBehavior;
}

export function useSmoothScroll() {
  const scrollToElement = useCallback(
    (targetId: string, options: SmoothScrollOptions = {}) => {
      const {
        offset = 80, // Default offset to account for fixed header
        behavior = "smooth",
      } = options;

      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior,
        });

        // Update URL without causing page jump
        history.pushState(null, "", `#${targetId}`);

        return true;
      }

      return false;
    },
    []
  );

  const scrollToTop = useCallback((behavior: ScrollBehavior = "smooth") => {
    window.scrollTo({
      top: 0,
      behavior,
    });
  }, []);

  return { scrollToElement, scrollToTop };
}
