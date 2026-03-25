import { useState, useEffect } from "react";
import { useCampaign } from "../context/CampaignContext";
import { useAuth } from "../context/AuthContext";
import { CAMPAIGN, PHASES, CHANNEL_META } from "../data/campaignData";
import StatusSelect from "../components/StatusSelect";

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calc(targetDate));
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(calc(targetDate)), 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  function calc(d) {
    const diff = new Date(d) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, launched: true };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      launched: false,
    };
  }

  if (timeLeft.launched) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--green)" }}>
          LIVE
        </span>
        <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>The gates are down.</span>
      </div>
    );
  }

  const units = [
    { val: timeLeft.days, lbl: "Days" },
    { val: timeLeft.hours, lbl: "Hrs" },
    { val: timeLeft.minutes, lbl: "Min" },
    { val: timeLeft.seconds, lbl: "Sec" },
  ];

  return (
    <div className="countdown">
      {units.map((u, i) => (
        <div key={u.lbl} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {i > 0 && <span className="countdown-separator">:</span>}
          <div className="countdown-unit">
            <div className="number">{String(u.val).padStart(2, "0")}</div>
            <div className="label">{u.lbl}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProgressRing({ pct, size = 80, stroke = 6, color = "var(--accent)" }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--bg-elevated)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s ease" }} />
    </svg>
  );
}

export default function Dashboard() {
  const { taskStatuses, stats, phaseStats, needsAttention } = useCampaign();
  const { isEditMode } = useAuth();
  const overallPct = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  return (
    <div>
      {/* Row 1: Countdown + Progress */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-label">Countdown to Launch</div>
          <Countdown targetDate={CAMPAIGN.launchDate} />
        </div>
        <div className="card" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <ProgressRing
              pct={overallPct}
              size={90}
              stroke={7}
              color={overallPct === 100 ? "var(--green)" : "var(--accent)"}
            />
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700,
              color: overallPct === 100 ? "var(--green)" : "var(--text-primary)",
              transform: "rotate(0deg)",
            }}>
              {overallPct}%
            </div>
          </div>
          <div>
            <div className="card-label" style={{ marginBottom: 8 }}>Campaign Progress</div>
            <div style={{ display: "flex", gap: 20 }}>
              <div>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--green)" }}>{stats.done}</span>
                <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 4 }}>done</span>
              </div>
              <div>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--yellow)" }}>{stats.inProgress}</span>
                <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 4 }}>active</span>
              </div>
              <div>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--text-muted)" }}>{stats.notStarted}</span>
                <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 4 }}>to do</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Phase stepper */}
      <div className="card-label">Campaign Phases</div>
      <div className="phase-stepper">
        {PHASES.map((phase) => {
          const ps = phaseStats[phase.id];
          const pct = ps.total > 0 ? Math.round((ps.done / ps.total) * 100) : 0;
          const isComplete = pct === 100;
          return (
            <div key={phase.id} className="phase-step">
              <div className="step-top">
                <span className="step-label">{phase.label}</span>
                <span className="step-pct" style={{
                  color: isComplete ? "var(--green)" : pct > 0 ? "var(--yellow)" : "var(--text-muted)",
                }}>{pct}%</span>
              </div>
              <div className="step-name">{phase.week}</div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{
                  width: `${pct}%`,
                  background: isComplete ? "var(--green)" : pct > 0 ? "var(--yellow)" : "var(--text-muted)",
                }} />
              </div>
              <div style={{ marginTop: 8, fontSize: 11, color: "var(--text-muted)" }}>
                {ps.done}/{ps.total} tasks
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 3: Needs Attention */}
      {needsAttention.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div className="card-label">Needs Attention</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 8 }}>
            {needsAttention.map((item) => (
              <div key={item.id} className="attention-card">
                <span className={`status-dot ${item.status}`} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="att-phase">{item.phase.week} &middot; {CHANNEL_META[item.channelKey].label}</div>
                  <div className="att-title">{item.title}</div>
                  <div className="att-desc">{item.description}</div>
                </div>
                {isEditMode && <StatusSelect taskId={item.id} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Row 4: Hashtags + Code */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {CAMPAIGN.hashtags.map((h) => <span key={h} className="hashtag">{h}</span>)}
        <span className="hashtag" style={{ background: "var(--green-soft)", color: "var(--green)" }}>
          Code: {CAMPAIGN.promoCode}
        </span>
      </div>
    </div>
  );
}
