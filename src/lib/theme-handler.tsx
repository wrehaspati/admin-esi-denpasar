"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export function ThemeHandler() {
  const { theme } = useTheme();

  useEffect(() => {
    const disableTransitionsTemporarily = () => {
      const html = document.documentElement;
      html.setAttribute("data-theme-transition", "off");
      setTimeout(() => {
        html.removeAttribute("data-theme-transition");
      }, 0); // Re-enable transitions immediately after hydration
    };

    disableTransitionsTemporarily();
  }, [theme]);
  
  return null;
}