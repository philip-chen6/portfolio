"use client";

import { motion } from "framer-motion";
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
        {/* <p className="text-lg text-neutral-500 dark:text-neutral-400 mb-6">
          developer
        </p> */}
        <div className="flex gap-4 text-sm items-center">
          <a
            href="www.linkedin.com/in/philip-chen6"
            className="link-hover text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            linkedin
          </a>

          <a
            href="https://github.com/philip-chen6"
            className="link-hover text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            github
          </a>

          <a
            href="https://www.instagram.com/philip_chenn/"
            className="link-hover text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            instagram
          </a>
          <a
            href="mailto:philipchen247@gmail.com"
            className="link-hover text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
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
        <p className="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Hey, I'm Philip! I'm studying data science at UCSD. Currently, I do AI
          research in a lab, and I build software and go to hackathons. I'm also
          a musician in my free time.
        </p>
      </motion.section>

      {/* Experience Section */}
      <motion.section className="mb-16" variants={fadeInUp}>
        <h2 className="text-xl mb-8 text-neutral-900 dark:text-neutral-100">
          experience
        </h2>
        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-base text-neutral-900 dark:text-neutral-100">
                <a
                  href="https://company1.com"
                  className="link-hover hover:text-accent dark:hover:text-accent transition-colors"
                >
                  Roselab
                </a>
                <span className="text-neutral-400 dark:text-neutral-500">
                  {" "}
                  · Research Assistant
                </span>
              </h3>
              <span className="text-sm text-neutral-400 dark:text-neutral-500">
                2025-Present
              </span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Research on LLM steering and reasoning. Co-authored paper accepted
              to NeurIPS 2025.
            </p>
            <a
              href="https://openreview.net/pdf?id=HCG7UGGRqz"
              className="link-hover text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              [Paper]
            </a>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-base text-neutral-900 dark:text-neutral-100">
                <a
                  href="https://company2.com"
                  className="link-hover hover:text-accent dark:hover:text-accent transition-colors"
                >
                  Netserpent
                </a>
                <span className="text-neutral-400 dark:text-neutral-500">
                  {" "}
                  · AI Development Lead
                </span>
              </h3>
              <span className="text-sm text-neutral-400 dark:text-neutral-500">
                2024-2025
              </span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Led AI development for a cybersecurity startup. Built and
              evaluated ML pipelines for automated threat classification.
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
          <div>
            <h3 className="text-base text-neutral-900 dark:text-neutral-100 mb-1">
              Evolve
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2 leading-relaxed">
              A timeline generator for scientific fields, winner of Anthropic x
              UCSD hackathon
            </p>
            <div className="flex gap-4 text-sm">
              <a
                href="https://evolve.qtzx.dev/"
                className="link-hover text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                live
              </a>
              <a
                href="https://github.com/philip-chen6/evolve"
                className="link-hover text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                github
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base text-neutral-900 dark:text-neutral-100 mb-1">
              Clarity
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2 leading-relaxed">
              A computer vision based pill classifier, winner of UCSD HealthLink
              hackathon
            </p>
            <div className="flex gap-4 text-sm">
              <a
                href="https://clarity.qtzx.dev/"
                className="link-hover text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                live
              </a>
              <a
                href="https://github.com/yourusername/design-system"
                className="link-hover text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                github
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base text-neutral-900 dark:text-neutral-100 mb-1">
              ClarifAI
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-2 leading-relaxed">
              Multi-agent system for explaining research topics in video,
              finalist at NVIDIA Agent Hackathon
            </p>
            <div className="flex gap-4 text-sm">
              <a
                href="https://clarifai.stephenhung.me/"
                className="link-hover text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                live
              </a>
              <a
                href="https://github.com/qtzx06/clarifai"
                className="link-hover text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                github
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section variants={fadeInUp}>
        <div className="flex gap-4 text-sm text-neutral-400 dark:text-neutral-500 items-center">
          <a
            href="www.linkedin.com/in/philip-chen6"
            className="link-hover hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            linkedin
          </a>
          <a
            href="https://github.com/philip-chen6"
            className="link-hover hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            github
          </a>
          <a
            href="https://www.instagram.com/philip_chenn/"
            className="link-hover hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            instagram
          </a>
          <a
            href="mailto:philipchen247@gmail.com"
            className="link-hover hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            email
          </a>
        </div>
      </motion.section>
    </motion.main>
  );
}
