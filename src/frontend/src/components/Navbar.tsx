import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { type LangKey, t } from "../lib/language";

interface NavbarProps {
  lang: LangKey;
  onToggleLang: () => void;
}

const navLinks = [
  { id: "home", href: "#home" },
  { id: "about", href: "#about" },
  { id: "services", href: "#services" },
  { id: "why-us", href: "#why-us" },
  { id: "contact", href: "#contact" },
] as const;

export default function Navbar({ lang, onToggleLang }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const tx = t(lang);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLabels = [
    tx.nav.home,
    tx.nav.about,
    tx.nav.services,
    tx.nav.whyUs,
    tx.nav.contact,
  ];

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md shadow-navy-lg"
          : "bg-navy/80 backdrop-blur-sm"
      }`}
      style={{ backgroundColor: scrolled ? undefined : undefined }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <img
              src="/assets/generated/cj-logo-larger-inner-circle.dim_200x200.png"
              alt="Chakraborty Enterprise Logo"
              className="h-16 w-16 object-cover rounded-full"
            />
            <div className="flex flex-col">
              <span
                className="font-display font-bold text-base leading-tight"
                style={{ color: "oklch(0.78 0.15 78)" }}
              >
                Master Pipe Solution
              </span>
              <span
                className="text-xs font-body"
                style={{ color: "oklch(0.75 0.05 215)" }}
              >
                Chakraborty Enterprise
              </span>
            </div>
          </motion.button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                data-ocid={`nav.link.${i + 1}`}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-sm font-body font-medium rounded-md transition-all duration-200 relative group"
                style={{ color: "oklch(0.88 0.04 215)" }}
                whileHover={{ color: "oklch(0.78 0.15 78)" }}
              >
                {navLabels[i]}
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-4/5 transition-all duration-300 rounded-full"
                  style={{ backgroundColor: "oklch(0.78 0.15 78)" }}
                />
              </motion.button>
            ))}
          </div>

          {/* Right side: Language Toggle + Mobile Menu */}
          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              data-ocid="nav.language_toggle"
              onClick={onToggleLang}
              className="px-4 py-1.5 text-sm font-body font-semibold rounded-full border-2 transition-all duration-200"
              style={{
                borderColor: "oklch(0.78 0.15 78)",
                color: "oklch(0.78 0.15 78)",
              }}
              whileHover={{
                backgroundColor: "oklch(0.78 0.15 78)",
                color: "oklch(0.18 0.05 248)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              {tx.nav.langLabel}
            </motion.button>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md"
              style={{ color: "oklch(0.88 0.04 215)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <div
                className="py-4 space-y-1 border-t"
                style={{ borderColor: "oklch(0.32 0.07 215)" }}
              >
                {navLinks.map((link, i) => (
                  <button
                    type="button"
                    key={link.id}
                    data-ocid={`nav.link.${i + 1}`}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left px-4 py-3 text-sm font-body font-medium rounded-md transition-colors duration-150"
                    style={{ color: "oklch(0.88 0.04 215)" }}
                  >
                    {navLabels[i]}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
