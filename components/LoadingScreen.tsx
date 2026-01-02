"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let startTime = Date.now();
    const duration = 3000;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Particle {
      angle: number;
      radius: number;
      z: number;
      speed: number;
      orbitSpeed: number;
      size: number;
      opacity: number;
    }

    const particles: Particle[] = [];
    const particleCount = 500;
    const maxRadius = Math.min(canvas.width, canvas.height) * 0.5;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 20 + Math.random() * maxRadius;
      const z = 50 + Math.random() * 400;

      particles.push({
        angle,
        radius,
        z,
        speed: 0.5 + Math.random() * 0.5,
        orbitSpeed: 0.004 + Math.random() * 0.003,
        size: 2 + Math.random() * 2.5,
        opacity: 0.4 + Math.random() * 0.6,
      });
    }

    const draw = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Gradual acceleration throughout, faster at end
      const acceleration = 1 + progress * progress * progress * 5;

      // Explosion starts at 60%
      const explosionStart = 0.6;
      const isExploding = progress > explosionStart;
      const explosionProgress = isExploding ? (progress - explosionStart) / (1 - explosionStart) : 0;
      const explosionEase = explosionProgress * explosionProgress;

      particles.sort((a, b) => b.z - a.z);

      particles.forEach((particle) => {
        // Spiral rotation
        particle.angle += particle.orbitSpeed * acceleration;

        // Move toward camera
        particle.z -= particle.speed * acceleration * 0.8;

        // 3D projection
        const perspective = 300 / Math.max(30, 300 + particle.z);
        let x = cx + Math.cos(particle.angle) * particle.radius * perspective;
        let y = cy + Math.sin(particle.angle) * particle.radius * perspective * 0.5;

        // During explosion: particles fly outward to screen edges
        if (isExploding) {
          const explodeDistance = explosionEase * canvas.width * 1.5;
          x = cx + Math.cos(particle.angle) * (particle.radius * perspective + explodeDistance);
          y = cy + Math.sin(particle.angle) * (particle.radius * perspective * 0.5 + explodeDistance * 0.6);
        }

        const size = particle.size * perspective;

        // Fade
        let alpha = particle.opacity;
        if (progress < 0.1) alpha *= progress / 0.1;
        if (isExploding) alpha *= 1 - explosionEase;

        const depthAlpha = 0.3 + 0.7 * Math.min(1, perspective * 1.5);

        // Streaks during explosion
        if (isExploding && explosionProgress > 0.1) {
          const streakLength = explosionEase * 80;
          const tailX = x - Math.cos(particle.angle) * streakLength;
          const tailY = y - Math.sin(particle.angle) * streakLength * 0.6;

          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * depthAlpha * 0.7})`;
          ctx.lineWidth = size * 0.5;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(x, y);
          ctx.stroke();
        }

        // Main particle
        ctx.beginPath();
        ctx.arc(x, y, Math.max(1, size), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * depthAlpha})`;
        ctx.fill();
      });

      if (progress < 1) {
        animationId = requestAnimationFrame(draw);
      } else {
        setIsExiting(true);
        setTimeout(onComplete, 50);
      }
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="loading-screen fixed inset-0 z-[9999] bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <canvas ref={canvasRef} className="w-full h-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
