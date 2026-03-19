import { createContext, useContext, useCallback, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { PHASES, STORYBOARD, INFLUENCERS } from "../data/campaignData";

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

export function CampaignProvider({ children }) {
  const [taskStatuses, setTaskStatuses] = useLocalStorage(
    "mully-task-statuses",
    buildInitialTaskStatuses()
  );
  const [influencers, setInfluencers] = useLocalStorage(
    "mully-influencers",
    INFLUENCERS
  );
  const [notes, setNotes] = useLocalStorage("mully-notes", {});

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

  const value = useMemo(
    () => ({
      taskStatuses,
      updateTaskStatus,
      influencers,
      updateInfluencer,
      notes,
      updateNote,
      stats,
    }),
    [taskStatuses, updateTaskStatus, influencers, updateInfluencer, notes, updateNote, stats]
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
