import { useState } from "react";
import { useCampaign } from "../context/CampaignContext";
import { useAuth } from "../context/AuthContext";
import { FUNNEL_STAGES } from "../data/campaignData";
import { AddButton } from "../components/StatusSelect";
import { EditableText, EditableTextarea } from "../components/EditableField";

export default function FunnelSystem() {
  const { funnel } = useCampaign();
  const { isEditMode } = useAuth();
  const [activeStage, setActiveStage] = useState("all");

  // Count per stage
  const stageCounts = {};
  FUNNEL_STAGES.forEach((s) => {
    stageCounts[s.id] = funnel.items.filter((r) => r.stage === s.id).length;
  });

  return (
    <div>
      {/* Hero */}
      <div className="page-hero">
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
          {/* Funnel graphic */}
          <div style={{ flex: "0 0 340px" }}>
            <div className="hero-title">Messaging Playbook</div>
            <div className="hero-subtitle" style={{ marginBottom: 16 }}>
              What we say at each stage — the messaging framework that drives all content
            </div>
            <div className="funnel-visual">
              {FUNNEL_STAGES.map((stage, i) => {
                const widthPct = 100 - (i * 18);
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
                      <span className="funnel-stage-kpi">{stageCounts[stage.id]} messages</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stage descriptions */}
          <div style={{ flex: 1 }}>
            <div className="card-label">Stage Messaging Focus</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {FUNNEL_STAGES.map((stage) => (
                <div key={stage.id} style={{
                  padding: 12, borderRadius: "var(--radius-sm)",
                  border: `1px solid ${stage.color}30`, background: `${stage.color}08`,
                  cursor: "pointer", transition: "all 0.15s",
                  opacity: activeStage === "all" || activeStage === stage.id ? 1 : 0.4,
                }}
                  onClick={() => setActiveStage(activeStage === stage.id ? "all" : stage.id)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: stage.color }}>{stage.name}</span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: stage.color }}>
                      {stageCounts[stage.id]}
                    </span>
                  </div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 4 }}>{stage.description}</div>
                </div>
              ))}
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

      {/* Messaging cards per stage */}
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

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {rows.map((row) => (
                <div key={row.id} className="card" style={{
                  borderLeft: `3px solid ${stage.color}`,
                  padding: "14px 18px",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      {/* Message */}
                      <div style={{ marginBottom: 10 }}>
                        <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>
                          Message
                        </div>
                        <EditableTextarea value={row.message}
                          onChange={(v) => funnel.update(row.id, { message: v })}
                          placeholder="What are we saying at this stage?" rows={2} />
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        {/* Content Direction */}
                        <div>
                          <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>
                            Content Direction
                          </div>
                          <EditableText value={row.contentDirection || row.creative || ""}
                            onChange={(v) => funnel.update(row.id, { contentDirection: v })}
                            placeholder="What type of content supports this message?" />
                        </div>

                        {/* Key Lines */}
                        <div>
                          <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>
                            Key Lines
                          </div>
                          <EditableText value={row.keyLines || ""}
                            onChange={(v) => funnel.update(row.id, { keyLines: v })}
                            placeholder="Headline / hook ideas (pipe-separated)" />
                        </div>
                      </div>
                    </div>

                    {isEditMode && (
                      <div style={{ marginLeft: 10, display: "flex", flexDirection: "column", gap: 4 }}>
                        <select className="status-select" value={row.stage}
                          onChange={(e) => funnel.update(row.id, { stage: e.target.value })}
                          style={{ fontSize: 10, padding: "2px 20px 2px 6px" }}>
                          {FUNNEL_STAGES.map((s) => <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>)}
                        </select>
                        <button onClick={() => funnel.remove(row.id)}
                          style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 14 }}
                          title="Remove">×</button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <AddButton label={`Add ${stage.name} Message`} onClick={() => funnel.add({
              stage: stage.id, message: "", contentDirection: "", keyLines: "",
            })} />
          </div>
        );
      })}
    </div>
  );
}
