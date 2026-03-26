import { useCampaign } from "../context/CampaignContext";
import { useAuth } from "../context/AuthContext";
import { FUNNEL_STAGES, CHANNEL_NAMES } from "../data/campaignData";
import StatusSelect, { StatusBadge, ChannelTags, AddButton } from "../components/StatusSelect";
import { EditableText, EditableTextarea } from "../components/EditableField";

const CHANNEL_OPTIONS = ["meta", "tiktok", "youtube", "email", "twitter", "linkedin", "landing", "networks", "influencers", "direct"];

export default function OffersSystem() {
  const { offers, campaigns, channels } = useCampaign();
  const { isEditMode } = useAuth();

  // Group by funnel stage
  const byStage = {};
  FUNNEL_STAGES.forEach((s) => { byStage[s.id] = []; });
  offers.items.forEach((o) => {
    if (byStage[o.funnelStage]) byStage[o.funnelStage].push(o);
    else byStage.awareness.push(o);
  });

  const live = offers.items.filter((o) => o.status === "live" || o.status === "iterating").length;

  function getLinkedCampaigns(offerId) {
    return campaigns.items.filter((c) => c.linkedOffer === offerId);
  }

  // Only show stages that have offers
  const activeStages = FUNNEL_STAGES.filter((s) => byStage[s.id].length > 0);

  return (
    <div>
      {/* Hero */}
      <div className="page-hero">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div className="hero-title">Offers System</div>
            <div className="hero-subtitle">Every offer is an execution object — owned, deployed, measured</div>
          </div>
          <div style={{ display: "flex", gap: 16, textAlign: "center" }}>
            {FUNNEL_STAGES.map((s) => (
              <div key={s.id} style={{ padding: "6px 12px", borderRadius: "var(--radius-sm)", background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: s.color }}>
                  {byStage[s.id]?.length || 0}
                </div>
                <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase" }}>{s.name}</div>
              </div>
            ))}
            <div style={{ padding: "6px 12px" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--green)" }}>{live}</div>
              <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase" }}>Live</div>
            </div>
          </div>
        </div>
      </div>

      {/* Offers grouped by funnel stage */}
      {activeStages.map((stage) => {
        const stageOffers = byStage[stage.id];
        return (
          <div key={stage.id} style={{ marginBottom: 28 }}>
            {/* Stage header */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 16px", marginBottom: 12,
              background: `${stage.color}06`, borderRadius: "var(--radius-sm)",
              borderLeft: `4px solid ${stage.color}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16 }}>{stage.emoji}</span>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: stage.color }}>
                  {stage.name}
                </span>
                <span style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  — {stage.description}
                </span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: stage.color }}>
                {stageOffers.length} offer{stageOffers.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingLeft: 12 }}>
              {stageOffers.map((offer) => {
                const linkedCamps = getLinkedCampaigns(offer.id);
                return (
                  <div key={offer.id} className="offer-card" style={{ "--offer-color": stage.color }}>
                    {/* Header row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          {isEditMode ? (
                            <input className="inf-input" value={offer.name}
                              onChange={(e) => offers.update(offer.id, { name: e.target.value })}
                              placeholder="Offer name"
                              style={{ fontSize: 16, fontWeight: 700, padding: 0, background: "transparent" }} />
                          ) : (
                            <div style={{ fontSize: 16, fontWeight: 700 }}>{offer.name}</div>
                          )}
                        </div>
                        <div style={{ display: "flex", gap: 8, marginTop: 4, alignItems: "center" }}>
                          {isEditMode ? (
                            <select className="status-select" value={offer.funnelStage}
                              onChange={(e) => offers.update(offer.id, { funnelStage: e.target.value })}
                              style={{ fontSize: 10, padding: "2px 20px 2px 6px" }}>
                              {FUNNEL_STAGES.map((s) => <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>)}
                            </select>
                          ) : (
                            <span className="channel-tag" style={{
                              background: `${stage.color}18`, color: stage.color, fontSize: 10,
                            }}>{stage.emoji} {stage.name}</span>
                          )}
                          {offer.owner && !isEditMode && (
                            <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>Owner: {offer.owner}</span>
                          )}
                          {linkedCamps.length > 0 && !isEditMode && (
                            <span style={{ fontSize: 10, color: "var(--text-muted)" }}>
                              {linkedCamps.length} campaign{linkedCamps.length !== 1 ? "s" : ""} linked
                            </span>
                          )}
                        </div>
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

                    {/* Two-column layout */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                      <div>
                        <div className="card-label-color" style={{ "--card-accent-color": stage.color, marginBottom: 8 }}>Definition</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          <div>
                            <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Description</div>
                            <EditableTextarea value={offer.description}
                              onChange={(v) => offers.update(offer.id, { description: v })}
                              placeholder="What's the offer?" rows={2} />
                          </div>
                          <div>
                            <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Value Stack</div>
                            <EditableText value={offer.valueStack}
                              onChange={(v) => offers.update(offer.id, { valueStack: v })}
                              placeholder="What value does the customer get?" />
                          </div>
                          <div>
                            <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Target Audience</div>
                            <EditableText value={offer.targetAudience}
                              onChange={(v) => offers.update(offer.id, { targetAudience: v })}
                              placeholder="Who is this for?" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="card-label-color" style={{ "--card-accent-color": "var(--green)", marginBottom: 8 }}>Deployment</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          <div className="grid-2">
                            <div>
                              <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Owner</div>
                              <EditableText value={offer.owner}
                                onChange={(v) => offers.update(offer.id, { owner: v })}
                                placeholder="Who's responsible?" />
                            </div>
                            <div>
                              <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Deadline</div>
                              {isEditMode ? (
                                <input type="date" value={offer.deadline || ""}
                                  onChange={(e) => offers.update(offer.id, { deadline: e.target.value })}
                                  style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--text-primary)", fontSize: 12, padding: "4px 6px", borderRadius: "var(--radius-sm)", width: "100%" }} />
                              ) : (
                                <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                                  {offer.deadline ? new Date(offer.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"}
                                </span>
                              )}
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Channels Active On</div>
                            {isEditMode ? (
                              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                                {CHANNEL_OPTIONS.map((ch) => {
                                  const active = (offer.channelsActive || []).includes(ch);
                                  const c = { meta: "#4c9aff", tiktok: "#ff0050", youtube: "#ff4444", email: "#f0b429", twitter: "#1da1f2", linkedin: "#0077b5", landing: "#a855f7", networks: "#0d9488", influencers: "#f97316", direct: "#8f96a8" };
                                  return (
                                    <button key={ch} onClick={() => {
                                      const next = active
                                        ? (offer.channelsActive || []).filter((x) => x !== ch)
                                        : [...(offer.channelsActive || []), ch];
                                      offers.update(offer.id, { channelsActive: next });
                                    }}
                                      className="channel-tag"
                                      style={{
                                        cursor: "pointer", border: "1px solid var(--border)",
                                        opacity: active ? 1 : 0.3,
                                        background: active ? `${c[ch] || "#555"}18` : "transparent",
                                        color: c[ch] || "#999", fontSize: 9,
                                      }}>
                                      {ch}
                                    </button>
                                  );
                                })}
                              </div>
                            ) : (
                              <ChannelTags channels={offer.channelsActive} />
                            )}
                          </div>
                          <div className="grid-2">
                            <div>
                              <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Volume Target</div>
                              <EditableText value={offer.volumeTarget}
                                onChange={(v) => offers.update(offer.id, { volumeTarget: v })}
                                placeholder="100 signups, $25K rev..." />
                            </div>
                            <div>
                              <div style={{ fontSize: 9, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Conversion Metrics</div>
                              <EditableText value={offer.conversionMetrics}
                                onChange={(v) => offers.update(offer.id, { conversionMetrics: v })}
                                placeholder="CVR, Revenue, CPA..." />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Where This Is Live */}
                    <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--border)" }}>
                      <div className="section-header" style={{ marginBottom: 6 }}>
                        <div className="section-dot" style={{ background: stage.color }} />
                        <div className="section-title">
                          Where This Is Live ({linkedCamps.length} campaign{linkedCamps.length !== 1 ? "s" : ""})
                        </div>
                      </div>
                      {linkedCamps.length === 0 ? (
                        <div style={{ fontSize: 11, color: "var(--text-muted)", fontStyle: "italic", paddingLeft: 18 }}>
                          No campaigns linked yet — go to Distribution to connect campaigns
                        </div>
                      ) : (
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingLeft: 18 }}>
                          {linkedCamps.map((camp) => {
                            const statusColors = {
                              not_started: "var(--text-muted)", in_progress: "var(--yellow)",
                              live: "var(--green)", done: "var(--green)", iterating: "var(--blue)", paused: "var(--orange)",
                            };
                            return (
                              <div key={camp.id} style={{
                                display: "flex", alignItems: "center", gap: 8,
                                padding: "6px 12px", borderRadius: "var(--radius-sm)",
                                background: "var(--bg-surface)", border: "1px solid var(--border)",
                                fontSize: 12,
                              }}>
                                <span className="status-dot" style={{ background: statusColors[camp.status] || "var(--text-muted)" }} />
                                <span style={{ fontWeight: 600 }}>{camp.name || "(unnamed)"}</span>
                                <span style={{ color: "var(--text-muted)", fontSize: 10 }}>
                                  via {(channels.items.find((c) => c.id === camp.channel)?.name) || CHANNEL_NAMES[camp.channel] || camp.channel}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <AddButton label="Add Offer" onClick={() => offers.add({
        name: "", description: "", valueStack: "", targetAudience: "",
        funnelStage: "conversion", status: "not_started",
        owner: "", channelsActive: [], volumeTarget: "", deadline: "", conversionMetrics: "",
      })} />
    </div>
  );
}
