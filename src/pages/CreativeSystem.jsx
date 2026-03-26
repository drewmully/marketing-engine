import { useState } from "react";
import { useCampaign } from "../context/CampaignContext";
import { useAuth } from "../context/AuthContext";
import { CREATIVE_ANGLES, CHANNEL_NAMES } from "../data/campaignData";
import StatusSelect, { StatusBadge, AddButton } from "../components/StatusSelect";
import { EditableText, EditableTextarea } from "../components/EditableField";

const FORMATS = [
  { value: "video", label: "Video", color: "#ff4444" },
  { value: "image", label: "Image", color: "#4c9aff" },
  { value: "email", label: "Email", color: "#f0b429" },
  { value: "carousel", label: "Carousel", color: "#a855f7" },
  { value: "story", label: "Story", color: "#ff0050" },
];

const PLATFORM_OPTIONS = [
  { value: "meta", label: "Meta" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "email", label: "Email" },
  { value: "twitter", label: "X" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "landing", label: "Landing Page" },
];

const INSPO_TYPES = [
  { value: "video", label: "Video", color: "#ff4444" },
  { value: "image", label: "Image", color: "#4c9aff" },
  { value: "article", label: "Article", color: "#16a34a" },
  { value: "ad", label: "Ad", color: "#a855f7" },
  { value: "other", label: "Other", color: "#8f96a8" },
];

export default function CreativeSystem() {
  const { creatives, campaigns, moments, inspiration, campaign } = useCampaign();
  const { isEditMode } = useAuth();
  const [filterAngle, setFilterAngle] = useState("all");
  const [filterFormat, setFilterFormat] = useState("all");
  const [view, setView] = useState("production"); // production | swipe

  // Build lookups
  const momentNames = {};
  moments.items.forEach((m) => { momentNames[m.id] = m.name; });
  const campaignNames = {};
  campaigns.items.forEach((c) => { campaignNames[c.id] = c.name; });

  const filtered = creatives.items.filter((c) => {
    if (filterAngle !== "all" && c.angle !== filterAngle) return false;
    if (filterFormat !== "all" && c.format !== filterFormat) return false;
    return true;
  });

  const angleCount = {};
  creatives.items.forEach((c) => { angleCount[c.angle] = (angleCount[c.angle] || 0) + 1; });
  const formatCount = {};
  creatives.items.forEach((c) => { formatCount[c.format] = (formatCount[c.format] || 0) + 1; });
  const done = creatives.items.filter((c) => c.status === "done" || c.status === "live").length;
  const inProgress = creatives.items.filter((c) => c.status === "in_progress").length;

  return (
    <div>
      {/* Hero */}
      <div className="page-hero">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ flex: 1 }}>
            <div className="hero-title">Content Studio</div>
            <div className="hero-subtitle" style={{ marginBottom: 12 }}>
              Produce, track, and organize every piece of content for the campaign
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--accent)", marginBottom: 12 }}>
              "{campaign.coreIdea}"
            </div>
            {/* Angle pills */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {CREATIVE_ANGLES.map((a) => (
                <span key={a} className="hashtag" style={{
                  fontSize: 11, padding: "3px 10px", cursor: "pointer",
                  background: filterAngle === a ? "var(--accent)" : "var(--accent-soft)",
                  color: filterAngle === a ? "white" : "var(--accent)",
                }}
                  onClick={() => setFilterAngle(filterAngle === a ? "all" : a)}>
                  {a} ({angleCount[a] || 0})
                </span>
              ))}
            </div>
          </div>
          {/* Stats */}
          <div style={{ display: "flex", gap: 12, flexShrink: 0, marginLeft: 24 }}>
            <div style={{ textAlign: "center", padding: "10px 12px", borderRadius: "var(--radius-sm)", background: "var(--yellow)08", border: "1px solid var(--yellow)20" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--yellow)" }}>{inProgress}</div>
              <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase" }}>In Progress</div>
            </div>
            <div style={{ textAlign: "center", padding: "10px 12px", borderRadius: "var(--radius-sm)", background: "var(--green)08", border: "1px solid var(--green)20" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--green)" }}>{done}</div>
              <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase" }}>Done</div>
            </div>
            <div style={{ textAlign: "center", padding: "10px 12px", borderRadius: "var(--radius-sm)", background: "var(--blue)08", border: "1px solid var(--blue)20" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--blue)" }}>{creatives.items.length}</div>
              <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase" }}>Total</div>
            </div>
            {view === "swipe" && (
              <div style={{ textAlign: "center", padding: "10px 12px", borderRadius: "var(--radius-sm)", background: "var(--purple)08", border: "1px solid var(--purple)20" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--purple)" }}>{inspiration.items.length}</div>
                <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase" }}>Saved</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View toggle + filters */}
      <div className="filter-bar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 4 }}>
          <button className={`filter-btn ${view === "production" ? "active" : ""}`}
            onClick={() => setView("production")}>Production Board</button>
          <button className={`filter-btn ${view === "swipe" ? "active" : ""}`}
            onClick={() => setView("swipe")}>Swipe File</button>
        </div>
        {view === "production" && (
          <div style={{ display: "flex", gap: 4 }}>
            <button className={`filter-btn ${filterFormat === "all" ? "active" : ""}`}
              onClick={() => setFilterFormat("all")}>All</button>
            {FORMATS.map((f) => (
              <button key={f.value} className={`filter-btn ${filterFormat === f.value ? "active" : ""}`}
                onClick={() => setFilterFormat(f.value)}
                style={filterFormat === f.value ? { background: f.color, borderColor: f.color } : {}}>
                {f.label} ({formatCount[f.value] || 0})
              </button>
            ))}
          </div>
        )}
      </div>

      {view === "production" ? (
        <>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>
            {filtered.length} of {creatives.items.length} assets
          </div>

          {/* Production cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map((c) => {
              const fmt = FORMATS.find((f) => f.value === c.format);
              return (
                <div key={c.id} className="card" style={{
                  padding: "14px 18px",
                  borderLeft: `3px solid ${fmt?.color || "#999"}`,
                }}>
                  {/* Top row: hook + status */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <EditableText value={c.hook}
                          onChange={(v) => creatives.update(c.id, { hook: v })}
                          placeholder="Hook / headline"
                          style={{ fontSize: 14, fontWeight: 600 }} />
                      </div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                        {isEditMode ? (
                          <select className="status-select" value={c.angle}
                            onChange={(e) => creatives.update(c.id, { angle: e.target.value })}
                            style={{ fontSize: 10, padding: "2px 20px 2px 6px" }}>
                            <option value="">— angle —</option>
                            {CREATIVE_ANGLES.map((a) => <option key={a} value={a}>{a}</option>)}
                          </select>
                        ) : (
                          <span style={{ fontSize: 10, color: "var(--accent)" }}>{c.angle}</span>
                        )}
                        {isEditMode ? (
                          <select className="status-select" value={c.format}
                            onChange={(e) => creatives.update(c.id, { format: e.target.value })}
                            style={{ fontSize: 10, padding: "2px 20px 2px 6px" }}>
                            {FORMATS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
                          </select>
                        ) : (
                          <span className="channel-tag" style={{
                            background: `${fmt?.color || "#999"}18`, color: fmt?.color || "#999",
                          }}>{fmt?.label || c.format}</span>
                        )}
                        {isEditMode ? (
                          <select className="status-select" value={c.platform || ""}
                            onChange={(e) => creatives.update(c.id, { platform: e.target.value })}
                            style={{ fontSize: 10, padding: "2px 20px 2px 6px" }}>
                            <option value="">— platform —</option>
                            {PLATFORM_OPTIONS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                          </select>
                        ) : c.platform && (
                          <span style={{ fontSize: 10, color: "var(--text-muted)" }}>
                            {CHANNEL_NAMES[c.platform] || c.platform}
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
                      {isEditMode
                        ? <StatusSelect value={c.status} onChange={(v) => creatives.update(c.id, { status: v })} compact />
                        : <StatusBadge status={c.status} />}
                      {isEditMode && (
                        <button onClick={() => creatives.remove(c.id)}
                          style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}>×</button>
                      )}
                    </div>
                  </div>

                  {/* Production fields */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
                    <div>
                      <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Owner</div>
                      <EditableText value={c.owner || ""}
                        onChange={(v) => creatives.update(c.id, { owner: v })}
                        placeholder="Who's producing?" />
                    </div>
                    <div>
                      <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Deadline</div>
                      {isEditMode ? (
                        <input type="date" value={c.deadline || ""}
                          onChange={(e) => creatives.update(c.id, { deadline: e.target.value })}
                          style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--text-primary)", fontSize: 11, padding: "3px 6px", borderRadius: "var(--radius-sm)", width: "100%" }} />
                      ) : (
                        <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                          {c.deadline ? new Date(c.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"}
                        </span>
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Linked Moment</div>
                      {isEditMode ? (
                        <select className="status-select" value={c.linkedMoment || ""}
                          onChange={(e) => creatives.update(c.id, { linkedMoment: e.target.value })}
                          style={{ fontSize: 10, width: "100%" }}>
                          <option value="">— none —</option>
                          {moments.items.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
                        </select>
                      ) : (
                        <span style={{ fontSize: 11, color: c.linkedMoment ? "var(--accent)" : "var(--text-muted)" }}>
                          {c.linkedMoment ? (momentNames[c.linkedMoment] || "—") : "—"}
                        </span>
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Linked Campaign</div>
                      {isEditMode ? (
                        <select className="status-select" value={c.linkedCampaign || ""}
                          onChange={(e) => creatives.update(c.id, { linkedCampaign: e.target.value })}
                          style={{ fontSize: 10, width: "100%" }}>
                          <option value="">— none —</option>
                          {campaigns.items.map((camp) => <option key={camp.id} value={camp.id}>{camp.name}</option>)}
                        </select>
                      ) : (
                        <span style={{ fontSize: 11, color: c.linkedCampaign ? "var(--accent)" : "var(--text-muted)" }}>
                          {c.linkedCampaign ? (campaignNames[c.linkedCampaign] || "—") : "—"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Caption + file URL + notes */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 8 }}>
                    <div>
                      <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Caption / Copy</div>
                      <EditableText value={c.caption || ""}
                        onChange={(v) => creatives.update(c.id, { caption: v })}
                        placeholder="Post caption or copy..." />
                    </div>
                    <div>
                      <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>File / URL</div>
                      {isEditMode ? (
                        <EditableText value={c.fileUrl || ""}
                          onChange={(v) => creatives.update(c.id, { fileUrl: v })}
                          placeholder="Drive link, Canva, etc." />
                      ) : c.fileUrl ? (
                        <a href={c.fileUrl} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: 11, color: "var(--accent)", textDecoration: "none" }}>
                          View File →
                        </a>
                      ) : (
                        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>—</span>
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Performance</div>
                      <EditableText value={c.performance || ""}
                        onChange={(v) => creatives.update(c.id, { performance: v })}
                        placeholder="Results..." />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <AddButton label="Add Creative" onClick={() => creatives.add({
            angle: CREATIVE_ANGLES[0], format: "video", hook: "", status: "not_started",
            performance: "", owner: "", deadline: "", platform: "", caption: "",
            fileUrl: "", linkedMoment: "", linkedCampaign: "", notes: "",
          })} />
        </>
      ) : (
        /* ─── Swipe File View ─── */
        <>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>
            Save inspiration, reference content, and competitor examples
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {inspiration.items.map((item) => {
              const typeInfo = INSPO_TYPES.find((t) => t.value === item.type) || INSPO_TYPES[4];
              return (
                <div key={item.id} className="card" style={{
                  padding: "14px 18px",
                  borderLeft: `3px solid ${typeInfo.color}`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <EditableText value={item.title}
                          onChange={(v) => inspiration.update(item.id, { title: v })}
                          placeholder="Title / name"
                          style={{ fontSize: 14, fontWeight: 600 }} />
                        {isEditMode ? (
                          <select className="status-select" value={item.type}
                            onChange={(e) => inspiration.update(item.id, { type: e.target.value })}
                            style={{ fontSize: 10, padding: "2px 20px 2px 6px" }}>
                            {INSPO_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                          </select>
                        ) : (
                          <span className="channel-tag" style={{
                            background: `${typeInfo.color}18`, color: typeInfo.color,
                          }}>{typeInfo.label}</span>
                        )}
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        <div>
                          <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>URL</div>
                          {isEditMode ? (
                            <EditableText value={item.url || ""}
                              onChange={(v) => inspiration.update(item.id, { url: v })}
                              placeholder="https://..." />
                          ) : item.url ? (
                            <a href={item.url} target="_blank" rel="noopener noreferrer"
                              style={{ fontSize: 11, color: "var(--accent)", textDecoration: "none" }}>
                              Open Link →
                            </a>
                          ) : (
                            <span style={{ fontSize: 11, color: "var(--text-muted)" }}>—</span>
                          )}
                        </div>
                        <div>
                          <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Notes</div>
                          <EditableText value={item.notes || ""}
                            onChange={(v) => inspiration.update(item.id, { notes: v })}
                            placeholder="Why is this inspiring?" />
                        </div>
                      </div>

                      {/* Tags */}
                      <div style={{ marginTop: 6 }}>
                        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", alignItems: "center" }}>
                          {(item.tags || []).map((tag, i) => (
                            <span key={i} className="hashtag" style={{ fontSize: 10, padding: "2px 8px" }}>
                              {tag}
                              {isEditMode && (
                                <button onClick={() => {
                                  inspiration.update(item.id, { tags: item.tags.filter((_, j) => j !== i) });
                                }} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", marginLeft: 4, fontSize: 10, padding: 0 }}>×</button>
                              )}
                            </span>
                          ))}
                          {isEditMode && (
                            <button onClick={() => {
                              const tag = prompt("Add tag:");
                              if (tag) inspiration.update(item.id, { tags: [...(item.tags || []), tag.toLowerCase()] });
                            }}
                              style={{ background: "none", border: "1px dashed var(--border)", color: "var(--text-muted)", cursor: "pointer", borderRadius: "var(--radius-sm)", fontSize: 10, padding: "2px 8px" }}>
                              + tag
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {isEditMode && (
                      <button onClick={() => inspiration.remove(item.id)}
                        style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 14, marginLeft: 8 }}>×</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <AddButton label="Add Inspiration" onClick={() => inspiration.add({
            title: "", url: "", type: "video", tags: [], notes: "",
          })} />
        </>
      )}
    </div>
  );
}
