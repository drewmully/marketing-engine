import { useState } from "react";
import { useCampaign } from "../context/CampaignContext";
import { useAuth } from "../context/AuthContext";
import { CREATIVE_ANGLES } from "../data/campaignData";
import StatusSelect, { StatusBadge, AddButton } from "../components/StatusSelect";
import { EditableText } from "../components/EditableField";

const FORMATS = [
  { value: "video", label: "Video", color: "#ff4444" },
  { value: "image", label: "Image", color: "#4c9aff" },
  { value: "email", label: "Email", color: "#f0b429" },
  { value: "carousel", label: "Carousel", color: "#a855f7" },
  { value: "story", label: "Story", color: "#ff0050" },
];

export default function CreativeSystem() {
  const { creatives, campaign } = useCampaign();
  const { isEditMode } = useAuth();
  const [filterAngle, setFilterAngle] = useState("all");
  const [filterFormat, setFilterFormat] = useState("all");

  const angles = [...new Set(creatives.items.map((c) => c.angle).filter(Boolean))];
  const filtered = creatives.items.filter((c) => {
    if (filterAngle !== "all" && c.angle !== filterAngle) return false;
    if (filterFormat !== "all" && c.format !== filterFormat) return false;
    return true;
  });

  const angleCount = {};
  creatives.items.forEach((c) => { angleCount[c.angle] = (angleCount[c.angle] || 0) + 1; });

  return (
    <div>
      <div className="page-header">
        <h2>Creative System</h2>
        <p>1 idea → 20+ executions — scale your content factory</p>
      </div>

      {/* Core idea + angles */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-label">Core Idea</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--accent)" }}>
            {campaign.coreIdea}
          </div>
        </div>
        <div className="card">
          <div className="card-label">Angles / Variations</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {CREATIVE_ANGLES.map((a) => (
              <span key={a} className="hashtag" style={{
                fontSize: 12, padding: "4px 10px",
                cursor: "pointer",
                background: filterAngle === a ? "var(--accent)" : "var(--accent-soft)",
                color: filterAngle === a ? "white" : "var(--accent)",
              }}
                onClick={() => setFilterAngle(filterAngle === a ? "all" : a)}>
                {a}
                <span style={{ marginLeft: 4, opacity: 0.6 }}>({angleCount[a] || 0})</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Format filter */}
      <div className="filter-bar">
        <button className={`filter-btn ${filterFormat === "all" ? "active" : ""}`}
          onClick={() => setFilterFormat("all")}>All Formats</button>
        {FORMATS.map((f) => (
          <button key={f.value} className={`filter-btn ${filterFormat === f.value ? "active" : ""}`}
            onClick={() => setFilterFormat(f.value)}
            style={filterFormat === f.value ? { background: f.color, borderColor: f.color } : {}}>
            {f.label}
          </button>
        ))}
      </div>

      <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>
        {filtered.length} of {creatives.items.length} assets
      </div>

      {/* Asset table */}
      <table className="tracker-table">
        <thead>
          <tr>
            <th style={{ width: "18%" }}>Angle</th>
            <th style={{ width: "10%" }}>Format</th>
            <th style={{ width: "30%" }}>Hook</th>
            <th style={{ width: "10%" }}>Status</th>
            <th style={{ width: "20%" }}>Performance</th>
            {isEditMode && <th style={{ width: "4%" }}></th>}
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => {
            const fmt = FORMATS.find((f) => f.value === c.format);
            return (
              <tr key={c.id}>
                <td>
                  {isEditMode ? (
                    <select className="status-select" value={c.angle}
                      onChange={(e) => creatives.update(c.id, { angle: e.target.value })}>
                      <option value="">— select —</option>
                      {CREATIVE_ANGLES.map((a) => <option key={a} value={a}>{a}</option>)}
                    </select>
                  ) : (
                    <span style={{ fontSize: 12, color: "var(--accent)" }}>{c.angle}</span>
                  )}
                </td>
                <td>
                  {isEditMode ? (
                    <select className="status-select" value={c.format}
                      onChange={(e) => creatives.update(c.id, { format: e.target.value })}>
                      {FORMATS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                    </select>
                  ) : (
                    <span className="channel-tag" style={{
                      background: `${fmt?.color || "#999"}18`, color: fmt?.color || "#999",
                    }}>{fmt?.label || c.format}</span>
                  )}
                </td>
                <td>
                  <EditableText value={c.hook}
                    onChange={(v) => creatives.update(c.id, { hook: v })}
                    placeholder="Hook / headline" />
                </td>
                <td>
                  {isEditMode
                    ? <StatusSelect value={c.status} onChange={(v) => creatives.update(c.id, { status: v })} compact />
                    : <StatusBadge status={c.status} />}
                </td>
                <td>
                  <EditableText value={c.performance}
                    onChange={(v) => creatives.update(c.id, { performance: v })}
                    placeholder="Results..." />
                </td>
                {isEditMode && (
                  <td>
                    <button onClick={() => creatives.remove(c.id)}
                      style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>×</button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      <AddButton label="Add Creative" onClick={() => creatives.add({
        angle: CREATIVE_ANGLES[0], format: "video", hook: "", status: "not_started", performance: "",
      })} />
    </div>
  );
}
