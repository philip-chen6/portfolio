"use client";

import { useEffect, useRef } from "react";

export function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const dots: { x: number; y: number; baseX: number; baseY: number }[] = [];
    const spacing = 40;
    const dotRadius = 1;
    const influenceRadius = 100;
    const parallaxStrength = 20; // How much the grid moves with cursor

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    const initDots = () => {
      dots.length = 0;
      // Add extra dots around edges for parallax movement
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
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = document.documentElement.classList.contains("dark");

      // Calculate parallax offset based on mouse position relative to center
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const targetOffsetX = ((mouseRef.current.x - centerX) / centerX) * parallaxStrength;
      const targetOffsetY = ((mouseRef.current.y - centerY) / centerY) * parallaxStrength;

      // Smooth the offset movement
      offsetRef.current.x += (targetOffsetX - offsetRef.current.x) * 0.05;
      offsetRef.current.y += (targetOffsetY - offsetRef.current.y) * 0.05;

      dots.forEach((dot) => {
        // Apply parallax offset to base position
        const parallaxX = dot.baseX + offsetRef.current.x;
        const parallaxY = dot.baseY + offsetRef.current.y;

        const dx = mouseRef.current.x - parallaxX;
        const dy = mouseRef.current.y - parallaxY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < influenceRadius && distance > 0) {
          const force = (1 - distance / influenceRadius) * 15;
          dot.x = parallaxX - (dx / distance) * force;
          dot.y = parallaxY - (dy / distance) * force;
        } else {
          dot.x += (parallaxX - dot.x) * 0.1;
          dot.y += (parallaxY - dot.y) * 0.1;
        }

        const opacity = distance < influenceRadius
          ? 0.25 + (1 - distance / influenceRadius) * 0.4
          : 0.25;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
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

    const handleMouseLeave = () => {
      // Keep last position for smooth return
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Initialize mouse to center
    mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}
