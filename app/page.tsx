"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CursorTrail } from "@/components/cursor-trail";
import { WaitlistForm } from "@/components/waitlist-form";
import { ArrowDown, Zap, Shield, Sparkles } from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Scroll handler
  const scrollToNext = () => {
    const nextSection = document.getElementById("vision");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-black overflow-hidden">
      <CursorTrail />

      {/* Gradient orbs background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <motion.section
        style={{ opacity, scale }}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-5 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block"
          >
            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tighter italic pr-8 sm:pr-12 lg:pr-16">
              <span className="gradient-text pl-2 pr-2">Slash</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl lg:text-3xl text-white font-medium max-w-2xl mx-auto leading-relaxed text-balance"
          >
            Rewire spending. Build Rewards.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative pt-4 flex justify-center"
          >
            <WaitlistForm />
          </motion.div>
        </motion.div>

        {/* Clickable Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={scrollToNext}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          >
            <ArrowDown className="w-6 h-6 text-white/50 hover:text-white transition-colors" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Vision / Features */}
      <section
        id="vision"
        className="relative py-20 md:py-24 px-4 sm:px-6 lg:px-8 snap-start"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              What if every impulse spend could build your dream life instead?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Protect Yourself",
                description:
                  "Real-time intervention for impulsive habitual spending.",
              },
              {
                icon: Zap,
                title: "Achieve Your Dreams",
                description:
                  "Deliberately redirect savings towards dream goals.",
              },
              {
                icon: Sparkles,
                title: "Transform Reality",
                description:
                  "Build your dream life  for the same cost as your old one.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-6 rounded-2xl group cursor-pointer"
              >
                <div className="mb-3 inline-flex p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center glass-card p-10 rounded-3xl"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Ready to experience the future?
          </h2>
          <p className="text-xl text-gray-300 mb-6 leading-relaxed">
            Join thousands of early adopters reshaping their spending to easily
            live their best lives.
          </p>
          <WaitlistForm />
        </motion.div>
      </section> */}

      <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 Slash. All rights reserved.
          </p>
          <div className="flex gap-6">
            {/* <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors text-sm"
            >
              Privacy
            </a> */}
            <a
              href="https://www.linkedin.com/company/the-slash-app/"
              className="text-gray-500 hover:text-white transition-colors text-sm"
            >
              LinkedIn
            </a>
            <a
              href="mailto:navya@theslash.app"
              className="text-gray-500 hover:text-white transition-colors text-sm"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
