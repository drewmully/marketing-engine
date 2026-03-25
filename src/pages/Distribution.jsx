import { useState } from "react";
import { useCampaign } from "../context/CampaignContext";
import { useAuth } from "../context/AuthContext";
import { CHANNEL_COLORS, FUNNEL_STAGES } from "../data/campaignData";
import StatusSelect, { StatusBadge, ChannelTags, AddButton } from "../components/StatusSelect";
import { EditableText, EditableTextarea } from "../components/EditableField";

export default function Distribution() {
  const { channels, campaigns, offers } = useCampaign();
  const { isEditMode } = useAuth();
  const [expandedChannel, setExpandedChannel] = useState(null);

  // Build offer name lookup
  const offerNames = {};
  offers.items.forEach((o) => { offerNames[o.id] = o.name; });

  // Stats for hero
  const liveCampaigns = campaigns.items.filter((c) => c.status === "live" || c.status === "iterating").length;
  const totalBudget = campaigns.items.reduce((sum, c) => {
    const match = (c.budget || "").match(/\$?([\d,.]+)/);
    return sum + (match ? parseFloat(match[1].replace(",", "")) : 0);
  }, 0);

  return (
    <div>
      {/* Hero */}
      <div className="page-hero">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div className="hero-title">Distribution Engineering</div>
            <div className="hero-subtitle">Every channel has a strategy AND active campaigns running</div>
          </div>
          <div style={{ display: "flex", gap: 16, textAlign: "center" }}>
            <div className="kpi-item" style={{ "--kpi-color": "var(--green)", padding: "8px 14px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "var(--green)" }}>{liveCampaigns}</div>
              <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase" }}>Live</div>
            </div>
            <div className="kpi-item" style={{ "--kpi-color": "var(--blue)", padding: "8px 14px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "var(--blue)" }}>{campaigns.items.length}</div>
              <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase" }}>Total</div>
            </div>
            <div className="kpi-item" style={{ "--kpi-color": "var(--purple)", padding: "8px 14px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "var(--purple)" }}>{channels.items.length}</div>
              <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase" }}>Channels</div>
            </div>
          </div>
        </div>
        {/* Channel quick-nav */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(channels.items.length, 5)}, 1fr)`, gap: 8, marginTop: 16 }}>
          {channels.items.map((ch) => {
            const chCamps = campaigns.items.filter((c) => c.channel === ch.id);
            const chLive = chCamps.filter((c) => c.status === "live" || c.status === "iterating").length;
            return (
              <div key={ch.id} className="channel-mini" style={{
                borderLeft: `3px solid ${CHANNEL_COLORS[ch.id] || "var(--border)"}`,
                cursor: "pointer",
                background: expandedChannel === ch.id ? `${CHANNEL_COLORS[ch.id] || "#999"}0a` : undefined,
              }} onClick={() => setExpandedChannel(expandedChannel === ch.id ? null : ch.id)}>
                <span className="ch-emoji">{ch.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div className="ch-name" style={{ color: CHANNEL_COLORS[ch.id] || "var(--text-primary)" }}>{ch.name}</div>
                  <div className="ch-kpi">{chCamps.length} campaigns · {chLive} live</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Channel sections */}
      {channels.items
        .filter((ch) => !expandedChannel || expandedChannel === ch.id)
        .map((ch) => {
          const chCamps = campaigns.items.filter((c) => c.channel === ch.id);
          const color = CHANNEL_COLORS[ch.id] || "#999";

          return (
            <div key={ch.id} style={{ marginBottom: 28 }}>
              {/* Channel header */}
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 16px", marginBottom: 12,
                background: `${color}06`, borderRadius: "var(--radius-sm)",
                borderLeft: `4px solid ${color}`,
              }}>
                <span style={{ fontSize: 20 }}>{ch.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color }}>
                    {ch.name}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                    {isEditMode ? (
                      <EditableText value={ch.strategy}
                        onChange={(v) => channels.update(ch.id, { strategy: v })}
                        placeholder="Channel strategy..." />
                    ) : (
                      ch.strategy
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, textAlign: "center", flexShrink: 0 }}>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Audience</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-primary)", maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {isEditMode ? (
                        <EditableText value={ch.targetAudience}
                          onChange={(v) => channels.update(ch.id, { targetAudience: v })}
                          placeholder="Who?" />
                      ) : (
                        ch.targetAudience?.split(",")[0] || "—"
                      )}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Budget</div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--text-primary)" }}>
                      {isEditMode ? (
                        <EditableText value={ch.budget}
                          onChange={(v) => channels.update(ch.id, { budget: v })}
                          placeholder="$0" />
                      ) : (
                        ch.budget || "—"
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Campaigns */}
              <div style={{ paddingLeft: 20 }}>
                <div className="section-header" style={{ marginBottom: 8 }}>
                  <div className="section-dot" style={{ background: color }} />
                  <div className="section-title">Active Campaigns ({chCamps.length})</div>
                </div>

                {chCamps.length === 0 && (
                  <div style={{ padding: "12px 16px", fontSize: 12, color: "var(--text-muted)", fontStyle: "italic" }}>
                    No campaigns yet — add one to start executing
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {chCamps.map((camp) => {
                    const stage = FUNNEL_STAGES.find((s) => s.id === camp.funnelStage);
                    return (
                      <div key={camp.id} className="card" style={{
                        padding: "12px 16px",
                        borderLeft: `3px solid ${stage?.color || color}`,
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <EditableText value={camp.name}
                                onChange={(v) => campaigns.update(camp.id, { name: v })}
                                placeholder="Campaign name"
                                style={{ fontSize: 14, fontWeight: 600 }} />
                            </div>
                            <div style={{ display: "flex", gap: 8, marginTop: 4, flexWrap: "wrap" }}>
                              {isEditMode ? (
                                <select className="status-select" value={camp.funnelStage || "awareness"}
                                  onChange={(e) => campaigns.update(camp.id, { funnelStage: e.target.value })}
                                  style={{ fontSize: 10, padding: "2px 20px 2px 6px" }}>
                                  {FUNNEL_STAGES.map((s) => <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>)}
                                </select>
                              ) : (
                                <span className="channel-tag" style={{
                                  background: `${stage?.color || "#999"}18`, color: stage?.color,
                                  fontSize: 10,
                                }}>{stage?.emoji} {stage?.name}</span>
                              )}
                              {isEditMode ? (
                                <input className="inf-input" value={camp.objective || ""}
                                  onChange={(e) => campaigns.update(camp.id, { objective: e.target.value })}
                                  placeholder="Objective"
                                  style={{ fontSize: 10, width: 100, padding: "2px 6px" }} />
                              ) : camp.objective && (
                                <span style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 500 }}>{camp.objective}</span>
                              )}
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0 }}>
                            {isEditMode
                              ? <StatusSelect value={camp.status} onChange={(v) => campaigns.update(camp.id, { status: v })} compact />
                              : <StatusBadge status={camp.status} />}
                            {isEditMode && (
                              <button onClick={() => campaigns.remove(camp.id)}
                                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 14 }}>×</button>
                            )}
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
                          <div>
                            <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Owner</div>
                            <EditableText value={camp.owner}
                              onChange={(v) => campaigns.update(camp.id, { owner: v })}
                              placeholder="Who owns this?" />
                          </div>
                          <div>
                            <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Budget</div>
                            <EditableText value={camp.budget}
                              onChange={(v) => campaigns.update(camp.id, { budget: v })}
                              placeholder="$0/day" />
                          </div>
                          <div>
                            <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>KPI Target</div>
                            <EditableText value={camp.kpiTarget}
                              onChange={(v) => campaigns.update(camp.id, { kpiTarget: v })}
                              placeholder="CTR, CPA..." />
                          </div>
                          <div>
                            <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Performance</div>
                            <EditableText value={camp.performance}
                              onChange={(v) => campaigns.update(camp.id, { performance: v })}
                              placeholder="Results..." />
                          </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 6 }}>
                          <div>
                            <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Assets</div>
                            <EditableText value={camp.assets}
                              onChange={(v) => campaigns.update(camp.id, { assets: v })}
                              placeholder="Creatives being used" />
                          </div>
                          <div>
                            <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Linked Offer</div>
                            {isEditMode ? (
                              <select className="status-select" value={camp.linkedOffer || ""}
                                onChange={(e) => campaigns.update(camp.id, { linkedOffer: e.target.value })}
                                style={{ fontSize: 11, width: "100%" }}>
                                <option value="">— none —</option>
                                {offers.items.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
                              </select>
                            ) : (
                              <span style={{ fontSize: 12, color: camp.linkedOffer ? "var(--accent)" : "var(--text-muted)" }}>
                                {camp.linkedOffer ? (offerNames[camp.linkedOffer] || "—") : "—"}
                              </span>
                            )}
                          </div>
                          <div>
                            <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Dates</div>
                            {isEditMode ? (
                              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                                <input type="date" value={camp.startDate || ""}
                                  onChange={(e) => campaigns.update(camp.id, { startDate: e.target.value })}
                                  style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--text-primary)", fontSize: 10, padding: "2px 4px", borderRadius: "var(--radius-sm)", width: 90 }} />
                                <span style={{ fontSize: 10, color: "var(--text-faint)" }}>→</span>
                                <input type="date" value={camp.endDate || ""}
                                  onChange={(e) => campaigns.update(camp.id, { endDate: e.target.value })}
                                  style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--text-primary)", fontSize: 10, padding: "2px 4px", borderRadius: "var(--radius-sm)", width: 90 }} />
                              </div>
                            ) : (
                              <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                                {camp.startDate ? new Date(camp.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"}
                                {camp.endDate ? ` → ${new Date(camp.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}` : ""}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <AddButton label="Add Campaign" onClick={() => campaigns.add({
                  name: "", channel: ch.id, funnelStage: "awareness", objective: "Awareness",
                  owner: "", budget: "", assets: "", linkedOffer: "",
                  kpiTarget: "", performance: "", status: "not_started",
                  startDate: "", endDate: "",
                })} />
              </div>
            </div>
          );
        })}
    </div>
  );
}
