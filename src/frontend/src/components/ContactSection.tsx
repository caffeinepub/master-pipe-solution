import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Language } from "../backend";
import { useActor } from "../hooks/useActor";
import { type LangKey, t } from "../lib/language";

interface ContactSectionProps {
  lang: LangKey;
}

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactSection({ lang }: ContactSectionProps) {
  const tx = t(lang);
  const { actor } = useActor();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;
    if (!actor) return;

    setFormState("loading");

    try {
      const language = lang === "en" ? Language.english : Language.hindi;
      await actor.submitContact(
        name.trim(),
        phone.trim(),
        message.trim(),
        language,
      );
      setFormState("success");
      setName("");
      setPhone("");
      setMessage("");
      toast.success(tx.contact.successTitle, {
        description: tx.contact.successMsg,
      });
    } catch {
      setFormState("error");
      toast.error(tx.contact.errorMsg);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: tx.contact.callUs,
      lines: [
        <a key="1" href="tel:8535851119" className="hover:underline">
          +91 8535851119
        </a>,
        <a key="2" href="tel:9883004437" className="hover:underline">
          +91 9883004437
        </a>,
      ],
    },
    {
      icon: Mail,
      label: tx.contact.emailUs,
      lines: [
        <a
          key="email"
          href="mailto:Cjenterprise007@gmail.com"
          className="hover:underline break-all"
        >
          Cjenterprise007@gmail.com
        </a>,
      ],
    },
    {
      icon: MapPin,
      label: tx.contact.location,
      lines: [<span key="loc">{tx.contact.locationValue}</span>],
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: "oklch(0.22 0.06 215)" }}
    >
      {/* Background radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, oklch(0.45 0.12 195 / 0.1) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, oklch(0.78 0.15 78 / 0.07) 0%, transparent 50%)",
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
            <Phone className="h-3 w-3" />
            {lang === "en" ? "Get In Touch" : "যোগাযোগ করুন"}
          </div>

          <h2
            className="font-display font-bold mb-4"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: "oklch(0.97 0.01 85)",
            }}
          >
            {tx.contact.title}
          </h2>

          <p
            className="font-body text-base md:text-lg max-w-xl mx-auto"
            style={{ color: "oklch(0.72 0.05 215)" }}
          >
            {tx.contact.subtitle}
          </p>

          <div className="divider-gold max-w-xs mx-auto mt-8" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.label}
                  className="flex gap-5 p-6 rounded-2xl border"
                  style={{
                    backgroundColor: "oklch(0.28 0.07 215)",
                    borderColor: "oklch(0.35 0.08 215)",
                  }}
                >
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "oklch(0.78 0.15 78 / 0.15)" }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: "oklch(0.78 0.15 78)" }}
                    />
                  </div>
                  <div>
                    <p
                      className="font-body text-xs uppercase tracking-widest mb-1.5"
                      style={{ color: "oklch(0.58 0.05 215)" }}
                    >
                      {info.label}
                    </p>
                    <div
                      className="font-body font-medium space-y-1"
                      style={{ color: "oklch(0.88 0.03 215)" }}
                    >
                      {info.lines}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Trust badge */}
            <div
              className="p-6 rounded-2xl border text-center"
              style={{
                backgroundColor: "oklch(0.28 0.07 215 / 0.5)",
                borderColor: "oklch(0.78 0.15 78 / 0.3)",
              }}
            >
              <div className="text-3xl mb-2">💧</div>
              <p
                className="font-display font-bold text-lg mb-1"
                style={{ color: "oklch(0.78 0.15 78)" }}
              >
                {lang === "en"
                  ? "Available 7 Days a Week"
                  : "সপ্তাহে ৭ দিন উপলব্ধ"}
              </p>
              <p
                className="font-body text-sm"
                style={{ color: "oklch(0.65 0.04 215)" }}
              >
                {lang === "en"
                  ? "Emergency pipeline repairs attended promptly"
                  : "জরুরী পাইপলাইন মেরামত দ্রুত পরিচালিত হয়"}
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl border space-y-5"
              style={{
                backgroundColor: "oklch(0.28 0.07 215)",
                borderColor: "oklch(0.35 0.08 215)",
              }}
            >
              <div className="space-y-2">
                <Label
                  htmlFor="contact-name"
                  className="font-body text-sm"
                  style={{ color: "oklch(0.75 0.04 215)" }}
                >
                  {lang === "en" ? "Your Name" : "আপনার নাম"}
                </Label>
                <Input
                  id="contact-name"
                  data-ocid="contact.name_input"
                  type="text"
                  placeholder={tx.contact.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="font-body border-0 focus-visible:ring-1"
                  style={{
                    backgroundColor: "oklch(0.22 0.06 215)",
                    color: "oklch(0.92 0.02 85)",
                    caretColor: "oklch(0.78 0.15 78)",
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="contact-phone"
                  className="font-body text-sm"
                  style={{ color: "oklch(0.75 0.04 215)" }}
                >
                  {lang === "en" ? "Phone Number" : "ফোন নম্বর"}
                </Label>
                <Input
                  id="contact-phone"
                  data-ocid="contact.phone_input"
                  type="tel"
                  placeholder={tx.contact.phonePlaceholder}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="font-body border-0 focus-visible:ring-1"
                  style={{
                    backgroundColor: "oklch(0.22 0.06 215)",
                    color: "oklch(0.92 0.02 85)",
                    caretColor: "oklch(0.78 0.15 78)",
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="contact-message"
                  className="font-body text-sm"
                  style={{ color: "oklch(0.75 0.04 215)" }}
                >
                  {lang === "en" ? "Message" : "বার্তা"}
                </Label>
                <Textarea
                  id="contact-message"
                  data-ocid="contact.message_textarea"
                  placeholder={tx.contact.messagePlaceholder}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="font-body border-0 focus-visible:ring-1 resize-none"
                  style={{
                    backgroundColor: "oklch(0.22 0.06 215)",
                    color: "oklch(0.92 0.02 85)",
                    caretColor: "oklch(0.78 0.15 78)",
                  }}
                />
              </div>

              {/* Status messages */}
              {formState === "success" && (
                <div
                  data-ocid="contact.success_state"
                  className="flex items-center gap-3 p-3 rounded-xl text-sm font-body"
                  style={{
                    backgroundColor: "oklch(0.55 0.14 160 / 0.15)",
                    color: "oklch(0.6 0.14 160)",
                  }}
                >
                  <CheckCircle className="h-4 w-4 flex-shrink-0" />
                  {tx.contact.successMsg}
                </div>
              )}

              {formState === "error" && (
                <div
                  data-ocid="contact.error_state"
                  className="flex items-center gap-3 p-3 rounded-xl text-sm font-body"
                  style={{
                    backgroundColor: "oklch(0.577 0.245 27.325 / 0.15)",
                    color: "oklch(0.75 0.2 27)",
                  }}
                >
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  {tx.contact.errorMsg}
                </div>
              )}

              <Button
                type="submit"
                data-ocid="contact.submit_button"
                disabled={formState === "loading"}
                className="w-full font-body font-bold py-5 rounded-xl transition-all duration-200"
                style={{
                  backgroundColor: "oklch(0.78 0.15 78)",
                  color: "oklch(0.18 0.05 248)",
                }}
              >
                {formState === "loading" ? (
                  <>
                    <Loader2
                      data-ocid="contact.loading_state"
                      className="mr-2 h-4 w-4 animate-spin"
                    />
                    {tx.contact.submitting}
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    {tx.contact.submitBtn}
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
