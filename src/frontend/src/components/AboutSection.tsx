import { Award, Droplets, Users } from "lucide-react";
import { motion } from "motion/react";
import { type LangKey, t } from "../lib/language";

interface AboutSectionProps {
  lang: LangKey;
}

const statIcons = [Award, Users, Droplets];

export default function AboutSection({ lang }: AboutSectionProps) {
  const tx = t(lang);

  return (
    <section
      id="about"
      className="relative py-24 lg:py-32 overflow-hidden mandala-bg"
      style={{ backgroundColor: "oklch(0.97 0.012 85)" }}
    >
      {/* Top decorative line */}
      <div className="divider-gold max-w-xl mx-auto mb-16" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            {/* Section label */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-body font-semibold uppercase tracking-widest mb-4"
              style={{
                backgroundColor: "oklch(0.45 0.12 195 / 0.1)",
                color: "oklch(0.35 0.1 195)",
              }}
            >
              <Droplets className="h-3 w-3" />
              {lang === "en" ? "Who We Are" : "আমরা কারা"}
            </div>

            <h2
              className="font-display font-bold mb-6 leading-tight"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                color: "oklch(0.22 0.06 215)",
              }}
            >
              {tx.about.title}
            </h2>

            <div
              className="h-1 w-16 rounded-full mb-6"
              style={{ backgroundColor: "oklch(0.78 0.15 78)" }}
            />

            <p
              className="font-body text-base md:text-lg leading-relaxed mb-8"
              style={{ color: "oklch(0.38 0.04 215)" }}
            >
              {tx.about.body}
            </p>

            {/* Partnership badge */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border"
              style={{
                borderColor: "oklch(0.78 0.15 78 / 0.3)",
                backgroundColor: "oklch(0.78 0.15 78 / 0.05)",
              }}
            >
              <span className="text-2xl">🤝</span>
              <div>
                <p
                  className="font-body font-semibold text-sm"
                  style={{ color: "oklch(0.22 0.06 215)" }}
                >
                  {lang === "en" ? "Partnership Business" : "অংশীদারিত্ব ব্যবসা"}
                </p>
                <p
                  className="font-body text-xs"
                  style={{ color: "oklch(0.5 0.04 215)" }}
                >
                  {lang === "en"
                    ? "Under Chakraborty Enterprise"
                    : "চক্রবর্তী এন্টারপ্রাইজের অধীনে"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Stats cards */}
          <div className="grid grid-cols-1 gap-6">
            {tx.about.stats.map((stat, index) => {
              const Icon = statIcons[index];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  className="relative flex items-center gap-6 p-6 rounded-2xl border overflow-hidden group"
                  style={{
                    backgroundColor: "oklch(0.99 0.006 85)",
                    borderColor: "oklch(0.88 0.03 215)",
                    boxShadow: "0 4px 20px oklch(0.22 0.06 215 / 0.06)",
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 12px 36px oklch(0.22 0.06 215 / 0.12)",
                  }}
                >
                  {/* Background accent */}
                  <div
                    className="absolute right-0 top-0 bottom-0 w-1 rounded-r-2xl transition-all duration-300 group-hover:w-2"
                    style={{ backgroundColor: "oklch(0.78 0.15 78)" }}
                  />

                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: "oklch(0.28 0.085 215 / 0.08)" }}
                  >
                    <Icon
                      className="h-7 w-7"
                      style={{ color: "oklch(0.45 0.12 195)" }}
                    />
                  </div>

                  {/* Text */}
                  <div>
                    <div
                      className="font-display font-bold text-4xl leading-none mb-1"
                      style={{ color: "oklch(0.22 0.06 215)" }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="font-body text-sm font-medium"
                      style={{ color: "oklch(0.5 0.04 215)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="divider-gold max-w-xl mx-auto mt-16" />
    </section>
  );
}
