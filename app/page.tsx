export default function Home() {
  return (
    <main className="min-h-screen px-8 py-24 max-w-3xl mx-auto">
      {/* Intro Section */}
      <section className="mb-32">
        <h1 className="text-5xl font-light mb-6 text-neutral-900 dark:text-neutral-100">
          Your Name
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 font-light">
          Designer, developer, and creative technologist
        </p>
        <div className="flex gap-6 text-sm">
          <a
            href="https://github.com/yourusername"
            className="text-neutral-600 dark:text-neutral-400 hover:text-accent dark:hover:text-accent transition-colors"
          >
            github
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            className="text-neutral-600 dark:text-neutral-400 hover:text-accent dark:hover:text-accent transition-colors"
          >
            linkedin
          </a>
          <a
            href="https://x.com/yourusername"
            className="text-neutral-600 dark:text-neutral-400 hover:text-accent dark:hover:text-accent transition-colors"
          >
            x
          </a>
          <a
            href="mailto:your.email@example.com"
            className="text-neutral-600 dark:text-neutral-400 hover:text-accent dark:hover:text-accent transition-colors"
          >
            email
          </a>
        </div>
      </section>

      {/* Experience Section */}
      <section className="mb-32">
        <h2 className="text-2xl font-light mb-12 text-neutral-900 dark:text-neutral-100">
          Experience
        </h2>
        <div className="space-y-12">
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-lg text-neutral-900 dark:text-neutral-100">
                <a
                  href="https://company1.com"
                  className="hover:text-accent dark:hover:text-accent transition-colors"
                >
                  Company Name
                </a>{" "}
                · Senior Product Designer
              </h3>
              <span className="text-sm text-neutral-500 dark:text-neutral-500">
                2022—Present
              </span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Led design for the core product, working with a team of 12
              engineers. Shipped 3 major features that increased user
              engagement by 40%.
            </p>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-lg text-neutral-900 dark:text-neutral-100">
                <a
                  href="https://company2.com"
                  className="hover:text-accent dark:hover:text-accent transition-colors"
                >
                  Another Company
                </a>{" "}
                · Product Designer
              </h3>
              <span className="text-sm text-neutral-500 dark:text-neutral-500">
                2020—2022
              </span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Designed and launched the mobile app from 0 to 1. Conducted user
              research and worked closely with stakeholders to define product
              strategy.
            </p>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-lg text-neutral-900 dark:text-neutral-100">
                <a
                  href="https://company3.com"
                  className="hover:text-accent dark:hover:text-accent transition-colors"
                >
                  Startup Inc
                </a>{" "}
                · Junior Designer
              </h3>
              <span className="text-sm text-neutral-500 dark:text-neutral-500">
                2018—2020
              </span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              First design hire at an early-stage startup. Built the design
              system and established design processes across the company.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="mb-32">
        <h2 className="text-2xl font-light mb-12 text-neutral-900 dark:text-neutral-100">
          Projects
        </h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg text-neutral-900 dark:text-neutral-100 mb-2">
              Project Alpha
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-3 leading-relaxed">
              A minimal task manager built with Next.js and Supabase
            </p>
            <div className="flex gap-4 text-sm">
              <a
                href="https://project-alpha.com"
                className="text-neutral-600 dark:text-neutral-400 hover:text-accent dark:hover:text-accent transition-colors"
              >
                live site
              </a>
              <a
                href="https://github.com/yourusername/project-alpha"
                className="text-neutral-600 dark:text-neutral-400 hover:text-accent dark:hover:text-accent transition-colors"
              >
                github
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg text-neutral-900 dark:text-neutral-100 mb-2">
              Design System
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-3 leading-relaxed">
              Open-source React component library with a focus on accessibility
            </p>
            <div className="flex gap-4 text-sm">
              <a
                href="https://design-system.com"
                className="text-neutral-600 dark:text-neutral-400 hover:text-accent dark:hover:text-accent transition-colors"
              >
                live site
              </a>
              <a
                href="https://github.com/yourusername/design-system"
                className="text-neutral-600 dark:text-neutral-400 hover:text-accent dark:hover:text-accent transition-colors"
              >
                github
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg text-neutral-900 dark:text-neutral-100 mb-2">
              Weather App
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-3 leading-relaxed">
              Clean weather dashboard using the OpenWeather API
            </p>
            <div className="flex gap-4 text-sm">
              <a
                href="https://weather-app.com"
                className="text-neutral-600 dark:text-neutral-400 hover:text-accent dark:hover:text-accent transition-colors"
              >
                live site
              </a>
              <a
                href="https://github.com/yourusername/weather-app"
                className="text-neutral-600 dark:text-neutral-400 hover:text-accent dark:hover:text-accent transition-colors"
              >
                github
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section>
        <div className="flex gap-6 text-sm text-neutral-600 dark:text-neutral-400">
          <a
            href="https://linkedin.com/in/yourusername"
            className="hover:text-accent dark:hover:text-accent transition-colors"
          >
            linkedin
          </a>
          <a
            href="https://github.com/yourusername"
            className="hover:text-accent dark:hover:text-accent transition-colors"
          >
            github
          </a>
          <a
            href="https://instagram.com/yourusername"
            className="hover:text-accent dark:hover:text-accent transition-colors"
          >
            instagram
          </a>
          <a
            href="mailto:your.email@example.com"
            className="hover:text-accent dark:hover:text-accent transition-colors"
          >
            email
          </a>
        </div>
      </section>
    </main>
  );
}
