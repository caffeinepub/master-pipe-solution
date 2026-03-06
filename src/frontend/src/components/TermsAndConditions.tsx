import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText } from "lucide-react";
import { motion } from "motion/react";
import type { LangKey } from "../lib/language";

interface TermsAndConditionsProps {
  lang: LangKey;
}

interface TermItem {
  id: string;
  num: number;
  title: string;
  content: string;
  ocid: string;
  accordionValue: string;
}

const termsEn: TermItem[] = [
  {
    id: "term-en-1",
    num: 1,
    accordionValue: "item-0",
    ocid: "terms.item.1",
    title: "15-Day Free Repair Guarantee",
    content:
      "If the same issue reappears within 15 days of service, we will repair it free of charge, no questions asked. This guarantee applies to all services rendered by Master Pipe Solution under Chakraborty Enterprise. Simply contact us with your service reference and our team will be dispatched promptly.",
  },
  {
    id: "term-en-2",
    num: 2,
    accordionValue: "item-1",
    ocid: "terms.item.2",
    title: "Warranty / Guarantee Revocation",
    content:
      "If any worker engages in a back-end deal, side agreement, or direct transaction with the customer without the explicit consent of Master Pipe Solution (Chakraborty Enterprise), the warranty and/or guarantee for that service is immediately revoked. The customer will no longer be entitled to free repair or any warranty benefits. All official transactions must be conducted through Master Pipe Solution only.",
  },
  {
    id: "term-en-3",
    num: 3,
    accordionValue: "item-2",
    ocid: "terms.item.3",
    title: "Service Scope",
    content:
      "All services are limited to the agreed scope of work as confirmed at the time of booking. Any additional work identified during service delivery requires a fresh agreement and quotation. Master Pipe Solution is not liable for pre-existing damage or issues outside the confirmed scope.",
  },
  {
    id: "term-en-4",
    num: 4,
    accordionValue: "item-3",
    ocid: "terms.item.4",
    title: "Payment Terms",
    content:
      "Full payment is due upon satisfactory completion of the agreed work. Customers are requested to inspect the completed work before making payment. Payments must be made through official channels to Master Pipe Solution (Chakraborty Enterprise) only. Direct payments to individual workers are not recognized as valid transactions.",
  },
];

const termsBn: TermItem[] = [
  {
    id: "term-bn-1",
    num: 1,
    accordionValue: "item-0",
    ocid: "terms.item.1",
    title: "১৫ দিনের বিনামূল্যে মেরামত গ্যারান্টি",
    content:
      "সার্ভিসের ১৫ দিনের মধ্যে একই সমস্যা ফিরে আসলে বিনামূল্যে মেরামত করা হবে, কোনো প্রশ্ন ছাড়াই। এই গ্যারান্টি চক্রবর্তী এন্টারপ্রাইজের অধীনে মাস্টার পাইপ সলিউশনের সকল সার্ভিসে প্রযোজ্য। আপনার সার্ভিস রেফারেন্স সহ আমাদের সাথে যোগাযোগ করুন এবং আমাদের দল দ্রুত পাঠানো হবে।",
  },
  {
    id: "term-bn-2",
    num: 2,
    accordionValue: "item-1",
    ocid: "terms.item.2",
    title: "ওয়ারেন্টি বাতিল",
    content:
      "কোনো কর্মী যদি মাস্টার পাইপ সলিউশন (চক্রবর্তী এন্টারপ্রাইজ)-এর স্পষ্ট সম্মতি ছাড়া গ্রাহকের সাথে সরাসরি লেনদেন, পার্শ্ব চুক্তি বা ব্যাক-এন্ড ডিল করেন, তাহলে সেই সার্ভিসের ওয়ারেন্টি ও/বা গ্যারান্টি তাৎক্ষণিকভাবে বাতিল হবে। গ্রাহক আর বিনামূল্যে মেরামত বা কোনো ওয়ারেন্টি সুবিধা পাবেন না। সকল সরকারি লেনদেন শুধুমাত্র মাস্টার পাইপ সলিউশনের মাধ্যমে করতে হবে।",
  },
  {
    id: "term-bn-3",
    num: 3,
    accordionValue: "item-2",
    ocid: "terms.item.3",
    title: "সার্ভিসের পরিধি",
    content:
      "সমস্ত সার্ভিস বুকিংয়ের সময় নিশ্চিত করা সম্মত কাজের মধ্যে সীমাবদ্ধ। সার্ভিস প্রদানের সময় চিহ্নিত যেকোনো অতিরিক্ত কাজের জন্য নতুন চুক্তি ও কোটেশন প্রয়োজন। পূর্বে বিদ্যমান ক্ষতি বা নিশ্চিত পরিধির বাইরের সমস্যার জন্য মাস্টার পাইপ সলিউশন দায়ী নয়।",
  },
  {
    id: "term-bn-4",
    num: 4,
    accordionValue: "item-3",
    ocid: "terms.item.4",
    title: "পেমেন্টের শর্ত",
    content:
      "সম্মত কাজ সন্তোষজনকভাবে সম্পন্ন হলে সম্পূর্ণ অর্থ প্রদান করতে হবে। গ্রাহকদের পেমেন্ট করার আগে সম্পন্ন কাজ পরীক্ষা করার অনুরোধ করা হচ্ছে। পেমেন্ট শুধুমাত্র মাস্টার পাইপ সলিউশন (চক্রবর্তী এন্টারপ্রাইজ)-এর অফিসিয়াল চ্যানেলের মাধ্যমে করতে হবে। পৃথক কর্মীদের সরাসরি পেমেন্ট বৈধ লেনদেন হিসেবে স্বীকৃত নয়।",
  },
];

export default function TermsAndConditions({ lang }: TermsAndConditionsProps) {
  const terms = lang === "en" ? termsEn : termsBn;
  const title = lang === "en" ? "Terms & Conditions" : "শর্তাবলী";
  const subtitle =
    lang === "en"
      ? "Master Pipe Solution — Chakraborty Enterprise"
      : "মাস্টার পাইপ সলিউশন — চক্রবর্তী এন্টারপ্রাইজ";
  const description =
    lang === "en"
      ? "Please read our terms carefully. By engaging our services, you agree to the following conditions."
      : "অনুগ্রহ করে আমাদের শর্তগুলি মনোযোগ দিয়ে পড়ুন। আমাদের সেবা গ্রহণ করলে আপনি নিম্নলিখিত শর্তগুলিতে সম্মতি দিচ্ছেন।";

  return (
    <section
      id="terms"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "oklch(0.97 0.012 85)" }}
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 85% 15%, oklch(0.78 0.15 78 / 0.06) 0%, transparent 50%), radial-gradient(circle at 15% 85%, oklch(0.28 0.085 215 / 0.05) 0%, transparent 50%)",
        }}
      />

      {/* Decorative corner ornament */}
      <div
        className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-10"
        style={{
          background:
            "conic-gradient(from 45deg, oklch(0.78 0.15 78), oklch(0.65 0.12 65), transparent 60%)",
          borderRadius: "0 0 0 100%",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-5 px-5 py-2.5 rounded-full border border-[oklch(0.78_0.15_78/0.3)] bg-[oklch(0.78_0.15_78/0.08)]">
            <FileText
              className="w-4 h-4"
              style={{ color: "oklch(0.65 0.14 78)" }}
            />
            <span
              className="text-sm font-semibold tracking-wide"
              style={{ color: "oklch(0.55 0.12 78)" }}
            >
              {subtitle}
            </span>
          </div>

          <h2
            className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
              color: "oklch(0.22 0.06 215)",
            }}
          >
            {title}
          </h2>

          <p
            className="text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "oklch(0.48 0.04 215)" }}
          >
            {description}
          </p>

          <div className="divider-gold max-w-xs mx-auto mt-6" />
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl overflow-hidden shadow-navy"
          style={{
            border: "1.5px solid oklch(0.78 0.15 78 / 0.25)",
            backgroundColor: "oklch(0.99 0.006 85)",
          }}
        >
          <Accordion
            type="multiple"
            defaultValue={["item-0"]}
            className="divide-y"
            style={
              {
                "--divide-color": "oklch(0.88 0.03 215)",
              } as React.CSSProperties
            }
          >
            {terms.map((term) => (
              <AccordionItem
                key={term.id}
                value={term.accordionValue}
                className="border-b-0"
                data-ocid={term.ocid}
              >
                <AccordionTrigger
                  className="px-6 py-5 text-left font-display font-semibold hover:no-underline group"
                  style={{
                    color: "oklch(0.22 0.06 215)",
                    fontSize: "1rem",
                    borderBottom:
                      term.num < terms.length
                        ? "1px solid oklch(0.88 0.03 215)"
                        : "none",
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* Numbered badge */}
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm transition-all duration-200 group-hover:scale-110"
                      style={{
                        backgroundColor: "oklch(0.78 0.15 78 / 0.15)",
                        color: "oklch(0.55 0.14 78)",
                        border: "1px solid oklch(0.78 0.15 78 / 0.3)",
                      }}
                    >
                      {term.num}
                    </span>
                    <span>{term.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5">
                  <div
                    className="pl-12 text-sm leading-relaxed"
                    style={{ color: "oklch(0.42 0.04 215)" }}
                  >
                    <p>{term.content}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-xs mt-6 leading-relaxed"
          style={{ color: "oklch(0.55 0.04 215)" }}
        >
          {lang === "en"
            ? "These terms are subject to change. For any clarification, contact us directly."
            : "এই শর্তগুলি পরিবর্তন সাপেক্ষ। যেকোনো স্পষ্টীকরণের জন্য আমাদের সাথে সরাসরি যোগাযোগ করুন।"}
        </motion.p>
      </div>
    </section>
  );
}
