# Revision Plan: Sequential Drill-Down Flow

## The Problem
The app feels like 9 independent tabs. There's no visual signal that each tab drills deeper — from strategy down to execution to optimization. Content → Distribution flow is unclear. Sorting within pages doesn't reflect the upstream decisions.

## The Principle
**Each tab should feel like zooming in one level deeper.** The sidebar should telegraph this. Within each page, items should be sorted/grouped by whatever the *previous* tab defined.

---

## 1. Restructure Sidebar as a Numbered Process Flow

**Current sections:** CORE ENGINE | CREATE & DISTRIBUTE | OPTIMIZE & GROW
**New sections — rename to reflect the sequential nature:**

```
MULLY.
THE PEOPLE'S REVOLT

① STRATEGY
   Mission Control     (the 30,000ft view)
   Messaging           (what we say per stage)
   Moments             (when we say it)

② EXECUTION
   Content Studio      (produce the content)
   Distribution        (push it through channels)
   Offers              (what we're selling)

③ OPERATIONS
   Org Alignment       (who does what)
   Feedback Loops      (how it's performing)
   Post-Launch         (what's next)
```

**Changes:**
- Move Offers from "Optimize & Grow" into Execution (it's part of the sales engine, not optimization)
- Move Org Alignment from "Core Engine" to Operations (it's support, not strategy)
- Add step numbers (①②③) to section labels
- Add small vertical connector dots between nav items within a section (CSS pseudo-elements) to visually show flow
- Active section gets a subtle left-border highlight on the section label itself

## 2. Add "Flow Bar" to Every Page Hero

A thin horizontal breadcrumb-like bar at the top of each page showing where you are in the process and what feeds in/out. Not a clickable breadcrumb — a **context bar**.

```
┌─────────────────────────────────────────────────────────────┐
│  Messaging → [MOMENTS] → Content Studio                     │
│  ↑ Informed by messaging framework  → Feeds into content    │
└─────────────────────────────────────────────────────────────┘
```

Each page gets a one-liner describing:
- What feeds INTO this page (left)
- **Current page** (center, bold)
- What this page feeds OUT TO (right)

Implementation: A small `<FlowBar>` component rendered at the top of each page hero, with props for `prev`, `current`, `next`, and `prevLabel`/`nextLabel`.

## 3. Content Studio: Sort/Group by Moment

**Current:** Flat list filtered by angle/format.
**New default view:** Group creatives by their linked moment, sorted by moment date.

```
Phase 1: Teaser — Mar 31
├── [video] Golf is growing… but for who?         🟡 In Progress
├── [video] You can see it everywhere...           ⚪ Not Started
└── [video] The best brands don't sell to you.     ⚪ Not Started

Phase 2: Reveal — Apr 3
├── [video] We built something different...        ⚪ Not Started
└── [email] The system is broken. Here's how.      ⚪ Not Started

Unlinked (no moment)
└── ...
```

**Changes:**
- Add a 3-way view toggle: **By Moment** (default) | By Status | Swipe File
- "By Moment" groups creatives under their linked moment header (sorted by moment date)
- "By Status" is the current production board (flat list, filterable)
- Within each moment group, show a mini progress bar (X of Y done)

## 4. Distribution: Sort Campaigns by Moment

**Current:** Campaigns grouped by channel.
**New:** Add a second grouping option — **By Moment** — so you can see "for Phase 1: Teaser, these campaigns fire across these channels."

```
Phase 1: Teaser — Mar 31
├── Teaser Hook Series (Meta) — $150/day — ⚪ Not Started
└── Gate-Expose Video Drops (TikTok) — Organic — ⚪ Not Started

Phase 4: LAUNCH — Apr 14
├── Launch Offer Retargeting (Meta) — $200/day — ⚪ Not Started
└── Waitlist → Launch Email Sequence (Email) — $0 — ⚪ Not Started
```

**Changes:**
- Add toggle at top: **By Channel** (current default) | **By Moment**
- "By Moment" groups campaigns under moment headers, sorted by moment date
- Each moment group shows total budget and live count
- Unlinked campaigns appear in an "Unlinked" section at bottom

## 5. Moments Calendar: Show Upstream/Downstream Counts

Moments is the **bridge** between strategy and execution. Reinforce this by making each moment card show:
- **Messaging count**: How many funnel messages map to this moment's funnel stage
- **Content count**: How many creatives are linked (with status breakdown)
- **Campaign count**: How many campaigns are linked (with status breakdown)

This already partially exists (linked campaigns + creatives). Enhance with a small **readiness indicator** — a mini bar showing "3 of 5 content pieces done, 2 of 3 campaigns live" so you can see at a glance if a moment is ready to fire.

## 6. Offers Page: Group by Funnel Stage, Show Campaign Flow

Currently offers are a flat list. Group them by funnel stage (matching the Messaging page's stages) so the user sees the progression:

```
CONVERSION (2 offers)
├── Discounted Premium Bundle — 2 campaigns linked
└── Founding Member Perks — 1 campaign linked

RETENTION (1 offer)
└── Referral Reward — 1 campaign linked
```

This mirrors the Messaging page structure and makes it clear how offers map to the funnel.

---

## Summary of File Changes

| File | Change |
|------|--------|
| `src/App.jsx` | Restructure NAV array order, rename sections, add step numbers |
| `src/index.css` | Sidebar connector dots, flow-bar styles, section number styles |
| `src/components/FlowBar.jsx` | NEW — small context bar component |
| `src/pages/CreativeSystem.jsx` | Add "By Moment" grouping view as default |
| `src/pages/Distribution.jsx` | Add "By Moment" grouping toggle |
| `src/pages/MomentsCalendar.jsx` | Add readiness indicator per moment card |
| `src/pages/OffersSystem.jsx` | Group offers by funnel stage |

No data model changes needed — all the linking fields already exist.
