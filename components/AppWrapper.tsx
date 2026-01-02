"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingScreen } from "./LoadingScreen";
import { DotGrid } from "./DotGrid";
import { SmoothCursor } from "./ui/smooth-cursor";
import { ThemeToggle } from "./ThemeToggle";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <DotGrid />
      {!isLoading && <SmoothCursor />}
      {!isLoading && <ThemeToggle />}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
