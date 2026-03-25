import { useState, useEffect } from "react";
import { useCampaign } from "../context/CampaignContext";
import { useAuth } from "../context/AuthContext";
import { EditableText } from "../components/EditableField";
import { FUNNEL_STAGES } from "../data/campaignData";

const STORY_STAGE_COLORS = ["#4c9aff", "#f0b429", "#a855f7", "#e04040", "#16a34a"];
const EXEC_COLORS = ["#4c9aff", "#f0b429", "#a855f7", "#e04040", "#0d9488"];
const KPI_COLORS = ["#4c9aff", "#a855f7", "#e04040", "#16a34a"];

function Countdown({ targetDate }) {
  const [tl, setTl] = useState(calc(targetDate));
  useEffect(() => {
    const t = setInterval(() => setTl(calc(targetDate)), 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  function calc(d) {
    const diff = new Date(d) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, min: 0, sec: 0, live: true };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      min: Math.floor((diff % 3600000) / 60000),
      sec: Math.floor((diff % 60000) / 1000),
      live: false,
    };
  }

  if (tl.live) {
    return <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--green)" }}>WE'RE LIVE</div>;
  }

  return (
    <div className="countdown">
      {[
        { v: tl.days, l: "Days" }, { v: tl.hours, l: "Hrs" },
        { v: tl.min, l: "Min" }, { v: tl.sec, l: "Sec" },
      ].map((u, i) => (
        <div key={u.l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {i > 0 && <span className="countdown-separator">:</span>}
          <div className="countdown-unit">
            <div className="number">{String(u.v).padStart(2, "0")}</div>
            <div className="label">{u.l}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProgressRing({ pct, size = 76, stroke = 6, color = "var(--accent)" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--bg-elevated)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s" }} />
    </svg>
  );
}

export default function MissionControl() {
  const { campaign, updateCampaign, updateKPI, stats, moments } = useCampaign();
  const { isEditMode } = useAuth();

  const now = new Date();
  const activeMoments = moments.items
    .filter((m) => {
      const d = new Date(m.date);
      const diff = (d - now) / 86400000;
      return diff >= -1 && diff <= 7;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const allItems = [...(stats.funnel ? [stats.funnel] : []), ...(stats.tasks ? [stats.tasks] : []), ...(stats.creatives ? [stats.creatives] : [])];
  const totalTasks = allItems.reduce((a, s) => a + s.total, 0);
  const totalDone = allItems.reduce((a, s) => a + (s.done || 0) + (s.live || 0), 0);
  const overallPct = totalTasks > 0 ? Math.round((totalDone / totalTasks) * 100) : 0;

  return (
    <div>
      {/* Row 1: Story + Core Idea */}
      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div className="card card-accent" style={{ "--card-accent-color": "#4c9aff" }}>
          <div className="card-label-color" style={{ "--card-accent-color": "#4c9aff" }}>The Story</div>
          {isEditMode ? (
            <textarea className="task-notes" value={campaign.story} rows={3}
              onChange={(e) => updateCampaign({ story: e.target.value })}
              style={{ fontSize: 14, lineHeight: 1.6 }} />
          ) : (
            <p style={{ fontSize: 14, color: "var(--text-primary)", lineHeight: 1.7 }}>{campaign.story}</p>
          )}
        </div>
        <div className="card card-accent" style={{ "--card-accent-color": "var(--accent)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="card-label-color" style={{ "--card-accent-color": "var(--accent)" }}>Core Idea</div>
          {isEditMode ? (
            <input className="inf-input" value={campaign.coreIdea}
              onChange={(e) => updateCampaign({ coreIdea: e.target.value })}
              style={{ fontSize: 22, fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--accent)", background: "transparent", padding: 0 }} />
          ) : (
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--accent)" }}>
              {campaign.coreIdea}
            </div>
          )}
        </div>
      </div>

      {/* Row 2: KPIs + Progress */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: 16, marginBottom: 20 }}>
        <div className="card">
          <div className="card-label-color" style={{ "--card-accent-color": "var(--purple)" }}>Primary KPIs</div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${campaign.primaryKPIs.length}, 1fr)`, gap: 12 }}>
            {campaign.primaryKPIs.map((kpi, idx) => (
              <div key={kpi.id} className="kpi-item" style={{ "--kpi-color": KPI_COLORS[idx % KPI_COLORS.length] }}>
                <div style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
                  {kpi.name}
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 12, alignItems: "baseline" }}>
                  <div>
                    {isEditMode ? (
                      <input className="inf-input" value={kpi.current}
                        onChange={(e) => updateKPI(kpi.id, { current: e.target.value })}
                        style={{ textAlign: "center", fontSize: 24, fontFamily: "var(--font-display)", fontWeight: 700, width: 80 }} />
                    ) : (
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "var(--text-primary)" }}>
                        {kpi.current}
                      </div>
                    )}
                    <div style={{ fontSize: 9, color: "var(--text-faint)", letterSpacing: "0.08em" }}>CURRENT</div>
                  </div>
                  <div style={{ color: "var(--text-faint)", fontSize: 12 }}>/</div>
                  <div>
                    {isEditMode ? (
                      <input className="inf-input" value={kpi.target}
                        onChange={(e) => updateKPI(kpi.id, { target: e.target.value })}
                        style={{ textAlign: "center", fontSize: 16, fontFamily: "var(--font-display)", width: 60, color: "var(--text-muted)" }} />
                    ) : (
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 16, color: "var(--text-muted)" }}>
                        {kpi.target}
                      </div>
                    )}
                    <div style={{ fontSize: 9, color: "var(--text-faint)", letterSpacing: "0.08em" }}>TARGET</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card progress-overall">
          <div style={{ position: "relative" }}>
            <ProgressRing pct={overallPct} size={80} stroke={6}
              color={overallPct === 100 ? "var(--green)" : overallPct > 50 ? "var(--blue)" : "var(--accent)"} />
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700,
              color: overallPct === 100 ? "var(--green)" : overallPct > 50 ? "var(--blue)" : "var(--accent)",
            }}>{overallPct}%</div>
          </div>
          <div style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Overall
          </div>
        </div>
      </div>

      {/* Row 3: Funnel snapshot + Active Moments */}
      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div className="card card-accent" style={{ "--card-accent-color": "var(--blue)" }}>
          <div className="card-label-color" style={{ "--card-accent-color": "var(--blue)" }}>Funnel Snapshot</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {FUNNEL_STAGES.map((stage) => (
              <FunnelSnapshotRow key={stage.id} stage={stage} />
            ))}
          </div>
        </div>
        <div className="card card-accent" style={{ "--card-accent-color": "var(--yellow)" }}>
          <div className="card-label-color" style={{ "--card-accent-color": "var(--yellow)" }}>Active Moments</div>
          {activeMoments.length === 0 ? (
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>No upcoming moments in the next 7 days</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {activeMoments.map((m) => {
                const d = new Date(m.date);
                const daysOut = Math.ceil((d - now) / 86400000);
                const momentColor = daysOut <= 0 ? "var(--accent)" : daysOut <= 2 ? "var(--yellow)" : "var(--blue)";
                return (
                  <div key={m.id} className="moment-active-card" style={{ "--moment-color": momentColor }}>
                    <div style={{
                      fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, minWidth: 36, textAlign: "center",
                      color: momentColor,
                    }}>
                      {daysOut <= 0 ? "NOW" : `${daysOut}d`}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{m.name}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{m.goal}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div style={{ marginTop: 12 }}>
            <div className="card-label-color" style={{ "--card-accent-color": "var(--accent)", marginBottom: 8 }}>Countdown</div>
            <Countdown targetDate={campaign.launchDate} />
          </div>
        </div>
      </div>

      {/* Row 4: Story Arc */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-label-color" style={{ "--card-accent-color": "var(--purple)" }}>Story Arc</div>
        <div style={{ display: "flex", gap: 6 }}>
          {(campaign.storyStages || []).map((stage, i) => (
            <div key={stage.id} className="story-stage" style={{ "--stage-color": STORY_STAGE_COLORS[i] }}>
              <div className="stage-num" style={{ color: STORY_STAGE_COLORS[i] }}>
                Stage {i + 1}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
                {stage.name}
              </div>
              <div style={{ fontSize: 11, color: "var(--text-secondary)", marginBottom: 6 }}>{stage.message}</div>
              <div style={{ fontSize: 10, color: STORY_STAGE_COLORS[i], fontStyle: "italic", fontWeight: 500 }}>
                "{stage.keyLines[0]}"
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 5: Execution Overview */}
      <div className="section-header">
        <div className="section-dot" style={{ background: "var(--teal)" }} />
        <div className="section-title">Execution Overview</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
        {[
          { label: "Funnel Rows", s: stats.funnel, color: EXEC_COLORS[0] },
          { label: "Tasks", s: stats.tasks, color: EXEC_COLORS[1] },
          { label: "Creatives", s: stats.creatives, color: EXEC_COLORS[2] },
          { label: "Moments", s: stats.moments, color: EXEC_COLORS[3] },
          { label: "Offers", s: stats.offers, color: EXEC_COLORS[4] },
        ].map(({ label, s, color }) => (
          <div key={label} className="exec-stat-card" style={{ "--exec-color": color }}>
            <div style={{ fontSize: 10, color, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6, fontWeight: 600 }}>{label}</div>
            <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--green)" }}>{(s.done || 0) + (s.live || 0)}</div>
                <div style={{ fontSize: 9, color: "var(--text-faint)" }}>DONE</div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--yellow)" }}>{s.in_progress || 0}</div>
                <div style={{ fontSize: 9, color: "var(--text-faint)" }}>ACTIVE</div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--text-muted)" }}>{s.total}</div>
                <div style={{ fontSize: 9, color: "var(--text-faint)" }}>TOTAL</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FunnelSnapshotRow({ stage }) {
  const { funnel } = useCampaign();
  const rows = funnel.items.filter((r) => r.stage === stage.id);
  const done = rows.filter((r) => r.status === "done" || r.status === "live").length;
  const pct = rows.length > 0 ? Math.round((done / rows.length) * 100) : 0;

  return (
    <div className="funnel-snapshot-row">
      <div style={{
        width: 28, height: 28, borderRadius: "var(--radius-sm)",
        background: `${stage.color}18`, display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14,
      }}>{stage.emoji}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--text-primary)" }}>{stage.name}</span>
          <span style={{ fontSize: 11, color: stage.color, fontWeight: 600 }}>{done}/{rows.length}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${pct}%`, background: stage.color }} />
        </div>
      </div>
    </div>
  );
}
