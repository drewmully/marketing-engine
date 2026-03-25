import { createContext, useContext, useCallback, useMemo, useState, useEffect, useRef } from "react";
import {
  CAMPAIGN_DEFAULTS, FUNNEL_ROWS_DEFAULTS, MOMENTS_DEFAULTS,
  TASKS_DEFAULTS, CREATIVES_DEFAULTS, CHANNELS_DEFAULTS,
  OFFERS_DEFAULTS, INSIGHTS_DEFAULTS, POST_LAUNCH_DEFAULTS,
} from "../data/campaignData";
import { getValue, setValue } from "../lib/supabase";

const CampaignContext = createContext();

// Persist to localStorage + Supabase (debounced)
function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(`mully-${key}`);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch { return defaultValue; }
  });
  const [loaded, setLoaded] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    getValue(key).then((remote) => {
      if (remote !== null) {
        setState(remote);
        localStorage.setItem(`mully-${key}`, JSON.stringify(remote));
      }
      setLoaded(true);
    });
  }, [key]);

  const update = useCallback((valueOrFn) => {
    setState((prev) => {
      const next = typeof valueOrFn === "function" ? valueOrFn(prev) : valueOrFn;
      localStorage.setItem(`mully-${key}`, JSON.stringify(next));
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => setValue(key, next), 500);
      return next;
    });
  }, [key]);

  return [state, update, loaded];
}

// Generic CRUD helpers for list-based entities
function useEntityList(key, defaults) {
  const [items, setItems, loaded] = usePersistedState(key, defaults);

  const add = useCallback((item) => {
    setItems((prev) => [...prev, { ...item, id: `${key}-${Date.now()}` }]);
  }, [setItems, key]);

  const update = useCallback((id, updates) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...updates } : it)));
  }, [setItems]);

  const remove = useCallback((id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, [setItems]);

  return { items, setItems, add, update, remove, loaded };
}

export function CampaignProvider({ children }) {
  // Singleton campaign config
  const [campaign, setCampaign, campLoaded] = usePersistedState("campaign", CAMPAIGN_DEFAULTS);

  // Entity lists
  const funnel = useEntityList("funnelRows", FUNNEL_ROWS_DEFAULTS);
  const moments = useEntityList("moments", MOMENTS_DEFAULTS);
  const tasks = useEntityList("tasks", TASKS_DEFAULTS);
  const creatives = useEntityList("creatives", CREATIVES_DEFAULTS);
  const channels = useEntityList("channels", CHANNELS_DEFAULTS);
  const offers = useEntityList("offers", OFFERS_DEFAULTS);
  const insights = useEntityList("insights", INSIGHTS_DEFAULTS);
  const postLaunch = useEntityList("postLaunch", POST_LAUNCH_DEFAULTS);

  const loaded = campLoaded && funnel.loaded && moments.loaded && tasks.loaded &&
    creatives.loaded && channels.loaded && offers.loaded && insights.loaded && postLaunch.loaded;

  const updateCampaign = useCallback((updates) => {
    setCampaign((prev) => ({ ...prev, ...updates }));
  }, [setCampaign]);

  const updateKPI = useCallback((kpiId, updates) => {
    setCampaign((prev) => ({
      ...prev,
      primaryKPIs: prev.primaryKPIs.map((k) => (k.id === kpiId ? { ...k, ...updates } : k)),
    }));
  }, [setCampaign]);

  // Computed stats
  const stats = useMemo(() => {
    const countByStatus = (items) => {
      const s = { total: items.length, not_started: 0, in_progress: 0, live: 0, done: 0, iterating: 0 };
      items.forEach((it) => { if (s[it.status] !== undefined) s[it.status]++; });
      s.complete = s.done + s.live;
      return s;
    };
    return {
      funnel: countByStatus(funnel.items),
      moments: countByStatus(moments.items),
      tasks: countByStatus(tasks.items),
      creatives: countByStatus(creatives.items),
      offers: countByStatus(offers.items),
      postLaunch: countByStatus(postLaunch.items),
    };
  }, [funnel.items, moments.items, tasks.items, creatives.items, offers.items, postLaunch.items]);

  const value = useMemo(() => ({
    campaign, updateCampaign, updateKPI,
    funnel, moments, tasks, creatives, channels, offers, insights, postLaunch,
    stats, loaded,
  }), [campaign, updateCampaign, updateKPI, funnel, moments, tasks, creatives, channels, offers, insights, postLaunch, stats, loaded]);

  return <CampaignContext.Provider value={value}>{children}</CampaignContext.Provider>;
}

export function useCampaign() {
  const ctx = useContext(CampaignContext);
  if (!ctx) throw new Error("useCampaign must be inside CampaignProvider");
  return ctx;
}
