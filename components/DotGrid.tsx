"use client";

import { useEffect, useRef, useState } from "react";

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const offsetRef = useRef({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check for touch device
    const hasTouchPoints = navigator.maxTouchPoints > 0;
    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(hasTouchPoints || hasCoarsePointer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const spacing = 50;
    const dotRadius = 1;
    const influenceRadius = isTouchDevice ? 0 : 100;
    const parallaxStrength = isTouchDevice ? 0 : 35;
    const trailDecay = 0.97;

    interface Dot {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      brightness: number;
    }

    const dots: Dot[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    const initDots = () => {
      dots.length = 0;
      const padding = parallaxStrength * 2;
      const cols = Math.ceil((canvas.width + padding * 2) / spacing) + 1;
      const rows = Math.ceil((canvas.height + padding * 2) / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: i * spacing - padding,
            y: j * spacing - padding,
            baseX: i * spacing - padding,
            baseY: j * spacing - padding,
            brightness: 0,
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains("dark");

      // Calculate parallax offset
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const targetOffsetX = ((mouseRef.current.x - centerX) / centerX) * parallaxStrength;
      const targetOffsetY = ((mouseRef.current.y - centerY) / centerY) * parallaxStrength;

      offsetRef.current.x += (targetOffsetX - offsetRef.current.x) * 0.05;
      offsetRef.current.y += (targetOffsetY - offsetRef.current.y) * 0.05;

      dots.forEach((dot) => {
        const parallaxX = dot.baseX + offsetRef.current.x;
        const parallaxY = dot.baseY + offsetRef.current.y;

        const dx = mouseRef.current.x - parallaxX;
        const dy = mouseRef.current.y - parallaxY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Light up dots near cursor
        if (distance < influenceRadius) {
          const intensity = 1 - distance / influenceRadius;
          dot.brightness = Math.max(dot.brightness, intensity);
        }

        // Decay brightness over time (creates trail)
        dot.brightness *= trailDecay;

        // Push dots away from cursor
        if (distance < influenceRadius && distance > 0) {
          const force = (1 - distance / influenceRadius) * 12;
          dot.x = parallaxX - (dx / distance) * force;
          dot.y = parallaxY - (dy / distance) * force;
        } else {
          dot.x += (parallaxX - dot.x) * 0.1;
          dot.y += (parallaxY - dot.y) * 0.1;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);

        const baseOpacity = isDark ? 0.3 : 0.2;
        const trailGlow = dot.brightness * 1.1;
        const opacity = baseOpacity + trailGlow;

        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${opacity})`
          : `rgba(0, 0, 0, ${opacity})`;

        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", resize);

    // Only add mouse listener on non-touch devices
    if (!isTouchDevice) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [isTouchDevice]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
