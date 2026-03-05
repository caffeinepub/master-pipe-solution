import { motion } from "motion/react";

export default function DevotionalDivider() {
  return (
    <section
      className="relative py-12 overflow-hidden"
      style={{ backgroundColor: "oklch(0.97 0.012 85)" }}
    >
      {/* Soft radial background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, oklch(0.78 0.15 78 / 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 flex flex-col items-center">
        {/* Top line */}
        <div className="divider-gold w-full mb-8" />

        {/* Goddess eyes motif */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Glow ring */}
          <div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{
              background: "oklch(0.78 0.15 78 / 0.12)",
              transform: "scale(1.3)",
            }}
          />

          <img
            src="/assets/generated/goddess-eyes-motif-transparent.dim_600x200.png"
            alt="Auspicious Motif — Ma Durga's Divine Eyes"
            className="relative w-full max-w-lg h-auto object-contain animate-float"
            style={{
              filter: "drop-shadow(0 0 16px oklch(0.78 0.15 78 / 0.5))",
            }}
          />
        </motion.div>

        {/* Sacred message */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-display italic text-center mt-6 mb-8"
          style={{
            color: "oklch(0.55 0.1 78)",
            fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
          }}
        >
          "জল জীবন — Water is Life"
        </motion.p>

        {/* Bottom line */}
        <div className="divider-gold w-full" />
      </div>
    </section>
  );
}
