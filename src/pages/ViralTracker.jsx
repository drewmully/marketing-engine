import { useCampaign } from "../context/CampaignContext";
import { CAMPAIGN, PHASES } from "../data/campaignData";

const INFLUENCER_STATUSES = [
  { value: "not_contacted", label: "Not Contacted" },
  { value: "contacted", label: "Contacted" },
  { value: "briefed", label: "Briefed" },
  { value: "posted", label: "Posted" },
];

export default function ViralTracker() {
  const { influencers, updateInfluencer } = useCampaign();

  const briefed = influencers.filter((i) => i.status === "briefed" || i.status === "posted").length;
  const posted = influencers.filter((i) => i.status === "posted").length;

  return (
    <div>
      <div className="page-header">
        <h2>Viral & Growth Tracker</h2>
        <p>Hashtags, influencers, UGC campaigns, and viral mechanics</p>
      </div>

      {/* Hashtag Army */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: 16 }}>
          HASHTAG ARMY
        </h3>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {CAMPAIGN.hashtags.map((h) => (
            <span key={h} className="hashtag" style={{ fontSize: 18 }}>{h}</span>
          ))}
        </div>
        <p style={{ marginTop: 12, fontSize: 13, color: "var(--text-secondary)" }}>
          Use on EVERY channel. Every post. Every caption. Every comment.
        </p>
      </div>

      {/* Key metrics */}
      <div className="grid-3" style={{ marginBottom: 24 }}>
        <div className="card stat-card">
          <div className="stat-number" style={{ color: "var(--red)" }}>{CAMPAIGN.earlyAccessGoal}</div>
          <div className="stat-label">Early Access Goal (Sharers)</div>
        </div>
        <div className="card stat-card">
          <div className="stat-number" style={{ color: "var(--orange)" }}>{briefed}/15</div>
          <div className="stat-label">Influencers Briefed</div>
        </div>
        <div className="card stat-card">
          <div className="stat-number" style={{ color: "var(--green)" }}>{posted}/15</div>
          <div className="stat-label">Influencers Posted</div>
        </div>
      </div>

      {/* Viral Hacks per Phase */}
      <h3 style={{ fontSize: 14, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: 16 }}>
        VIRAL HACKS / RALLY CTAs BY PHASE
      </h3>
      {PHASES.map((phase) => (
        <div key={phase.id} className="hack-card" style={{ borderLeftColor: phase.color }}>
          <div className="hack-phase">{phase.name}</div>
          <div className="hack-text">{phase.viralHack}</div>
        </div>
      ))}

      {/* Global viral tactics */}
      <div className="card" style={{ marginTop: 24, marginBottom: 24 }}>
        <h3 style={{ fontSize: 14, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: 16 }}>
          GLOBAL VIRAL TACTICS
        </h3>
        <ul className="asset-list">
          <li>"Tag 3 golfers who need to see this" in every caption</li>
          <li>First 500 sharers get early access code</li>
          <li>Seed 15 micro-influencers (5k-50k golf followers) with early access + "review or riot" briefing</li>
          <li>"Rejection Wall" UGC campaign: golfers post "I got told no because..." stories</li>
          <li>Cross-post mic-drop clips everywhere with "This is why we fight"</li>
          <li>Drop anchor video on a Tuesday morning (golfers scrolling before work)</li>
        </ul>
      </div>

      {/* Influencer Tracker */}
      <h3 style={{ fontSize: 14, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: 16 }}>
        MICRO-INFLUENCER TRACKER (15 TARGETS)
      </h3>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="influencer-row influencer-header">
          <span>#</span>
          <span>Name</span>
          <span>Handle</span>
          <span>Followers</span>
          <span>Status</span>
          <span>Notes</span>
        </div>
        {influencers.map((inf, i) => (
          <div key={inf.id} className="influencer-row">
            <span style={{ color: "var(--text-muted)", fontSize: 12 }}>{i + 1}</span>
            <input
              className="influencer-input"
              placeholder="Name..."
              value={inf.name.startsWith("TBD") ? "" : inf.name}
              onChange={(e) => updateInfluencer(inf.id, { name: e.target.value })}
            />
            <input
              className="influencer-input"
              placeholder="@handle..."
              value={inf.handle}
              onChange={(e) => updateInfluencer(inf.id, { handle: e.target.value })}
            />
            <input
              className="influencer-input"
              placeholder="5k-50k"
              value={inf.followers}
              onChange={(e) => updateInfluencer(inf.id, { followers: e.target.value })}
            />
            <select
              className="status-select"
              value={inf.status}
              onChange={(e) => updateInfluencer(inf.id, { status: e.target.value })}
            >
              {INFLUENCER_STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <input
              className="influencer-input"
              placeholder="Notes..."
              value={inf.notes}
              onChange={(e) => updateInfluencer(inf.id, { notes: e.target.value })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
