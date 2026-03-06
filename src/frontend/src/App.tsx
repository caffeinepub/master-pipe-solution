import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import AboutSection from "./components/AboutSection";
import AdminPanel from "./components/AdminPanel";
import ContactSection from "./components/ContactSection";
import DevotionalDivider from "./components/DevotionalDivider";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import SafetyTips from "./components/SafetyTips";
import ServicesSection from "./components/ServicesSection";
import TermsAndConditions from "./components/TermsAndConditions";
import WhyChooseUs from "./components/WhyChooseUs";
import WorkerManagement from "./components/WorkerManagement";
import { useActor } from "./hooks/useActor";
import type { LangKey } from "./lib/language";
import { trackVisit } from "./utils/analytics";

// ─── Main Site ────────────────────────────────────────────────────────────────

function MainSite() {
  const [lang, setLang] = useState<LangKey>("en");
  const { actor } = useActor();

  useEffect(() => {
    // Track visitor analytics in localStorage
    trackVisit();
  }, []);

  useEffect(() => {
    if (actor) {
      actor.incrementVisits().catch(() => {});
    }
  }, [actor]);

  const toggleLang = () => setLang((prev) => (prev === "en" ? "bn" : "en"));

  return (
    <div className="min-h-screen bg-background font-body">
      <Toaster richColors position="top-right" />
      <Navbar lang={lang} onToggleLang={toggleLang} />
      <main>
        <HeroSection lang={lang} />
        <AboutSection lang={lang} />
        <ServicesSection lang={lang} />
        <DevotionalDivider />
        <WhyChooseUs lang={lang} />
        <TermsAndConditions lang={lang} />
        <SafetyTips lang={lang} />
        <ContactSection lang={lang} />
      </main>
      <Footer lang={lang} />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/919883004437"
        target="_blank"
        rel="noopener noreferrer"
        data-ocid="whatsapp.button"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
        style={{ backgroundColor: "#25D366" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="white"
          className="w-8 h-8"
          role="img"
          aria-label="Chat on WhatsApp"
        >
          <title>Chat on WhatsApp</title>
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.471 2.027 7.773L0 32l8.489-2.007A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.28 13.28 0 0 1-6.773-1.853l-.485-.288-5.037 1.191 1.211-4.917-.317-.505A13.252 13.252 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.307-9.907c-.4-.2-2.365-1.167-2.731-1.3-.366-.133-.632-.2-.898.2-.266.4-1.032 1.3-1.265 1.566-.233.267-.466.3-.866.1-.4-.2-1.688-.622-3.215-1.983-1.188-1.06-1.99-2.369-2.224-2.769-.233-.4-.025-.616.175-.815.18-.179.4-.466.6-.7.2-.233.266-.4.4-.666.133-.267.066-.5-.033-.7-.1-.2-.898-2.165-1.232-2.965-.324-.778-.653-.673-.898-.686l-.765-.013c-.267 0-.7.1-1.066.5s-1.4 1.367-1.4 3.333 1.433 3.866 1.633 4.133c.2.266 2.82 4.306 6.832 6.033.955.412 1.7.658 2.281.843.958.305 1.831.262 2.52.159.768-.115 2.365-.967 2.698-1.9.333-.933.333-1.733.233-1.9-.1-.167-.366-.267-.766-.467z" />
        </svg>
      </a>
    </div>
  );
}

// ─── Root Router ──────────────────────────────────────────────────────────────

const pathname = window.location.pathname;
const isAdminRoute = pathname === "/admin";
const isWorkersRoute = pathname === "/workers";

export default function App() {
  if (isAdminRoute) {
    return (
      <>
        <Toaster richColors position="top-right" />
        <AdminPanel />
      </>
    );
  }

  if (isWorkersRoute) {
    return (
      <>
        <Toaster richColors position="top-right" />
        <WorkerManagement />
      </>
    );
  }

  return <MainSite />;
}
