// MyMully Re-Launch — Full Marketing OS Data Model
// Entities: Campaign, FunnelRows, Moments, Tasks, Creatives, Channels, Offers, Insights

// ─── CAMPAIGN (singleton) ───────────────────────────────────────
export const CAMPAIGN_DEFAULTS = {
  story:
    "Golf has grown in popularity, but access to the best parts of the game — premium products, pricing, and experiences — remains restricted. The same insiders benefit from exclusive access, while most golfers are left on the outside looking in. Mully exists to remove those barriers and make high-end golf experiences accessible without traditional gatekeeping.",
  coreIdea: "Country Club Perks, Online Costs",
  supportingAngles: [
    "Golf is gated",
    "Insiders get better access and pricing",
    "The system is outdated",
    "Premium golf should be accessible",
    "You don't need status to play at a higher level",
  ],
  storyStages: [
    {
      id: "ss-1",
      name: "Teaser / Expose Truth",
      objective: "Create tension and curiosity",
      message: "Golf is growing, but not for everyone. The lifestyle is visible, but access is limited.",
      keyLines: [
        "Golf is growing… but for who?",
        "You can see it everywhere, but you can't access it.",
        "Something about this doesn't make sense.",
      ],
    },
    {
      id: "ss-2",
      name: "Problem / Name the Enemy",
      objective: "Clearly define what's broken",
      message: "Access to the best brands, pricing, and experiences is controlled by a closed system — country clubs, private networks, and exclusive retail channels.",
      keyLines: [
        "The best brands don't sell to you.",
        "Access is controlled.",
        "The same people get the best deals — over and over.",
        "It's not that you don't belong. You were never invited.",
      ],
    },
    {
      id: "ss-3",
      name: "Solution / Declare the Shift",
      objective: "Position Mully as the shift",
      message: "Mully removes the gatekeeping. It delivers premium golf products and experiences directly to everyday golfers without requiring status, connections, or membership.",
      keyLines: [
        "We built something different.",
        "No gates. No handshakes required.",
        "Same level of product. Different level of access.",
        "This is where the game is going.",
      ],
    },
    {
      id: "ss-4",
      name: "Proof / Make it Real",
      objective: "Provide credibility and tangibility",
      message: "Mully already delivers real value through curated products, pricing advantages, and member benefits that were previously inaccessible.",
      keyLines: [
        "Premium golf products curated and delivered",
        "Pricing/value that competes with or beats traditional channels",
        "Member benefits (coaching, access, perks)",
        "Real users engaging with the product",
      ],
    },
    {
      id: "ss-5",
      name: "Launch / Invite",
      objective: "Drive action",
      message: "Mully is now available. Anyone can join and access what was previously restricted.",
      keyLines: [
        "This is open now.",
        "Join the club.",
        "Access, unlocked.",
        "Welcome to the new club.",
      ],
    },
  ],
  primaryKPIs: [
    { id: "kpi-members", name: "New Paid Members", target: "500", current: "0" },
    { id: "kpi-cvr", name: "Conversion Rate", target: "4.5%", current: "—" },
    { id: "kpi-cac", name: "CAC", target: "$35", current: "—" },
    { id: "kpi-trial-cvr", name: "Trial → Paid", target: "30%", current: "—" },
  ],
  secondaryKPIs: [
    { id: "kpi-ctr", name: "CTR", target: "", current: "—" },
    { id: "kpi-engagement", name: "Engagement Rate", target: "", current: "—" },
    { id: "kpi-email-open", name: "Email Open Rate", target: "", current: "—" },
    { id: "kpi-cpl", name: "Cost per Lead", target: "", current: "—" },
  ],
  launchDate: "2026-04-14",
};

// ─── FUNNEL STAGES ──────────────────────────────────────────────
export const FUNNEL_STAGES = [
  { id: "awareness", name: "Awareness", emoji: "📢", color: "#4c9aff", description: "Golf is gated and unequal" },
  { id: "consideration", name: "Consideration", emoji: "🤔", color: "#f0b429", description: "The system is broken and outdated" },
  { id: "conversion", name: "Conversion", emoji: "💥", color: "#e04040", description: "Mully gives you access now" },
  { id: "retention", name: "Retention", emoji: "🔁", color: "#3ecf7a", description: "You are part of something better" },
];

export const FUNNEL_ROWS_DEFAULTS = [
  {
    id: "fr-1", stage: "awareness",
    message: "Golf is growing, but not for everyone. The lifestyle is visible, but access is limited.",
    creative: "Short-form hooks, teaser videos, curiosity-driven content",
    channels: ["meta", "tiktok", "youtube"],
    kpis: "CTR, Views, Engagement Rate",
    owner: "", status: "not_started",
  },
  {
    id: "fr-2", stage: "awareness",
    message: "You can see it everywhere, but you can't access it. Something doesn't make sense.",
    creative: "Problem-awareness shorts, organic social posts",
    channels: ["tiktok", "meta", "twitter"],
    kpis: "Views, Comments, Saves, Shares",
    owner: "", status: "not_started",
  },
  {
    id: "fr-3", stage: "awareness",
    message: "The best brands don't sell to you. Access is controlled.",
    creative: "Gate-expose video series, mic-drop clips",
    channels: ["meta", "tiktok", "youtube"],
    kpis: "Reach, New followers, Shares",
    owner: "", status: "not_started",
  },
  {
    id: "fr-4", stage: "consideration",
    message: "The same people get the best deals — over and over. It's not that you don't belong. You were never invited.",
    creative: "Explainers, problem-focused content, landing pages",
    channels: ["meta", "email", "youtube"],
    kpis: "Time on page, Click-through, Leads",
    owner: "", status: "not_started",
  },
  {
    id: "fr-5", stage: "consideration",
    message: "We built something different. No gates. No handshakes required.",
    creative: "Product reveal, brand story, social proof",
    channels: ["meta", "tiktok", "email"],
    kpis: "Engagement rate, Landing page views, Waitlist signups",
    owner: "", status: "not_started",
  },
  {
    id: "fr-6", stage: "conversion",
    message: "Same level of product. Different level of access. This is open now.",
    creative: "Offer-driven ads, product + value content, retargeting",
    channels: ["email", "meta", "tiktok", "twitter"],
    kpis: "Conversion Rate, CAC, Revenue, AOV",
    owner: "", status: "not_started",
  },
  {
    id: "fr-7", stage: "conversion",
    message: "Join the club. Access, unlocked. Welcome to the new club.",
    creative: "Urgency creative, founding member offer, strong CTA",
    channels: ["email", "meta"],
    kpis: "CVR, Promo code usage, Cart completion",
    owner: "", status: "not_started",
  },
  {
    id: "fr-8", stage: "retention",
    message: "You are part of something better. Member benefits, community, ongoing value.",
    creative: "Onboarding sequence, benefits content, engagement loops",
    channels: ["email", "meta", "tiktok"],
    kpis: "Retention Rate, Churn, Repeat purchase rate",
    owner: "", status: "not_started",
  },
  {
    id: "fr-9", stage: "retention",
    message: "Share your experience. Refer others. Grow the movement.",
    creative: "UGC campaigns, referral program, testimonials",
    channels: ["meta", "tiktok", "email"],
    kpis: "UGC submissions, Referral signups, NPS",
    owner: "", status: "not_started",
  },
];

// ─── MOMENTS ────────────────────────────────────────────────────
export const MOMENTS_DEFAULTS = [
  {
    id: "m-1", name: "Phase 1: Teaser", date: "2026-03-31",
    goal: "Introduce tension. No product mention. Build curiosity and awareness.",
    assets: "Short-form teaser videos, organic social posts, curiosity hooks",
    channels: ["meta", "tiktok", "twitter"],
    owner: "", kpiTarget: "Awareness baseline set, engagement rate benchmarked",
    status: "not_started",
  },
  {
    id: "m-2", name: "Phase 2: Reveal", date: "2026-04-03",
    goal: "Introduce Mully as the shift. Explain the concept. Drive understanding.",
    assets: "Brand reveal video, explainer content, landing page live",
    channels: ["meta", "tiktok", "youtube", "email"],
    owner: "", kpiTarget: "Understanding of value prop, waitlist signups",
    status: "not_started",
  },
  {
    id: "m-3", name: "Phase 3: Proof", date: "2026-04-07",
    goal: "Show product, value, benefits. Social proof and real examples.",
    assets: "Product showcase, testimonials, unboxing, value comparisons",
    channels: ["meta", "youtube", "email", "tiktok"],
    owner: "", kpiTarget: "Credibility established, high engagement on proof content",
    status: "not_started",
  },
  {
    id: "m-4", name: "Influencer Briefing", date: "2026-04-08",
    goal: "Get influencers briefed and ready to post on launch day.",
    assets: "Review kits, talking points, early access codes",
    channels: ["direct"],
    owner: "", kpiTarget: "15 briefed, 10+ committed to post",
    status: "not_started",
  },
  {
    id: "m-5", name: "Phase 4: LAUNCH", date: "2026-04-14",
    goal: "Strong CTA. Offer + urgency. Maximize conversion.",
    assets: "Launch video, website live, offer pages, customer content",
    channels: ["email", "meta", "tiktok", "youtube", "twitter"],
    owner: "", kpiTarget: "200 new members day 1, 100K site visits",
    status: "not_started",
  },
  {
    id: "m-6", name: "Phase 5: Push", date: "2026-04-17",
    goal: "Retargeting. Testimonials. Deadline-driven messaging. Maximize conversions.",
    assets: "Retargeting ads, testimonial content, urgency creative",
    channels: ["meta", "email", "tiktok"],
    owner: "", kpiTarget: "Convert remaining leads, reduce CPA",
    status: "not_started",
  },
  {
    id: "m-7", name: "Post-Launch Community", date: "2026-04-21",
    goal: "Establish weekly cadence. UGC. Referral loops. Sustained growth.",
    assets: "Testimonial reel, referral program, community content",
    channels: ["email", "meta", "tiktok"],
    owner: "", kpiTarget: "Repeat engagement baseline, referral program active",
    status: "not_started",
  },
];

// ─── TASKS (Org Alignment) ──────────────────────────────────────
export const SWIMLANES = [
  { id: "product", name: "Product", emoji: "📦", color: "#4c9aff" },
  { id: "customer-service", name: "Customer Service", emoji: "🎧", color: "#a855f7" },
  { id: "sales-growth", name: "Sales / Growth", emoji: "📈", color: "#16a34a" },
  { id: "ops-fulfillment", name: "Ops / Fulfillment", emoji: "🚛", color: "#f0b429" },
];

export const TASKS_DEFAULTS = [
  { id: "t-1", swimlane: "product", title: "Ensure offering matches premium positioning", owner: "", deadline: "2026-04-10", status: "not_started", linkedTo: "" },
  { id: "t-2", swimlane: "product", title: "Clear value proposition on all pages", owner: "", deadline: "2026-04-12", status: "not_started", linkedTo: "fr-6" },
  { id: "t-3", swimlane: "product", title: "Website live with new branding", owner: "", deadline: "2026-04-12", status: "not_started", linkedTo: "m-5" },
  { id: "t-4", swimlane: "product", title: "Product page with value comparison", owner: "", deadline: "2026-04-12", status: "not_started", linkedTo: "fr-6" },
  { id: "t-5", swimlane: "product", title: "Promo code system functional", owner: "", deadline: "2026-04-10", status: "not_started", linkedTo: "fr-7" },
  { id: "t-6", swimlane: "customer-service", title: "Scripts aligned with campaign messaging", owner: "", deadline: "2026-04-10", status: "not_started", linkedTo: "" },
  { id: "t-7", swimlane: "customer-service", title: "Clear onboarding guidance for new members", owner: "", deadline: "2026-04-12", status: "not_started", linkedTo: "fr-8" },
  { id: "t-8", swimlane: "customer-service", title: "FAQ document for launch questions", owner: "", deadline: "2026-04-10", status: "not_started", linkedTo: "m-5" },
  { id: "t-9", swimlane: "sales-growth", title: "Offers structured and compelling", owner: "", deadline: "2026-04-10", status: "not_started", linkedTo: "fr-7" },
  { id: "t-10", swimlane: "sales-growth", title: "Funnel optimized end-to-end", owner: "", deadline: "2026-04-12", status: "not_started", linkedTo: "" },
  { id: "t-11", swimlane: "sales-growth", title: "Influencer kits shipped", owner: "", deadline: "2026-04-06", status: "not_started", linkedTo: "m-4" },
  { id: "t-12", swimlane: "sales-growth", title: "Referral program ready", owner: "", deadline: "2026-04-18", status: "not_started", linkedTo: "fr-9" },
  { id: "t-13", swimlane: "ops-fulfillment", title: "Delivery experience matches brand expectations", owner: "", deadline: "2026-04-10", status: "not_started", linkedTo: "" },
  { id: "t-14", swimlane: "ops-fulfillment", title: "Packaging and speed reflect premium positioning", owner: "", deadline: "2026-04-08", status: "not_started", linkedTo: "" },
  { id: "t-15", swimlane: "ops-fulfillment", title: "Inventory stocked and QC'd", owner: "", deadline: "2026-04-10", status: "not_started", linkedTo: "m-5" },
  { id: "t-16", swimlane: "ops-fulfillment", title: "Shipping workflow tested end-to-end", owner: "", deadline: "2026-04-10", status: "not_started", linkedTo: "" },
];

// ─── CREATIVES ──────────────────────────────────────────────────
export const CREATIVE_ANGLES = [
  "Golf is gated",
  "Why do insiders pay less?",
  "You're seeing it, but not getting it",
  "Golf isn't built for you — until now",
  "You don't need status to play at a higher level",
];

export const CREATIVES_DEFAULTS = [
  { id: "c-1", angle: "Golf is gated", format: "video", hook: "Golf is growing… but for who?", status: "not_started", performance: "" },
  { id: "c-2", angle: "Golf is gated", format: "video", hook: "You can see it everywhere, but you can't access it.", status: "not_started", performance: "" },
  { id: "c-3", angle: "Golf is gated", format: "video", hook: "The best brands don't sell to you.", status: "not_started", performance: "" },
  { id: "c-4", angle: "Golf is gated", format: "video", hook: "Access is controlled. The same people get the best deals.", status: "not_started", performance: "" },
  { id: "c-5", angle: "Why do insiders pay less?", format: "video", hook: "It's not that you don't belong. You were never invited.", status: "not_started", performance: "" },
  { id: "c-6", angle: "Why do insiders pay less?", format: "image", hook: "Value comparison: Country Club vs Mully", status: "not_started", performance: "" },
  { id: "c-7", angle: "You're seeing it, but not getting it", format: "video", hook: "Something about this doesn't make sense.", status: "not_started", performance: "" },
  { id: "c-8", angle: "You're seeing it, but not getting it", format: "email", hook: "The system is broken. Here's how.", status: "not_started", performance: "" },
  { id: "c-9", angle: "Golf isn't built for you — until now", format: "video", hook: "We built something different. No gates. No handshakes required.", status: "not_started", performance: "" },
  { id: "c-10", angle: "Golf isn't built for you — until now", format: "video", hook: "Same level of product. Different level of access.", status: "not_started", performance: "" },
  { id: "c-11", angle: "Golf isn't built for you — until now", format: "image", hook: "This is where the game is going.", status: "not_started", performance: "" },
  { id: "c-12", angle: "You don't need status to play at a higher level", format: "video", hook: "This is open now. Join the club.", status: "not_started", performance: "" },
  { id: "c-13", angle: "You don't need status to play at a higher level", format: "video", hook: "Access, unlocked. Welcome to the new club.", status: "not_started", performance: "" },
  { id: "c-14", angle: "You don't need status to play at a higher level", format: "email", hook: "Premium golf, accessible. Here's your invite.", status: "not_started", performance: "" },
  { id: "c-15", angle: "Golf is gated", format: "video", hook: "Mic-drop moment — This is why we built Mully.", status: "not_started", performance: "" },
];

// ─── CHANNELS ───────────────────────────────────────────────────
export const CHANNELS_DEFAULTS = [
  {
    id: "ch-meta", name: "Meta Ads (IG / FB)", emoji: "📱",
    strategy: "Lead with short-form video Reels. Retarget with value comparison graphics. Build content specific to platform. Focus on proven formats.",
    targetAudience: "Golfers 25–55, public course players, gear shoppers, value-conscious",
    contentTypes: "Reels, Stories, Carousel, Static ads, Retargeting",
    budget: "", performance: "",
  },
  {
    id: "ch-tiktok", name: "TikTok", emoji: "🎵",
    strategy: "Raw, unpolished energy. Teaser series as daily drops. Comment engagement. Platform-native content.",
    targetAudience: "Golfers 18–40, value-conscious, community-driven",
    contentTypes: "Short-form vertical video, Duets, Stitches",
    budget: "", performance: "",
  },
  {
    id: "ch-youtube", name: "YouTube", emoji: "▶️",
    strategy: "Brand story video. Explainer content. Live events on launch day. Long-form proof content.",
    targetAudience: "Golf enthusiasts who watch long-form reviews and vlogs",
    contentTypes: "Long-form video, Shorts, Live streams",
    budget: "", performance: "",
  },
  {
    id: "ch-email", name: "Email / SMS", emoji: "✉️",
    strategy: "Weekly cadence pre-launch. Onboarding sequence post-purchase. Urgency-driven SMS for key moments.",
    targetAudience: "Existing list + waitlist signups + post-purchase members",
    contentTypes: "Newsletters, SMS blasts, Drip sequences, Onboarding flows",
    budget: "", performance: "",
  },
  {
    id: "ch-twitter", name: "X (Twitter)", emoji: "🐦",
    strategy: "Organic engagement. Threads. Polls. Quote-tweet customer content. Meme-style posts.",
    targetAudience: "Golf Twitter, brand critics, deal hunters",
    contentTypes: "Threads, Polls, Quote tweets, Memes",
    budget: "", performance: "",
  },
  {
    id: "ch-linkedin", name: "LinkedIn", emoji: "💼",
    strategy: "Thought leadership. Brand partnership announcements. Industry disruption narrative.",
    targetAudience: "Golf industry professionals, potential brand partners",
    contentTypes: "Long-form posts, Carousels, Articles",
    budget: "", performance: "",
  },
  {
    id: "ch-landing", name: "Landing Pages", emoji: "🌐",
    strategy: "Conversion-optimized pages. Clear value prop. Social proof. Strong CTA above fold.",
    targetAudience: "All traffic sources — ads, email, organic",
    contentTypes: "Landing pages, Product pages, Offer pages",
    budget: "", performance: "",
  },
  {
    id: "ch-influencers", name: "Influencers", emoji: "🎤",
    strategy: "Seed 15 micro-influencers (5k–50k followers). Early access + review kits. Authentic content.",
    targetAudience: "Their audiences — golf enthusiasts 18–50",
    contentTypes: "Reviews, unboxings, honest takes",
    budget: "", performance: "",
  },
];

// ─── OFFERS ─────────────────────────────────────────────────────
export const OFFERS_DEFAULTS = [
  {
    id: "o-1", name: "Discounted Premium Bundle",
    description: "High perceived value relative to cost — premium golf products at online pricing",
    valueStack: "Premium products + pricing advantage + curated experience",
    targetAudience: "New members from launch campaign",
    funnelStage: "conversion", performance: "", status: "not_started",
  },
  {
    id: "o-2", name: "Free Trial or Bonus",
    description: "Low-risk entry point to experience the Mully difference",
    valueStack: "Try before full commitment + bonus product/perk",
    targetAudience: "Consideration-stage leads who need a push",
    funnelStage: "conversion", performance: "", status: "not_started",
  },
  {
    id: "o-3", name: "Founding Member Perks",
    description: "Early adopters get exclusive pricing, first access to drops, founding member status",
    valueStack: "Exclusive status + ongoing savings + priority access + community",
    targetAudience: "First 500 members",
    funnelStage: "conversion", performance: "", status: "not_started",
  },
  {
    id: "o-4", name: "Referral Reward",
    description: "Members earn rewards for bringing in new members",
    valueStack: "Free product or credits per referral",
    targetAudience: "Existing satisfied members",
    funnelStage: "retention", performance: "", status: "not_started",
  },
];

// ─── INSIGHTS ───────────────────────────────────────────────────
export const INSIGHTS_DEFAULTS = [];

// ─── POST-LAUNCH TRACKS ─────────────────────────────────────────
export const POST_LAUNCH_DEFAULTS = [
  { id: "pl-1", category: "retention", title: "Retargeting campaigns for non-converters", status: "not_started", notes: "" },
  { id: "pl-2", category: "retention", title: "Onboarding email sequence for new members", status: "not_started", notes: "" },
  { id: "pl-3", category: "retention", title: "Member benefits and engagement content", status: "not_started", notes: "" },
  { id: "pl-4", category: "referral", title: "Referral loop program live", status: "not_started", notes: "" },
  { id: "pl-5", category: "referral", title: "Social proof amplification — testimonials", status: "not_started", notes: "" },
  { id: "pl-6", category: "ugc", title: "UGC campaigns — members share their experience", status: "not_started", notes: "" },
  { id: "pl-7", category: "ugc", title: "Community content repost cycle", status: "not_started", notes: "" },
  { id: "pl-8", category: "testimonials", title: "Collect and publish 20 customer testimonials", status: "not_started", notes: "" },
  { id: "pl-9", category: "testimonials", title: "Video testimonial production (5 customers)", status: "not_started", notes: "" },
];

// ─── CHANNEL HELPERS ────────────────────────────────────────────
export const CHANNEL_NAMES = {
  meta: "Meta", tiktok: "TikTok", youtube: "YouTube",
  email: "Email/SMS", twitter: "X (Twitter)", linkedin: "LinkedIn",
  direct: "Direct", landing: "Landing Pages", influencers: "Influencers",
};

export const CHANNEL_COLORS = {
  meta: "#4c9aff", tiktok: "#ff0050", youtube: "#ff4444",
  email: "#f0b429", twitter: "#1da1f2", linkedin: "#0077b5",
  direct: "#8f96a8", landing: "#a855f7", influencers: "#f97316",
};
