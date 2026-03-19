import { useCampaign } from "../context/CampaignContext";

const STATUS_OPTIONS = [
  { value: "not_started", label: "Not Started" },
  { value: "in_progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

export default function StatusSelect({ taskId }) {
  const { taskStatuses, updateTaskStatus } = useCampaign();
  const status = taskStatuses[taskId] || "not_started";

  return (
    <select
      className="status-select"
      value={status}
      onChange={(e) => updateTaskStatus(taskId, e.target.value)}
    >
      {STATUS_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function StatusBadge({ taskId }) {
  const { taskStatuses } = useCampaign();
  const status = taskStatuses[taskId] || "not_started";
  const labels = { not_started: "Not Started", in_progress: "In Progress", done: "Done" };
  return <span className={`status-badge ${status}`}>{labels[status]}</span>;
}
