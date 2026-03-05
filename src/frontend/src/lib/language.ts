export type LangKey = "en" | "bn";

export const Language = {
  en: "en" as LangKey,
  bn: "bn" as LangKey,
} as const;

export interface I18n {
  // Navbar
  nav: {
    home: string;
    about: string;
    services: string;
    whyUs: string;
    contact: string;
    langLabel: string;
  };

  // Hero
  hero: {
    tagline: string;
    intro: string;
    cta: string;
    subtitle: string;
  };

  // About
  about: {
    title: string;
    body: string;
    stats: Array<{ value: string; label: string }>;
  };

  // Services
  services: {
    title: string;
    subtitle: string;
    items: Array<{ title: string; description: string }>;
  };

  // Why Choose Us
  whyUs: {
    title: string;
    items: Array<{ title: string; description: string }>;
  };

  // Contact
  contact: {
    title: string;
    subtitle: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    messagePlaceholder: string;
    submitBtn: string;
    submitting: string;
    successTitle: string;
    successMsg: string;
    errorMsg: string;
    callUs: string;
    emailUs: string;
    location: string;
    locationValue: string;
  };

  // Footer
  footer: {
    tagline: string;
    copyright: string;
    quickLinks: string;
    builtWith: string;
  };
}

const en: I18n = {
  nav: {
    home: "Home",
    about: "About Us",
    services: "Services",
    whyUs: "Why Us",
    contact: "Contact",
    langLabel: "বাংলা",
  },
  hero: {
    tagline: "Pure Water. Safe Homes. Better Lives.",
    intro:
      "Master Pipe Solution — your trusted partner for complete water pipeline safety and solutions.",
    cta: "Get a Free Consultation",
    subtitle: "A business of Chakraborty Enterprise",
  },
  about: {
    title: "About Us",
    body: "Master Pipe Solution is a partnership business under Chakraborty Enterprise, dedicated to providing complete water pipeline solutions for homes and buildings. With over a decade of experience, our team of skilled and expert workers ensures every job is done with precision, care, and commitment. We believe clean and safe water is every family's right — and we work to protect that right.",
    stats: [
      { value: "10+", label: "Years Experience" },
      { value: "500+", label: "Happy Customers" },
      { value: "100%", label: "Expert Team" },
    ],
  },
  services: {
    title: "Our Services",
    subtitle: "Complete water pipeline solutions for every need",
    items: [
      {
        title: "Water Pipe Installation",
        description:
          "Professional new water pipe laying for homes and multi-storey buildings.",
      },
      {
        title: "Tank Installation",
        description:
          "Overhead and underground water tank fitting with leak-proof connections.",
      },
      {
        title: "Pipeline Cleaning",
        description:
          "Deep cleaning of water lines to remove blockages and sediment buildup.",
      },
      {
        title: "Repair & Maintenance",
        description:
          "Fix leaks, bursts, and damaged pipelines with lasting repair solutions.",
      },
      {
        title: "Complete Water-Line Consulting",
        description:
          "Expert advice and planning for full water systems in new constructions.",
      },
      {
        title: "Water Connections",
        description:
          "New municipal water connections for residential and commercial needs.",
      },
    ],
  },
  whyUs: {
    title: "Why Choose Us?",
    items: [
      {
        title: "Decade of Experience",
        description:
          "Over 10 years serving homes and businesses with trusted pipeline solutions.",
      },
      {
        title: "Skilled Workers",
        description:
          "Our team is trained, experienced, and committed to quality workmanship.",
      },
      {
        title: "Complete Solutions",
        description:
          "From installation to repair to consulting — we handle everything end-to-end.",
      },
      {
        title: "Trusted & Reliable",
        description:
          "Hundreds of satisfied customers across the region trust Master Pipe Solution.",
      },
    ],
  },
  contact: {
    title: "Contact Us",
    subtitle: "We're here to help. Reach out for a free consultation.",
    namePlaceholder: "Your Name",
    phonePlaceholder: "Your Phone Number",
    messagePlaceholder: "Describe your water pipeline issue or requirement...",
    submitBtn: "Send Message",
    submitting: "Sending...",
    successTitle: "Message Sent!",
    successMsg: "We'll get back to you within 24 hours.",
    errorMsg: "Something went wrong. Please try again.",
    callUs: "Call Us",
    emailUs: "Email Us",
    location: "Location",
    locationValue: "Pandua, Mahadebpur, 712149, West Bengal",
  },
  footer: {
    tagline: "Master Pipe Solution — A business of Chakraborty Enterprise",
    copyright: `© ${new Date().getFullYear()} All Rights Reserved.`,
    quickLinks: "Quick Links",
    builtWith: "Built with love using",
  },
};

const bn: I18n = {
  nav: {
    home: "হোম",
    about: "আমাদের সম্পর্কে",
    services: "সেবা",
    whyUs: "কেন আমরা",
    contact: "যোগাযোগ",
    langLabel: "English",
  },
  hero: {
    tagline: "বিশুদ্ধ জল। নিরাপদ ঘর। উন্নত জীবন।",
    intro:
      "মাস্টার পাইপ সলিউশন — আপনার জলের পাইপলাইনের সম্পূর্ণ নিরাপত্তা ও সমাধানের বিশ্বস্ত অংশীদার।",
    cta: "বিনামূল্যে পরামর্শ নিন",
    subtitle: "চক্রবর্তী এন্টারপ্রাইজের একটি ব্যবসা",
  },
  about: {
    title: "আমাদের সম্পর্কে",
    body: "মাস্টার পাইপ সলিউশন হল চক্রবর্তী এন্টারপ্রাইজের অন্তর্গত একটি অংশীদারিত্ব ব্যবসা, যা বাড়ি ও ভবনের সম্পূর্ণ জল পাইপলাইন সমাধান প্রদানে নিবেদিত। এক দশকেরও বেশি অভিজ্ঞতার সাথে, আমাদের দক্ষ ও অভিজ্ঞ কর্মীদের দল প্রতিটি কাজ নিষ্ঠা, যত্ন ও প্রতিশ্রুতির সাথে সম্পন্ন করে। আমরা বিশ্বাস করি বিশুদ্ধ ও নিরাপদ জল প্রতিটি পরিবারের অধিকার — এবং আমরা সেই অধিকার রক্ষা করতে কাজ করি।",
    stats: [
      { value: "১০+", label: "বছরের অভিজ্ঞতা" },
      { value: "৫০০+", label: "সন্তুষ্ট গ্রাহক" },
      { value: "১০০%", label: "দক্ষ দল" },
    ],
  },
  services: {
    title: "আমাদের সেবা",
    subtitle: "প্রতিটি প্রয়োজনের জন্য সম্পূর্ণ জল পাইপলাইন সমাধান",
    items: [
      {
        title: "জল পাইপ ইনস্টলেশন",
        description: "বাড়ি ও বহুতল ভবনের জন্য পেশাদার নতুন জল পাইপ স্থাপন।",
      },
      {
        title: "ট্যাংক ইনস্টলেশন",
        description: "লিক-প্রুফ সংযোগ সহ উপরের ও মাটির নিচের জলের ট্যাংক ইনস্টলেশন।",
      },
      {
        title: "পাইপলাইন পরিষ্কার",
        description: "ব্লকেজ ও পলি দূর করতে জলের লাইনের গভীর পরিষ্কার।",
      },
      {
        title: "মেরামত ও রক্ষণাবেক্ষণ",
        description:
          "দীর্ঘস্থায়ী মেরামত সমাধান দিয়ে লিক, ফাটা ও ক্ষতিগ্রস্ত পাইপলাইন ঠিক করা।",
      },
      {
        title: "সম্পূর্ণ জলরেখা পরামর্শ",
        description: "নতুন নির্মাণে সম্পূর্ণ জল ব্যবস্থার জন্য বিশেষজ্ঞ পরামর্শ ও পরিকল্পনা।",
      },
      {
        title: "জল সংযোগ",
        description: "আবাসিক ও বাণিজ্যিক প্রয়োজনের জন্য নতুন পৌরসভার জল সংযোগ।",
      },
    ],
  },
  whyUs: {
    title: "কেন আমাদের বেছে নেবেন?",
    items: [
      {
        title: "দশ বছরের অভিজ্ঞতা",
        description:
          "বিশ্বস্ত পাইপলাইন সমাধান নিয়ে ১০ বছরেরও বেশি সময় ধরে বাড়ি ও ব্যবসা সেবা দিচ্ছি।",
      },
      {
        title: "দক্ষ কর্মী",
        description:
          "আমাদের দল প্রশিক্ষিত, অভিজ্ঞ এবং মানসম্পন্ন কাজের প্রতি প্রতিশ্রুতিবদ্ধ।",
      },
      {
        title: "সম্পূর্ণ সমাধান",
        description:
          "ইনস্টলেশন থেকে মেরামত থেকে পরামর্শ — আমরা শুরু থেকে শেষ পর্যন্ত সব সামলাই।",
      },
      {
        title: "বিশ্বস্ত ও নির্ভরযোগ্য",
        description: "সারা অঞ্চলে শত শত সন্তুষ্ট গ্রাহক মাস্টার পাইপ সলিউশনকে বিশ্বাস করেন।",
      },
    ],
  },
  contact: {
    title: "যোগাযোগ করুন",
    subtitle: "আমরা সাহায্য করতে প্রস্তুত। বিনামূল্যে পরামর্শের জন্য যোগাযোগ করুন।",
    namePlaceholder: "আপনার নাম",
    phonePlaceholder: "আপনার ফোন নম্বর",
    messagePlaceholder: "আপনার জলের পাইপলাইনের সমস্যা বা প্রয়োজনীয়তা বর্ণনা করুন...",
    submitBtn: "বার্তা পাঠান",
    submitting: "পাঠানো হচ্ছে...",
    successTitle: "বার্তা পাঠানো হয়েছে!",
    successMsg: "আমরা ২৪ ঘণ্টার মধ্যে যোগাযোগ করব।",
    errorMsg: "কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।",
    callUs: "কল করুন",
    emailUs: "ইমেইল করুন",
    location: "অবস্থান",
    locationValue: "পান্ডুয়া, মহাদেবপুর, ৭১২১৪৯, পশ্চিমবঙ্গ",
  },
  footer: {
    tagline: "মাস্টার পাইপ সলিউশন — চক্রবর্তী এন্টারপ্রাইজের একটি ব্যবসা",
    copyright: `© ${new Date().getFullYear()} সর্বস্বত্ব সংরক্ষিত।`,
    quickLinks: "দ্রুত লিংক",
    builtWith: "ভালোবাসা দিয়ে তৈরি",
  },
};

export const translations: Record<LangKey, I18n> = { en, bn };

export function t(lang: LangKey): I18n {
  return translations[lang];
}
