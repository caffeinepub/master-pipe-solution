import { Droplets, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { type LangKey, t } from "../lib/language";

interface FooterProps {
  lang: LangKey;
}

export default function Footer({ lang }: FooterProps) {
  const tx = t(lang);
  const navLinks = [
    { label: tx.nav.home, href: "#home" },
    { label: tx.nav.about, href: "#about" },
    { label: tx.nav.services, href: "#services" },
    { label: tx.nav.whyUs, href: "#why-us" },
    { label: tx.nav.contact, href: "#contact" },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "oklch(0.16 0.055 215)" }}
    >
      {/* Top gold line */}
      <div className="divider-gold" />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img
                src="/assets/generated/chakraborty-logo-transparent.dim_300x200.png"
                alt="Chakraborty Enterprise"
                className="h-10 w-auto object-contain"
              />
              <div>
                <p
                  className="font-display font-bold text-base leading-tight"
                  style={{ color: "oklch(0.78 0.15 78)" }}
                >
                  Master Pipe Solution
                </p>
                <p
                  className="font-body text-xs"
                  style={{ color: "oklch(0.55 0.05 215)" }}
                >
                  Chakraborty Enterprise
                </p>
              </div>
            </div>

            <p
              className="font-body text-sm leading-relaxed mb-6"
              style={{ color: "oklch(0.58 0.05 215)" }}
            >
              {lang === "en"
                ? "Your trusted partner for complete water pipeline safety and solutions. Serving homes and businesses for over a decade."
                : "সম্পূর্ণ জল পাইপলাইন নিরাপত্তা ও সমাধানের জন্য আপনার বিশ্বস্ত অংশীদার। এক দশকেরও বেশি সময় ধরে বাড়ি ও ব্যবসা সেবা দিচ্ছি।"}
            </p>

            <div className="flex items-center gap-2">
              <Droplets
                className="h-4 w-4"
                style={{ color: "oklch(0.45 0.12 195)" }}
              />
              <span
                className="font-body text-xs italic"
                style={{ color: "oklch(0.5 0.07 78)" }}
              >
                "জল জীবন — Water is Life"
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="font-display font-bold text-sm uppercase tracking-widest mb-5"
              style={{ color: "oklch(0.78 0.15 78)" }}
            >
              {tx.footer.quickLinks}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="font-body text-sm transition-colors duration-150 hover:text-gold text-left"
                    style={{ color: "oklch(0.62 0.04 215)" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3
              className="font-display font-bold text-sm uppercase tracking-widest mb-5"
              style={{ color: "oklch(0.78 0.15 78)" }}
            >
              {tx.contact.title}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone
                  className="h-4 w-4 mt-0.5 flex-shrink-0"
                  style={{ color: "oklch(0.55 0.09 195)" }}
                />
                <div
                  className="font-body text-sm space-y-1"
                  style={{ color: "oklch(0.65 0.04 215)" }}
                >
                  <a href="tel:8535851119" className="block hover:underline">
                    +91 8535851119
                  </a>
                  <a href="tel:9883004437" className="block hover:underline">
                    +91 9883004437
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail
                  className="h-4 w-4 mt-0.5 flex-shrink-0"
                  style={{ color: "oklch(0.55 0.09 195)" }}
                />
                <a
                  href="mailto:Cjenterprise007@gmail.com"
                  className="font-body text-sm break-all hover:underline"
                  style={{ color: "oklch(0.65 0.04 215)" }}
                >
                  Cjenterprise007@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  className="h-4 w-4 mt-0.5 flex-shrink-0"
                  style={{ color: "oklch(0.55 0.09 195)" }}
                />
                <span
                  className="font-body text-sm"
                  style={{ color: "oklch(0.65 0.04 215)" }}
                >
                  {tx.contact.locationValue}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t" style={{ borderColor: "oklch(0.28 0.07 215)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="font-body text-xs text-center sm:text-left"
            style={{ color: "oklch(0.45 0.04 215)" }}
          >
            {tx.footer.tagline} | {tx.footer.copyright}
          </p>

          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-body text-xs transition-colors duration-150 hover:underline"
            style={{ color: "oklch(0.45 0.04 215)" }}
          >
            {tx.footer.builtWith}{" "}
            <span style={{ color: "oklch(0.65 0.14 15)" }}>❤</span>{" "}
            <span style={{ color: "oklch(0.55 0.08 195)" }}>caffeine.ai</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
