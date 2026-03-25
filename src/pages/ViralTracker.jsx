import { useCampaign } from "../context/CampaignContext";
import { useAuth } from "../context/AuthContext";
import { CAMPAIGN, PHASES } from "../data/campaignData";

const INF_STATUSES = [
  { value: "not_contacted", label: "Not Contacted" },
  { value: "contacted", label: "Contacted" },
  { value: "briefed", label: "Briefed" },
  { value: "posted", label: "Posted" },
];

const INF_COLORS = {
  not_contacted: "var(--text-muted)",
  contacted: "var(--blue)",
  briefed: "var(--yellow)",
  posted: "var(--green)",
};

export default function ViralTracker() {
  const { influencers, updateInfluencer } = useCampaign();
  const { isEditMode } = useAuth();

  const contacted = influencers.filter((i) => i.status !== "not_contacted").length;
  const briefed = influencers.filter((i) => i.status === "briefed" || i.status === "posted").length;
  const posted = influencers.filter((i) => i.status === "posted").length;

  return (
    <div>
      <div className="page-header">
        <h2>Viral & Growth</h2>
        <p>Hashtags, influencers, and viral mechanics for every phase</p>
      </div>

      {/* Hashtag + stats row */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card">
          <div className="card-label">Hashtag Army</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            {CAMPAIGN.hashtags.map((h) => <span key={h} className="hashtag">{h}</span>)}
          </div>
          <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
            Use on every channel. Every post. Every caption.
          </p>
        </div>
        <div className="card">
          <div className="card-label">Influencer Pipeline</div>
          <div style={{ display: "flex", gap: 24 }}>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--blue)" }}>{contacted}</div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Contacted</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--yellow)" }}>{briefed}</div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Briefed</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--green)" }}>{posted}</div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Posted</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--text-muted)" }}>15</div>
              <div style={{ fontSize: 10, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Target</div>
            </div>
          </div>
        </div>
      </div>

      {/* Rally CTAs by phase */}
      <div className="card-label">Rally CTAs by Phase</div>
      <div style={{ marginBottom: 24 }}>
        {PHASES.map((phase) => (
          <div key={phase.id} className="hack-card">
            <div className="hack-phase">{phase.week} &mdash; {phase.name}</div>
            <div className="hack-text">{phase.viralHack}</div>
          </div>
        ))}
      </div>

      {/* Global tactics */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-label">Global Viral Tactics</div>
        <ul className="asset-list">
          <li>"Tag 3 golfers who need to see this" in every caption</li>
          <li>First 500 sharers get early access code</li>
          <li>Seed 15 micro-influencers (5k–50k followers) with early access + "review or riot" briefing</li>
          <li>"Rejection Wall" UGC campaign — golfers post "I got told no because..." stories</li>
          <li>Cross-post mic-drop clips everywhere with "This is why we fight"</li>
          <li>Drop anchor video on a Tuesday morning (golfers scrolling before work)</li>
        </ul>
      </div>

      {/* Influencer tracker */}
      <div className="card-label">Micro-Influencer Tracker</div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="inf-grid inf-header">
          <span>#</span>
          <span>Name</span>
          <span>Handle</span>
          <span>Followers</span>
          <span>Status</span>
          <span>Notes</span>
        </div>
        {influencers.map((inf, i) => (
          <div key={inf.id} className="inf-grid">
            <span style={{ color: "var(--text-muted)", fontSize: 12 }}>{i + 1}</span>
            <input className="inf-input" placeholder="Name..." disabled={!isEditMode}
              value={inf.name.startsWith("TBD") ? "" : inf.name}
              onChange={(e) => updateInfluencer(inf.id, { name: e.target.value })} />
            <input className="inf-input" placeholder="@handle" disabled={!isEditMode}
              value={inf.handle}
              onChange={(e) => updateInfluencer(inf.id, { handle: e.target.value })} />
            <input className="inf-input" placeholder="5k–50k" disabled={!isEditMode}
              value={inf.followers}
              onChange={(e) => updateInfluencer(inf.id, { followers: e.target.value })} />
            <select className="status-select" value={inf.status} disabled={!isEditMode}
              onChange={(e) => updateInfluencer(inf.id, { status: e.target.value })}
              style={{ borderLeftColor: INF_COLORS[inf.status], borderLeftWidth: 3 }}>
              {INF_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
            <input className="inf-input" placeholder="Notes..." disabled={!isEditMode}
              value={inf.notes}
              onChange={(e) => updateInfluencer(inf.id, { notes: e.target.value })} />
          </div>
        ))}
      </div>
    </div>
  );
}
