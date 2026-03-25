import { useCampaign } from "../context/CampaignContext";
import { useAuth } from "../context/AuthContext";
import StatusSelect, { StatusBadge, ChannelTags, AddButton } from "../components/StatusSelect";
import { EditableText } from "../components/EditableField";

export default function MomentsCalendar() {
  const { moments } = useCampaign();
  const { isEditMode } = useAuth();

  const sorted = [...moments.items].sort((a, b) => new Date(a.date) - new Date(b.date));
  const now = new Date();

  return (
    <div>
      <div className="page-header">
        <h2>Moments Calendar</h2>
        <p>Every campaign moment orchestrated — "something is always happening"</p>
      </div>

      {/* Timeline view */}
      <div style={{ position: "relative" }}>
        {/* Vertical timeline line */}
        <div style={{
          position: "absolute", left: 79, top: 0, bottom: 0, width: 2,
          background: "var(--border)", zIndex: 0,
        }} />

        {sorted.map((m, i) => {
          const d = new Date(m.date);
          const isPast = d < now;
          const isToday = d.toDateString() === now.toDateString();
          const daysOut = Math.ceil((d - now) / 86400000);

          return (
            <div key={m.id} style={{
              display: "grid", gridTemplateColumns: "80px 1fr",
              gap: 20, marginBottom: 16, position: "relative", zIndex: 1,
            }}>
              {/* Date column */}
              <div style={{ textAlign: "right", paddingTop: 16 }}>
                {isEditMode ? (
                  <input type="date" value={m.date}
                    onChange={(e) => moments.update(m.id, { date: e.target.value })}
                    style={{
                      background: "transparent", border: "none", color: "var(--text-primary)",
                      fontFamily: "var(--font-display)", fontSize: 13, textAlign: "right",
                      width: 80, cursor: "pointer",
                    }} />
                ) : (
                  <div>
                    <div style={{
                      fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700,
                      color: isToday ? "var(--accent)" : isPast ? "var(--text-muted)" : "var(--text-primary)",
                    }}>
                      {d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                    <div style={{ fontSize: 10, color: "var(--text-faint)" }}>
                      {isToday ? "TODAY" : daysOut < 0 ? `${Math.abs(daysOut)}d ago` : `in ${daysOut}d`}
                    </div>
                  </div>
                )}
                {/* Timeline dot */}
                <div style={{
                  position: "absolute", left: 73, top: 18,
                  width: 14, height: 14, borderRadius: "50%",
                  background: isToday ? "var(--accent)" : isPast ? "var(--green)" : "var(--bg-elevated)",
                  border: `2px solid ${isToday ? "var(--accent)" : isPast ? "var(--green)" : "var(--border-light)"}`,
                  zIndex: 2,
                }} />
              </div>

              {/* Moment card */}
              <div className="card" style={{
                opacity: isPast && !isToday ? 0.6 : 1,
                borderColor: isToday ? "var(--accent-border)" : "var(--border)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <EditableText value={m.name}
                      onChange={(v) => moments.update(m.id, { name: v })}
                      placeholder="Moment name"
                      className="moment-name" />
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    {isEditMode
                      ? <StatusSelect value={m.status} onChange={(v) => moments.update(m.id, { status: v })} compact />
                      : <StatusBadge status={m.status} />}
                    {isEditMode && (
                      <button onClick={() => moments.remove(m.id)}
                        style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 14 }}>×</button>
                    )}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Goal</div>
                    <EditableText value={m.goal} onChange={(v) => moments.update(m.id, { goal: v })} placeholder="What's the goal?" />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>KPI Target</div>
                    <EditableText value={m.kpiTarget} onChange={(v) => moments.update(m.id, { kpiTarget: v })} placeholder="Target metrics" />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Assets</div>
                    <EditableText value={m.assets} onChange={(v) => moments.update(m.id, { assets: v })} placeholder="Linked assets" />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Owner</div>
                    <EditableText value={m.owner} onChange={(v) => moments.update(m.id, { owner: v })} placeholder="Responsible" />
                  </div>
                </div>

                <div style={{ marginTop: 10 }}>
                  <ChannelTags channels={m.channels} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AddButton label="Add Moment" onClick={() => moments.add({
        name: "", date: new Date().toISOString().split("T")[0],
        goal: "", assets: "", channels: [], owner: "", kpiTarget: "", status: "not_started",
      })} />
    </div>
  );
}
