"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: (x?: number, y?: number) => void;
}>({
  theme: "light",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [isAnimating, setIsAnimating] = useState(false);
  const [rippleStyle, setRippleStyle] = useState<React.CSSProperties>({});
  const [rippleTheme, setRippleTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    }
  }, []);

  const toggleTheme = useCallback((x?: number, y?: number) => {
    if (isAnimating) return;

    const newTheme = theme === "light" ? "dark" : "light";
    setRippleTheme(newTheme);

    // Calculate position and size for the ripple
    const posX = x ?? window.innerWidth - 40;
    const posY = y ?? 40;

    // Calculate the maximum distance to any corner
    const maxX = Math.max(posX, window.innerWidth - posX);
    const maxY = Math.max(posY, window.innerHeight - posY);
    const radius = Math.sqrt(maxX * maxX + maxY * maxY);

    setRippleStyle({
      left: posX,
      top: posY,
      width: radius * 2,
      height: radius * 2,
    });

    setIsAnimating(true);

    // Switch theme halfway through animation
    setTimeout(() => {
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    }, 400);

    // End animation
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  }, [theme, isAnimating]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
      {isAnimating && (
        <div
          className="theme-ripple"
          style={{
            ...rippleStyle,
            backgroundColor: rippleTheme === "dark" ? "#171717" : "#ffffff",
          }}
        />
      )}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
