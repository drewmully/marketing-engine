import { NavLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const FLOW_DATA = {
  "/": { prev: null, current: "Mission Control", next: { label: "Messaging", path: "/funnel" }, subtitle: "30,000ft view of the entire campaign" },
  "/funnel": { prev: null, current: "Messaging", next: { label: "Moments", path: "/moments" }, subtitle: "What we say at each funnel stage → feeds into calendar timing" },
  "/moments": { prev: { label: "Messaging", path: "/funnel" }, current: "Moments", next: { label: "Content Studio", path: "/creative" }, subtitle: "When we say it → drives what content to produce" },
  "/creative": { prev: { label: "Moments", path: "/moments" }, current: "Content Studio", next: { label: "Distribution", path: "/distribution" }, subtitle: "What we produce → feeds into channel campaigns" },
  "/distribution": { prev: { label: "Content Studio", path: "/creative" }, current: "Distribution", next: { label: "Offers", path: "/offers" }, subtitle: "Where we push it → powered by offers" },
  "/offers": { prev: { label: "Distribution", path: "/distribution" }, current: "Offers", next: { label: "Feedback", path: "/feedback" }, subtitle: "What we're selling → measure in feedback loops" },
  "/org": { prev: null, current: "Org Alignment", next: null, subtitle: "Who does what across every department" },
  "/feedback": { prev: { label: "Offers", path: "/offers" }, current: "Feedback Loops", next: { label: "Post-Launch", path: "/post-launch" }, subtitle: "How it's performing → informs what's next" },
  "/post-launch": { prev: { label: "Feedback", path: "/feedback" }, current: "Post-Launch", next: null, subtitle: "Retention, referrals, and sustained growth" },
};

export default function FlowBar({ path }) {
  const flow = FLOW_DATA[path];
  if (!flow) return null;

  return (
    <div className="flow-bar">
      <div className="flow-bar-steps">
        {flow.prev ? (
          <NavLink to={flow.prev.path} className="flow-bar-link prev">
            {flow.prev.label}
          </NavLink>
        ) : (
          <span className="flow-bar-spacer" />
        )}
        <ChevronRight size={12} className="flow-bar-arrow" style={{ opacity: flow.prev ? 1 : 0 }} />
        <span className="flow-bar-current">{flow.current}</span>
        <ChevronRight size={12} className="flow-bar-arrow" style={{ opacity: flow.next ? 1 : 0 }} />
        {flow.next ? (
          <NavLink to={flow.next.path} className="flow-bar-link next">
            {flow.next.label}
          </NavLink>
        ) : (
          <span className="flow-bar-spacer" />
        )}
      </div>
      <div className="flow-bar-subtitle">{flow.subtitle}</div>
    </div>
  );
}
