import { useCampaign } from "../context/CampaignContext";
import { useAuth } from "../context/AuthContext";
import { FUNNEL_STAGES } from "../data/campaignData";
import { AddButton } from "../components/StatusSelect";
import { EditableText } from "../components/EditableField";

export default function FeedbackLoops() {
  const { insights, funnel, creatives, tasks } = useCampaign();
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
      <div className="card-label">Insights Log</div>
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
