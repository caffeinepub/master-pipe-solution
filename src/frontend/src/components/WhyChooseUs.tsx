import { CheckCircle, Clock, Hammer, Heart } from "lucide-react";
import { motion } from "motion/react";
import { type LangKey, t } from "../lib/language";

interface WhyChooseUsProps {
  lang: LangKey;
}

const icons = [Clock, Hammer, CheckCircle, Heart];
const gradients = [
  "oklch(0.45 0.12 195)",
  "oklch(0.78 0.15 78)",
  "oklch(0.55 0.14 160)",
  "oklch(0.65 0.15 15)",
];
const bgColors = [
  "oklch(0.45 0.12 195 / 0.1)",
  "oklch(0.78 0.15 78 / 0.1)",
  "oklch(0.55 0.14 160 / 0.1)",
  "oklch(0.65 0.15 15 / 0.1)",
];

export default function WhyChooseUs({ lang }: WhyChooseUsProps) {
  const tx = t(lang);

  return (
    <section
      id="why-us"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "oklch(0.97 0.012 85)" }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, oklch(0.45 0.12 195 / 0.05) 0%, transparent 50%), radial-gradient(circle at 90% 80%, oklch(0.78 0.15 78 / 0.05) 0%, transparent 50%)",
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
          <h2
            className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: "oklch(0.22 0.06 215)",
            }}
          >
            {tx.whyUs.title}
          </h2>

          <div className="divider-gold max-w-xs mx-auto mt-6" />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tx.whyUs.items.map((item, index) => {
            const Icon = icons[index];
            const color = gradients[index];
            const bgColor = bgColors[index];

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -6,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="flex flex-col items-center text-center p-8 rounded-2xl border group transition-all duration-200"
                style={{
                  backgroundColor: "oklch(0.99 0.006 85)",
                  borderColor: "oklch(0.88 0.03 215)",
                  boxShadow: "0 2px 12px oklch(0.22 0.06 215 / 0.05)",
                }}
              >
                {/* Icon circle */}
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor: bgColor,
                  }}
                  whileHover={{ rotate: 5 }}
                >
                  <Icon className="h-7 w-7" style={{ color }} />
                </motion.div>

                <h3
                  className="font-display font-bold text-lg mb-3"
                  style={{ color: "oklch(0.22 0.06 215)" }}
                >
                  {item.title}
                </h3>

                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: "oklch(0.48 0.04 215)" }}
                >
                  {item.description}
                </p>

                {/* Bottom colored dot */}
                <div
                  className="w-2 h-2 rounded-full mt-6 transition-all duration-300 group-hover:w-8"
                  style={{ backgroundColor: color }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
