import { useCampaign } from "../context/CampaignContext";
import { useAuth } from "../context/AuthContext";
import { EditableText, EditableTextarea } from "../components/EditableField";

export default function Distribution() {
  const { channels } = useCampaign();
  const { isEditMode } = useAuth();

  return (
    <div>
      <div className="page-header">
        <h2>Distribution Engineering</h2>
        <p>Prevent random posting — every channel has a strategy, audience, and playbook</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: 16 }}>
        {channels.items.map((ch) => (
          <div key={ch.id} className="card">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 22 }}>{ch.emoji}</span>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>
                  {ch.name}
                </div>
              </div>
            </div>

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
        ))}
      </div>
    </div>
  );
}
