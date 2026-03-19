import { useCampaign } from "../context/CampaignContext";
import { PHASES, CHANNEL_META } from "../data/campaignData";
import StatusSelect from "../components/StatusSelect";

const CHANNELS = ["email", "linkedin", "twitter", "video"];

export default function Timeline() {
  const { taskStatuses } = useCampaign();

  return (
    <div>
      <div className="page-header">
        <h2>Campaign Timeline</h2>
        <p>Swim-lane view — all channels across all phases</p>
      </div>

      <div
        className="timeline-grid"
        style={{ gridTemplateColumns: `160px repeat(${PHASES.length}, 1fr)` }}
      >
        {/* Header row */}
        <div className="timeline-header-cell" style={{ background: "var(--bg-primary)" }}>
          Channel
        </div>
        {PHASES.map((phase) => (
          <div
            key={phase.id}
            className="timeline-header-cell"
            style={{ borderBottom: `2px solid ${phase.color}`, textAlign: "center" }}
          >
            <div style={{ color: phase.color }}>{phase.week}</div>
            <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 2 }}>
              {phase.label}
            </div>
          </div>
        ))}

        {/* Channel rows */}
        {CHANNELS.map((channelKey) => {
          const meta = CHANNEL_META[channelKey];
          return [
            <div key={`label-${channelKey}`} className="timeline-channel-label">
              <span style={{ color: meta.color }}>{meta.label}</span>
            </div>,
            ...PHASES.map((phase) => {
              const channel = phase.channels[channelKey];
              const tasks = channel ? channel.tasks : [];
              return (
                <div key={`${phase.id}-${channelKey}`} className="timeline-cell">
                  {tasks.map((task) => {
                    const status = taskStatuses[task.id] || "not_started";
                    return (
                      <div key={task.id} className={`timeline-task ${status}`}>
                        <div className="task-title">{task.title}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 6 }}>
                          {task.description}
                        </div>
                        <StatusSelect taskId={task.id} />
                      </div>
                    );
                  })}
                  {tasks.length === 0 && (
                    <div style={{ fontSize: 11, color: "var(--text-muted)", fontStyle: "italic" }}>
                      No tasks
                    </div>
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
