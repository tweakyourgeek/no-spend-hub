import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import type { LabTool } from "@/lib/lab-tools";
import { useAuth } from "@/contexts/AuthContext";
import EmailCaptureModal from "./EmailCaptureModal";

interface ToolCardProps {
  tool: LabTool;
  index: number;
}

export default function ToolCard({ tool, index }: ToolCardProps) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAuth();

  const emailCaptured = localStorage.getItem("nsh-email-captured") === "true";

  function handleClick() {
    if (tool.tier === "free") {
      navigate(`/lab/${tool.slug}`);
    } else if (tool.tier === "email") {
      if (emailCaptured) {
        navigate(`/lab/${tool.slug}`);
      } else {
        setModalOpen(true);
      }
    } else if (tool.tier === "login" && user) {
      navigate(`/lab/${tool.slug}`);
    }
    // login tier without user: CTA button inside card handles navigation
  }

  const isLocked = tool.tier === "login" && !user;
  const isClickable = !isLocked;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay: index * 0.04, duration: 0.35 }}
        onClick={isClickable ? handleClick : undefined}
        className={`card-soft relative flex flex-col p-6 transition-all ${
          isClickable
            ? "cursor-pointer hover:shadow-lg hover:-translate-y-0.5"
            : ""
        } ${isLocked ? "opacity-75" : ""}`}
        style={{
          background: isLocked ? "#F4F1F6" : "#FFFFFF",
          minHeight: "200px",
        }}
      >
        {/* Tier badge */}
        <span
          className="absolute top-4 right-4 rounded-full px-2.5 py-0.5 text-xs font-body font-medium"
          style={tierBadgeStyle(tool.tier, emailCaptured)}
        >
          {tierLabel(tool.tier, emailCaptured)}
        </span>

        {/* Emoji + content */}
        <span className="text-3xl mb-3">{tool.emoji}</span>
        <h3
          className="font-display text-lg font-semibold mb-1"
          style={{ color: "#493751" }}
        >
          {tool.name}
        </h3>
        <p className="body-text text-sm leading-relaxed flex-1">
          {tool.description}
        </p>

        {/* Locked CTA */}
        {isLocked && (
          <button
            onClick={(e) => { e.stopPropagation(); navigate("/login"); }}
            className="mt-4 inline-flex items-center gap-2 btn-pill-outline text-sm self-start"
          >
            <Lock className="h-3.5 w-3.5" />
            Log in to unlock
          </button>
        )}
      </motion.div>

      {tool.tier === "email" && (
        <EmailCaptureModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          toolName={tool.name}
          onSuccess={() => navigate(`/lab/${tool.slug}`)}
        />
      )}
    </>
  );
}

function tierLabel(tier: string, emailCaptured: boolean): string {
  if (tier === "free") return "Free";
  if (tier === "email") return emailCaptured ? "Unlocked" : "Free · email";
  return "Members";
}

function tierBadgeStyle(
  tier: string,
  emailCaptured: boolean,
): React.CSSProperties {
  if (tier === "free")
    return { background: "#D8EDE6", color: "#3B6B5A" };
  if (tier === "email")
    return emailCaptured
      ? { background: "#D8EDE6", color: "#3B6B5A" }
      : { background: "#F9F0F5", color: "#9B5586" };
  return { background: "#E0DAE7", color: "#493751" };
}
