import { useCampaign } from "../context/CampaignContext";
import { useAuth } from "../context/AuthContext";
import { PHASES, CHANNEL_META } from "../data/campaignData";
import StatusSelect from "../components/StatusSelect";

const CHANNELS = ["email", "linkedin", "twitter", "video"];

export default function Timeline() {
  const { taskStatuses } = useCampaign();
  const { isEditMode } = useAuth();

  return (
    <div>
      <div className="page-header">
        <h2>Campaign Timeline</h2>
        <p>All channels across all phases — track every deliverable</p>
      </div>

      <div
        className="timeline-grid"
        style={{ gridTemplateColumns: `140px repeat(${PHASES.length}, 1fr)` }}
      >
        {/* Header */}
        <div className="timeline-header-cell" style={{ background: "var(--bg-base)" }}>Channel</div>
        {PHASES.map((phase) => {
          return (
            <div key={phase.id} className="timeline-header-cell">
              <div style={{ fontSize: 12, color: "var(--text-primary)" }}>{phase.week}</div>
              <div style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 2, letterSpacing: "0.08em" }}>
                {phase.label}
              </div>
            </div>
          );
        })}

        {/* Rows */}
        {CHANNELS.map((channelKey) => {
          const meta = CHANNEL_META[channelKey];
          return [
            <div key={`label-${channelKey}`} className="timeline-channel-label">
              <span style={{ color: meta.color, fontSize: 12 }}>{meta.label}</span>
            </div>,
            ...PHASES.map((phase) => {
              const tasks = phase.channels[channelKey]?.tasks || [];
              return (
                <div key={`${phase.id}-${channelKey}`} className="timeline-cell">
                  {tasks.map((task) => {
                    const status = taskStatuses[task.id] || "not_started";
                    return (
                      <div key={task.id} className={`timeline-task ${status}`}>
                        <div className="task-title">{task.title}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2, marginBottom: isEditMode ? 6 : 0 }}>
                          {task.description}
                        </div>
                        {isEditMode && <StatusSelect taskId={task.id} />}
                      </div>
                    );
                  })}
                  {tasks.length === 0 && (
                    <div style={{ fontSize: 11, color: "var(--text-faint)", fontStyle: "italic", padding: 4 }}>—</div>
                  )}
                </div>
              );
            }),
          ];
        })}
      </div>
    </div>
  );
}
