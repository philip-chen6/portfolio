"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import BlurText from "@/components/BlurText";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Home() {
  return (
    <motion.main
      className="min-h-screen px-8 py-20 max-w-2xl mx-auto"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      {/* Intro Section */}
      <motion.section className="mb-16" variants={fadeInUp}>
        <BlurText
          text="philip chen"
          delay={100}
          animateBy="letters"
          direction="top"
          className="text-5xl mb-4 text-neutral-900 dark:text-neutral-100"
        />
        <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-6">
          developer
        </p>
        <div className="flex gap-3 text-sm items-center">
          <a
            href="https://github.com/yourusername"
            className="text-neutral-500 dark:text-neutral-400 hover:text-accent dark:hover:text-accent transition-colors"
          >
            github
          </a>
          <span className="text-neutral-300 dark:text-neutral-600">·</span>
          <a
            href="https://linkedin.com/in/yourusername"
            className="text-neutral-500 dark:text-neutral-400 hover:text-accent dark:hover:text-accent transition-colors"
          >
            linkedin
          </a>
          <span className="text-neutral-300 dark:text-neutral-600">·</span>
          <a
            href="https://x.com/yourusername"
            className="text-neutral-500 dark:text-neutral-400 hover:text-accent dark:hover:text-accent transition-colors"
          >
            x
          </a>
          <span className="text-neutral-300 dark:text-neutral-600">·</span>
          <a
            href="mailto:your.email@example.com"
            className="text-neutral-500 dark:text-neutral-400 hover:text-accent dark:hover:text-accent transition-colors"
          >
            email
          </a>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section className="mb-16" variants={fadeInUp}>
        <h2 className="text-xl mb-4 text-neutral-900 dark:text-neutral-100">
          about
        </h2>
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={2}
          blurStrength={4}
          containerClassName="my-0"
          textClassName="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed"
        >
          I'm a developer passionate about building clean, minimal, and functional
          digital experiences. I focus on creating products that are both beautiful
          and useful, with an emphasis on thoughtful design and smooth interactions.
        </ScrollReveal>
      </motion.section>

      {/* Experience Section */}
      <motion.section className="mb-16" variants={fadeInUp}>
        <h2 className="text-xl mb-8 text-neutral-900 dark:text-neutral-100">
          experience
        </h2>
        <div className="space-y-8">
          <div className="glass-hover p-3 -m-3 rounded-xl">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-base text-neutral-900 dark:text-neutral-100">
                <a
                  href="https://company1.com"
                  className="hover:text-accent dark:hover:text-accent transition-colors"
                >
                  Company Name
                </a>
                <span className="text-neutral-400 dark:text-neutral-500"> · Senior Product Designer</span>
              </h3>
              <span className="text-sm text-neutral-400 dark:text-neutral-500">
                2022—Present
              </span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Led design for the core product, working with a team of 12
              engineers. Shipped 3 major features that increased user engagement
              by 40%.
            </p>
          </div>

          <div className="glass-hover p-3 -m-3 rounded-xl">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-base text-neutral-900 dark:text-neutral-100">
                <a
                  href="https://company2.com"
                  className="hover:text-accent dark:hover:text-accent transition-colors"
                >
                  Another Company
                </a>
                <span className="text-neutral-400 dark:text-neutral-500"> · Product Designer</span>
              </h3>
              <span className="text-sm text-neutral-400 dark:text-neutral-500">
                2020—2022
              </span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Designed and launched the mobile app from 0 to 1. Conducted user
              research and worked closely with stakeholders to define product
              strategy.
            </p>
          </div>

          <div className="glass-hover p-3 -m-3 rounded-xl">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-base text-neutral-900 dark:text-neutral-100">
                <a
                  href="https://company3.com"
                  className="hover:text-accent dark:hover:text-accent transition-colors"
                >
                  Startup Inc
                </a>
                <span className="text-neutral-400 dark:text-neutral-500"> · Junior Designer</span>
              </h3>
              <span className="text-sm text-neutral-400 dark:text-neutral-500">
                2018—2020
              </span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              First design hire at an early-stage startup. Built the design
              system and established design processes across the company.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section className="mb-16" variants={fadeInUp}>
        <h2 className="text-xl mb-8 text-neutral-900 dark:text-neutral-100">
          projects
        </h2>
        <div className="space-y-6">
          <div className="glass-hover p-3 -m-3 rounded-xl">
            <h3 className="text-base text-neutral-900 dark:text-neutral-100 mb-1">
              Project Alpha
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2 leading-relaxed">
              A minimal task manager built with Next.js and Supabase
            </p>
            <div className="flex gap-3 text-sm">
              <a
                href="https://project-alpha.com"
                className="text-neutral-400 dark:text-neutral-500 hover:text-accent dark:hover:text-accent transition-colors"
              >
                live
              </a>
              <a
                href="https://github.com/yourusername/project-alpha"
                className="text-neutral-400 dark:text-neutral-500 hover:text-accent dark:hover:text-accent transition-colors"
              >
                github
              </a>
            </div>
          </div>

          <div className="glass-hover p-3 -m-3 rounded-xl">
            <h3 className="text-base text-neutral-900 dark:text-neutral-100 mb-1">
              Design System
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2 leading-relaxed">
              Open-source React component library with a focus on accessibility
            </p>
            <div className="flex gap-3 text-sm">
              <a
                href="https://design-system.com"
                className="text-neutral-400 dark:text-neutral-500 hover:text-accent dark:hover:text-accent transition-colors"
              >
                live
              </a>
              <a
                href="https://github.com/yourusername/design-system"
                className="text-neutral-400 dark:text-neutral-500 hover:text-accent dark:hover:text-accent transition-colors"
              >
                github
              </a>
            </div>
          </div>

          <div className="glass-hover p-3 -m-3 rounded-xl">
            <h3 className="text-base text-neutral-900 dark:text-neutral-100 mb-1">
              Weather App
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2 leading-relaxed">
              Clean weather dashboard using the OpenWeather API
            </p>
            <div className="flex gap-3 text-sm">
              <a
                href="https://weather-app.com"
                className="text-neutral-400 dark:text-neutral-500 hover:text-accent dark:hover:text-accent transition-colors"
              >
                live
              </a>
              <a
                href="https://github.com/yourusername/weather-app"
                className="text-neutral-400 dark:text-neutral-500 hover:text-accent dark:hover:text-accent transition-colors"
              >
                github
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section variants={fadeInUp}>
        <div className="flex gap-3 text-sm text-neutral-400 dark:text-neutral-500 items-center">
          <a
            href="https://linkedin.com/in/yourusername"
            className="hover:text-accent dark:hover:text-accent transition-colors"
          >
            linkedin
          </a>
          <span className="text-neutral-300 dark:text-neutral-600">·</span>
          <a
            href="https://github.com/yourusername"
            className="hover:text-accent dark:hover:text-accent transition-colors"
          >
            github
          </a>
          <span className="text-neutral-300 dark:text-neutral-600">·</span>
          <a
            href="https://instagram.com/yourusername"
            className="hover:text-accent dark:hover:text-accent transition-colors"
          >
            instagram
          </a>
          <span className="text-neutral-300 dark:text-neutral-600">·</span>
          <a
            href="mailto:your.email@example.com"
            className="hover:text-accent dark:hover:text-accent transition-colors"
          >
            email
          </a>
        </div>
      </motion.section>
    </motion.main>
  );
}
