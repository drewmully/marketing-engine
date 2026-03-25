import { useCampaign } from "../context/CampaignContext";
import { useAuth } from "../context/AuthContext";
import { SWIMLANES } from "../data/campaignData";
import StatusSelect, { StatusBadge, AddButton } from "../components/StatusSelect";
import { EditableText } from "../components/EditableField";

export default function OrgAlignment() {
  const { tasks, moments, funnel } = useCampaign();
  const { isEditMode } = useAuth();

  // Build a map of moment/funnel names for linked items
  const linkNames = {};
  moments.items.forEach((m) => { linkNames[m.id] = m.name; });
  funnel.items.forEach((f) => { linkNames[f.id] = f.message?.substring(0, 40) + (f.message?.length > 40 ? "..." : ""); });

  return (
    <div>
      {/* Hero: swimlane overview */}
      <div className="page-hero">
        <div className="hero-title">Organizational Alignment</div>
        <div className="hero-subtitle" style={{ marginBottom: 16 }}>This is where most launches break — 4 swimlanes keep everything on track</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {SWIMLANES.map((lane) => {
            const laneTasks = tasks.items.filter((t) => t.swimlane === lane.id);
            const done = laneTasks.filter((t) => t.status === "done" || t.status === "live").length;
            const pct = laneTasks.length > 0 ? Math.round((done / laneTasks.length) * 100) : 0;
            const overdue = laneTasks.filter((t) => t.deadline && new Date(t.deadline) < new Date() && t.status !== "done" && t.status !== "live").length;
            return (
              <div key={lane.id} style={{
                padding: 14, borderRadius: "var(--radius-sm)",
                background: `${lane.color}06`, border: `1px solid ${lane.color}20`, textAlign: "center",
                borderTop: `3px solid ${lane.color}`,
              }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{lane.emoji}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: lane.color, marginBottom: 6 }}>{lane.name}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: pct === 100 ? "var(--green)" : "var(--text-primary)" }}>{pct}%</div>
                <div className="progress-bar" style={{ height: 4, marginTop: 6, marginBottom: 4 }}>
                  <div className="progress-bar-fill" style={{ width: `${pct}%`, background: pct === 100 ? "var(--green)" : "var(--yellow)" }} />
                </div>
                <div style={{ fontSize: 10, color: "var(--text-muted)" }}>
                  {done}/{laneTasks.length} done
                  {overdue > 0 && <span style={{ color: "var(--accent)", marginLeft: 4 }}>({overdue} overdue)</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "none" /* replaced by hero */ }}>
      </div>

      {SWIMLANES.map((lane) => {
        const laneTasks = tasks.items.filter((t) => t.swimlane === lane.id);
        const done = laneTasks.filter((t) => t.status === "done" || t.status === "live").length;
        const pct = laneTasks.length > 0 ? Math.round((done / laneTasks.length) * 100) : 0;

        return (
          <div key={lane.id} style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 16 }}>{lane.emoji}</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, letterSpacing: "0.06em", color: lane.color }}>
                {lane.name}
              </span>
              <span style={{ fontSize: 11, color: "var(--text-muted)" }}>— {done}/{laneTasks.length} complete</span>
              <div style={{ flex: 1 }} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: pct === 100 ? "var(--green)" : lane.color }}>{pct}%</span>
            </div>
            <div className="progress-bar" style={{ marginBottom: 12 }}>
              <div className="progress-bar-fill" style={{ width: `${pct}%`, background: pct === 100 ? "var(--green)" : lane.color }} />
            </div>

            <table className="tracker-table">
              <thead>
                <tr>
                  <th style={{ width: "35%" }}>Task</th>
                  <th style={{ width: "12%" }}>Owner</th>
                  <th style={{ width: "12%" }}>Deadline</th>
                  <th style={{ width: "20%" }}>Linked To</th>
                  <th style={{ width: "12%" }}>Status</th>
                  {isEditMode && <th style={{ width: "4%" }}></th>}
                </tr>
              </thead>
              <tbody>
                {laneTasks.map((task) => (
                  <tr key={task.id}>
                    <td>
                      <EditableText value={task.title}
                        onChange={(v) => tasks.update(task.id, { title: v })}
                        placeholder="Task description" />
                    </td>
                    <td>
                      <EditableText value={task.owner}
                        onChange={(v) => tasks.update(task.id, { owner: v })}
                        placeholder="Owner" />
                    </td>
                    <td>
                      {isEditMode ? (
                        <input type="date" value={task.deadline || ""}
                          onChange={(e) => tasks.update(task.id, { deadline: e.target.value })}
                          style={{
                            background: "transparent", border: "1px solid var(--border)",
                            color: "var(--text-primary)", fontSize: 12, padding: "4px 6px",
                            borderRadius: "var(--radius-sm)",
                          }} />
                      ) : (
                        <span style={{ fontSize: 12, color: isOverdue(task.deadline) ? "var(--accent)" : "var(--text-secondary)" }}>
                          {task.deadline ? new Date(task.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"}
                        </span>
                      )}
                    </td>
                    <td>
                      {isEditMode ? (
                        <select className="status-select" value={task.linkedTo || ""}
                          onChange={(e) => tasks.update(task.id, { linkedTo: e.target.value })}>
                          <option value="">— none —</option>
                          <optgroup label="Moments">
                            {moments.items.map((m) => <option key={m.id} value={m.id}>{m.name || "(unnamed)"}</option>)}
                          </optgroup>
                          <optgroup label="Funnel Rows">
                            {funnel.items.map((f) => <option key={f.id} value={f.id}>{f.message?.substring(0, 50) || "(unnamed)"}</option>)}
                          </optgroup>
                        </select>
                      ) : (
                        <span style={{ fontSize: 12, color: "var(--blue)" }}>
                          {task.linkedTo ? (linkNames[task.linkedTo] || task.linkedTo) : "—"}
                        </span>
                      )}
                    </td>
                    <td>
                      {isEditMode
                        ? <StatusSelect value={task.status} onChange={(v) => tasks.update(task.id, { status: v })} compact />
                        : <StatusBadge status={task.status} />}
                    </td>
                    {isEditMode && (
                      <td>
                        <button onClick={() => tasks.remove(task.id)}
                          style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 14 }}>×</button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            <AddButton label={`Add ${lane.name} Task`} onClick={() => tasks.add({
              swimlane: lane.id, title: "", owner: "", deadline: "", status: "not_started", linkedTo: "",
            })} />
          </div>
        );
      })}
    </div>
  );
}

function isOverdue(date) {
  if (!date) return false;
  return new Date(date) < new Date() && new Date(date).toDateString() !== new Date().toDateString();
}
