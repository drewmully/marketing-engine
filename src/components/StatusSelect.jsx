import { useCampaign } from "../context/CampaignContext";
import { useAuth } from "../context/AuthContext";

const STATUS_OPTIONS = [
  { value: "not_started", label: "Not Started" },
  { value: "in_progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

export default function StatusSelect({ taskId }) {
  const { taskStatuses, updateTaskStatus } = useCampaign();
  const { isEditMode } = useAuth();
  const status = taskStatuses[taskId] || "not_started";

  return (
    <select
      className="status-select"
      value={status}
      onChange={(e) => updateTaskStatus(taskId, e.target.value)}
      disabled={!isEditMode}
    >
      {STATUS_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}

export function StatusBadge({ status }) {
  const labels = { not_started: "Not Started", in_progress: "In Progress", done: "Done" };
  return (
    <span className={`status-badge ${status}`}>
      <span className={`status-dot ${status}`} />
      {labels[status]}
    </span>
  );
}
