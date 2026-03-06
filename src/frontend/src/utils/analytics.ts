// ─── Visitor Analytics Utility ─────────────────────────────────────────────
// Tracks page visits in localStorage (capped at 500 entries).
// Duration is calculated via visibilitychange / beforeunload events.

export interface VisitEntry {
  timestamp: number;
  page: string;
  device: "mobile" | "tablet" | "desktop";
  referral: string;
  duration: number; // seconds; 0 if session still active or untracked
}

const STORAGE_KEY = "mps_visits";
const SESSION_KEY = "mps_visit_start";
const MAX_ENTRIES = 500;

// ─── Device detection ─────────────────────────────────────────────────────

function detectDevice(): "mobile" | "tablet" | "desktop" {
  const ua = navigator.userAgent;
  if (/Tablet|iPad/i.test(ua)) return "tablet";
  if (/Mobi|Android/i.test(ua)) return "mobile";
  return "desktop";
}

// ─── Referral parsing ─────────────────────────────────────────────────────

function parseReferral(): string {
  const ref = document.referrer;
  if (!ref) return "Direct";
  try {
    const host = new URL(ref).hostname;
    if (host.includes("google")) return "Google";
    if (host.includes("wa.me") || host.includes("whatsapp")) return "WhatsApp";
    return host.replace(/^www\./, "");
  } catch {
    return "Direct";
  }
}

// ─── Storage helpers ──────────────────────────────────────────────────────

export function getVisitLog(): VisitEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as VisitEntry[]) : [];
  } catch {
    return [];
  }
}

function saveVisitLog(log: VisitEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
  } catch {
    // Quota exceeded or private mode — silently ignore
  }
}

export function clearVisitLog(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}

// ─── Duration updater ─────────────────────────────────────────────────────

function updateLastEntryDuration(): void {
  const startStr = sessionStorage.getItem(SESSION_KEY);
  if (!startStr) return;
  const start = Number.parseInt(startStr, 10);
  if (Number.isNaN(start)) return;
  const durationSec = Math.round((Date.now() - start) / 1000);

  const log = getVisitLog();
  if (log.length === 0) return;
  // The last entry in the array is the current visit
  log[log.length - 1].duration = durationSec;
  saveVisitLog(log);
}

// ─── Track a visit ────────────────────────────────────────────────────────

let _tracked = false;

export function trackVisit(): void {
  // Only track once per page load
  if (_tracked) return;
  _tracked = true;

  const entry: VisitEntry = {
    timestamp: Date.now(),
    page: window.location.pathname || "/",
    device: detectDevice(),
    referral: parseReferral(),
    duration: 0,
  };

  // Save visit start for duration tracking
  sessionStorage.setItem(SESSION_KEY, String(Date.now()));

  // Append to log, cap at MAX_ENTRIES
  const log = getVisitLog();
  log.push(entry);
  if (log.length > MAX_ENTRIES) {
    log.splice(0, log.length - MAX_ENTRIES);
  }
  saveVisitLog(log);

  // Update duration when user leaves
  const handleHide = () => {
    if (document.visibilityState === "hidden") {
      updateLastEntryDuration();
    }
  };
  const handleUnload = () => {
    updateLastEntryDuration();
  };

  document.addEventListener("visibilitychange", handleHide);
  window.addEventListener("beforeunload", handleUnload);
}
