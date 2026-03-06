import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  ArrowLeft,
  Briefcase,
  CheckCircle,
  ClipboardList,
  Eye,
  Loader2,
  MapPin,
  Phone,
  Plus,
  ShieldCheck,
  Star,
  Trash2,
  UserCheck,
  UserPlus,
  Users,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Assignment, Worker } from "../backend.d";
import { useActor } from "../hooks/useActor";

const ADMIN_PIN = "mps@admin";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getWorkerLevel(workVolume: bigint): string {
  const vol = Number(workVolume);
  if (vol <= 10) return "Junior";
  if (vol <= 30) return "Mid";
  return "Senior";
}

function getLevelColor(workVolume: bigint): string {
  const vol = Number(workVolume);
  if (vol <= 10) return "bg-amber-100 text-amber-800 border-amber-300";
  if (vol <= 30) return "bg-blue-100 text-blue-800 border-blue-300";
  return "bg-emerald-100 text-emerald-800 border-emerald-300";
}

function getStatusColor(status: string): string {
  switch (status) {
    case "pending":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "in-progress":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "completed":
      return "bg-emerald-100 text-emerald-800 border-emerald-300";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
}

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

// ─── Star Rating ─────────────────────────────────────────────────────────────

interface StarRatingProps {
  rating: number;
  editable?: boolean;
  onRate?: (r: number) => void;
  size?: "sm" | "md";
}

function StarRating({
  rating,
  editable = false,
  onRate,
  size = "sm",
}: StarRatingProps) {
  const [hovered, setHovered] = useState(0);
  const starSize = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!editable}
          onClick={() => editable && onRate?.(star)}
          onMouseEnter={() => editable && setHovered(star)}
          onMouseLeave={() => editable && setHovered(0)}
          className={`transition-transform ${editable ? "cursor-pointer hover:scale-110" : "cursor-default"}`}
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
        >
          <Star
            className={`${starSize} transition-colors`}
            fill={
              star <= (hovered || rating)
                ? "oklch(0.78 0.15 78)"
                : "transparent"
            }
            stroke={
              star <= (hovered || rating)
                ? "oklch(0.72 0.16 78)"
                : "oklch(0.65 0.04 215)"
            }
          />
        </button>
      ))}
    </div>
  );
}

// ─── Login Screen ─────────────────────────────────────────────────────────────

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
              <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gold flex items-center justify-center shadow-lg">
                <Users className="w-8 h-8 text-navy" />
              </div>
              <CardTitle className="text-2xl text-gold font-display">
                Worker Management
              </CardTitle>
              <p className="text-sm text-[oklch(0.75_0.04_215)] mt-1">
                Master Pipe Solution
              </p>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label
                  htmlFor="wm-pin"
                  className="text-[oklch(0.85_0.05_85)] text-sm"
                >
                  Admin PIN
                </Label>
                <Input
                  id="wm-pin"
                  type="password"
                  placeholder="Enter admin PIN"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setError(false);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  data-ocid="workers.login.input"
                  className="bg-[oklch(0.18_0.05_248/0.5)] border-[oklch(0.4_0.07_215)] text-[oklch(0.95_0.01_85)] placeholder:text-[oklch(0.5_0.04_215)] focus:border-gold focus:ring-gold/30"
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    data-ocid="workers.login.error_state"
                    className="flex items-center gap-2 text-sm text-red-400"
                  >
                    <XCircle className="w-4 h-4 flex-shrink-0" />
                    Incorrect PIN. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>

              <Button
                onClick={handleLogin}
                data-ocid="workers.login.button"
                className="w-full bg-gold hover:bg-[oklch(0.72_0.16_78)] text-navy font-semibold"
              >
                Login
              </Button>

              <a
                href="/admin"
                data-ocid="workers.back_to_admin.link"
                className="flex items-center justify-center gap-2 text-sm text-[oklch(0.6_0.04_215)] hover:text-[oklch(0.78_0.15_78)] transition-colors mt-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Admin Panel
              </a>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Add / Edit Worker Modal ──────────────────────────────────────────────────

interface WorkerFormData {
  name: string;
  age: string;
  bloodGroup: string;
  emergencyNumber: string;
  mobileNumber: string;
  zipCode: string;
}

const defaultWorkerForm: WorkerFormData = {
  name: "",
  age: "",
  bloodGroup: "",
  emergencyNumber: "",
  mobileNumber: "",
  zipCode: "",
};

interface WorkerFormModalProps {
  open: boolean;
  onClose: () => void;
  editWorker?: Worker | null;
}

function WorkerFormModal({ open, onClose, editWorker }: WorkerFormModalProps) {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<WorkerFormData>(
    editWorker
      ? {
          name: editWorker.name,
          age: String(editWorker.age),
          bloodGroup: editWorker.bloodGroup,
          emergencyNumber: editWorker.emergencyNumber,
          mobileNumber: editWorker.mobileNumber,
          zipCode: editWorker.zipCode,
        }
      : defaultWorkerForm,
  );

  // Reset form when modal opens
  const handleOpen = (isOpen: boolean) => {
    if (isOpen && editWorker) {
      setForm({
        name: editWorker.name,
        age: String(editWorker.age),
        bloodGroup: editWorker.bloodGroup,
        emergencyNumber: editWorker.emergencyNumber,
        mobileNumber: editWorker.mobileNumber,
        zipCode: editWorker.zipCode,
      });
    } else if (isOpen) {
      setForm(defaultWorkerForm);
    }
  };

  const { mutate: saveWorker, isPending } = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      const age = BigInt(Number.parseInt(form.age, 10));
      if (editWorker) {
        await actor.updateWorker(
          editWorker.id,
          form.name,
          age,
          form.bloodGroup,
          form.emergencyNumber,
          form.mobileNumber,
          form.zipCode,
        );
      } else {
        await actor.addWorker(
          form.name,
          age,
          form.bloodGroup,
          form.emergencyNumber,
          form.mobileNumber,
          form.zipCode,
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workers"] });
      onClose();
      setForm(defaultWorkerForm);
    },
  });

  const isValid =
    form.name.trim() &&
    form.age.trim() &&
    form.bloodGroup &&
    form.mobileNumber.trim() &&
    form.emergencyNumber.trim() &&
    form.zipCode.trim();

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        handleOpen(o);
        if (!o) onClose();
      }}
    >
      <DialogContent className="max-w-md" data-ocid="workers.form.dialog">
        <DialogHeader>
          <DialogTitle className="font-display text-foreground">
            {editWorker ? "Edit Worker" : "Add New Worker"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="w-name">Full Name *</Label>
              <Input
                id="w-name"
                placeholder="Worker name"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                data-ocid="workers.form.name.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="w-age">Age *</Label>
              <Input
                id="w-age"
                type="number"
                placeholder="Age"
                min="18"
                max="70"
                value={form.age}
                onChange={(e) =>
                  setForm((p) => ({ ...p, age: e.target.value }))
                }
                data-ocid="workers.form.age.input"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="w-bg">Blood Group *</Label>
            <Select
              value={form.bloodGroup}
              onValueChange={(v) => setForm((p) => ({ ...p, bloodGroup: v }))}
            >
              <SelectTrigger
                id="w-bg"
                data-ocid="workers.form.bloodgroup.select"
              >
                <SelectValue placeholder="Select blood group" />
              </SelectTrigger>
              <SelectContent>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                  (bg) => (
                    <SelectItem key={bg} value={bg}>
                      {bg}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="w-mobile">Mobile Number *</Label>
            <Input
              id="w-mobile"
              type="tel"
              placeholder="10-digit mobile"
              value={form.mobileNumber}
              onChange={(e) =>
                setForm((p) => ({ ...p, mobileNumber: e.target.value }))
              }
              data-ocid="workers.form.mobile.input"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="w-emergency">Emergency Number *</Label>
            <Input
              id="w-emergency"
              type="tel"
              placeholder="Emergency contact"
              value={form.emergencyNumber}
              onChange={(e) =>
                setForm((p) => ({ ...p, emergencyNumber: e.target.value }))
              }
              data-ocid="workers.form.emergency.input"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="w-zip">Zip Code *</Label>
            <Input
              id="w-zip"
              placeholder="PIN code"
              value={form.zipCode}
              onChange={(e) =>
                setForm((p) => ({ ...p, zipCode: e.target.value }))
              }
              data-ocid="workers.form.zipcode.input"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="workers.form.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={() => saveWorker()}
            disabled={isPending || !isValid}
            data-ocid="workers.form.submit_button"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                {editWorker ? "Update Worker" : "Add Worker"}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Assign Job Modal ─────────────────────────────────────────────────────────

interface AssignJobModalProps {
  open: boolean;
  onClose: () => void;
  worker: Worker | null;
}

interface AssignFormData {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerZip: string;
  jobDescription: string;
}

const defaultAssignForm: AssignFormData = {
  customerName: "",
  customerPhone: "",
  customerAddress: "",
  customerZip: "",
  jobDescription: "",
};

function AssignJobModal({ open, onClose, worker }: AssignJobModalProps) {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<AssignFormData>(defaultAssignForm);

  const { mutate: assignJob, isPending } = useMutation({
    mutationFn: async () => {
      if (!actor || !worker) throw new Error("No actor or worker");
      await actor.assignWork(
        worker.id,
        form.customerName,
        form.customerPhone,
        form.customerAddress,
        form.customerZip,
        form.jobDescription,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workers"] });
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      onClose();
      setForm(defaultAssignForm);
    },
  });

  const isValid =
    form.customerName.trim() &&
    form.customerPhone.trim() &&
    form.customerAddress.trim() &&
    form.customerZip.trim() &&
    form.jobDescription.trim();

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          onClose();
          setForm(defaultAssignForm);
        }
      }}
    >
      <DialogContent className="max-w-md" data-ocid="workers.assign.dialog">
        <DialogHeader>
          <DialogTitle className="font-display text-foreground flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-gold" />
            Assign Job
          </DialogTitle>
          {worker && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <UserCheck className="w-4 h-4" />
              Worker:{" "}
              <span className="font-medium text-foreground">{worker.name}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted border border-border">
                <MapPin className="w-3 h-3 inline mr-1" />
                {worker.zipCode}
              </span>
            </div>
          )}
        </DialogHeader>

        <div className="space-y-4 py-2">
          {worker && (
            <div
              className="rounded-lg px-3 py-2 text-xs flex items-center gap-2"
              style={{
                background: "oklch(0.45 0.12 195 / 0.08)",
                border: "1px solid oklch(0.45 0.12 195 / 0.2)",
                color: "oklch(0.35 0.1 215)",
              }}
            >
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              Worker location zip:{" "}
              <strong className="ml-1">{worker.zipCode}</strong>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="cust-name">Customer Name *</Label>
              <Input
                id="cust-name"
                placeholder="Customer name"
                value={form.customerName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, customerName: e.target.value }))
                }
                data-ocid="workers.assign.name.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cust-phone">Customer Phone *</Label>
              <Input
                id="cust-phone"
                type="tel"
                placeholder="Phone number"
                value={form.customerPhone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, customerPhone: e.target.value }))
                }
                data-ocid="workers.assign.phone.input"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cust-address">Customer Address *</Label>
            <Input
              id="cust-address"
              placeholder="Full address"
              value={form.customerAddress}
              onChange={(e) =>
                setForm((p) => ({ ...p, customerAddress: e.target.value }))
              }
              data-ocid="workers.assign.address.input"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cust-zip">Customer Zip Code *</Label>
            <Input
              id="cust-zip"
              placeholder="Customer PIN code"
              value={form.customerZip}
              onChange={(e) =>
                setForm((p) => ({ ...p, customerZip: e.target.value }))
              }
              data-ocid="workers.assign.zip.input"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="job-desc">Job Description *</Label>
            <Textarea
              id="job-desc"
              placeholder="Describe the work required..."
              rows={3}
              value={form.jobDescription}
              onChange={(e) =>
                setForm((p) => ({ ...p, jobDescription: e.target.value }))
              }
              data-ocid="workers.assign.description.textarea"
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => {
              onClose();
              setForm(defaultAssignForm);
            }}
            data-ocid="workers.assign.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={() => assignJob()}
            disabled={isPending || !isValid}
            data-ocid="workers.assign.submit_button"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Assigning…
              </>
            ) : (
              <>
                <Briefcase className="w-4 h-4 mr-2" />
                Assign Job
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Assignments Drawer ───────────────────────────────────────────────────────

interface AssignmentsDrawerProps {
  open: boolean;
  onClose: () => void;
  worker: Worker | null;
}

function AssignmentsDrawer({ open, onClose, worker }: AssignmentsDrawerProps) {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const { data: assignments, isLoading } = useQuery<Assignment[]>({
    queryKey: ["workerAssignments", worker?.id?.toString()],
    queryFn: async () => {
      if (!actor || !worker) return [];
      return actor.getWorkerAssignments(worker.id);
    },
    enabled: !!actor && !isFetching && !!worker && open,
  });

  const { mutate: updateStatus, isPending: isUpdating } = useMutation({
    mutationFn: async ({
      id,
      status,
      workerId,
    }: { id: bigint; status: string; workerId: bigint }) => {
      if (!actor) throw new Error("No actor");
      await actor.updateAssignmentStatus(id, status);
      if (status === "completed") {
        await actor.setWorkerAvailability(workerId, true);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workerAssignments", worker?.id?.toString()],
      });
      queryClient.invalidateQueries({ queryKey: ["workers"] });
    },
  });

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg overflow-y-auto"
        data-ocid="workers.assignments.sheet"
      >
        <SheetHeader className="pb-4">
          <SheetTitle className="font-display flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-gold" />
            Assignments — {worker?.name}
          </SheetTitle>
          {worker && (
            <p className="text-sm text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 inline mr-1" />
              Worker zip: {worker.zipCode}
            </p>
          )}
        </SheetHeader>

        {isLoading ? (
          <div
            data-ocid="workers.assignments.loading_state"
            className="space-y-3 mt-4"
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl border border-border p-4 space-y-2"
              >
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-12 w-full" />
              </div>
            ))}
          </div>
        ) : !assignments || assignments.length === 0 ? (
          <div
            data-ocid="workers.assignments.empty_state"
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <ClipboardList className="w-7 h-7 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">
              No assignments yet
            </p>
            <p className="text-sm text-muted-foreground/60 mt-1">
              Assign a job to see it here.
            </p>
          </div>
        ) : (
          <div className="space-y-3 mt-4">
            {[...assignments]
              .sort((a, b) => Number(b.timestamp - a.timestamp))
              .map((assignment, idx) => (
                <motion.div
                  key={String(assignment.id)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  data-ocid={`workers.assignments.item.${idx + 1}`}
                  className="rounded-xl border border-border bg-card p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-sm text-foreground">
                        {assignment.customerName}
                      </p>
                      <a
                        href={`tel:${assignment.customerPhone}`}
                        className="text-xs text-teal hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <Phone className="w-3 h-3" />
                        {assignment.customerPhone}
                      </a>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-medium flex-shrink-0 ${getStatusColor(assignment.status)}`}
                    >
                      {assignment.status}
                    </span>
                  </div>

                  <div className="text-xs space-y-1 text-muted-foreground">
                    <p className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                      {assignment.customerAddress}
                    </p>
                    <p className="text-xs">
                      Customer ZIP:{" "}
                      <span className="font-medium text-foreground">
                        {assignment.customerZip}
                      </span>
                      {" · "}
                      Worker ZIP:{" "}
                      <span className="font-medium text-foreground">
                        {assignment.workerZip}
                      </span>
                    </p>
                  </div>

                  <p className="text-xs bg-muted/40 rounded-lg p-2.5 leading-relaxed text-foreground/80">
                    {assignment.jobDescription}
                  </p>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <p className="text-xs text-muted-foreground">
                      {formatTimestamp(assignment.timestamp)}
                    </p>
                    <Select
                      value={assignment.status}
                      onValueChange={(v) =>
                        updateStatus({
                          id: assignment.id,
                          status: v,
                          workerId: assignment.workerId,
                        })
                      }
                      disabled={isUpdating}
                    >
                      <SelectTrigger
                        className="h-7 text-xs w-32"
                        data-ocid="workers.assignments.status.select"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

// ─── Worker Card ──────────────────────────────────────────────────────────────

interface WorkerCardProps {
  worker: Worker;
  index: number;
  onEdit: (w: Worker) => void;
  onDelete: (w: Worker) => void;
  onAssign: (w: Worker) => void;
  onViewAssignments: (w: Worker) => void;
}

function WorkerCard({
  worker,
  index,
  onEdit,
  onDelete,
  onAssign,
  onViewAssignments,
}: WorkerCardProps) {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  const { mutate: updateRating, isPending: isRating } = useMutation({
    mutationFn: async (rating: number) => {
      if (!actor) throw new Error("No actor");
      await actor.updateWorkerRating(worker.id, rating);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workers"] });
    },
  });

  const level = getWorkerLevel(worker.workVolume);
  const levelColor = getLevelColor(worker.workVolume);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      data-ocid={`workers.list.item.${index + 1}`}
      className="rounded-2xl border border-border bg-card p-5 space-y-4 hover:shadow-navy transition-all duration-200"
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg font-display flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.28 0.085 215), oklch(0.45 0.12 195))",
            }}
          >
            {worker.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">
              {worker.name}
            </p>
            <p className="text-xs text-muted-foreground">
              Age: {String(worker.age)} · {worker.bloodGroup}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-end">
          <span
            className={`text-xs px-2 py-0.5 rounded-full border font-medium ${levelColor}`}
          >
            {level}
          </span>
          <Badge
            variant="outline"
            className={
              worker.isAvailable
                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                : "bg-red-50 text-red-700 border-red-300"
            }
          >
            <span
              className={`w-1.5 h-1.5 rounded-full mr-1.5 ${worker.isAvailable ? "bg-emerald-500" : "bg-red-500"}`}
            />
            {worker.isAvailable ? "Available" : "On Job"}
          </Badge>
        </div>
      </div>

      {/* Info row */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Phone className="w-3.5 h-3.5 text-teal flex-shrink-0" />
          <a href={`tel:${worker.mobileNumber}`} className="hover:underline">
            {worker.mobileNumber}
          </a>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
          <a href={`tel:${worker.emergencyNumber}`} className="hover:underline">
            {worker.emergencyNumber}
          </a>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          ZIP: {worker.zipCode}
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Briefcase className="w-3.5 h-3.5 flex-shrink-0" />
          Jobs: {String(worker.workVolume)}
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground">Rating:</span>
        <div className={isRating ? "opacity-50 pointer-events-none" : ""}>
          <StarRating
            rating={worker.rating}
            editable
            onRate={(r) => updateRating(r)}
          />
        </div>
        {isRating && (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />
        )}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 pt-1">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onEdit(worker)}
          data-ocid={`workers.list.edit_button.${index + 1}`}
          className="h-8 text-xs gap-1.5"
        >
          <Eye className="w-3.5 h-3.5" />
          Edit
        </Button>

        {worker.isAvailable && (
          <Button
            size="sm"
            onClick={() => onAssign(worker)}
            data-ocid={`workers.list.assign_button.${index + 1}`}
            className="h-8 text-xs gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Briefcase className="w-3.5 h-3.5" />
            Assign Job
          </Button>
        )}

        <Button
          size="sm"
          variant="outline"
          onClick={() => onViewAssignments(worker)}
          data-ocid={`workers.list.view_assignments_button.${index + 1}`}
          className="h-8 text-xs gap-1.5"
        >
          <ClipboardList className="w-3.5 h-3.5" />
          Assignments
        </Button>

        <Button
          size="sm"
          variant="outline"
          onClick={() => onDelete(worker)}
          data-ocid={`workers.list.delete_button.${index + 1}`}
          className="h-8 text-xs gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Delete Confirm Dialog ────────────────────────────────────────────────────

interface DeleteConfirmProps {
  worker: Worker | null;
  onCancel: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

function DeleteConfirmDialog({
  worker,
  onCancel,
  onConfirm,
  isDeleting,
}: DeleteConfirmProps) {
  return (
    <Dialog
      open={!!worker}
      onOpenChange={(o) => {
        if (!o) onCancel();
      }}
    >
      <DialogContent className="max-w-sm" data-ocid="workers.delete.dialog">
        <DialogHeader>
          <DialogTitle className="font-display text-foreground flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-destructive" />
            Delete Worker
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground py-2">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-foreground">{worker?.name}</span>?
          This cannot be undone.
        </p>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            data-ocid="workers.delete.cancel_button"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
            data-ocid="workers.delete.confirm_button"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting…
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

interface WorkerDashboardProps {
  onLogout: () => void;
}

function WorkerDashboard({ onLogout }: WorkerDashboardProps) {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  const [showAddModal, setShowAddModal] = useState(false);
  const [editWorker, setEditWorker] = useState<Worker | null>(null);
  const [assignWorker, setAssignWorker] = useState<Worker | null>(null);
  const [viewWorker, setViewWorker] = useState<Worker | null>(null);
  const [deleteWorker, setDeleteWorker] = useState<Worker | null>(null);

  const { data: workers, isLoading } = useQuery<Worker[]>({
    queryKey: ["workers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllWorkers();
    },
    enabled: !!actor && !isFetching,
  });

  const { mutate: doDelete, isPending: isDeleting } = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      await actor.deleteWorker(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workers"] });
      setDeleteWorker(null);
    },
  });

  const availableCount = workers?.filter((w) => w.isAvailable).length ?? 0;
  const onJobCount = workers?.filter((w) => !w.isAvailable).length ?? 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-border bg-card/80 backdrop-blur-md shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href="/admin"
              data-ocid="workers.header.back_link"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Admin Panel</span>
            </a>
            <span className="text-border">·</span>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center">
                <Users className="w-5 h-5 text-navy" />
              </div>
              <div>
                <p className="font-semibold text-sm text-foreground leading-none font-display">
                  Worker Management
                </p>
                <p className="text-xs text-muted-foreground leading-none mt-0.5">
                  Master Pipe Solution
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              data-ocid="workers.logout.button"
              className="gap-1.5 text-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Welcome banner */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl p-5 text-primary-foreground"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.28 0.085 215), oklch(0.35 0.1 215))",
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold font-display">
                Worker Management
              </h1>
              <p className="text-sm opacity-80 mt-1">
                Manage workers, track assignments, and monitor performance.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-sm font-medium">
                  {availableCount} Available
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="text-sm font-medium">{onJobCount} On Job</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Actions bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-muted-foreground" />
            <span className="font-semibold text-foreground">
              All Workers
              {workers && workers.length > 0 && (
                <span className="ml-2 text-sm text-muted-foreground font-normal">
                  ({workers.length})
                </span>
              )}
            </span>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            data-ocid="workers.add.button"
            className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <UserPlus className="w-4 h-4" />
            Add Worker
          </Button>
        </div>

        {/* Worker grid */}
        {isLoading ? (
          <div
            data-ocid="workers.list.loading_state"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-border p-5 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="w-12 h-12 rounded-xl" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-28" />
                </div>
              </div>
            ))}
          </div>
        ) : !workers || workers.length === 0 ? (
          <div
            data-ocid="workers.list.empty_state"
            className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-border"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-5">
              <Users className="w-9 h-9 text-muted-foreground" />
            </div>
            <p className="font-semibold text-foreground text-lg font-display mb-1">
              No Workers Added Yet
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              Start by adding your first worker using the "Add Worker" button
              above.
            </p>
            <Button
              onClick={() => setShowAddModal(true)}
              className="mt-6 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
              data-ocid="workers.empty.add_button"
            >
              <UserPlus className="w-4 h-4" />
              Add First Worker
            </Button>
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {workers.map((worker, idx) => (
                <WorkerCard
                  key={String(worker.id)}
                  worker={worker}
                  index={idx}
                  onEdit={(w) => setEditWorker(w)}
                  onDelete={(w) => setDeleteWorker(w)}
                  onAssign={(w) => setAssignWorker(w)}
                  onViewAssignments={(w) => setViewWorker(w)}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 mt-8">
        <p className="text-center text-xs text-muted-foreground">
          Master Pipe Solution — Worker Management &middot; A business of
          Chakraborty Enterprise
        </p>
      </footer>

      {/* Modals */}
      <WorkerFormModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
      <WorkerFormModal
        open={!!editWorker}
        onClose={() => setEditWorker(null)}
        editWorker={editWorker}
      />
      <AssignJobModal
        open={!!assignWorker}
        onClose={() => setAssignWorker(null)}
        worker={assignWorker}
      />
      <AssignmentsDrawer
        open={!!viewWorker}
        onClose={() => setViewWorker(null)}
        worker={viewWorker}
      />
      <DeleteConfirmDialog
        worker={deleteWorker}
        onCancel={() => setDeleteWorker(null)}
        onConfirm={() => {
          if (deleteWorker) doDelete(deleteWorker.id);
        }}
        isDeleting={isDeleting}
      />
    </div>
  );
}

// ─── WorkerManagement (root export) ──────────────────────────────────────────

export default function WorkerManagement() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return <WorkerDashboard onLogout={() => setIsLoggedIn(false)} />;
}
