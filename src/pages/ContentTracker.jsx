import { useState } from "react";
import { useCampaign } from "../context/CampaignContext";
import { useAuth } from "../context/AuthContext";
import { PHASES, CHANNEL_META } from "../data/campaignData";
import StatusSelect, { StatusBadge } from "../components/StatusSelect";

export default function ContentTracker() {
  const { taskStatuses, notes, updateNote } = useCampaign();
  const { isEditMode } = useAuth();
  const [filterPhase, setFilterPhase] = useState("all");
  const [filterChannel, setFilterChannel] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const allTasks = [];
  PHASES.forEach((phase) => {
    Object.entries(phase.channels).forEach(([channelKey, channel]) => {
      channel.tasks.forEach((task) => {
        allTasks.push({ ...task, phaseId: phase.id, phaseName: phase.name, phaseWeek: phase.week, phaseColor: phase.color, channelKey });
      });
    });
  });

  const filtered = allTasks.filter((t) => {
    if (filterPhase !== "all" && t.phaseId !== filterPhase) return false;
    if (filterChannel !== "all" && t.channelKey !== filterChannel) return false;
    if (filterStatus !== "all" && (taskStatuses[t.id] || "not_started") !== filterStatus) return false;
    return true;
  });

  const statusCounts = { all: allTasks.length, not_started: 0, in_progress: 0, done: 0 };
  allTasks.forEach((t) => { statusCounts[taskStatuses[t.id] || "not_started"]++; });

  return (
    <div>
      <div className="page-header">
        <h2>Content Tracker</h2>
        <p>Every deliverable across the campaign — filter, update, track</p>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <button className={`filter-btn ${filterPhase === "all" ? "active" : ""}`} onClick={() => setFilterPhase("all")}>All Phases</button>
        {PHASES.map((p) => (
          <button key={p.id} className={`filter-btn ${filterPhase === p.id ? "active" : ""}`} onClick={() => setFilterPhase(p.id)}>
            {p.week}
          </button>
        ))}
      </div>
      <div className="filter-bar">
        <button className={`filter-btn ${filterChannel === "all" ? "active" : ""}`} onClick={() => setFilterChannel("all")}>All Channels</button>
        {Object.entries(CHANNEL_META).map(([k, m]) => (
          <button key={k} className={`filter-btn ${filterChannel === k ? "active" : ""}`}
            onClick={() => setFilterChannel(k)} style={filterChannel === k ? { background: m.color, borderColor: m.color } : {}}>
            {m.label}
          </button>
        ))}
      </div>
      <div className="filter-bar">
        {[
          { key: "all", label: `All (${statusCounts.all})` },
          { key: "not_started", label: `To Do (${statusCounts.not_started})` },
          { key: "in_progress", label: `Active (${statusCounts.in_progress})`, activeStyle: { background: "var(--yellow)", borderColor: "var(--yellow)", color: "#000" } },
          { key: "done", label: `Done (${statusCounts.done})`, activeStyle: { background: "var(--green)", borderColor: "var(--green)", color: "#000" } },
        ].map((f) => (
          <button key={f.key} className={`filter-btn ${filterStatus === f.key ? "active" : ""}`}
            onClick={() => setFilterStatus(f.key)}
            style={filterStatus === f.key && f.activeStyle ? f.activeStyle : {}}>
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>
        {filtered.length} of {allTasks.length} tasks
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="tracker-table">
          <thead>
            <tr>
              <th style={{ width: 90 }}>Phase</th>
              <th style={{ width: 120 }}>Channel</th>
              <th>Task</th>
              <th style={{ width: 110 }}>Status</th>
              {isEditMode && <th style={{ width: 180 }}>Notes</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((task) => {
              const meta = CHANNEL_META[task.channelKey];
              const status = taskStatuses[task.id] || "not_started";
              return (
                <tr key={task.id}>
                  <td>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)" }}>{task.phaseWeek}</span>
                  </td>
                  <td>
                    <span className="channel-tag" style={{ background: `${meta.color}18`, color: meta.color }}>{meta.label}</span>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{task.title}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{task.description}</div>
                  </td>
                  <td>
                    {isEditMode ? <StatusSelect taskId={task.id} /> : <StatusBadge status={status} />}
                  </td>
                  {isEditMode && (
                    <td>
                      <input className="inf-input" placeholder="Note..."
                        value={notes[task.id] || ""}
                        onChange={(e) => updateNote(task.id, e.target.value)} />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
