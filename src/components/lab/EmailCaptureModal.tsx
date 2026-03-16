import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface EmailCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  toolName: string;
  onSuccess: () => void;
}

export default function EmailCaptureModal({
  open,
  onOpenChange,
  toolName,
  onSuccess,
}: EmailCaptureModalProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      localStorage.setItem("nsh-email-captured", "true");
      toast.success("You're in! Opening the tool now.");
      onOpenChange(false);
      onSuccess();
    } catch (err: any) {
      toast.error(err.message || "Failed to subscribe. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" style={{ borderRadius: "20px" }}>
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-semibold" style={{ color: "#493751" }}>
            Get access to {toolName}
          </DialogTitle>
          <DialogDescription className="font-body text-base">
            Drop your email and it's yours — free, no strings. We'll only send things worth reading.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-full border border-border bg-background px-5 py-3 font-body text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button
            type="submit"
            disabled={submitting}
            className="btn-pill-primary w-full text-base disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Unlock Tool"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
