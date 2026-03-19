import { STORYBOARD, PRODUCTION_NOTES } from "../data/campaignData";
import StatusSelect from "../components/StatusSelect";
import { useCampaign } from "../context/CampaignContext";

const SCENE_STATUSES = [
  { value: "not_started", label: "Not Started" },
  { value: "in_progress", label: "In Production" },
  { value: "done", label: "Approved" },
];

export default function Storyboard() {
  const { taskStatuses } = useCampaign();

  const scenesComplete = STORYBOARD.filter((s) => taskStatuses[s.id] === "done").length;

  return (
    <div>
      <div className="page-header">
        <h2>Anchor Video Storyboard</h2>
        <p>"ENOUGH IS ENOUGH — The MyMully Revolt" | 1:45 | Cinematic, gritty, high-contrast</p>
      </div>

      {/* Progress */}
      <div className="card" style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 24 }}>
        <div>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: 36,
            fontWeight: 700,
            color: scenesComplete === STORYBOARD.length ? "var(--green)" : "var(--red)",
          }}>
            {scenesComplete}/{STORYBOARD.length}
          </span>
          <span style={{ fontSize: 14, color: "var(--text-secondary)", marginLeft: 8 }}>scenes approved</span>
        </div>
        <div style={{ flex: 1 }}>
          <div className="progress-bar" style={{ height: 10 }}>
            <div className="progress-bar-fill" style={{
              width: `${(scenesComplete / STORYBOARD.length) * 100}%`,
              background: scenesComplete === STORYBOARD.length ? "var(--green)" : "var(--red)",
            }} />
          </div>
        </div>
      </div>

      {/* Scenes */}
      {STORYBOARD.map((scene, i) => {
        const status = taskStatuses[scene.id] || "not_started";
        return (
          <div
            key={scene.id}
            className="scene-card"
            style={status === "done" ? { opacity: 0.7, borderColor: "var(--green)" } : {}}
          >
            <div className="scene-header">
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "var(--text-muted)",
                }}>
                  SCENE {i + 1}
                </span>
                <span className="scene-timecode">{scene.timecode}</span>
                <span className="scene-duration">{scene.duration}</span>
              </div>
              <StatusSelect taskId={scene.id} />
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

      {/* Production Notes */}
      <div className="card" style={{ marginTop: 24 }}>
        <h3 style={{ fontSize: 14, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: 16 }}>
          PRODUCTION NOTES
        </h3>
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
