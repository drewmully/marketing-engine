import { useCampaign } from "../context/CampaignContext";
import { useAuth } from "../context/AuthContext";
import { CHANNEL_COLORS } from "../data/campaignData";
import { EditableText, EditableTextarea } from "../components/EditableField";

export default function Distribution() {
  const { channels } = useCampaign();
  const { isEditMode } = useAuth();

  return (
    <div>
      {/* Hero: channel overview */}
      <div className="page-hero">
        <div className="hero-title">Distribution Engineering</div>
        <div className="hero-subtitle" style={{ marginBottom: 16 }}>Every channel has a strategy, audience, and playbook — no random posting</div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(channels.items.length, 4)}, 1fr)`, gap: 8 }}>
          {channels.items.map((ch) => (
            <div key={ch.id} className="channel-mini" style={{
              borderLeft: `3px solid ${CHANNEL_COLORS[ch.id] || "var(--border)"}`,
            }}>
              <span className="ch-emoji">{ch.emoji}</span>
              <div>
                <div className="ch-name" style={{ color: CHANNEL_COLORS[ch.id] || "var(--text-primary)" }}>{ch.name}</div>
                <div className="ch-kpi">{ch.targetAudience?.split(",")[0] || "—"}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 16 }}>
        {channels.items.map((ch) => (
          <div key={ch.id} className="channel-detail-card">
            <div className="channel-detail-header" style={{
              background: `${CHANNEL_COLORS[ch.id] || "#999"}0a`,
              borderBottom: `2px solid ${CHANNEL_COLORS[ch.id] || "var(--border)"}`,
            }}>
              <span style={{ fontSize: 22 }}>{ch.emoji}</span>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: CHANNEL_COLORS[ch.id] || "var(--text-primary)" }}>
                  {ch.name}
                </div>
              </div>
            </div>
            <div style={{ padding: "var(--space-lg)" }}>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <div className="card-label" style={{ marginBottom: 4 }}>Strategy</div>
                <EditableTextarea value={ch.strategy}
                  onChange={(v) => channels.update(ch.id, { strategy: v })}
                  placeholder="Channel strategy..." />
              </div>
              <div>
                <div className="card-label" style={{ marginBottom: 4 }}>Target Audience</div>
                <EditableText value={ch.targetAudience}
                  onChange={(v) => channels.update(ch.id, { targetAudience: v })}
                  placeholder="Who are we reaching?" />
              </div>
              <div>
                <div className="card-label" style={{ marginBottom: 4 }}>Content Types That Win</div>
                <EditableText value={ch.contentTypes}
                  onChange={(v) => channels.update(ch.id, { contentTypes: v })}
                  placeholder="Formats that perform..." />
              </div>
              <div className="grid-2">
                <div>
                  <div className="card-label" style={{ marginBottom: 4 }}>Budget</div>
                  <EditableText value={ch.budget}
                    onChange={(v) => channels.update(ch.id, { budget: v })}
                    placeholder="$0" />
                </div>
                <div>
                  <div className="card-label" style={{ marginBottom: 4 }}>Performance</div>
                  <EditableText value={ch.performance}
                    onChange={(v) => channels.update(ch.id, { performance: v })}
                    placeholder="Current results..." />
                </div>
              </div>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
