import { AlertTriangle, Briefcase, Shield } from "lucide-react";
import { motion } from "motion/react";
import type { LangKey } from "../lib/language";

interface SafetyTipsProps {
  lang: LangKey;
}

interface TipItem {
  id: string;
  num: number;
  text: string;
  ocid: string;
}

const customerTipsEn: TipItem[] = [
  {
    id: "ct-en-1",
    num: 1,
    text: "Always verify the worker's ID before allowing entry to your home.",
    ocid: "safety.customer.item.1",
  },
  {
    id: "ct-en-2",
    num: 2,
    text: "Ensure work is inspected and approved before making final payment.",
    ocid: "safety.customer.item.2",
  },
  {
    id: "ct-en-3",
    num: 3,
    text: "Do not make payments to any individual worker directly — always pay through Master Pipe Solution.",
    ocid: "safety.customer.item.3",
  },
  {
    id: "ct-en-4",
    num: 4,
    text: "Take note of the assigned worker's name and mobile number before work begins.",
    ocid: "safety.customer.item.4",
  },
  {
    id: "ct-en-5",
    num: 5,
    text: "After work is done, run water through all repaired pipes for at least 5 minutes to verify no leaks.",
    ocid: "safety.customer.item.5",
  },
  {
    id: "ct-en-6",
    num: 6,
    text: "Keep a copy of your service receipt for warranty claims.",
    ocid: "safety.customer.item.6",
  },
  {
    id: "ct-en-7",
    num: 7,
    text: "Report any suspicious behavior by contacting us directly at 9883004437.",
    ocid: "safety.customer.item.7",
  },
];

const customerTipsBn: TipItem[] = [
  {
    id: "ct-bn-1",
    num: 1,
    text: "কর্মী প্রবেশের আগে সর্বদা তার পরিচয়পত্র যাচাই করুন।",
    ocid: "safety.customer.item.1",
  },
  {
    id: "ct-bn-2",
    num: 2,
    text: "চূড়ান্ত পেমেন্ট করার আগে কাজ পরীক্ষা করুন এবং অনুমোদন করুন।",
    ocid: "safety.customer.item.2",
  },
  {
    id: "ct-bn-3",
    num: 3,
    text: "সরাসরি কর্মীকে অর্থ প্রদান করবেন না — সর্বদা মাস্টার পাইপ সলিউশনের মাধ্যমে পেমেন্ট করুন।",
    ocid: "safety.customer.item.3",
  },
  {
    id: "ct-bn-4",
    num: 4,
    text: "কাজ শুরুর আগে নিযুক্ত কর্মীর নাম ও মোবাইল নম্বর নোট করুন।",
    ocid: "safety.customer.item.4",
  },
  {
    id: "ct-bn-5",
    num: 5,
    text: "কাজ শেষে কমপক্ষে ৫ মিনিট জল চালিয়ে সমস্ত মেরামত করা পাইপ পরীক্ষা করুন।",
    ocid: "safety.customer.item.5",
  },
  {
    id: "ct-bn-6",
    num: 6,
    text: "ওয়ারেন্টি দাবির জন্য আপনার সার্ভিস রসিদের একটি কপি সংরক্ষণ করুন।",
    ocid: "safety.customer.item.6",
  },
  {
    id: "ct-bn-7",
    num: 7,
    text: "সন্দেহজনক আচরণ হলে সরাসরি 9883004437 নম্বরে যোগাযোগ করে জানান।",
    ocid: "safety.customer.item.7",
  },
];

const workerClauseEn: TipItem[] = [
  {
    id: "wc-en-1",
    num: 1,
    text: "Workers must not solicit or accept direct work from any customer introduced through Master Pipe Solution.",
    ocid: "safety.worker.item.1",
  },
  {
    id: "wc-en-2",
    num: 2,
    text: "Workers must not share client details, pricing, or business processes with competitors or third parties.",
    ocid: "safety.worker.item.2",
  },
  {
    id: "wc-en-3",
    num: 3,
    text: "Workers must not perform similar pipeline or plumbing services independently in the same service area while employed.",
    ocid: "safety.worker.item.3",
  },
  {
    id: "wc-en-4",
    num: 4,
    text: "Any breach of this clause will result in immediate termination and loss of all pending dues.",
    ocid: "safety.worker.item.4",
  },
  {
    id: "wc-en-5",
    num: 5,
    text: "Back-end deals or undisclosed transactions with customers are strictly prohibited and will result in warranty revocation as per T&C.",
    ocid: "safety.worker.item.5",
  },
  {
    id: "wc-en-6",
    num: 6,
    text: "Workers must carry and present their official identification at all job sites.",
    ocid: "safety.worker.item.6",
  },
];

const workerClauseBn: TipItem[] = [
  {
    id: "wc-bn-1",
    num: 1,
    text: "মাস্টার পাইপ সলিউশনের মাধ্যমে পরিচিত গ্রাহকদের কাছ থেকে সরাসরি কাজ চাওয়া বা নেওয়া যাবে না।",
    ocid: "safety.worker.item.1",
  },
  {
    id: "wc-bn-2",
    num: 2,
    text: "গ্রাহকের তথ্য, মূল্য বা ব্যবসায়িক প্রক্রিয়া প্রতিযোগী বা তৃতীয় পক্ষের সাথে শেয়ার করা নিষিদ্ধ।",
    ocid: "safety.worker.item.2",
  },
  {
    id: "wc-bn-3",
    num: 3,
    text: "কর্মরত অবস্থায় একই সার্ভিস এলাকায় স্বাধীনভাবে একই ধরনের পাইপলাইন বা প্লাম্বিং সার্ভিস প্রদান করা যাবে না।",
    ocid: "safety.worker.item.3",
  },
  {
    id: "wc-bn-4",
    num: 4,
    text: "এই নিয়ম ভঙ্গ হলে তাৎক্ষণিক বরখাস্ত ও সকল বকেয়া বাজেয়াপ্ত হবে।",
    ocid: "safety.worker.item.4",
  },
  {
    id: "wc-bn-5",
    num: 5,
    text: "গ্রাহকের সাথে ব্যাক-এন্ড ডিল বা অপ্রকাশিত লেনদেন সম্পূর্ণ নিষিদ্ধ এবং শর্ত অনুযায়ী ওয়ারেন্টি বাতিল হবে।",
    ocid: "safety.worker.item.5",
  },
  {
    id: "wc-bn-6",
    num: 6,
    text: "কর্মীদের সকল কাজের স্থানে সরকারি পরিচয়পত্র বহন ও প্রদর্শন করতে হবে।",
    ocid: "safety.worker.item.6",
  },
];

export default function SafetyTips({ lang }: SafetyTipsProps) {
  const isEn = lang === "en";

  const customerTips = isEn ? customerTipsEn : customerTipsBn;
  const workerClause = isEn ? workerClauseEn : workerClauseBn;

  const sectionTitle = isEn ? "Safety & Security" : "নিরাপত্তা ও সুরক্ষা";
  const customerTitle = isEn ? "For Customers" : "গ্রাহকদের জন্য";
  const customerSubtitle = isEn ? "Safety Tips" : "নিরাপত্তা টিপস";
  const workerTitle = isEn ? "For Workers" : "কর্মীদের জন্য";
  const workerSubtitle = isEn ? "Non-Compete Clause" : "নন-কম্পিট ক্লজ";

  return (
    <section
      id="safety"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.24 0.07 215) 0%, oklch(0.18 0.05 248) 100%)",
      }}
    >
      {/* Mandala pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, oklch(0.78 0.15 78 / 0.2) 0%, transparent 40%), radial-gradient(circle at 80% 70%, oklch(0.45 0.12 195 / 0.2) 0%, transparent 40%)",
        }}
      />

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.9 0.02 85 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(0.9 0.02 85 / 0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2
            className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              color: "oklch(0.97 0.012 85)",
            }}
          >
            {sectionTitle}
          </h2>
          <div className="divider-gold max-w-xs mx-auto mt-4" />
        </motion.div>

        {/* Two-column grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Customer Safety Tips */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "oklch(0.97 0.012 85 / 0.05)",
              border: "1px solid oklch(0.78 0.15 78 / 0.25)",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Card header */}
            <div
              className="px-6 py-5 flex items-center gap-4"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.78 0.15 78 / 0.15), oklch(0.78 0.15 78 / 0.05))",
                borderBottom: "1px solid oklch(0.78 0.15 78 / 0.2)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "oklch(0.78 0.15 78 / 0.2)",
                  border: "1px solid oklch(0.78 0.15 78 / 0.4)",
                }}
              >
                <Shield
                  className="w-6 h-6"
                  style={{ color: "oklch(0.85 0.14 78)" }}
                />
              </div>
              <div>
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-0.5"
                  style={{ color: "oklch(0.78 0.15 78)" }}
                >
                  {customerTitle}
                </p>
                <h3
                  className="font-display font-bold text-xl"
                  style={{ color: "oklch(0.97 0.012 85)" }}
                >
                  {customerSubtitle}
                </h3>
              </div>
            </div>

            {/* Tips list */}
            <div className="px-6 py-5 space-y-4">
              {customerTips.map((tip) => (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: tip.num * 0.06 }}
                  data-ocid={tip.ocid}
                  className="flex items-start gap-4 group"
                >
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 transition-transform duration-200 group-hover:scale-110"
                    style={{
                      background: "oklch(0.78 0.15 78 / 0.15)",
                      color: "oklch(0.85 0.14 78)",
                      border: "1px solid oklch(0.78 0.15 78 / 0.3)",
                    }}
                  >
                    {tip.num}
                  </span>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.88 0.02 85)" }}
                  >
                    {tip.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Worker Non-Compete Clause */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: "oklch(0.97 0.012 85 / 0.05)",
              border: "1px solid oklch(0.45 0.12 195 / 0.35)",
              backdropFilter: "blur(8px)",
            }}
          >
            {/* Card header */}
            <div
              className="px-6 py-5 flex items-center gap-4"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.45 0.12 195 / 0.2), oklch(0.45 0.12 195 / 0.05))",
                borderBottom: "1px solid oklch(0.45 0.12 195 / 0.25)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "oklch(0.45 0.12 195 / 0.2)",
                  border: "1px solid oklch(0.45 0.12 195 / 0.4)",
                }}
              >
                <Briefcase
                  className="w-6 h-6"
                  style={{ color: "oklch(0.7 0.12 195)" }}
                />
              </div>
              <div>
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-0.5"
                  style={{ color: "oklch(0.65 0.12 195)" }}
                >
                  {workerTitle}
                </p>
                <h3
                  className="font-display font-bold text-xl"
                  style={{ color: "oklch(0.97 0.012 85)" }}
                >
                  {workerSubtitle}
                </h3>
              </div>
            </div>

            {/* Clause items */}
            <div className="px-6 py-5 space-y-4">
              {workerClause.map((clause) => (
                <motion.div
                  key={clause.id}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: clause.num * 0.06 }}
                  data-ocid={clause.ocid}
                  className="flex items-start gap-4 group"
                >
                  <span
                    className="flex-shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-110"
                    style={{ color: "oklch(0.65 0.12 195)" }}
                  >
                    <AlertTriangle className="w-5 h-5" />
                  </span>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.88 0.02 85)" }}
                  >
                    {clause.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <p
            className="text-xs leading-relaxed max-w-2xl mx-auto"
            style={{ color: "oklch(0.6 0.03 215)" }}
          >
            {isEn
              ? "These guidelines ensure a safe, trustworthy, and professional service experience for everyone involved. For concerns, call 9883004437."
              : "এই নির্দেশিকাগুলি সকলের জন্য একটি নিরাপদ, বিশ্বস্ত ও পেশাদার সার্ভিস অভিজ্ঞতা নিশ্চিত করে। উদ্বেগের জন্য 9883004437 নম্বরে কল করুন।"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
