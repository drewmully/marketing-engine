import { useState } from "react";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import { LayoutDashboard, Calendar, ListChecks, Rocket, Film, Lock, Unlock, Eye } from "lucide-react";
import { CampaignProvider } from "./context/CampaignContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Timeline from "./pages/Timeline";
import ContentTracker from "./pages/ContentTracker";
import ViralTracker from "./pages/ViralTracker";
import Storyboard from "./pages/Storyboard";

const NAV = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/timeline", icon: Calendar, label: "Timeline" },
  { path: "/content", icon: ListChecks, label: "Content" },
  { path: "/viral", icon: Rocket, label: "Viral & Growth" },
  { path: "/storyboard", icon: Film, label: "Storyboard" },
];

function LoginModal({ onClose }) {
  const { login } = useAuth();
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (login(pw)) {
      onClose();
    } else {
      setError(true);
      setPw("");
    }
  }

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-box" onClick={(e) => e.stopPropagation()}>
        <h3>Enter Edit Mode</h3>
        <p>Enter the password to make changes.</p>
        <form onSubmit={handleSubmit}>
          {error && <div className="login-error">Incorrect password. Try again.</div>}
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
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {!isEditMode && (
            <div className="view-mode-banner">
              <Eye size={14} />
              View only — log in to edit
            </div>
          )}
        </div>
        {isEditMode ? (
          <button className="edit-toggle active" onClick={logout}>
            <Unlock size={14} />
            Edit Mode
          </button>
        ) : (
          <button className="edit-toggle" onClick={() => setShowLogin(true)}>
            <Lock size={14} />
            Log In to Edit
          </button>
        )}
      </div>
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </>
  );
}

function AppShell() {
  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h1>MULLY.</h1>
          <div className="tagline">THE PEOPLE'S REVOLT</div>
        </div>
        <ul className="sidebar-nav">
          {NAV.map(({ path, icon: Icon, label }) => (
            <li key={path}>
              <NavLink to={path} end={path === "/"}>
                <Icon size={17} />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="sidebar-footer">GOLF FOR THE REST OF US</div>
      </aside>
      <main className="main-content">
        <TopBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/content" element={<ContentTracker />} />
          <Route path="/viral" element={<ViralTracker />} />
          <Route path="/storyboard" element={<Storyboard />} />
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
