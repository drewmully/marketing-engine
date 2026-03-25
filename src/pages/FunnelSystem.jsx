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

  return (
    <div>
      <div className="page-header">
        <h2>Funnel System</h2>
        <p>Each row = one experiment or push inside the funnel</p>
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
