// MyMully Re-Launch "The People's Revolt" Campaign Data
// All campaign content structured for the marketing plan manager

export const CAMPAIGN = {
  name: "MyMully Re-Launch",
  tagline: "THE PEOPLE'S REVOLT",
  subtitle: "GOLF FOR THE REST OF US",
  launchDate: "2026-04-14", // Week 3 launch — adjust as needed
  hashtags: ["#TakeAMully", "#MullyRevolt", "#GolfForTheRestOfUs"],
  earlyAccessGoal: 500,
  promoCode: "TAKEAMULLY",
};

export const PHASES = [
  {
    id: "pre-campaign",
    name: "Pre-Campaign Teaser",
    label: "DROP DAY",
    week: "Drop Day",
    color: "#cc0000",
    description: "Full anchor video drop — the opening salvo.",
    channels: {
      email: {
        tasks: [
          {
            id: "pre-email-1",
            title: "Launch email blast",
            description:
              'Subject: "I just dropped the truth bomb on golf\'s gatekeepers"',
            status: "not_started",
          },
          {
            id: "pre-sms-1",
            title: "SMS blast",
            description: '"Enough. Watch this → [link]"',
            status: "not_started",
          },
        ],
      },
      linkedin: {
        tasks: [
          {
            id: "pre-li-1",
            title: "Long-form post + full video",
            description:
              "Publish the full 1:45 video with long-form written post on LinkedIn",
            status: "not_started",
          },
        ],
      },
      twitter: {
        tasks: [
          {
            id: "pre-tw-1",
            title: "7-tweet thread",
            description:
              "Thread: 7 tweets breaking down the 7 years + mic drop moment",
            status: "not_started",
          },
        ],
      },
      video: {
        tasks: [
          {
            id: "pre-yt-1",
            title: "YouTube premiere",
            description: "Full 1:45 video as YouTube premiere event",
            status: "not_started",
          },
          {
            id: "pre-ig-1",
            title: 'IG Reels/TikTok verticals — 15-sec "ENOUGH IS ENOUGH" hook',
            description: "Vertical 9:16 cuts for Instagram Reels and TikTok",
            status: "not_started",
          },
        ],
      },
    },
    viralHack:
      'Pin the video. End every clip with "Tag a golfer who\'s been screwed. #TakeAMully"',
    contentAssets: [
      "Full 1:45 anchor speech video",
      "15-second cut",
      "30-second cut",
    ],
  },
  {
    id: "week-1",
    name: "Week 1: Solving It",
    label: "2 WEEKS TO LAUNCH",
    week: "Week 1",
    color: "#cc3300",
    description:
      "Expose the 4 gates. Position MyMully as the answer.",
    channels: {
      email: {
        tasks: [
          {
            id: "w1-email-1",
            title: "Weekly email",
            description:
              '"Here\'s exactly how we\'re cutting the gates down" — detail the 4 problems + solutions',
            status: "not_started",
          },
        ],
      },
      linkedin: {
        tasks: [
          {
            id: "w1-li-1",
            title: "Thought-leadership carousel",
            description:
              '"The 4 gates legacy brands still hide behind" — carousel post',
            status: "not_started",
          },
        ],
      },
      twitter: {
        tasks: [
          {
            id: "w1-tw-1",
            title: "Daily X threads (Mon)",
            description: "Roast problem #1: Why assortment is gated",
            status: "not_started",
          },
          {
            id: "w1-tw-2",
            title: "Daily X threads (Tue)",
            description: "Roast problem #2: Tool access exposed",
            status: "not_started",
          },
          {
            id: "w1-tw-3",
            title: "Daily X threads (Wed)",
            description: "Roast problem #3: Service that actually sucks",
            status: "not_started",
          },
          {
            id: "w1-tw-4",
            title: "Daily X threads (Thu)",
            description: "Roast problem #4: Community we're building",
            status: "not_started",
          },
        ],
      },
      video: {
        tasks: [
          {
            id: "w1-ig-1",
            title: 'IG/TikTok "Gate #1" video',
            description:
              "Why assortment is gated — dramatic music, short-form",
            status: "not_started",
          },
          {
            id: "w1-ig-2",
            title: 'IG/TikTok "Gate #2" video',
            description: "Tool access exposed — dramatic music, short-form",
            status: "not_started",
          },
          {
            id: "w1-ig-3",
            title: 'IG/TikTok "Gate #3" video',
            description:
              "Service that actually sucks — dramatic music, short-form",
            status: "not_started",
          },
          {
            id: "w1-ig-4",
            title: 'IG/TikTok "Gate #4" video',
            description:
              "Community we're building + solution teases — dramatic music",
            status: "not_started",
          },
        ],
      },
    },
    viralHack:
      '"Comment your biggest golf rip-off story. Best ones get featured + early access."',
    contentAssets: [
      'Short video: "Why assortment is gated"',
      'Short video: "Tool access exposed"',
      'Short video: "Service that actually sucks"',
      'Short video: "Community we\'re building"',
      "Solution teasers",
    ],
  },
  {
    id: "week-2",
    name: "Week 2: What We're Doing",
    label: "1 WEEK TO LAUNCH",
    week: "Week 2",
    color: "#cc6600",
    description:
      "Social proof, box teaser, behind-the-scenes. Build the hype.",
    channels: {
      email: {
        tasks: [
          {
            id: "w2-sms-1",
            title: "SMS blast",
            description: '"New box dropping soon — want in?"',
            status: "not_started",
          },
        ],
      },
      linkedin: {
        tasks: [
          {
            id: "w2-li-1",
            title: "Professional post",
            description: '"Why real brands are joining the revolt"',
            status: "not_started",
          },
        ],
      },
      twitter: {
        tasks: [
          {
            id: "w2-tw-1",
            title: "Meme-style posts + polls",
            description: '"Country club pricing in 2026? Yes/No" — engagement bait',
            status: "not_started",
          },
        ],
      },
      video: {
        tasks: [
          {
            id: "w2-yt-1",
            title: '"Day in the life" YouTube vlog',
            description: "Behind-the-scenes warehouse, team, suppliers",
            status: "not_started",
          },
          {
            id: "w2-ig-1",
            title: "IG carousel of new packaging",
            description: "Product shots, new box design, brand montage",
            status: "not_started",
          },
        ],
      },
    },
    viralHack:
      '"Repost this if you\'re ready for real access. First 200 reposts get Mully stickers mailed."',
    contentAssets: [
      "Customer testimonials",
      "New box teaser video",
      "Behind-the-scenes warehouse footage",
      'Brand montage (CEOs/brands that said YES)',
      '"The Mully Box is coming" hype content',
    ],
  },
  {
    id: "week-3",
    name: "Week 3: LAUNCH",
    label: "IT'S HERE",
    week: "Week 3",
    color: "#ff0000",
    description: "The gates come down. Full launch blitz.",
    channels: {
      email: {
        tasks: [
          {
            id: "w3-email-1",
            title: "Big launch email",
            description:
              '"It\'s here. The gates just came down." — full launch announcement',
            status: "not_started",
          },
          {
            id: "w3-sms-1",
            title: "SMS blast with promo",
            description: '"MULLY IS LIVE — use code TAKEAMULLY for 10%"',
            status: "not_started",
          },
        ],
      },
      linkedin: {
        tasks: [
          {
            id: "w3-li-1",
            title: "Launch announcement + proof thread",
            description: "Official LinkedIn launch post with social proof",
            status: "not_started",
          },
        ],
      },
      twitter: {
        tasks: [
          {
            id: "w3-tw-1",
            title: "Live-tweet the launch",
            description: "Real-time updates as launch unfolds",
            status: "not_started",
          },
          {
            id: "w3-tw-2",
            title: "Quote-tweet every unboxing",
            description: "Amplify customer unboxing content",
            status: "not_started",
          },
        ],
      },
      video: {
        tasks: [
          {
            id: "w3-yt-1",
            title: "YouTube live unboxing event",
            description: "Live stream unboxing with audience interaction",
            status: "not_started",
          },
          {
            id: "w3-ig-1",
            title: "Meta/IG/TikTok flood",
            description: "Customer unboxing videos, fireworks launch video",
            status: "not_started",
          },
        ],
      },
    },
    viralHack:
      '"Film your own unboxing and tag #MullyRevolt — top 10 get free gear next drop. Let\'s flood the feed."',
    contentAssets: [
      "Fireworks launch video",
      "Website live announcement",
      "5 customer unboxings",
      "5 affiliate full reviews",
      "Value comparison graphics",
      '"Party on the range" live event clips',
    ],
  },
  {
    id: "post-launch",
    name: "Post-Launch (Week 4+)",
    label: "KEEP THE FIRE",
    week: "Week 4+",
    color: "#ff3300",
    description: "Sustain momentum. Community building. Ongoing revolt.",
    channels: {
      email: {
        tasks: [
          {
            id: "pl-email-1",
            title: "Weekly Mully Monday email",
            description: "Feature top testimonial of the week",
            status: "not_started",
          },
        ],
      },
      linkedin: {
        tasks: [
          {
            id: "pl-li-1",
            title: "Weekly results update",
            description: "Share metrics, growth, community wins",
            status: "not_started",
          },
        ],
      },
      twitter: {
        tasks: [
          {
            id: "pl-tw-1",
            title: "Affiliate leaderboard posts",
            description: "Top sharers get free product — public leaderboard",
            status: "not_started",
          },
        ],
      },
      video: {
        tasks: [
          {
            id: "pl-ig-1",
            title: "Mully Monday testimonial reel",
            description: "Weekly customer testimonial video compilation",
            status: "not_started",
          },
        ],
      },
    },
    viralHack:
      '"Wall of No\'s" community page on site where golfers upload their rejection stories.',
    contentAssets: [
      "Weekly Mully Monday testimonial reel",
      "Affiliate leaderboard graphics",
      '"Wall of No\'s" community page content',
    ],
  },
];

export const STORYBOARD = [
  {
    id: "scene-1",
    timecode: "0:00 – 0:08",
    duration: "8s",
    visuals:
      "Tight close-up on your face. You snatch the thick stack of rejection letters. Eyes burning straight into camera.",
    voiceover: "Fellow golfers… ENOUGH IS ENOUGH!",
    onScreen: '"ENOUGH IS ENOUGH" slams on screen in blood-red',
    status: "not_started",
  },
  {
    id: "scene-2",
    timecode: "0:08 – 0:28",
    duration: "20s",
    visuals:
      "You crush the first letter in your fist like it owes you money. Quick cuts: empty public course at dawn, dad loading cheap clubs in a beat-up truck, elite country club gates slamming shut.",
    voiceover:
      "For seven brutal years we've watched the golf establishment rig this game against every real golfer who just wants to play. Country club cartels. Backroom deals. They flood your feed with the fantasy… then slam the gate in your face.",
    onScreen: '"7 YEARS OF GATEKEEPING"',
    status: "not_started",
  },
  {
    id: "scene-3",
    timecode: "0:28 – 0:42",
    duration: "14s",
    visuals:
      "You spike the first crumpled ball to the floor like a grenade. Cut to montage: exploding golf ball graphics, price tags rising on screen.",
    voiceover:
      "The game is exploding… but who the hell is it exploding for? Why do the insiders get the best gear and biggest discounts while the rest of us get screwed with the leftovers?",
    onScreen: '"WHO IS THE GAME GROWING FOR?"',
    status: "not_started",
  },
  {
    id: "scene-4",
    timecode: "0:42 – 0:52",
    duration: "10s",
    visuals: "You grab and crush the second letter harder.",
    voiceover:
      "We've lived with this garbage for seven damn years. No longer.",
    onScreen: '"WE\'VE LIVED WITH IT" → "NO LONGER"',
    status: "not_started",
  },
  {
    id: "scene-5",
    timecode: "0:52 – 1:05",
    duration: "13s",
    visuals:
      "Voice rises to a roar. You hold up the remaining stack. Quick cuts of you and team shaking hands with suppliers, warehouse shots, real golfers on the range.",
    voiceover:
      "That's why we're relaunching MyMully — the people's revolt in golf form. We have the relationships. We have the access. And we're done asking permission.",
    onScreen: '"MYMULLY – THE REVOLT"',
    status: "not_started",
  },
  {
    id: "scene-6",
    timecode: "1:05 – 1:20",
    duration: "15s",
    visuals:
      "You open your hand. Slow-motion: rejection letters tumble and scatter across the floor like fallen tyrants.",
    voiceover:
      "And to every arrogant brand that looked us dead in the eye and said 'Sorry… you're not a country club'… These right here? These are your 'no' letters. You didn't reject us because we're not a country club. You rejected us because we're fighting like hell for the regular guys and girls you abandoned.",
    onScreen: "Letters freeze mid-air with brand logos blurred out",
    status: "not_started",
  },
  {
    id: "scene-7",
    timecode: "1:20 – 1:30",
    duration: "10s",
    visuals: "Dead stare into lens. Pause. Then low and deadly.",
    voiceover: "Well, the people are finished waiting.",
    onScreen: "Screen goes black for 1 second",
    status: "not_started",
  },
  {
    id: "scene-8",
    timecode: "1:30 – 1:35",
    duration: "5s",
    visuals: "You drop the mic — violent crack on the floor.",
    voiceover: "MULLY.",
    onScreen: 'Massive "MULLY" explodes on screen',
    status: "not_started",
  },
  {
    id: "scene-9",
    timecode: "1:35 – 1:45",
    duration: "10s",
    visuals:
      "Hardcore pump-up montage: papers exploding in slow-mo, you marching at camera, real golfers cheering, fireworks of golf balls. Final slam.",
    voiceover: "(No VO)",
    onScreen:
      "Allow us to take a Mully. Re-launch coming this Spring. MYMULLY — GOLF FOR THE REST OF US",
    status: "not_started",
  },
];

export const INFLUENCERS = [
  { id: "inf-1", name: "TBD - Influencer 1", handle: "", followers: "", status: "not_contacted", notes: "" },
  { id: "inf-2", name: "TBD - Influencer 2", handle: "", followers: "", status: "not_contacted", notes: "" },
  { id: "inf-3", name: "TBD - Influencer 3", handle: "", followers: "", status: "not_contacted", notes: "" },
  { id: "inf-4", name: "TBD - Influencer 4", handle: "", followers: "", status: "not_contacted", notes: "" },
  { id: "inf-5", name: "TBD - Influencer 5", handle: "", followers: "", status: "not_contacted", notes: "" },
  { id: "inf-6", name: "TBD - Influencer 6", handle: "", followers: "", status: "not_contacted", notes: "" },
  { id: "inf-7", name: "TBD - Influencer 7", handle: "", followers: "", status: "not_contacted", notes: "" },
  { id: "inf-8", name: "TBD - Influencer 8", handle: "", followers: "", status: "not_contacted", notes: "" },
  { id: "inf-9", name: "TBD - Influencer 9", handle: "", followers: "", status: "not_contacted", notes: "" },
  { id: "inf-10", name: "TBD - Influencer 10", handle: "", followers: "", status: "not_contacted", notes: "" },
  { id: "inf-11", name: "TBD - Influencer 11", handle: "", followers: "", status: "not_contacted", notes: "" },
  { id: "inf-12", name: "TBD - Influencer 12", handle: "", followers: "", status: "not_contacted", notes: "" },
  { id: "inf-13", name: "TBD - Influencer 13", handle: "", followers: "", status: "not_contacted", notes: "" },
  { id: "inf-14", name: "TBD - Influencer 14", handle: "", followers: "", status: "not_contacted", notes: "" },
  { id: "inf-15", name: "TBD - Influencer 15", handle: "", followers: "", status: "not_contacted", notes: "" },
];

export const CHANNEL_META = {
  email: { label: "Email / SMS", icon: "Mail", color: "#ff6b35" },
  linkedin: { label: "LinkedIn", icon: "Linkedin", color: "#0077b5" },
  twitter: { label: "X (Twitter)", icon: "Twitter", color: "#1da1f2" },
  video: { label: "YouTube / Meta / TikTok", icon: "Video", color: "#ff0050" },
};

export const PRODUCTION_NOTES = [
  "Film in 4K",
  "Add subtle American flag motifs in background (subtle, not over-the-top)",
  "Export vertical 9:16 version for Stories/Reels",
  "Export horizontal version for YouTube",
  "Drop anchor video on a Tuesday morning (golfers scrolling before work)",
];
