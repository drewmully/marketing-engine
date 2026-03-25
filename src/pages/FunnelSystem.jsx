import { useState } from "react";
import { useCampaign } from "../context/CampaignContext";
import { useAuth } from "../context/AuthContext";
import { FUNNEL_STAGES } from "../data/campaignData";
import StatusSelect, { StatusBadge, ChannelTags, AddButton } from "../components/StatusSelect";
import { EditableText } from "../components/EditableField";

const CHANNEL_OPTIONS = ["meta", "tiktok", "youtube", "email", "twitter", "linkedin"];

export default function FunnelSystem() {
  const { funnel } = useCampaign();
  const { isEditMode } = useAuth();
  const [activeStage, setActiveStage] = useState("all");

  const filtered = activeStage === "all" ? funnel.items : funnel.items.filter((r) => r.stage === activeStage);

  // Stats per stage
  const stageStats = {};
  FUNNEL_STAGES.forEach((s) => {
    const rows = funnel.items.filter((r) => r.stage === s.id);
    const live = rows.filter((r) => r.status === "live" || r.status === "done").length;
    stageStats[s.id] = { total: rows.length, live };
  });

  return (
    <div>
      {/* Visual funnel hero */}
      <div className="page-hero">
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
          {/* Funnel graphic */}
          <div style={{ flex: "0 0 340px" }}>
            <div className="hero-title">The Funnel</div>
            <div className="hero-subtitle" style={{ marginBottom: 16 }}>Move people from awareness to loyalty</div>
            <div className="funnel-visual">
              {FUNNEL_STAGES.map((stage, i) => {
                const widthPct = 100 - (i * 18);
                const ss = stageStats[stage.id];
                return (
                  <div key={stage.id}
                    className="funnel-stage-bar"
                    onClick={() => setActiveStage(activeStage === stage.id ? "all" : stage.id)}
                    style={{
                      width: `${widthPct}%`,
                      background: stage.color,
                      opacity: activeStage === "all" || activeStage === stage.id ? 1 : 0.35,
                      cursor: "pointer",
                    }}>
                    <div className="funnel-stage-info">
                      <span className="funnel-stage-name">{stage.emoji} {stage.name}</span>
                      <span className="funnel-stage-kpi">{ss.live}/{ss.total} live</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key metrics per stage */}
          <div style={{ flex: 1 }}>
            <div className="card-label">Stage Focus</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {FUNNEL_STAGES.map((stage) => {
                const ss = stageStats[stage.id];
                const pct = ss.total > 0 ? Math.round((ss.live / ss.total) * 100) : 0;
                return (
                  <div key={stage.id} style={{
                    padding: 12, borderRadius: "var(--radius-sm)",
                    border: `1px solid ${stage.color}30`, background: `${stage.color}08`,
                    cursor: "pointer", transition: "all 0.15s",
                    opacity: activeStage === "all" || activeStage === stage.id ? 1 : 0.4,
                  }}
                    onClick={() => setActiveStage(activeStage === stage.id ? "all" : stage.id)}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: stage.color }}>{stage.name}</span>
                      <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: stage.color }}>{pct}%</span>
                    </div>
                    <div className="progress-bar" style={{ height: 4 }}>
                      <div className="progress-bar-fill" style={{ width: `${pct}%`, background: stage.color }} />
                    </div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 4 }}>{stage.description}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Stage filter tabs */}
      <div className="filter-bar">
        <button className={`filter-btn ${activeStage === "all" ? "active" : ""}`}
          onClick={() => setActiveStage("all")}>All Stages</button>
        {FUNNEL_STAGES.map((s) => (
          <button key={s.id} className={`filter-btn ${activeStage === s.id ? "active" : ""}`}
            onClick={() => setActiveStage(s.id)}
            style={activeStage === s.id ? { background: s.color, borderColor: s.color } : {}}>
            {s.emoji} {s.name}
          </button>
        ))}
      </div>

      {/* Funnel rows */}
      {FUNNEL_STAGES.filter((s) => activeStage === "all" || s.id === activeStage).map((stage) => {
        const rows = funnel.items.filter((r) => r.stage === stage.id);
        if (rows.length === 0 && activeStage !== "all") return null;
        return (
          <div key={stage.id} style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 16 }}>{stage.emoji}</span>
              <span style={{
                fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700,
                color: stage.color, letterSpacing: "0.06em",
              }}>{stage.name}</span>
              <span style={{ fontSize: 11, color: "var(--text-muted)" }}>— {stage.description}</span>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table className="tracker-table">
                <thead>
                  <tr>
                    <th style={{ width: "22%" }}>Message</th>
                    <th style={{ width: "20%" }}>Creative</th>
                    <th style={{ width: "15%" }}>Channels</th>
                    <th style={{ width: "15%" }}>KPIs</th>
                    <th style={{ width: "10%" }}>Owner</th>
                    <th style={{ width: "10%" }}>Status</th>
                    {isEditMode && <th style={{ width: "4%" }}></th>}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <EditableText value={row.message}
                          onChange={(v) => funnel.update(row.id, { message: v })}
                          placeholder="What are we saying?" />
                      </td>
                      <td>
                        <EditableText value={row.creative}
                          onChange={(v) => funnel.update(row.id, { creative: v })}
                          placeholder="Assets tied to this message" />
                      </td>
                      <td>
                        {isEditMode ? (
                          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                            {CHANNEL_OPTIONS.map((ch) => {
                              const active = (row.channels || []).includes(ch);
                              return (
                                <button key={ch} onClick={() => {
                                  const next = active
                                    ? row.channels.filter((c) => c !== ch)
                                    : [...(row.channels || []), ch];
                                  funnel.update(row.id, { channels: next });
                                }}
                                  className="channel-tag"
                                  style={{
                                    cursor: "pointer", border: "1px solid var(--border)",
                                    opacity: active ? 1 : 0.3,
                                    background: active ? `${getChanColor(ch)}18` : "transparent",
                                    color: getChanColor(ch),
                                  }}>
                                  {ch}
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <ChannelTags channels={row.channels} />
                        )}
                      </td>
                      <td>
                        <EditableText value={row.kpis}
                          onChange={(v) => funnel.update(row.id, { kpis: v })}
                          placeholder="CTR, CVR, CPA..." />
                      </td>
                      <td>
                        <EditableText value={row.owner}
                          onChange={(v) => funnel.update(row.id, { owner: v })}
                          placeholder="Owner" />
                      </td>
                      <td>
                        {isEditMode
                          ? <StatusSelect value={row.status} onChange={(v) => funnel.update(row.id, { status: v })} compact />
                          : <StatusBadge status={row.status} />}
                      </td>
                      {isEditMode && (
                        <td>
                          <button onClick={() => funnel.remove(row.id)}
                            style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 14 }}
                            title="Remove">×</button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <AddButton label={`Add ${stage.name} Row`} onClick={() => funnel.add({
              stage: stage.id, message: "", creative: "", channels: [],
              kpis: "", owner: "", status: "not_started",
            })} />
          </div>
        );
      })}
    </div>
  );
}

function getChanColor(ch) {
  const c = { meta: "#4c9aff", tiktok: "#ff0050", youtube: "#ff4444", email: "#f0b429", twitter: "#1da1f2", linkedin: "#0077b5" };
  return c[ch] || "#999";
}
