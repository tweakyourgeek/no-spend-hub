import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { loadGuide, saveField, syncToSupabase } from "@/lib/guide-persistence";

export interface GuideSection {
  id: string;
  label: string;
  shortLabel?: string;
  component: React.ComponentType<GuideSectionProps>;
}

export interface GuideSectionProps {
  fields: Record<string, string>;
  onFieldChange: (fieldId: string, value: string) => void;
}

interface GuideShellProps {
  guideId: string;
  title: string;
  subtitle: string;
  sections: GuideSection[];
}

export default function GuideShell({
  guideId,
  title,
  subtitle,
  sections,
}: GuideShellProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);
  const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  // Load saved data on mount
  useEffect(() => {
    loadGuide(guideId)
      .then((data) => {
        setFields(data);
        setLoaded(true);
      })
      .catch(() => {
        setFields({});
        setLoaded(true);
      });
    // Sync localStorage to Supabase on mount (fire and forget)
    syncToSupabase(guideId).catch(() => {});
  }, [guideId]);

  // Debounced save on field change
  const handleFieldChange = useCallback(
    (fieldId: string, value: string) => {
      setFields((prev) => ({ ...prev, [fieldId]: value }));

      // Clear existing timer for this field
      if (debounceTimers.current[fieldId]) {
        clearTimeout(debounceTimers.current[fieldId]);
      }

      // Debounce save (600ms)
      debounceTimers.current[fieldId] = setTimeout(() => {
        saveField(guideId, fieldId, value);
      }, 600);
    },
    [guideId],
  );

  // Save on blur (immediate)
  const handleBlurSave = useCallback(
    (fieldId: string, value: string) => {
      if (debounceTimers.current[fieldId]) {
        clearTimeout(debounceTimers.current[fieldId]);
      }
      saveField(guideId, fieldId, value);
    },
    [guideId],
  );

  const section = sections[currentIndex];
  const SectionComponent = section.component;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === sections.length - 1;

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[hsl(var(--cream))]">
        <p className="font-body text-muted-foreground animate-pulse">
          Loading guide...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#F8F1F2" }}>
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
        style={{ background: "rgba(248,241,242,0.9)", borderColor: "hsl(268 21% 88%)" }}>
        <div className="container mx-auto flex items-center h-14 px-4 gap-4">
          <Link
            to="/lab"
            className="inline-flex items-center gap-1.5 text-sm transition-colors"
            style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Lab
          </Link>
          <span
            className="text-sm font-semibold"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#493751" }}
          >
            {title}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-1 w-full" style={{ background: "hsl(268 21% 88%)" }}>
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / sections.length) * 100}%`,
              background: "linear-gradient(90deg, #B375A0, #A6C9BB)",
            }}
          />
        </div>
      </div>

      {/* Section navigation pills */}
      <div className="fixed top-[60px] left-0 right-0 z-40 overflow-x-auto"
        style={{ background: "rgba(248,241,242,0.95)" }}>
        <div className="container mx-auto px-4 py-2 flex gap-2">
          {sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentIndex(i)}
              className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                background: i === currentIndex ? "#493751" : "transparent",
                color: i === currentIndex ? "#fff" : "#3B3B58",
                border: i === currentIndex ? "none" : "1px solid hsl(268 21% 88%)",
              }}
            >
              {s.shortLabel || s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Section content */}
      <div className="pt-[108px] pb-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <SectionComponent
            fields={fields}
            onFieldChange={(fieldId, value) => {
              handleFieldChange(fieldId, value);
            }}
          />
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t"
        style={{ background: "rgba(248,241,242,0.95)", borderColor: "hsl(268 21% 88%)" }}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between max-w-2xl">
          <button
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={isFirst}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all disabled:opacity-30"
            style={{
              fontFamily: "'Open Sans', sans-serif",
              color: "#493751",
              border: "1px solid hsl(268 21% 88%)",
            }}
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>

          <span className="text-xs" style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0" }}>
            {currentIndex + 1} / {sections.length}
          </span>

          <button
            onClick={() =>
              setCurrentIndex((i) => Math.min(sections.length - 1, i + 1))
            }
            disabled={isLast}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all disabled:opacity-30"
            style={{
              fontFamily: "'Open Sans', sans-serif",
              color: "#fff",
              background: "#493751",
            }}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
