import {
  BookOpen,
  Container,
  Plug,
  Settings,
  Sparkles,
  Wrench,
} from "lucide-react";
import { motion } from "motion/react";
import { type LangKey, t } from "../lib/language";

interface ServicesSectionProps {
  lang: LangKey;
}

const serviceIcons = [Plug, Container, Sparkles, Wrench, BookOpen, Settings];

const serviceColors = [
  { bg: "oklch(0.45 0.12 195 / 0.1)", icon: "oklch(0.35 0.1 195)" },
  { bg: "oklch(0.78 0.15 78 / 0.1)", icon: "oklch(0.62 0.14 78)" },
  { bg: "oklch(0.6 0.14 250 / 0.1)", icon: "oklch(0.42 0.11 250)" },
  { bg: "oklch(0.55 0.14 160 / 0.1)", icon: "oklch(0.38 0.12 160)" },
  { bg: "oklch(0.68 0.13 45 / 0.1)", icon: "oklch(0.5 0.13 45)" },
  { bg: "oklch(0.5 0.1 280 / 0.1)", icon: "oklch(0.38 0.1 280)" },
];

export default function ServicesSection({ lang }: ServicesSectionProps) {
  const tx = t(lang);

  return (
    <section
      id="services"
      className="relative py-24 lg:py-32"
      style={{ backgroundColor: "oklch(0.22 0.06 215)" }}
    >
      {/* Background radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, oklch(0.45 0.12 195 / 0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, oklch(0.78 0.15 78 / 0.06) 0%, transparent 50%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-body font-semibold uppercase tracking-widest mb-4"
            style={{
              backgroundColor: "oklch(0.78 0.15 78 / 0.15)",
              color: "oklch(0.88 0.1 78)",
            }}
          >
            <Wrench className="h-3 w-3" />
            {lang === "en" ? "What We Do" : "আমরা কি করি"}
          </div>

          <h2
            className="font-display font-bold mb-4 leading-tight"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: "oklch(0.97 0.01 85)",
            }}
          >
            {tx.services.title}
          </h2>

          <p
            className="font-body text-base md:text-lg max-w-xl mx-auto"
            style={{ color: "oklch(0.72 0.05 215)" }}
          >
            {tx.services.subtitle}
          </p>

          <div className="divider-gold max-w-xs mx-auto mt-8" />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tx.services.items.map((service, index) => {
            const Icon = serviceIcons[index];
            const colors = serviceColors[index];

            return (
              <motion.div
                key={service.title}
                data-ocid={`services.item.${index + 1}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="relative p-6 rounded-2xl border overflow-hidden cursor-default group"
                style={{
                  backgroundColor: "oklch(0.28 0.07 215)",
                  borderColor: "oklch(0.35 0.08 215)",
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                  style={{
                    background: `radial-gradient(ellipse at top left, ${colors.bg} 0%, transparent 60%)`,
                  }}
                />

                {/* Gold corner accent */}
                <div
                  className="absolute top-0 right-0 w-12 h-12 opacity-20"
                  style={{
                    background:
                      "linear-gradient(225deg, oklch(0.78 0.15 78) 0%, transparent 60%)",
                  }}
                />

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: colors.bg }}
                >
                  <Icon className="h-6 w-6" style={{ color: colors.icon }} />
                </div>

                {/* Service number */}
                <div
                  className="absolute top-5 right-5 font-display font-bold text-4xl leading-none opacity-[0.07]"
                  style={{ color: "oklch(0.97 0.01 85)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3
                  className="font-display font-bold text-lg mb-3 leading-snug"
                  style={{ color: "oklch(0.92 0.02 85)" }}
                >
                  {service.title}
                </h3>

                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "oklch(0.68 0.04 215)" }}
                >
                  {service.description}
                </p>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: "oklch(0.78 0.15 78 / 0.5)" }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
