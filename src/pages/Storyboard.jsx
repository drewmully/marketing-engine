import { STORYBOARD, PRODUCTION_NOTES } from "../data/campaignData";
import StatusSelect, { StatusBadge } from "../components/StatusSelect";
import { useCampaign } from "../context/CampaignContext";
import { useAuth } from "../context/AuthContext";

export default function Storyboard() {
  const { taskStatuses } = useCampaign();
  const { isEditMode } = useAuth();
  const done = STORYBOARD.filter((s) => taskStatuses[s.id] === "done").length;
  const pct = Math.round((done / STORYBOARD.length) * 100);

  return (
    <div>
      <div className="page-header">
        <h2>Anchor Video Storyboard</h2>
        <p>"ENOUGH IS ENOUGH — The MyMully Revolt" &middot; 1:45 &middot; Cinematic, gritty, high-contrast</p>
      </div>

      {/* Progress bar */}
      <div className="card" style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ flexShrink: 0 }}>
          <span style={{
            fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700,
            color: pct === 100 ? "var(--green)" : "var(--text-primary)",
          }}>
            {done}/{STORYBOARD.length}
          </span>
          <span style={{ fontSize: 13, color: "var(--text-secondary)", marginLeft: 8 }}>scenes approved</span>
        </div>
        <div style={{ flex: 1 }}>
          <div className="progress-bar" style={{ height: 8 }}>
            <div className="progress-bar-fill" style={{
              width: `${pct}%`,
              background: pct === 100 ? "var(--green)" : "var(--accent)",
            }} />
          </div>
        </div>
      </div>

      {/* Scenes */}
      {STORYBOARD.map((scene, i) => {
        const status = taskStatuses[scene.id] || "not_started";
        return (
          <div key={scene.id} className="scene-card"
            style={status === "done" ? { opacity: 0.65, borderColor: "var(--green)" } : {}}>
            <div className="scene-header">
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 700, color: "var(--text-muted)" }}>
                  SCENE {i + 1}
                </span>
                <span className="scene-timecode">{scene.timecode}</span>
                <span className="scene-duration">{scene.duration}</span>
              </div>
              {isEditMode ? <StatusSelect taskId={scene.id} /> : <StatusBadge status={status} />}
            </div>
            <div className="scene-body">
              <div className="scene-section">
                <h4>Visuals / Action</h4>
                <p>{scene.visuals}</p>
              </div>
              <div className="scene-section">
                <h4>Voiceover</h4>
                <p className="voiceover">"{scene.voiceover}"</p>
              </div>
              <div className="scene-section" style={{ gridColumn: "1 / -1" }}>
                <h4>On-Screen Text / Graphics</h4>
                <p className="on-screen">{scene.onScreen}</p>
              </div>
            </div>
          </div>
        );
      })}

      {/* Production notes */}
      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-label">Production Notes</div>
        {PRODUCTION_NOTES.map((note, i) => (
          <div key={i} className="production-note">
            <span className="bullet">*</span>
            <span>{note}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
