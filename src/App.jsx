import { useState } from "react";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import {
  LayoutDashboard, Filter, Calendar, Building2, Palette,
  Radio, RefreshCcw, Tag, Rocket, Lock, Unlock, Eye,
} from "lucide-react";
import { CampaignProvider } from "./context/CampaignContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import MissionControl from "./pages/MissionControl";
import FunnelSystem from "./pages/FunnelSystem";
import MomentsCalendar from "./pages/MomentsCalendar";
import OrgAlignment from "./pages/OrgAlignment";
import CreativeSystem from "./pages/CreativeSystem";
import Distribution from "./pages/Distribution";
import FeedbackLoops from "./pages/FeedbackLoops";
import OffersSystem from "./pages/OffersSystem";
import PostLaunch from "./pages/PostLaunch";

const NAV = [
  { path: "/", icon: LayoutDashboard, label: "Mission Control", section: null },
  { path: "/funnel", icon: Filter, label: "Funnel System", section: "engine" },
  { path: "/moments", icon: Calendar, label: "Moments", section: "engine" },
  { path: "/org", icon: Building2, label: "Org Alignment", section: "engine" },
  { path: "/creative", icon: Palette, label: "Creative", section: "create" },
  { path: "/distribution", icon: Radio, label: "Distribution", section: "create" },
  { path: "/feedback", icon: RefreshCcw, label: "Feedback Loops", section: "optimize" },
  { path: "/offers", icon: Tag, label: "Offers", section: "optimize" },
  { path: "/post-launch", icon: Rocket, label: "Post-Launch", section: "optimize" },
];

const SECTIONS = {
  engine: "CORE ENGINE",
  create: "CREATE & DISTRIBUTE",
  optimize: "OPTIMIZE & GROW",
};

function LoginModal({ onClose }) {
  const { login } = useAuth();
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    if (login(pw)) onClose();
    else { setError(true); setPw(""); }
  }
  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-box" onClick={(e) => e.stopPropagation()}>
        <h3>Enter Edit Mode</h3>
        <p>Password required to make changes.</p>
        <form onSubmit={handleSubmit}>
          {error && <div className="login-error">Incorrect password.</div>}
          <input type="password" value={pw} onChange={(e) => { setPw(e.target.value); setError(false); }}
            placeholder="Password" autoFocus />
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Unlock</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TopBar() {
  const { isEditMode, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <div className="top-bar">
        <div>
          {!isEditMode && (
            <div className="view-mode-banner"><Eye size={14} /> View only</div>
          )}
        </div>
        {isEditMode ? (
          <button className="edit-toggle active" onClick={logout}>
            <Unlock size={14} /> Edit Mode
          </button>
        ) : (
          <button className="edit-toggle" onClick={() => setShowLogin(true)}>
            <Lock size={14} /> Log In to Edit
          </button>
        )}
      </div>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}

function AppShell() {
  let lastSection = null;
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h1>MULLY.</h1>
          <div className="tagline">THE PEOPLE'S REVOLT</div>
        </div>
        <ul className="sidebar-nav">
          {NAV.map(({ path, icon: Icon, label, section }) => {
            const showDivider = section && section !== lastSection;
            lastSection = section;
            return (
              <li key={path}>
                {showDivider && (
                  <div style={{
                    padding: "10px 18px 4px",
                    fontSize: 9, fontFamily: "var(--font-display)",
                    color: "var(--text-faint)", letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}>
                    {SECTIONS[section]}
                  </div>
                )}
                <NavLink to={path} end={path === "/"}>
                  <Icon size={16} /> {label}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className="sidebar-footer">GOLF FOR THE REST OF US</div>
      </aside>
      <main className="main-content">
        <TopBar />
        <Routes>
          <Route path="/" element={<MissionControl />} />
          <Route path="/funnel" element={<FunnelSystem />} />
          <Route path="/moments" element={<MomentsCalendar />} />
          <Route path="/org" element={<OrgAlignment />} />
          <Route path="/creative" element={<CreativeSystem />} />
          <Route path="/distribution" element={<Distribution />} />
          <Route path="/feedback" element={<FeedbackLoops />} />
          <Route path="/offers" element={<OffersSystem />} />
          <Route path="/post-launch" element={<PostLaunch />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CampaignProvider>
        <HashRouter>
          <AppShell />
        </HashRouter>
      </CampaignProvider>
    </AuthProvider>
  );
}
