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
      hue: number;
      brightness: number;
      glowSize: number;
      color: { r: number; g: number; b: number };
      twinkleSpeed: number;
      twinkleOffset: number;
    }

    // Pre-render glow sprites for performance
    const glowSprite = document.createElement("canvas");
    const glowSize = 32;
    glowSprite.width = glowSize;
    glowSprite.height = glowSize;
    const glowCtx = glowSprite.getContext("2d")!;
    const glowGradient = glowCtx.createRadialGradient(
      glowSize / 2,
      glowSize / 2,
      0,
      glowSize / 2,
      glowSize / 2,
      glowSize / 2
    );
    glowGradient.addColorStop(0, "rgba(255, 255, 255, 0.25)");
    glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    glowCtx.fillStyle = glowGradient;
    glowCtx.fillRect(0, 0, glowSize, glowSize);

    const particles: Particle[] = [];
    const particleCount = 400;
    const maxRadius = Math.min(canvas.width, canvas.height) * 0.5;

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 20 + Math.random() * maxRadius;
      const z = 50 + Math.random() * 400;

      // Subtle color variation - mostly white with hints of blue/warm
      const colorType = Math.random();
      let r = 255,
        g = 255,
        b = 255;
      if (colorType < 0.3) {
        // Slight blue tint
        r = 200 + Math.random() * 55;
        g = 210 + Math.random() * 45;
        b = 255;
      } else if (colorType < 0.5) {
        // Slight warm tint
        r = 255;
        g = 230 + Math.random() * 25;
        b = 200 + Math.random() * 40;
      }

      particles.push({
        angle,
        radius,
        z,
        speed: 0.5 + Math.random() * 0.5,
        orbitSpeed: 0.004 + Math.random() * 0.003,
        size: 1.5 + Math.random() * 2.5,
        opacity: 0.5 + Math.random() * 0.5,
        hue: 0,
        brightness: 0.6 + Math.random() * 0.4,
        glowSize: 1 + Math.random() * 1.5,
        color: { r, g, b },
        twinkleSpeed: 0.5 + Math.random() * 2,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    ctx.lineCap = "round";

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
      const explosionProgress = isExploding
        ? (progress - explosionStart) / (1 - explosionStart)
        : 0;
      const explosionEase = explosionProgress * explosionProgress;

      particles.forEach((particle) => {
        // Spiral rotation
        particle.angle += particle.orbitSpeed * acceleration;

        // Move toward camera
        particle.z -= particle.speed * acceleration * 0.8;

        // 3D projection
        const perspective = 300 / Math.max(30, 300 + particle.z);
        let x = cx + Math.cos(particle.angle) * particle.radius * perspective;
        let y =
          cy + Math.sin(particle.angle) * particle.radius * perspective * 0.5;

        // During explosion: particles fly outward to screen edges
        if (isExploding) {
          const explodeDistance = explosionEase * canvas.width * 1.5;
          x =
            cx +
            Math.cos(particle.angle) *
              (particle.radius * perspective + explodeDistance);
          y =
            cy +
            Math.sin(particle.angle) *
              (particle.radius * perspective * 0.5 + explodeDistance * 0.6);
        }

        const size = particle.size * perspective;

        // Fade in at start only
        let alpha = particle.opacity;
        if (progress < 0.1) alpha *= progress / 0.1;

        const depthAlpha = 0.3 + 0.7 * Math.min(1, perspective * 1.5);

        // Streaks during explosion
        if (isExploding && explosionProgress > 0.1) {
          const streakLength = explosionEase * 80;
          const tailX = x - Math.cos(particle.angle) * streakLength;
          const tailY = y - Math.sin(particle.angle) * streakLength * 0.6;

          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * depthAlpha * 0.7})`;
          ctx.lineWidth = size * 0.5;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(x, y);
          ctx.stroke();
        }

        // Twinkle effect
        const twinkle =
          0.7 +
          0.3 *
            Math.sin(
              elapsed * 0.003 * particle.twinkleSpeed + particle.twinkleOffset
            );
        const finalAlpha = alpha * depthAlpha * twinkle;
        const { r, g, b } = particle.color;

        const coreRadius = Math.max(0.5, size * 0.5);

        // For small/distant particles, skip glow - just draw simple dot
        if (size < 1.2) {
          ctx.beginPath();
          ctx.arc(x, y, coreRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${
            finalAlpha * particle.brightness
          })`;
          ctx.fill();
        } else {
          // Draw pre-rendered glow sprite (much faster than createRadialGradient)
          const glowRadius = size * particle.glowSize * 2;
          ctx.globalAlpha = finalAlpha;
          ctx.drawImage(
            glowSprite,
            x - glowRadius / 2,
            y - glowRadius / 2,
            glowRadius,
            glowRadius
          );
          ctx.globalAlpha = 1;

          // Crisp star core
          ctx.beginPath();
          ctx.arc(x, y, coreRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${
            finalAlpha * particle.brightness
          })`;
          ctx.fill();

          // Tiny bright center point
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.3, coreRadius * 0.4), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${
            finalAlpha * particle.brightness
          })`;
          ctx.fill();
        }
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
