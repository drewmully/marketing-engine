import { useAuth } from "../context/AuthContext";

const TASK_STATUSES = [
  { value: "not_started", label: "Not Started" },
  { value: "in_progress", label: "In Progress" },
  { value: "live", label: "Live" },
  { value: "done", label: "Done" },
  { value: "iterating", label: "Iterating" },
];

export default function StatusSelect({ value, onChange, compact = false }) {
  const { isEditMode } = useAuth();
  return (
    <select
      className="status-select"
      value={value || "not_started"}
      onChange={(e) => onChange(e.target.value)}
      disabled={!isEditMode}
      style={compact ? { fontSize: 11, padding: "3px 22px 3px 6px" } : {}}
    >
      {TASK_STATUSES.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

export function StatusBadge({ status }) {
  const labels = {
    not_started: "Not Started", in_progress: "In Progress",
    live: "Live", done: "Done", iterating: "Iterating",
  };
  const colors = {
    not_started: "var(--text-muted)", in_progress: "var(--yellow)",
    live: "var(--green)", done: "var(--green)", iterating: "var(--blue)",
  };
  return (
    <span className={`status-badge ${status}`} style={{ color: colors[status], background: `${colors[status]}18` }}>
      <span className="status-dot" style={{ background: colors[status] }} />
      {labels[status] || status}
    </span>
  );
}

export function ChannelTags({ channels }) {
  const COLORS = {
    meta: "#4c9aff", tiktok: "#ff0050", youtube: "#ff4444",
    email: "#f0b429", twitter: "#1da1f2", linkedin: "#0077b5", direct: "#8f96a8",
  };
  const NAMES = {
    meta: "Meta", tiktok: "TikTok", youtube: "YouTube",
    email: "Email", twitter: "X", linkedin: "LinkedIn", direct: "Direct",
  };
  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
      {(channels || []).map((ch) => (
        <span key={ch} className="channel-tag" style={{ background: `${COLORS[ch] || "#555"}18`, color: COLORS[ch] || "#999" }}>
          {NAMES[ch] || ch}
        </span>
      ))}
    </div>
  );
}

export function AddButton({ onClick, label = "Add Row" }) {
  const { isEditMode } = useAuth();
  if (!isEditMode) return null;
  return (
    <button onClick={onClick} className="btn btn-ghost" style={{ marginTop: 8, fontSize: 12 }}>
      + {label}
    </button>
  );
}
