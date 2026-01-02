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
    const duration = 4500;

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
    const particleCount = 600;
    const maxRadius = Math.min(canvas.width, canvas.height) * 0.6;

    // Create particles in a large disc, starting far away
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 30 + Math.random() * maxRadius;
      const z = 200 + Math.random() * 800; // Start far away

      particles.push({
        angle,
        radius,
        z,
        speed: 0.6 + Math.random() * 0.4,
        orbitSpeed: 0.005 + Math.random() * 0.004,
        size: 2 + Math.random() * 3,
        opacity: 0.4 + Math.random() * 0.6,
      });
    }

    const draw = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Clear with slight trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Acceleration curve - starts slow, speeds up toward end
      const acceleration = 1 + progress * progress * 2;

      // Sort by z for depth (far to near)
      particles.sort((a, b) => b.z - a.z);

      particles.forEach((particle) => {
        // Spiral rotation - continuous
        particle.angle += particle.orbitSpeed * acceleration;

        // Move toward camera - continuous, accelerating
        particle.z -= particle.speed * acceleration * 1.2;

        // Skip if way past camera
        if (particle.z < -200) return;

        // 3D projection
        const perspective = 400 / Math.max(50, 400 + particle.z);
        const x = cx + Math.cos(particle.angle) * particle.radius * perspective;
        const y = cy + Math.sin(particle.angle) * particle.radius * perspective * 0.5;

        const size = particle.size * perspective;

        // Fade in at start, fade out when passing camera
        let alpha = particle.opacity;
        if (progress < 0.1) {
          alpha *= progress / 0.1;
        }
        if (particle.z < 50) {
          alpha *= Math.max(0, (particle.z + 200) / 250);
        }

        // Depth-based opacity
        const depthAlpha = 0.3 + 0.7 * Math.min(1, perspective * 1.5);

        // Draw streak when moving fast (toward end)
        if (progress > 0.5 && particle.z < 400) {
          const streakProgress = (progress - 0.5) / 0.5;
          const streakLength = streakProgress * 30 * perspective;

          // Streak tail position (further from camera)
          const tailZ = particle.z + streakLength * 3;
          const tailPerspective = 400 / Math.max(50, 400 + tailZ);
          const tailX = cx + Math.cos(particle.angle) * particle.radius * tailPerspective;
          const tailY = cy + Math.sin(particle.angle) * particle.radius * tailPerspective * 0.5;

          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * depthAlpha * 0.8})`;
          ctx.lineWidth = size * 0.6;
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
        setTimeout(onComplete, 200);
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
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <canvas ref={canvasRef} className="w-full h-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
