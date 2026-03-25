import { useCampaign } from "../context/CampaignContext";
import { useAuth } from "../context/AuthContext";
import { FUNNEL_STAGES } from "../data/campaignData";
import StatusSelect, { StatusBadge, AddButton } from "../components/StatusSelect";
import { EditableText, EditableTextarea } from "../components/EditableField";

export default function OffersSystem() {
  const { offers } = useCampaign();
  const { isEditMode } = useAuth();

  const byStage = {};
  FUNNEL_STAGES.forEach((s) => { byStage[s.id] = []; });
  offers.items.forEach((o) => {
    if (byStage[o.funnelStage]) byStage[o.funnelStage].push(o);
    else byStage.awareness.push(o); // fallback
  });

  return (
    <div>
      <div className="page-header">
        <h2>Offers System</h2>
        <p>Treat offers like products — each one has a value stack, audience, and funnel position</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 16 }}>
        {offers.items.map((offer) => {
          const stage = FUNNEL_STAGES.find((s) => s.id === offer.funnelStage);
          return (
            <div key={offer.id} className="card" style={{
              borderTop: `3px solid ${stage?.color || "var(--border)"}`,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                  {isEditMode ? (
                    <input className="inf-input" value={offer.name}
                      onChange={(e) => offers.update(offer.id, { name: e.target.value })}
                      placeholder="Offer name"
                      style={{ fontSize: 15, fontWeight: 600, padding: 0, background: "transparent" }} />
                  ) : (
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{offer.name}</div>
                  )}
                  {isEditMode ? (
                    <select className="status-select" value={offer.funnelStage}
                      onChange={(e) => offers.update(offer.id, { funnelStage: e.target.value })}
                      style={{ marginTop: 4 }}>
                      {FUNNEL_STAGES.map((s) => <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>)}
                    </select>
                  ) : (
                    <div style={{ fontSize: 11, color: stage?.color, marginTop: 2 }}>
                      {stage?.emoji} {stage?.name}
                    </div>
                  )}
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {isEditMode
                    ? <StatusSelect value={offer.status} onChange={(v) => offers.update(offer.id, { status: v })} compact />
                    : <StatusBadge status={offer.status} />}
                  {isEditMode && (
                    <button onClick={() => offers.remove(offer.id)}
                      style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>×</button>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div>
                  <div className="card-label" style={{ marginBottom: 3 }}>Description</div>
                  <EditableTextarea value={offer.description}
                    onChange={(v) => offers.update(offer.id, { description: v })}
                    placeholder="What's the offer?" rows={2} />
                </div>
                <div>
                  <div className="card-label" style={{ marginBottom: 3 }}>Value Stack</div>
                  <EditableText value={offer.valueStack}
                    onChange={(v) => offers.update(offer.id, { valueStack: v })}
                    placeholder="What value does the customer get?" />
                </div>
                <div>
                  <div className="card-label" style={{ marginBottom: 3 }}>Target Audience</div>
                  <EditableText value={offer.targetAudience}
                    onChange={(v) => offers.update(offer.id, { targetAudience: v })}
                    placeholder="Who is this for?" />
                </div>
                <div>
                  <div className="card-label" style={{ marginBottom: 3 }}>Performance</div>
                  <EditableText value={offer.performance}
                    onChange={(v) => offers.update(offer.id, { performance: v })}
                    placeholder="Results..." />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AddButton label="Add Offer" onClick={() => offers.add({
        name: "", description: "", valueStack: "", targetAudience: "",
        funnelStage: "conversion", performance: "", status: "not_started",
      })} />
    </div>
  );
}
