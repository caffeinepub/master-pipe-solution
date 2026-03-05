import { ChevronDown, Droplets } from "lucide-react";
import { motion } from "motion/react";
import { type LangKey, t } from "../lib/language";

interface HeroSectionProps {
  lang: LangKey;
}

export default function HeroSection({ lang }: HeroSectionProps) {
  const tx = t(lang);

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollDown = () => {
    const el = document.querySelector("#about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-banner.dim_1200x500.jpg')",
        }}
      />

      {/* Gradient Overlay — dark navy with teal hint */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.15 0.06 248 / 0.92) 0%, oklch(0.22 0.09 215 / 0.85) 50%, oklch(0.18 0.07 248 / 0.88) 100%)",
        }}
      />

      {/* Decorative circles — mandala feel */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border opacity-10"
        style={{ borderColor: "oklch(0.78 0.15 78)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border opacity-[0.07]"
        style={{ borderColor: "oklch(0.78 0.15 78)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border opacity-[0.04]"
        style={{ borderColor: "oklch(0.78 0.15 78)" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
          style={{
            borderColor: "oklch(0.78 0.15 78 / 0.5)",
            backgroundColor: "oklch(0.78 0.15 78 / 0.1)",
          }}
        >
          <Droplets
            className="h-4 w-4"
            style={{ color: "oklch(0.78 0.15 78)" }}
          />
          <span
            className="text-xs font-body font-semibold uppercase tracking-widest"
            style={{ color: "oklch(0.88 0.1 78)" }}
          >
            {tx.hero.subtitle}
          </span>
        </motion.div>

        {/* Main Tagline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-bold mb-6 leading-tight"
          style={{
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            color: "oklch(0.97 0.01 85)",
          }}
        >
          {lang === "en" ? (
            <>
              <span style={{ color: "oklch(0.78 0.15 78)" }}>Pure Water.</span>{" "}
              <span>Safe Homes.</span>
              <br />
              <span style={{ color: "oklch(0.65 0.12 195)" }}>
                Better Lives.
              </span>
            </>
          ) : (
            <>
              <span style={{ color: "oklch(0.78 0.15 78)" }}>বিশুদ্ধ জল।</span>{" "}
              <span>নিরাপদ ঘর।</span>
              <br />
              <span style={{ color: "oklch(0.65 0.12 195)" }}>উন্নত জীবন।</span>
            </>
          )}
        </motion.h1>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="divider-gold max-w-xs mx-auto mb-8"
        />

        {/* Intro Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="font-body text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "oklch(0.82 0.03 215)" }}
        >
          {tx.hero.intro}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            type="button"
            data-ocid="hero.primary_button"
            onClick={scrollToContact}
            className="px-8 py-4 font-body font-bold text-base rounded-full transition-all duration-200 shadow-gold animate-glow"
            style={{
              backgroundColor: "oklch(0.78 0.15 78)",
              color: "oklch(0.18 0.05 248)",
            }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "oklch(0.82 0.17 78)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            {tx.hero.cta}
          </motion.button>

          <motion.button
            type="button"
            onClick={() => {
              const el = document.querySelector("#services");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 font-body font-semibold text-base rounded-full border-2 transition-all duration-200"
            style={{
              borderColor: "oklch(0.88 0.04 215 / 0.6)",
              color: "oklch(0.88 0.04 215)",
            }}
            whileHover={{
              borderColor: "oklch(0.65 0.12 195)",
              color: "oklch(0.75 0.13 195)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            {lang === "en" ? "Our Services" : "আমাদের সেবা"}
          </motion.button>
        </motion.div>

        {/* Contact pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-12"
        >
          <a
            href="tel:8538851119"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body transition-all duration-200"
            style={{
              backgroundColor: "oklch(0.28 0.07 215 / 0.5)",
              color: "oklch(0.78 0.15 78)",
            }}
          >
            <span>📞</span> 8538851119
          </a>
          <a
            href="tel:9883004437"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body transition-all duration-200"
            style={{
              backgroundColor: "oklch(0.28 0.07 215 / 0.5)",
              color: "oklch(0.78 0.15 78)",
            }}
          >
            <span>📞</span> 9883004437
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float"
        style={{ color: "oklch(0.78 0.15 78)" }}
        aria-label="Scroll down"
      >
        <ChevronDown className="h-7 w-7" />
      </motion.button>
    </section>
  );
}
