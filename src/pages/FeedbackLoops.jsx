import { useCampaign } from "../context/CampaignContext";
import { useAuth } from "../context/AuthContext";
import { FUNNEL_STAGES, JOURNEY_STAGES } from "../data/campaignData";
import { AddButton } from "../components/StatusSelect";
import { EditableText } from "../components/EditableField";

export default function FeedbackLoops() {
  const { insights, funnel, creatives, tasks, journey } = useCampaign();
  const { isEditMode } = useAuth();

  return (
    <div>
      {/* Hero: trading desk */}
      <div className="page-hero" style={{ marginBottom: 24 }}>
        <div className="hero-title">Feedback Loops</div>
        <div className="hero-subtitle" style={{ marginBottom: 16 }}>Each insight becomes a task — learn, adapt, win</div>
        <div className="card-label">Funnel Conversion Status</div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {FUNNEL_STAGES.map((stage, i) => {
            const rows = funnel.items.filter((r) => r.stage === stage.id);
            const live = rows.filter((r) => r.status === "live" || r.status === "done").length;
            return (
              <div key={stage.id} style={{ flex: 1, display: "flex", alignItems: "center" }}>
                <div style={{
                  flex: 1, padding: 16, textAlign: "center",
                  background: `${stage.color}10`, borderRadius: "var(--radius-sm)",
                  border: `1px solid ${stage.color}30`,
                }}>
                  <div style={{ fontSize: 12, color: stage.color, fontWeight: 600, marginBottom: 4 }}>
                    {stage.emoji} {stage.name}
                  </div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "var(--text-primary)" }}>
                    {live}/{rows.length}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)" }}>live</div>
                </div>
                {i < FUNNEL_STAGES.length - 1 && (
                  <div style={{ color: "var(--text-faint)", fontSize: 18, padding: "0 4px" }}>→</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Customer Journey Map */}
      <div style={{ marginBottom: 32 }}>
        <div className="section-header">
          <div className="section-dot" style={{ background: "var(--purple)" }} />
          <div className="section-title">Customer Journey</div>
        </div>
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 16 }}>
          Define and track how people move from stranger to advocate. Each transition has channels, triggers, and metrics.
        </p>

        {/* Journey stage visual */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 20, overflowX: "auto", padding: "4px 0" }}>
          {JOURNEY_STAGES.map((stage, i) => (
            <div key={stage.id} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <div style={{
                textAlign: "center", padding: "10px 14px",
                background: `${stage.color}0c`, borderRadius: "var(--radius-sm)",
                border: `1px solid ${stage.color}25`, minWidth: 100,
                borderBottom: `3px solid ${stage.color}`,
              }}>
                <div style={{ fontSize: 18, marginBottom: 2 }}>{stage.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: stage.color, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {stage.name}
                </div>
                <div style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 2 }}>{stage.description}</div>
              </div>
              {i < JOURNEY_STAGES.length - 1 && (
                <div style={{ color: stage.color, fontSize: 16, padding: "0 4px", flexShrink: 0 }}>→</div>
              )}
            </div>
          ))}
        </div>

        {/* Journey transitions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {journey.items.map((j) => {
            const from = JOURNEY_STAGES.find((s) => s.id === j.fromStage);
            const to = JOURNEY_STAGES.find((s) => s.id === j.toStage);
            return (
              <div key={j.id} className="card" style={{
                padding: "14px 18px",
                borderLeft: `4px solid ${to?.color || "var(--border)"}`,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      fontSize: 12, fontWeight: 700, color: from?.color,
                      padding: "2px 8px", borderRadius: "var(--radius-sm)",
                      background: `${from?.color}12`,
                    }}>{from?.icon} {from?.name}</span>
                    <span style={{ color: "var(--text-faint)", fontSize: 14 }}>→</span>
                    <span style={{
                      fontSize: 12, fontWeight: 700, color: to?.color,
                      padding: "2px 8px", borderRadius: "var(--radius-sm)",
                      background: `${to?.color}12`,
                    }}>{to?.icon} {to?.name}</span>
                  </div>
                  {isEditMode && (
                    <button onClick={() => journey.remove(j.id)}
                      style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 14 }}>×</button>
                  )}
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                      Trigger
                    </div>
                    <EditableText value={j.trigger}
                      onChange={(v) => journey.update(j.id, { trigger: v })}
                      placeholder="What causes this transition?" />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                      Channels
                    </div>
                    <EditableText value={j.channels}
                      onChange={(v) => journey.update(j.id, { channels: v })}
                      placeholder="Which channels drive this?" />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                      Key Metric
                    </div>
                    <EditableText value={j.metric}
                      onChange={(v) => journey.update(j.id, { metric: v })}
                      placeholder="How do we measure?" />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 8 }}>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                      Current
                    </div>
                    <EditableText value={j.currentValue}
                      onChange={(v) => journey.update(j.id, { currentValue: v })}
                      placeholder="—" />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                      Target
                    </div>
                    <EditableText value={j.targetValue}
                      onChange={(v) => journey.update(j.id, { targetValue: v })}
                      placeholder="Set a target" />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                      Notes
                    </div>
                    <EditableText value={j.notes}
                      onChange={(v) => journey.update(j.id, { notes: v })}
                      placeholder="Observations, blockers..." />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <AddButton label="Add Journey Transition" onClick={() => journey.add({
          fromStage: "stranger", toStage: "aware",
          channels: "", trigger: "", metric: "",
          currentValue: "—", targetValue: "", notes: "",
        })} />
      </div>

      {/* Quick stats */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        <div className="exec-stat-card" style={{ "--exec-color": "var(--green)", textAlign: "center", padding: 16 }}>
          <div className="card-label-color" style={{ "--card-accent-color": "var(--green)" }}>Top Creatives</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--green)" }}>
            {creatives.items.filter((c) => c.performance).length}
          </div>
          <div style={{ fontSize: 10, color: "var(--text-muted)" }}>with performance data</div>
        </div>
        <div className="exec-stat-card" style={{ "--exec-color": "var(--blue)", textAlign: "center", padding: 16 }}>
          <div className="card-label-color" style={{ "--card-accent-color": "var(--blue)" }}>Active Insights</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--blue)" }}>
            {insights.items.length}
          </div>
          <div style={{ fontSize: 10, color: "var(--text-muted)" }}>logged</div>
        </div>
        <div className="exec-stat-card" style={{ "--exec-color": "var(--yellow)", textAlign: "center", padding: 16 }}>
          <div className="card-label-color" style={{ "--card-accent-color": "var(--yellow)" }}>Tasks Generated</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--yellow)" }}>
            {insights.items.filter((i) => i.actionTask).length}
          </div>
          <div style={{ fontSize: 10, color: "var(--text-muted)" }}>from insights</div>
        </div>
      </div>

      {/* Insights log */}
      <div className="section-header">
        <div className="section-dot" style={{ background: "var(--teal)" }} />
        <div className="section-title">Insights Log</div>
      </div>
      <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>
        Log what you learn. Each insight can generate a new task.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {insights.items.map((insight) => (
          <div key={insight.id} className="insight-card">
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "var(--blue-soft)", color: "var(--blue)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, flexShrink: 0, marginTop: 2,
              }}>💡</div>
              <div style={{ flex: 1 }}>
                <EditableText value={insight.text}
                  onChange={(v) => insights.update(insight.id, { text: v })}
                  placeholder="What did you learn?" />
                <div style={{ marginTop: 8 }}>
                  <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                    Action → Task
                  </div>
                  <EditableText value={insight.actionTask}
                    onChange={(v) => insights.update(insight.id, { actionTask: v })}
                    placeholder='e.g. "Make 5 more ads with this hook"' />
                </div>
                {isEditMode && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                      Source / Date
                    </div>
                    <EditableText value={insight.source}
                      onChange={(v) => insights.update(insight.id, { source: v })}
                      placeholder="Where did this come from?" />
                  </div>
                )}
              </div>
              {isEditMode && (
                <button onClick={() => insights.remove(insight.id)}
                  style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 14 }}>×</button>
              )}
            </div>
          </div>
        ))}

        {insights.items.length === 0 && (
          <div className="card" style={{ padding: 24, textAlign: "center" }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>💡</div>
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
              No insights yet. Start logging what you learn as the campaign runs.
            </p>
          </div>
        )}
      </div>

      <AddButton label="Add Insight" onClick={() => insights.add({
        text: "", actionTask: "", source: new Date().toLocaleDateString(),
      })} />
    </div>
  );
}
