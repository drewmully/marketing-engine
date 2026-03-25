import { useCampaign } from "../context/CampaignContext";
import { useAuth } from "../context/AuthContext";
import StatusSelect, { StatusBadge, AddButton } from "../components/StatusSelect";
import { EditableText } from "../components/EditableField";

const CATEGORIES = [
  { id: "retention", name: "Retention Flows", emoji: "🔁", color: "#3ecf7a" },
  { id: "referral", name: "Referral Loops", emoji: "🔗", color: "#4c9aff" },
  { id: "ugc", name: "UGC Campaigns", emoji: "📸", color: "#ff0050" },
  { id: "testimonials", name: "Testimonials", emoji: "⭐", color: "#f0b429" },
];

export default function PostLaunch() {
  const { postLaunch } = useCampaign();
  const { isEditMode } = useAuth();

  return (
    <div>
      <div className="page-header">
        <h2>Post-Launch Engine</h2>
        <p>This is where you win long-term — retention, referrals, UGC, and social proof</p>
      </div>

      {CATEGORIES.map((cat) => {
        const items = postLaunch.items.filter((i) => i.category === cat.id);
        const done = items.filter((i) => i.status === "done" || i.status === "live").length;

        return (
          <div key={cat.id} style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 16 }}>{cat.emoji}</span>
              <span style={{
                fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700,
                color: cat.color, letterSpacing: "0.06em",
              }}>{cat.name}</span>
              <span style={{ fontSize: 11, color: "var(--text-muted)" }}>— {done}/{items.length}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {items.map((item) => (
                <div key={item.id} className="card" style={{
                  padding: "12px 16px",
                  display: "flex", alignItems: "center", gap: 12,
                  borderLeft: `3px solid ${cat.color}`,
                }}>
                  <div style={{ flex: 1 }}>
                    <EditableText value={item.title}
                      onChange={(v) => postLaunch.update(item.id, { title: v })}
                      placeholder="What needs to happen?" />
                    {(isEditMode || item.notes) && (
                      <div style={{ marginTop: 4 }}>
                        <EditableText value={item.notes}
                          onChange={(v) => postLaunch.update(item.id, { notes: v })}
                          placeholder="Notes..."
                          className="text-muted" />
                      </div>
                    )}
                  </div>
                  {isEditMode
                    ? <StatusSelect value={item.status} onChange={(v) => postLaunch.update(item.id, { status: v })} compact />
                    : <StatusBadge status={item.status} />}
                  {isEditMode && (
                    <button onClick={() => postLaunch.remove(item.id)}
                      style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>×</button>
                  )}
                </div>
              ))}
            </div>
            <AddButton label={`Add ${cat.name} Item`} onClick={() => postLaunch.add({
              category: cat.id, title: "", status: "not_started", notes: "",
            })} />
          </div>
        );
      })}
    </div>
  );
}
