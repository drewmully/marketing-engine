import { useState, useEffect } from "react";
import { useCampaign } from "../context/CampaignContext";
import { CAMPAIGN, PHASES, CHANNEL_META } from "../data/campaignData";

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calcTime(targetDate));

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTime(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  function calcTime(date) {
    const diff = new Date(date) - new Date();
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
      <div className="countdown">
        <div className="countdown-unit">
          <div className="number" style={{ color: "var(--green)", fontSize: 36 }}>LAUNCHED</div>
          <div className="label">The gates are down</div>
        </div>
      </div>
    );
  }

  return (
    <div className="countdown">
      {[
        { val: timeLeft.days, label: "Days" },
        { val: timeLeft.hours, label: "Hours" },
        { val: timeLeft.minutes, label: "Min" },
        { val: timeLeft.seconds, label: "Sec" },
      ].map((unit, i) => (
        <div key={unit.label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {i > 0 && <span className="countdown-separator">:</span>}
          <div className="countdown-unit">
            <div className="number">{String(unit.val).padStart(2, "0")}</div>
            <div className="label">{unit.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PhaseCard({ phase, taskStatuses }) {
  const tasks = Object.values(phase.channels).flatMap((ch) => ch.tasks);
  const done = tasks.filter((t) => taskStatuses[t.id] === "done").length;
  const total = tasks.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="phase-card" style={{ borderTop: `3px solid ${phase.color}` }}>
      <div className="phase-label">{phase.label}</div>
      <div className="phase-name" style={{ color: phase.color }}>{phase.name}</div>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 16 }}>
        {phase.description}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{done}/{total} tasks</span>
        <span style={{ fontSize: 12, color: phase.color, fontFamily: "var(--font-display)", fontWeight: 600 }}>{pct}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${pct}%`, background: phase.color }} />
      </div>
      <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        {Object.entries(phase.channels).map(([key, ch]) => (
          <span key={key} className="channel-tag" style={{
            background: `${CHANNEL_META[key].color}22`,
            color: CHANNEL_META[key].color,
          }}>
            {CHANNEL_META[key].label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { taskStatuses, stats } = useCampaign();
  const overallPct = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  return (
    <div>
      <div className="page-header">
        <h2>{CAMPAIGN.tagline}</h2>
        <p>{CAMPAIGN.name} — {CAMPAIGN.subtitle}</p>
      </div>

      {/* Countdown + Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
        <div className="card">
          <h3 style={{ fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: 16 }}>
            COUNTDOWN TO LAUNCH
          </h3>
          <Countdown targetDate={CAMPAIGN.launchDate} />
        </div>

        <div className="card">
          <h3 style={{ fontSize: 12, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: 16 }}>
            CAMPAIGN PROGRESS
          </h3>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: 48,
              fontWeight: 700,
              color: overallPct === 100 ? "var(--green)" : "var(--red)",
            }}>
              {overallPct}%
            </span>
            <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>complete</span>
          </div>
          <div className="progress-bar" style={{ height: 12, marginBottom: 16 }}>
            <div className="progress-bar-fill" style={{
              width: `${overallPct}%`,
              background: overallPct === 100
                ? "var(--green)"
                : `linear-gradient(90deg, var(--red), var(--orange))`,
            }} />
          </div>
          <div className="grid-3">
            <div className="stat-card" style={{ padding: 8 }}>
              <div className="stat-number" style={{ fontSize: 28, color: "var(--green)" }}>{stats.done}</div>
              <div className="stat-label" style={{ fontSize: 10 }}>Done</div>
            </div>
            <div className="stat-card" style={{ padding: 8 }}>
              <div className="stat-number" style={{ fontSize: 28, color: "var(--yellow)" }}>{stats.inProgress}</div>
              <div className="stat-label" style={{ fontSize: 10 }}>In Progress</div>
            </div>
            <div className="stat-card" style={{ padding: 8 }}>
              <div className="stat-number" style={{ fontSize: 28, color: "var(--text-muted)" }}>{stats.notStarted}</div>
              <div className="stat-label" style={{ fontSize: 10 }}>Not Started</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hashtags */}
      <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
        {CAMPAIGN.hashtags.map((h) => (
          <span key={h} className="hashtag">{h}</span>
        ))}
        <span className="hashtag" style={{ background: "rgba(34, 197, 94, 0.15)", color: "var(--green)" }}>
          Code: {CAMPAIGN.promoCode}
        </span>
      </div>

      {/* Phase cards */}
      <h3 style={{ fontSize: 14, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: 16 }}>
        CAMPAIGN PHASES
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {PHASES.map((phase) => (
          <PhaseCard key={phase.id} phase={phase} taskStatuses={taskStatuses} />
        ))}
      </div>
    </div>
  );
}
