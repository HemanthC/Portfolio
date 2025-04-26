// src/components/providers/ThemeProvider.tsx
"use client";

import { useThemeStore } from "@/store/theme-store";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.body.classList.remove("theme-transition");
    const timeout = setTimeout(() => {
      document.body.classList.add("theme-transition");
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={theme}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
