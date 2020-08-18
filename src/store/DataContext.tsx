import React, { useState, useEffect } from "react";
import { getDateKey } from "../utils/getDateKey";
import sub from "date-fns/sub";

export type TrackerType = "slider" | "number" | "text" | "boolean";

export interface TrackerGroup {
  id: string;
  label: string;
}

export interface Tracker {
  id: string;
  label: string;
  type: TrackerType;
  color: string;
  disabled: boolean;
  group: string;
}

export interface Entry {
  id: string;
  trackerId: string;
  dateKey: string;
  value: string;
}

interface DataContext {
  groups: TrackerGroup[];
  trackers: Tracker[];
  entries: Entry[];
  getTracker: Function;
  addTracker: Function;
  editTracker: Function;
  setTracker: Function;
  deleteTracker: Function;
  setTrackerOrder: Function;
  getEntry: Function;
  addEntry: Function;
  editEntry: Function;
  setEntry: Function;
}

const newId = () => `local-${String(Math.random()).slice(2)}`;

export const newTracker = (): Tracker => ({
  id: newId(),
  type: "boolean",
  label: "",
  color: "green-500",
  disabled: true,
  group: "custom",
});

const startGroups: TrackerGroup[] = [
  {
    id: "mood",
    label: "Mood",
  },
  {
    id: "activities",
    label: "Activities",
  },
  {
    id: "custom",
    label: "Custom",
  },
];

const startTrackers: Tracker[] = [
  {
    id: "mood-happy",
    type: "slider",
    label: "Happy",
    color: "green-500",
    disabled: true,
    group: "mood",
  },
  {
    id: "mood-anxious",
    type: "text",
    label: "Anxious",
    color: "red-500",
    disabled: true,
    group: "mood",
  },
  {
    id: "124",
    type: "boolean",
    label: "Meditation",
    color: "yellow-600",
    disabled: true,
    group: "activities",
  },
  {
    id: "125",
    type: "number",
    label: "Run (km)",
    color: "teal-500",
    disabled: true,
    group: "activities",
  },
];

const DataContext = React.createContext<Partial<DataContext>>({
  trackers: startTrackers,
});

export const DataProvider = ({ children }) => {
  const [groups, setGroups] = useState<TrackerGroup[]>(startGroups);
  const [trackers, setTrackers] = useState<Tracker[]>(startTrackers);
  const [entries, setEntries] = useState<Entry[]>([]);

  const getTracker = (trackerId) => trackers.find(({ id }) => id === trackerId);

  const addTracker = (tracker) => setTrackers((arr) => [...arr, tracker]);

  const editTracker = (tracker) =>
    setTrackers((arr) =>
      arr.map((d) => (d.id === tracker.id ? { ...d, ...tracker } : d))
    );

  const setTracker = (tracker) => {
    const check = getTracker(tracker.id);
    if (check) {
      editTracker(tracker);
    } else {
      addTracker(tracker);
    }
  };

  const deleteTracker = (trackerId) =>
    setTrackers((arr) => arr.filter((d) => d.id !== trackerId));

  const setTrackerOrder = (ids: string[]) =>
    setTrackers(ids.map((id) => getTracker(id)));

  const getEntry = ({ trackerId, dateKey }) =>
    entries.find((d) => d.trackerId === trackerId && d.dateKey === dateKey);

  const getEntriesByTracker = (trackerId) =>
    entries.filter((d) => d.trackerId === trackerId);

  const addEntry = (entry: Entry) => {
    setEntries((d) => [...d, { ...entry, id: newId() }]);
  };

  const editEntry = (entry) => {
    setEntries((arr) =>
      arr.map((d) => (d.id === entry.id ? { ...d, ...entry } : d))
    );
  };

  const setEntry = (tracker, dateKey, value) => {
    const entry = getEntry({ trackerId: tracker.id, dateKey });
    if (entry) {
      editEntry({ ...entry, value });
    } else {
      addEntry({
        trackerId: tracker.id,
        dateKey,
        id: "",
        value,
      });
    }
  };

  // set streaks
  // TODO change to something way more efficient
  // useEffect(() => {
  //   trackers.forEach((tracker) => {
  //     const entries = getEntriesByTracker(tracker.id).sort((a, b) =>
  //       b.dateKey.localeCompare(a.dateKey)
  //     );
  //     let streak = 0;
  //     entries.some(({ dateKey, value }, i) => {
  //       const dateToCompare = sub(new Date(), { days: i });
  //       if (getDateKey(dateToCompare) === dateKey && value !== "false") {
  //         streak++;
  //         return false;
  //       }
  //       return true;
  //     });
  //     editTracker({ ...tracker, streak });
  //   });
  // }, [entries]);

  return (
    <DataContext.Provider
      value={{
        groups,
        trackers,
        entries,
        getTracker,
        addTracker,
        editTracker,
        setTracker,
        deleteTracker,
        setTrackerOrder,
        getEntry,
        addEntry,
        editEntry,
        setEntry,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
