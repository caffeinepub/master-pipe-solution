import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BarChart3,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Loader2,
  LogOut,
  MessageSquareText,
  Monitor,
  Phone,
  RefreshCw,
  Send,
  ShieldCheck,
  Smartphone,
  Tablet,
  Trash2,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Contact } from "../backend.d";
import { useActor } from "../hooks/useActor";
import {
  type VisitEntry,
  clearVisitLog,
  getVisitLog,
} from "../utils/analytics";

const ADMIN_PIN = "mps@admin";

function formatTimestamp(ns: bigint): string {
  const ms = Number(ns / 1_000_000n);
  return new Date(ms).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusColor(status: string) {
  switch (status) {
    case "new":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "in_progress":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "done":
      return "bg-emerald-100 text-emerald-800 border-emerald-300";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case "new":
      return "New";
    case "in_progress":
      return "In Progress";
    case "done":
      return "Done";
    default:
      return status;
  }
}

function getLanguageLabel(lang: string) {
  switch (lang) {
    case "english":
      return "EN";
    case "hindi":
      return "HI";
    case "gujarati":
      return "GU";
    default:
      return lang?.toUpperCase() ?? "—";
  }
}

// ─── Login Screen ────────────────────────────────────────────────────────────

interface LoginScreenProps {
  onLogin: () => void;
}

function LoginScreen({ onLogin }: LoginScreenProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function handleLogin() {
    if (pin === ADMIN_PIN) {
      setError(false);
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy relative overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0 mandala-bg opacity-60" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.28 0.085 215 / 0.95) 0%, oklch(0.18 0.05 248) 100%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm px-4"
      >
        <motion.div
          animate={shake ? { x: [-8, 8, -6, 6, -4, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="border border-[oklch(0.78_0.15_78/0.3)] shadow-2xl bg-[oklch(0.22_0.06_215/0.9)] backdrop-blur-md">
            <CardHeader className="text-center pb-2">
              {/* Gold logo mark */}
              <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gold flex items-center justify-center shadow-lg">
                <ShieldCheck className="w-8 h-8 text-navy" />
              </div>
              <CardTitle className="text-2xl text-gold font-display">
                Admin Login
              </CardTitle>
              <p className="text-sm text-[oklch(0.75_0.04_215)] mt-1">
                Master Pipe Solution
              </p>
            </CardHeader>

            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label
                  htmlFor="pin"
                  className="text-[oklch(0.85_0.05_85)] text-sm"
                >
                  Admin PIN
                </Label>
                <Input
                  id="pin"
                  type="password"
                  placeholder="Enter admin PIN"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setError(false);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  data-ocid="admin.login.input"
                  className="bg-[oklch(0.18_0.05_248/0.5)] border-[oklch(0.4_0.07_215)] text-[oklch(0.95_0.01_85)] placeholder:text-[oklch(0.5_0.04_215)] focus:border-gold focus:ring-gold/30"
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    data-ocid="admin.login.error_state"
                    className="flex items-center gap-2 text-sm text-red-400"
                  >
                    <XCircle className="w-4 h-4 flex-shrink-0" />
                    Incorrect PIN. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>

              <Button
                onClick={handleLogin}
                data-ocid="admin.login.button"
                className="w-full bg-gold hover:bg-[oklch(0.72_0.16_78)] text-navy font-semibold transition-all"
              >
                Login
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Default Reply Section ────────────────────────────────────────────────────

function DefaultReplySection() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const [localText, setLocalText] = useState<string | null>(null);
  const [savedOk, setSavedOk] = useState(false);
  const [saveErr, setSaveErr] = useState(false);

  const { data: defaultReply, isLoading } = useQuery<string>({
    queryKey: ["defaultReply"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getDefaultReply();
    },
    enabled: !!actor && !isFetching,
  });

  const currentText = localText !== null ? localText : (defaultReply ?? "");

  const { mutate: saveReply, isPending: isSaving } = useMutation({
    mutationFn: async (text: string) => {
      if (!actor) throw new Error("No actor");
      await actor.setDefaultReply(text);
    },
    onSuccess: () => {
      setSavedOk(true);
      setSaveErr(false);
      setLocalText(null);
      queryClient.invalidateQueries({ queryKey: ["defaultReply"] });
      setTimeout(() => setSavedOk(false), 3000);
    },
    onError: () => {
      setSaveErr(true);
      setTimeout(() => setSaveErr(false), 3000);
    },
  });

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <MessageSquareText className="w-5 h-5 text-gold" />
          <CardTitle className="text-lg text-foreground font-display">
            Default Reply Message
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          This message is pre-filled when you reply to customers on WhatsApp.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <Skeleton className="h-28 w-full" />
        ) : (
          <Textarea
            value={currentText}
            onChange={(e) => setLocalText(e.target.value)}
            placeholder="Type your default reply here..."
            rows={5}
            data-ocid="admin.default_reply.textarea"
            className="resize-none"
          />
        )}

        <div className="flex items-center gap-3">
          <Button
            onClick={() => saveReply(currentText)}
            disabled={isSaving || isLoading}
            data-ocid="admin.default_reply.save_button"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Save Reply
              </>
            )}
          </Button>

          <AnimatePresence>
            {savedOk && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                data-ocid="admin.default_reply.success_state"
                className="flex items-center gap-1 text-sm text-emerald-600"
              >
                <CheckCircle className="w-4 h-4" />
                Saved successfully!
              </motion.span>
            )}
            {saveErr && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1 text-sm text-red-600"
              >
                <XCircle className="w-4 h-4" />
                Failed to save. Try again.
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Query Row ────────────────────────────────────────────────────────────────

interface QueryRowProps {
  contact: Contact;
  index: number;
  defaultReply: string;
}

function QueryRow({ contact, index, defaultReply }: QueryRowProps) {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [currentStatus, setCurrentStatus] = useState(contact.status);

  const { mutate: changeStatus, isPending: isChanging } = useMutation({
    mutationFn: async (newStatus: string) => {
      if (!actor) throw new Error("No actor");
      await actor.updateContactStatus(contact.id, newStatus);
    },
    onSuccess: (_data, newStatus) => {
      setCurrentStatus(newStatus);
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  const waMessage = encodeURIComponent(`${defaultReply} - ${contact.name}`);
  const waLink = `https://wa.me/91${contact.phone}?text=${waMessage}`;

  const langLabel = getLanguageLabel(
    typeof contact.language === "string"
      ? contact.language
      : ((contact.language as { __kind__?: string }).__kind__ ??
          String(contact.language)),
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      data-ocid={`admin.queries.item.${index + 1}`}
      className="rounded-xl border border-border bg-card p-4 space-y-3 hover:shadow-md transition-shadow"
    >
      {/* Header row */}
      <div className="flex flex-wrap items-start gap-2 justify-between">
        <div>
          <p className="font-semibold text-foreground">{contact.name}</p>
          <a
            href={`tel:${contact.phone}`}
            className="text-sm text-teal hover:underline flex items-center gap-1 mt-0.5"
          >
            <Phone className="w-3.5 h-3.5" />
            {contact.phone}
          </a>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border font-mono">
            {langLabel}
          </span>
          <span
            className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${getStatusColor(currentStatus)}`}
          >
            {getStatusLabel(currentStatus)}
          </span>
        </div>
      </div>

      {/* Message */}
      <p className="text-sm text-muted-foreground leading-relaxed bg-muted/40 rounded-lg p-3">
        {contact.message}
      </p>

      {/* Footer row */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <p className="text-xs text-muted-foreground">
          {formatTimestamp(contact.timestamp)}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Status select */}
          <Select
            value={currentStatus}
            onValueChange={(v) => changeStatus(v)}
            disabled={isChanging}
          >
            <SelectTrigger
              className="h-8 text-xs w-36"
              data-ocid="admin.queries.status.select"
            >
              <SelectValue placeholder="Change status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>

          {/* WhatsApp reply */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="admin.queries.whatsapp.button"
          >
            <Button
              size="sm"
              className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="white"
                className="w-3.5 h-3.5"
                aria-hidden="true"
              >
                <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.471 2.027 7.773L0 32l8.489-2.007A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.307 19.426c-.4-.2-2.365-1.167-2.731-1.3-.366-.133-.632-.2-.898.2-.266.4-1.032 1.3-1.265 1.566-.233.267-.466.3-.866.1-.4-.2-1.688-.622-3.215-1.983-1.188-1.06-1.99-2.369-2.224-2.769-.233-.4-.025-.616.175-.815.18-.179.4-.466.6-.7.2-.233.266-.4.4-.666.133-.267.066-.5-.033-.7-.1-.2-.898-2.165-1.232-2.965-.324-.778-.653-.673-.898-.686l-.765-.013c-.267 0-.7.1-1.066.5s-1.4 1.367-1.4 3.333 1.433 3.866 1.633 4.133c.2.266 2.82 4.306 6.832 6.033.955.412 1.7.658 2.281.843.958.305 1.831.262 2.52.159.768-.115 2.365-.967 2.698-1.9.333-.933.333-1.733.233-1.9-.1-.167-.366-.267-.766-.467z" />
              </svg>
              Reply on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Queries Section ──────────────────────────────────────────────────────────

interface QueriesSectionProps {
  defaultReply: string;
}

function QueriesSection({ defaultReply }: QueriesSectionProps) {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const {
    data: contacts,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery<Contact[]>({
    queryKey: ["contacts"],
    queryFn: async () => {
      if (!actor) return [];
      const all = await actor.getAllContacts();
      return [...all].sort((a, b) => Number(b.timestamp - a.timestamp));
    },
    enabled: !!actor && !isFetching,
  });

  function handleRefresh() {
    queryClient.invalidateQueries({ queryKey: ["contacts"] });
    refetch();
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gold" />
            <CardTitle className="text-lg text-foreground font-display">
              Customer Queries
            </CardTitle>
            {contacts && contacts.length > 0 && (
              <Badge
                variant="secondary"
                className="ml-1 bg-primary/10 text-primary border-primary/20"
              >
                {contacts.length}
              </Badge>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading || isRefetching}
            data-ocid="admin.queries.refresh.button"
            className="gap-1.5"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isRefetching ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div data-ocid="admin.queries.loading_state" className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-border p-4 space-y-2"
              >
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-16 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-8 w-40" />
                </div>
              </div>
            ))}
          </div>
        ) : !contacts || contacts.length === 0 ? (
          <div
            data-ocid="admin.queries.empty_state"
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <MessageSquareText className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">No queries yet</p>
            <p className="text-sm text-muted-foreground/60 mt-1">
              Customer inquiries will appear here once submitted.
            </p>
          </div>
        ) : (
          <div data-ocid="admin.queries.table" className="space-y-3">
            {contacts.map((contact, idx) => (
              <QueryRow
                key={String(contact.id)}
                contact={contact}
                index={idx}
                defaultReply={defaultReply}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Analytics Panel ─────────────────────────────────────────────────────────

interface AnalyticsPanelProps {
  visitCount: bigint | undefined;
}

function AnalyticsPanel({ visitCount }: AnalyticsPanelProps) {
  const [log, setLog] = useState<VisitEntry[]>(() => getVisitLog());
  const [confirmClear, setConfirmClear] = useState(false);

  function handleClear() {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    clearVisitLog();
    setLog([]);
    setConfirmClear(false);
  }

  const now = Date.now();
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const todayTs = startOfDay.getTime();
  const weekTs = now - 7 * 24 * 60 * 60 * 1000;

  const visitsToday = log.filter((e) => e.timestamp >= todayTs).length;
  const visitsWeek = log.filter((e) => e.timestamp >= weekTs).length;

  // Referral breakdown
  const referralMap: Record<string, number> = {};
  for (const entry of log) {
    referralMap[entry.referral] = (referralMap[entry.referral] ?? 0) + 1;
  }
  const sortedReferrals = Object.entries(referralMap).sort(
    (a, b) => b[1] - a[1],
  );
  const topReferral = sortedReferrals[0]?.[0] ?? "—";

  // Device breakdown
  const deviceMap = { mobile: 0, tablet: 0, desktop: 0 };
  for (const entry of log) {
    deviceMap[entry.device] = (deviceMap[entry.device] ?? 0) + 1;
  }
  const total = log.length || 1;
  const mobileP = Math.round((deviceMap.mobile / total) * 100);
  const tabletP = Math.round((deviceMap.tablet / total) * 100);
  const desktopP = 100 - mobileP - tabletP;

  // Recent 20 visits (newest first)
  const recent = [...log].reverse().slice(0, 20);

  function formatDate(ts: number) {
    return new Date(ts).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const statCards = [
    {
      id: "analytics.stats.card.1",
      label: "Total Visits",
      value: visitCount !== undefined ? visitCount.toString() : "—",
      icon: <Eye className="w-5 h-5" />,
      color: "text-teal",
      bg: "bg-teal/10",
    },
    {
      id: "analytics.stats.card.2",
      label: "Visits Today",
      value: visitsToday.toString(),
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-gold",
      bg: "bg-gold/10",
    },
    {
      id: "analytics.stats.card.3",
      label: "This Week",
      value: visitsWeek.toString(),
      icon: <BarChart3 className="w-5 h-5" />,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      id: "analytics.stats.card.4",
      label: "Top Referral",
      value: topReferral,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-[oklch(0.55_0.15_140)]",
      bg: "bg-[oklch(0.55_0.15_140/0.1)]",
    },
  ];

  if (log.length === 0) {
    return (
      <div data-ocid="analytics.panel" className="space-y-6">
        {/* Stat cards skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {statCards.map((card) => (
            <motion.div
              key={card.id}
              data-ocid={card.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-border bg-card p-4"
            >
              <div
                className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center mb-3 ${card.color}`}
              >
                {card.icon}
              </div>
              <p className="text-2xl font-bold font-display text-foreground">
                {card.label === "Total Visits"
                  ? visitCount !== undefined
                    ? visitCount.toString()
                    : "—"
                  : "0"}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {card.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          data-ocid="analytics.empty_state"
          className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-border bg-muted/20"
        >
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <BarChart3 className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="font-semibold text-muted-foreground font-display">
            No visitor data yet
          </p>
          <p className="text-sm text-muted-foreground/60 mt-1 max-w-xs">
            Analytics will appear here once visitors start browsing your
            website.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      data-ocid="analytics.panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {statCards.map((card, i) => (
          <motion.div
            key={card.id}
            data-ocid={card.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-border bg-card p-4 hover:shadow-md transition-shadow"
          >
            <div
              className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center mb-3 ${card.color}`}
            >
              {card.icon}
            </div>
            <p
              className="text-2xl font-bold font-display text-foreground truncate"
              title={card.value}
            >
              {card.value}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{card.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Device Breakdown */}
        <motion.div
          data-ocid="analytics.device.panel"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="border-border h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-gold" />
                <CardTitle className="text-base font-display text-foreground">
                  Device Breakdown
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stacked bar */}
              <div className="h-4 rounded-full overflow-hidden flex">
                {mobileP > 0 && (
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${mobileP}%`,
                      backgroundColor: "oklch(0.55 0.2 25)",
                    }}
                    title={`Mobile: ${mobileP}%`}
                  />
                )}
                {tabletP > 0 && (
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${tabletP}%`,
                      backgroundColor: "oklch(0.65 0.18 78)",
                    }}
                    title={`Tablet: ${tabletP}%`}
                  />
                )}
                {desktopP > 0 && (
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${desktopP}%`,
                      backgroundColor: "oklch(0.45 0.12 215)",
                    }}
                    title={`Desktop: ${desktopP}%`}
                  />
                )}
              </div>
              {/* Legend */}
              <div className="space-y-2">
                {[
                  {
                    label: "Mobile",
                    pct: mobileP,
                    count: deviceMap.mobile,
                    icon: <Smartphone className="w-3.5 h-3.5" />,
                    color: "bg-[oklch(0.55_0.2_25)]",
                  },
                  {
                    label: "Tablet",
                    pct: tabletP,
                    count: deviceMap.tablet,
                    icon: <Tablet className="w-3.5 h-3.5" />,
                    color: "bg-[oklch(0.65_0.18_78)]",
                  },
                  {
                    label: "Desktop",
                    pct: desktopP,
                    count: deviceMap.desktop,
                    icon: <Monitor className="w-3.5 h-3.5" />,
                    color: "bg-[oklch(0.45_0.12_215)]",
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-sm flex-shrink-0 ${row.color}`}
                    />
                    <span className="text-muted-foreground flex items-center gap-1">
                      {row.icon} {row.label}
                    </span>
                    <span className="ml-auto font-medium text-foreground">
                      {row.count}
                    </span>
                    <span className="text-muted-foreground w-10 text-right">
                      {row.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Referral Breakdown */}
        <motion.div
          data-ocid="analytics.referral.panel"
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-border h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-gold" />
                <CardTitle className="text-base font-display text-foreground">
                  Traffic Sources
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {sortedReferrals.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No referral data available.
                </p>
              ) : (
                sortedReferrals.map(([source, count]) => {
                  const pct = Math.round((count / log.length) * 100);
                  return (
                    <div key={source} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span
                          className="text-foreground font-medium truncate max-w-[60%]"
                          title={source}
                        >
                          {source}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {count} ({pct}%)
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="h-full rounded-full bg-primary"
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Page Breakdown */}
      <motion.div
        data-ocid="analytics.pages.panel"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
      >
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gold" />
              <CardTitle className="text-base font-display text-foreground">
                Pages Visited
              </CardTitle>
              <span className="ml-1 text-xs text-muted-foreground">
                (which sections people viewed most)
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {(() => {
              const pageLabels: Record<string, string> = {
                "/": "Home",
                "/admin": "Admin Panel",
                "/workers": "Workers",
              };
              const pageMap: Record<string, number> = {};
              for (const entry of log) {
                const key = entry.page || "/";
                pageMap[key] = (pageMap[key] ?? 0) + 1;
              }
              const sorted = Object.entries(pageMap).sort(
                (a, b) => b[1] - a[1],
              );
              if (sorted.length === 0) {
                return (
                  <p className="text-sm text-muted-foreground">
                    No page data available yet.
                  </p>
                );
              }
              return sorted.map(([page, count]) => {
                const pct = Math.round((count / log.length) * 100);
                const label = pageLabels[page] ?? page;
                return (
                  <div key={page} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span
                        className="text-foreground font-medium truncate max-w-[60%]"
                        title={label}
                      >
                        {label}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {count} visit{count !== 1 ? "s" : ""} ({pct}%)
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: "oklch(0.55 0.18 165)" }}
                      />
                    </div>
                  </div>
                );
              });
            })()}
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Visits Table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <Card className="border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" />
              <CardTitle className="text-base font-display text-foreground">
                Recent Visits
              </CardTitle>
              <Badge
                variant="secondary"
                className="ml-1 bg-primary/10 text-primary border-primary/20 text-xs"
              >
                Last {recent.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div data-ocid="analytics.visits.table" className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-xs text-muted-foreground">
                    <th className="text-left pb-2 pr-3 font-medium">
                      Date / Time
                    </th>
                    <th className="text-left pb-2 pr-3 font-medium">Page</th>
                    <th className="text-left pb-2 pr-3 font-medium">Device</th>
                    <th className="text-left pb-2 pr-3 font-medium">
                      Referral
                    </th>
                    <th className="text-right pb-2 font-medium">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((entry, idx) => (
                    <tr
                      key={`${entry.timestamp}-${idx}`}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-2 pr-3 text-muted-foreground text-xs whitespace-nowrap">
                        {formatDate(entry.timestamp)}
                      </td>
                      <td
                        className="py-2 pr-3 text-foreground font-mono text-xs truncate max-w-[100px]"
                        title={entry.page}
                      >
                        {entry.page}
                      </td>
                      <td className="py-2 pr-3">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground capitalize">
                          {entry.device === "mobile" && (
                            <Smartphone className="w-3 h-3" />
                          )}
                          {entry.device === "tablet" && (
                            <Tablet className="w-3 h-3" />
                          )}
                          {entry.device === "desktop" && (
                            <Monitor className="w-3 h-3" />
                          )}
                          {entry.device}
                        </span>
                      </td>
                      <td
                        className="py-2 pr-3 text-xs text-muted-foreground truncate max-w-[80px]"
                        title={entry.referral}
                      >
                        {entry.referral}
                      </td>
                      <td className="py-2 text-right text-xs text-muted-foreground whitespace-nowrap">
                        {entry.duration > 0 ? `${entry.duration}s` : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Clear Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3"
      >
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          data-ocid="analytics.clear.button"
          className={`gap-1.5 text-sm transition-all ${
            confirmClear
              ? "border-destructive text-destructive hover:bg-destructive/10"
              : "border-border text-muted-foreground hover:text-destructive hover:border-destructive"
          }`}
        >
          <Trash2 className="w-3.5 h-3.5" />
          {confirmClear ? "Confirm — Clear All Data?" : "Clear Analytics Data"}
        </Button>
        {confirmClear && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setConfirmClear(false)}
            className="text-sm text-muted-foreground"
          >
            Cancel
          </Button>
        )}
        {confirmClear && (
          <p className="text-xs text-muted-foreground">
            This cannot be undone.
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

interface DashboardProps {
  onLogout: () => void;
}

function Dashboard({ onLogout }: DashboardProps) {
  const { actor, isFetching } = useActor();

  const { data: visitCount } = useQuery<bigint>({
    queryKey: ["visitCount"],
    queryFn: async () => {
      if (!actor) return 0n;
      return actor.getVisitCount();
    },
    enabled: !!actor && !isFetching,
  });

  const { data: defaultReply = "" } = useQuery<string>({
    queryKey: ["defaultReply"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getDefaultReply();
    },
    enabled: !!actor && !isFetching,
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-border bg-card/80 backdrop-blur-md shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-navy" />
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground leading-none font-display">
                Master Pipe Solution
              </p>
              <p className="text-xs text-muted-foreground leading-none mt-0.5">
                Admin Panel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {visitCount !== undefined && (
              <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground border border-border rounded-full px-3 py-1 bg-muted/40">
                <Eye className="w-3.5 h-3.5" />
                <span>{visitCount.toString()} visits</span>
              </div>
            )}
            <a href="/workers" data-ocid="admin.workers.link">
              <Button
                size="sm"
                className="gap-1.5 text-sm bg-gold hover:bg-[oklch(0.72_0.16_78)] text-navy font-semibold"
              >
                <Users className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Worker Management</span>
                <span className="sm:hidden">Workers</span>
              </Button>
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              data-ocid="admin.logout.button"
              className="gap-1.5 text-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Welcome banner */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl bg-gradient-to-r from-[oklch(0.28_0.085_215)] to-[oklch(0.35_0.1_215)] p-5 text-primary-foreground"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold font-display">
                Welcome back, Admin
              </h1>
              <p className="text-sm opacity-80 mt-1">
                Manage customer queries, analytics, and your default reply
                below.
              </p>
              {visitCount !== undefined && (
                <div className="flex items-center gap-1.5 mt-3 text-sm opacity-70 sm:hidden">
                  <Eye className="w-3.5 h-3.5" />
                  {visitCount.toString()} total site visits
                </div>
              )}
            </div>
            <a href="/workers" data-ocid="admin.banner.workers.link">
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: "oklch(0.78 0.15 78 / 0.2)",
                  color: "oklch(0.95 0.01 85)",
                  border: "1px solid oklch(0.78 0.15 78 / 0.4)",
                }}
              >
                <Users className="w-4 h-4" />
                Worker Management
              </button>
            </a>
          </div>
        </motion.div>

        <Separator />

        {/* Tabbed sections: Queries | Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Tabs defaultValue="queries">
            <TabsList className="mb-6 bg-muted/60 border border-border p-1 rounded-xl">
              <TabsTrigger
                value="queries"
                data-ocid="admin.tab.queries"
                className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-foreground flex items-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5" />
                Queries
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                data-ocid="admin.tab.analytics"
                className="rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-foreground flex items-center gap-1.5"
              >
                <BarChart3 className="w-3.5 h-3.5" />
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* Queries Tab */}
            <TabsContent value="queries" className="space-y-6 mt-0">
              <DefaultReplySection />
              <QueriesSection defaultReply={defaultReply} />
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent
              value="analytics"
              data-ocid="analytics.tab"
              className="mt-0"
            >
              <AnalyticsPanel visitCount={visitCount} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 mt-8">
        <p className="text-center text-xs text-muted-foreground">
          Master Pipe Solution — Admin Panel &middot; A business of Chakraborty
          Enterprise
        </p>
      </footer>
    </div>
  );
}

// ─── AdminPanel (root export) ─────────────────────────────────────────────────

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return <Dashboard onLogout={() => setIsLoggedIn(false)} />;
}
