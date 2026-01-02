"use client";

import { useState } from "react";
import { LoadingScreen } from "./LoadingScreen";
import { DotGrid } from "./DotGrid";
import { SmoothCursor } from "./ui/smooth-cursor";
import { ThemeToggle } from "./ThemeToggle";

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <DotGrid />
      {!isLoading && <SmoothCursor />}
      {!isLoading && <ThemeToggle />}
      {!isLoading && children}
    </>
  );
}
