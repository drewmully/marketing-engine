import { createContext, useContext, useCallback, useMemo, useState, useEffect, useRef } from "react";
import { PHASES, STORYBOARD, INFLUENCERS } from "../data/campaignData";
import { getValue, setValue } from "../lib/supabase";

const CampaignContext = createContext();

function buildInitialTaskStatuses() {
  const statuses = {};
  PHASES.forEach((phase) => {
    Object.values(phase.channels).forEach((channel) => {
      channel.tasks.forEach((task) => {
        statuses[task.id] = task.status;
      });
    });
  });
  STORYBOARD.forEach((scene) => {
    statuses[scene.id] = scene.status;
  });
  return statuses;
}

const DEFAULTS = {
  taskStatuses: buildInitialTaskStatuses(),
  influencers: INFLUENCERS,
  notes: {},
};

// Persist to both localStorage (instant) and Supabase (durable)
function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(`mully-${key}`);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });
  const [loaded, setLoaded] = useState(false);
  const debounceRef = useRef(null);

  // Load from Supabase on mount (overrides localStorage if available)
  useEffect(() => {
    getValue(key).then((remote) => {
      if (remote !== null) {
        setState(remote);
        localStorage.setItem(`mully-${key}`, JSON.stringify(remote));
      }
      setLoaded(true);
    });
  }, [key]);

  const update = useCallback(
    (valueOrFn) => {
      setState((prev) => {
        const next = typeof valueOrFn === "function" ? valueOrFn(prev) : valueOrFn;
        localStorage.setItem(`mully-${key}`, JSON.stringify(next));
        // Debounce Supabase writes to avoid spamming
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => setValue(key, next), 500);
        return next;
      });
    },
    [key]
  );

  return [state, update, loaded];
}

export function CampaignProvider({ children }) {
  const [taskStatuses, setTaskStatuses, tsLoaded] = usePersistedState("taskStatuses", DEFAULTS.taskStatuses);
  const [influencers, setInfluencers, infLoaded] = usePersistedState("influencers", DEFAULTS.influencers);
  const [notes, setNotes, notesLoaded] = usePersistedState("notes", DEFAULTS.notes);

  const loaded = tsLoaded && infLoaded && notesLoaded;

  const updateTaskStatus = useCallback(
    (taskId, status) => {
      setTaskStatuses((prev) => ({ ...prev, [taskId]: status }));
    },
    [setTaskStatuses]
  );

  const updateInfluencer = useCallback(
    (id, updates) => {
      setInfluencers((prev) =>
        prev.map((inf) => (inf.id === id ? { ...inf, ...updates } : inf))
      );
    },
    [setInfluencers]
  );

  const updateNote = useCallback(
    (taskId, note) => {
      setNotes((prev) => ({ ...prev, [taskId]: note }));
    },
    [setNotes]
  );

  const stats = useMemo(() => {
    const allStatuses = Object.values(taskStatuses);
    const total = allStatuses.length;
    const done = allStatuses.filter((s) => s === "done").length;
    const inProgress = allStatuses.filter((s) => s === "in_progress").length;
    return { total, done, inProgress, notStarted: total - done - inProgress };
  }, [taskStatuses]);

  // Compute phase-level stats
  const phaseStats = useMemo(() => {
    const result = {};
    PHASES.forEach((phase) => {
      const tasks = Object.values(phase.channels).flatMap((ch) => ch.tasks);
      const total = tasks.length;
      const done = tasks.filter((t) => taskStatuses[t.id] === "done").length;
      const inProgress = tasks.filter((t) => taskStatuses[t.id] === "in_progress").length;
      result[phase.id] = { total, done, inProgress, notStarted: total - done - inProgress };
    });
    return result;
  }, [taskStatuses]);

  // "Needs attention" — in_progress or not_started tasks, prioritized
  const needsAttention = useMemo(() => {
    const items = [];
    PHASES.forEach((phase) => {
      Object.entries(phase.channels).forEach(([channelKey, channel]) => {
        channel.tasks.forEach((task) => {
          const status = taskStatuses[task.id] || "not_started";
          if (status === "in_progress") {
            items.unshift({ ...task, phase, channelKey, status });
          }
        });
      });
    });
    // Also include first not_started from each phase
    PHASES.forEach((phase) => {
      const allTasks = Object.entries(phase.channels).flatMap(([ck, ch]) =>
        ch.tasks.map((t) => ({ ...t, phase, channelKey: ck, status: taskStatuses[t.id] || "not_started" }))
      );
      const firstNotStarted = allTasks.find((t) => t.status === "not_started");
      if (firstNotStarted && !items.find((i) => i.id === firstNotStarted.id)) {
        items.push(firstNotStarted);
      }
    });
    return items.slice(0, 8);
  }, [taskStatuses]);

  const value = useMemo(
    () => ({
      taskStatuses, updateTaskStatus,
      influencers, updateInfluencer,
      notes, updateNote,
      stats, phaseStats, needsAttention, loaded,
    }),
    [taskStatuses, updateTaskStatus, influencers, updateInfluencer, notes, updateNote, stats, phaseStats, needsAttention, loaded]
  );

  return (
    <CampaignContext.Provider value={value}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaign() {
  const ctx = useContext(CampaignContext);
  if (!ctx) throw new Error("useCampaign must be used within CampaignProvider");
  return ctx;
}
