import { useState } from "react";
import { useCampaign } from "../context/CampaignContext";
import { PHASES, CHANNEL_META } from "../data/campaignData";
import StatusSelect from "../components/StatusSelect";

export default function ContentTracker() {
  const { taskStatuses, notes, updateNote } = useCampaign();
  const [filterPhase, setFilterPhase] = useState("all");
  const [filterChannel, setFilterChannel] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Flatten all tasks
  const allTasks = [];
  PHASES.forEach((phase) => {
    Object.entries(phase.channels).forEach(([channelKey, channel]) => {
      channel.tasks.forEach((task) => {
        allTasks.push({
          ...task,
          phaseId: phase.id,
          phaseName: phase.name,
          phaseColor: phase.color,
          channelKey,
        });
      });
    });
  });

  const filtered = allTasks.filter((t) => {
    if (filterPhase !== "all" && t.phaseId !== filterPhase) return false;
    if (filterChannel !== "all" && t.channelKey !== filterChannel) return false;
    if (filterStatus !== "all" && (taskStatuses[t.id] || "not_started") !== filterStatus) return false;
    return true;
  });

  return (
    <div>
      <div className="page-header">
        <h2>Content Tracker</h2>
        <p>Every content asset across all phases and channels</p>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <button
          className={`filter-btn ${filterPhase === "all" ? "active" : ""}`}
          onClick={() => setFilterPhase("all")}
        >
          All Phases
        </button>
        {PHASES.map((p) => (
          <button
            key={p.id}
            className={`filter-btn ${filterPhase === p.id ? "active" : ""}`}
            onClick={() => setFilterPhase(p.id)}
            style={filterPhase === p.id ? { background: p.color, borderColor: p.color } : {}}
          >
            {p.week}
          </button>
        ))}
      </div>

      <div className="filter-bar">
        <button
          className={`filter-btn ${filterChannel === "all" ? "active" : ""}`}
          onClick={() => setFilterChannel("all")}
        >
          All Channels
        </button>
        {Object.entries(CHANNEL_META).map(([key, meta]) => (
          <button
            key={key}
            className={`filter-btn ${filterChannel === key ? "active" : ""}`}
            onClick={() => setFilterChannel(key)}
            style={filterChannel === key ? { background: meta.color, borderColor: meta.color } : {}}
          >
            {meta.label}
          </button>
        ))}
      </div>

      <div className="filter-bar">
        <button className={`filter-btn ${filterStatus === "all" ? "active" : ""}`} onClick={() => setFilterStatus("all")}>All Status</button>
        <button className={`filter-btn ${filterStatus === "not_started" ? "active" : ""}`} onClick={() => setFilterStatus("not_started")}>Not Started</button>
        <button className={`filter-btn ${filterStatus === "in_progress" ? "active" : ""}`} onClick={() => setFilterStatus("in_progress")} style={filterStatus === "in_progress" ? { background: "var(--yellow)", borderColor: "var(--yellow)", color: "#000" } : {}}>In Progress</button>
        <button className={`filter-btn ${filterStatus === "done" ? "active" : ""}`} onClick={() => setFilterStatus("done")} style={filterStatus === "done" ? { background: "var(--green)", borderColor: "var(--green)", color: "#000" } : {}}>Done</button>
      </div>

      <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
        Showing {filtered.length} of {allTasks.length} tasks
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table className="tracker-table">
          <thead>
            <tr>
              <th style={{ width: 50 }}>#</th>
              <th style={{ width: 120 }}>Phase</th>
              <th style={{ width: 130 }}>Channel</th>
              <th>Task</th>
              <th style={{ width: 240 }}>Description</th>
              <th style={{ width: 130 }}>Status</th>
              <th style={{ width: 200 }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((task, i) => {
              const meta = CHANNEL_META[task.channelKey];
              return (
                <tr key={task.id}>
                  <td style={{ color: "var(--text-muted)" }}>{i + 1}</td>
                  <td>
                    <span style={{ color: task.phaseColor, fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 600 }}>
                      {task.phaseName.replace(/^Week \d+: /, "")}
                    </span>
                  </td>
                  <td>
                    <span
                      className="channel-tag"
                      style={{ background: `${meta.color}22`, color: meta.color }}
                    >
                      {meta.label}
                    </span>
                  </td>
                  <td style={{ fontWeight: 500 }}>{task.title}</td>
                  <td style={{ color: "var(--text-secondary)", fontSize: 12 }}>{task.description}</td>
                  <td><StatusSelect taskId={task.id} /></td>
                  <td>
                    <input
                      className="influencer-input"
                      placeholder="Add note..."
                      value={notes[task.id] || ""}
                      onChange={(e) => updateNote(task.id, e.target.value)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
