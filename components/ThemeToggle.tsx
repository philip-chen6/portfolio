"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-8 right-8 text-neutral-600 dark:text-neutral-400 hover:text-accent dark:hover:text-accent transition-colors"
      aria-label="Toggle theme"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="transition-transform hover:rotate-180 duration-500"
      >
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 2 A10 10 0 0 1 12 22 A5 5 0 0 1 12 12 A5 5 0 0 0 12 2" fill="currentColor" />
        <circle cx="12" cy="7" r="1.5" fill={theme === "light" ? "#ffffff" : "#171717"} />
        <circle cx="12" cy="17" r="1.5" fill={theme === "light" ? "#171717" : "#ffffff"} />
      </svg>
    </button>
  );
}
