import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import { LayoutDashboard, Calendar, ListChecks, Rocket, Film } from "lucide-react";
import { CampaignProvider } from "./context/CampaignContext";
import Dashboard from "./pages/Dashboard";
import Timeline from "./pages/Timeline";
import ContentTracker from "./pages/ContentTracker";
import ViralTracker from "./pages/ViralTracker";
import Storyboard from "./pages/Storyboard";

const NAV_ITEMS = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/timeline", icon: Calendar, label: "Timeline" },
  { path: "/content", icon: ListChecks, label: "Content Tracker" },
  { path: "/viral", icon: Rocket, label: "Viral & Growth" },
  { path: "/storyboard", icon: Film, label: "Storyboard" },
];

export default function App() {
  return (
    <CampaignProvider>
      <HashRouter>
        <div className="app">
          <aside className="sidebar">
            <div className="sidebar-brand">
              <h1>MULLY.</h1>
              <div className="tagline">THE PEOPLE'S REVOLT</div>
            </div>
            <ul className="sidebar-nav">
              {NAV_ITEMS.map(({ path, icon: Icon, label }) => (
                <li key={path}>
                  <NavLink to={path} end={path === "/"}>
                    <Icon size={18} />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div style={{
              padding: "16px 20px",
              borderTop: "1px solid var(--border)",
              fontSize: 10,
              color: "var(--text-muted)",
              fontFamily: "var(--font-display)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}>
              GOLF FOR THE REST OF US
            </div>
          </aside>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/content" element={<ContentTracker />} />
              <Route path="/viral" element={<ViralTracker />} />
              <Route path="/storyboard" element={<Storyboard />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </CampaignProvider>
  );
}
