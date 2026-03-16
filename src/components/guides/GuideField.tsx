import { useCallback } from "react";

interface GuideTextFieldProps {
  fieldId: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (fieldId: string, value: string) => void;
  multiline?: boolean;
  rows?: number;
}

export function GuideTextField({
  fieldId,
  label,
  placeholder,
  value,
  onChange,
  multiline = false,
  rows = 3,
}: GuideTextFieldProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange(fieldId, e.target.value);
    },
    [fieldId, onChange],
  );

  const inputStyle = {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: "14px",
    color: "#3B3B58",
    background: "white",
    border: "1px solid hsl(268 21% 88%)",
    borderRadius: "12px",
    padding: "10px 14px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div className="mb-4">
      {label && (
        <label
          className="block mb-1.5 text-xs font-semibold uppercase tracking-wider"
          style={{ fontFamily: "'Open Sans', sans-serif", color: "#B375A0", letterSpacing: "2px" }}
        >
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          value={value || ""}
          onChange={handleChange}
          onBlur={handleChange}
          placeholder={placeholder}
          rows={rows}
          style={{ ...inputStyle, resize: "vertical" }}
          onFocus={(e) => (e.target.style.borderColor = "#B375A0")}
        />
      ) : (
        <input
          type="text"
          value={value || ""}
          onChange={handleChange}
          onBlur={handleChange}
          placeholder={placeholder}
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = "#B375A0")}
        />
      )}
    </div>
  );
}

interface GuideCheckboxProps {
  fieldId: string;
  label: string;
  checked: boolean;
  onChange: (fieldId: string, value: string) => void;
}

export function GuideCheckbox({ fieldId, label, checked, onChange }: GuideCheckboxProps) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer py-1">
      <div
        onClick={() => onChange(fieldId, checked ? "" : "true")}
        className="w-5 h-5 rounded border-2 flex items-center justify-center transition-all"
        style={{
          borderColor: checked ? "#493751" : "#B375A0",
          background: checked ? "#493751" : "transparent",
        }}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className="text-sm" style={{ fontFamily: "'Open Sans', sans-serif", color: "#3B3B58" }}>
        {label}
      </span>
    </label>
  );
}

interface GuideSelectableProps {
  fieldId: string;
  label: string;
  description?: string;
  selected: boolean;
  onChange: (fieldId: string, value: string) => void;
  number?: number;
}

export function GuideSelectable({
  fieldId,
  label,
  description,
  selected,
  onChange,
  number,
}: GuideSelectableProps) {
  return (
    <button
      onClick={() => onChange(fieldId, selected ? "" : "true")}
      className="w-full text-left p-4 rounded-2xl transition-all mb-3"
      style={{
        background: selected ? "#493751" : "white",
        border: selected ? "2px solid #493751" : "2px solid hsl(268 21% 88%)",
      }}
    >
      <div className="flex gap-3">
        {number !== undefined && (
          <span
            className="text-2xl font-light flex-shrink-0 w-7"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: selected ? "rgba(255,255,255,0.4)" : "hsl(268 21% 88%)",
            }}
          >
            {number}
          </span>
        )}
        <div className="flex-1">
          <div
            className="text-xs font-bold uppercase tracking-wider mb-1"
            style={{
              fontFamily: "'Open Sans', sans-serif",
              color: selected ? "#E8B4A0" : "#493751",
              letterSpacing: "1px",
            }}
          >
            {label}
          </div>
          {description && (
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                color: selected ? "rgba(255,255,255,0.85)" : "#3B3B58",
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
