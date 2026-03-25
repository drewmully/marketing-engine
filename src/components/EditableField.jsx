import { useAuth } from "../context/AuthContext";

export function EditableText({ value, onChange, placeholder = "—", className = "" }) {
  const { isEditMode } = useAuth();
  if (!isEditMode) {
    return <span className={className} style={{ color: value ? "var(--text-primary)" : "var(--text-faint)" }}>{value || placeholder}</span>;
  }
  return (
    <input
      className={`inf-input ${className}`}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}

export function EditableTextarea({ value, onChange, placeholder = "—", rows = 2 }) {
  const { isEditMode } = useAuth();
  if (!isEditMode) {
    return <p style={{ fontSize: 13, color: value ? "var(--text-secondary)" : "var(--text-faint)", lineHeight: 1.6 }}>{value || placeholder}</p>;
  }
  return (
    <textarea
      className="task-notes"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
    />
  );
}

export function EditableSelect({ value, onChange, options, disabled }) {
  const { isEditMode } = useAuth();
  return (
    <select
      className="status-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={!isEditMode || disabled}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}
