import { useCampaign } from "../context/CampaignContext";
import { useAuth } from "../context/AuthContext";
import { CHANNEL_NAMES, CHANNEL_COLORS } from "../data/campaignData";
import StatusSelect, { StatusBadge, ChannelTags, AddButton } from "../components/StatusSelect";
import { EditableText } from "../components/EditableField";

export default function MomentsCalendar() {
  const { moments, campaigns, creatives } = useCampaign();
  const { isEditMode } = useAuth();

  const sorted = [...moments.items].sort((a, b) => new Date(a.date) - new Date(b.date));
  const now = new Date();

  // Status summary
  const done = sorted.filter((m) => m.status === "done" || m.status === "live").length;
  const upcoming = sorted.filter((m) => {
    const d = new Date(m.date);
    return d >= now && m.status !== "done" && m.status !== "live";
  }).length;
  const next = sorted.find((m) => new Date(m.date) >= now && m.status !== "done");

  // Build linked lookups
  function getLinkedCampaigns(momentId) {
    return campaigns.items.filter((c) => c.linkedMoment === momentId);
  }
  function getLinkedCreatives(momentId) {
    return creatives.items.filter((c) => c.linkedMoment === momentId);
  }

  return (
    <div>
      {/* Hero: timeline overview */}
      <div className="page-hero">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div className="hero-title">Campaign Moments</div>
            <div className="hero-subtitle">Every key moment orchestrated — "something is always happening"</div>
          </div>
          <div style={{ display: "flex", gap: 12, textAlign: "center" }}>
            <div className="kpi-item" style={{ "--kpi-color": "var(--green)", padding: "10px 18px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--green)" }}>{done}</div>
              <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Complete</div>
            </div>
            <div className="kpi-item" style={{ "--kpi-color": "var(--yellow)", padding: "10px 18px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--yellow)" }}>{upcoming}</div>
              <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Upcoming</div>
            </div>
            <div className="kpi-item" style={{ "--kpi-color": "var(--blue)", padding: "10px 18px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--blue)" }}>{sorted.length}</div>
              <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Total</div>
            </div>
          </div>
        </div>
        {next && (
          <div style={{
            marginTop: 14, padding: "10px 14px", borderRadius: "var(--radius-sm)",
            background: "var(--accent-soft)", border: "1px solid var(--accent-border)",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 10, color: "var(--accent)", fontFamily: "var(--font-display)", letterSpacing: "0.08em", textTransform: "uppercase" }}>NEXT UP</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{next.name}</span>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
              — {new Date(next.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </span>
          </div>
        )}
      </div>

      {/* Timeline view */}
      <div style={{ position: "relative" }}>
        {/* Vertical timeline line */}
        <div style={{
          position: "absolute", left: 79, top: 0, bottom: 0, width: 2,
          background: "var(--border)", zIndex: 0,
        }} />

        {sorted.map((m) => {
          const d = new Date(m.date);
          const isPast = d < now;
          const isToday = d.toDateString() === now.toDateString();
          const daysOut = Math.ceil((d - now) / 86400000);
          const linkedCamps = getLinkedCampaigns(m.id);
          const linkedCreativs = getLinkedCreatives(m.id);

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

                {/* Linked Campaigns */}
                {linkedCamps.length > 0 && (
                  <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid var(--border)" }}>
                    <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                      Linked Campaigns ({linkedCamps.length})
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {linkedCamps.map((camp) => {
                        const statusColors = {
                          not_started: "var(--text-muted)", in_progress: "var(--yellow)",
                          live: "var(--green)", done: "var(--green)", iterating: "var(--blue)", paused: "var(--orange)",
                        };
                        return (
                          <div key={camp.id} style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "4px 10px", borderRadius: "var(--radius-sm)",
                            background: "var(--bg-surface)", border: "1px solid var(--border)",
                            fontSize: 11,
                          }}>
                            <span className="status-dot" style={{ background: statusColors[camp.status] || "var(--text-muted)" }} />
                            <span style={{ fontWeight: 600 }}>{camp.name || "(unnamed)"}</span>
                            <span style={{ color: "var(--text-muted)", fontSize: 9 }}>
                              {CHANNEL_NAMES[camp.channel?.replace("ch-", "")] || camp.channel}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Linked Creatives */}
                {linkedCreativs.length > 0 && (
                  <div style={{ marginTop: 8, paddingTop: 8, borderTop: linkedCamps.length > 0 ? "none" : "1px solid var(--border)" }}>
                    <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                      Content Needed ({linkedCreativs.length})
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {linkedCreativs.map((c) => {
                        const fmtColors = { video: "#ff4444", image: "#4c9aff", email: "#f0b429", carousel: "#a855f7", story: "#ff0050" };
                        const statusColors = {
                          not_started: "var(--text-muted)", in_progress: "var(--yellow)",
                          live: "var(--green)", done: "var(--green)", iterating: "var(--blue)", paused: "var(--orange)",
                        };
                        return (
                          <div key={c.id} style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "4px 10px", borderRadius: "var(--radius-sm)",
                            background: `${fmtColors[c.format] || "#999"}08`,
                            border: `1px solid ${fmtColors[c.format] || "#999"}20`,
                            fontSize: 11,
                          }}>
                            <span className="status-dot" style={{ background: statusColors[c.status] || "var(--text-muted)" }} />
                            <span style={{ fontWeight: 500, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {c.hook || "(no hook)"}
                            </span>
                            <span className="channel-tag" style={{
                              background: `${fmtColors[c.format] || "#999"}18`,
                              color: fmtColors[c.format] || "#999",
                              fontSize: 9, padding: "1px 6px",
                            }}>{c.format}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
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
