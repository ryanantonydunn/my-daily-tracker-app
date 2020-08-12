import React, { useState, useEffect } from "react";
import { getDateKey } from "../utils/getDateKey";
import sub from "date-fns/sub";

export type TrackerType = "slider" | "number" | "text" | "boolean";

export interface SliderValues {
  min: string;
  max: string;
  step: string;
}

export interface Tracker {
  id: string;
  label: string;
  type: TrackerType;
  streak: number;
  slider?: SliderValues;
  color: string;
}

export interface Entry {
  id: string;
  trackerId: string;
  dateKey: string;
  value: string;
}

interface DataContext {
  trackers: Tracker[];
  entries: Entry[];
  getTracker: Function;
  addTracker: Function;
  editTracker: Function;
  deleteTracker: Function;
  setTrackerOrder: Function;
  getEntry: Function;
  addEntry: Function;
  editEntry: Function;
  setEntry: Function;
}

const newId = () => `local-${String(Math.random()).slice(2)}`;

export const emptyTracker = (): Tracker => ({
  id: newId(),
  type: "boolean",
  label: "",
  streak: 0,
  color: "green-500",
});

export const emptySlider = (): SliderValues => ({
  min: "0",
  max: "10",
  step: "1",
});

const startTrackers: Tracker[] = [
  {
    id: "123",
    type: "slider",
    label: "Happy",
    streak: 0,
    color: "green-500",
  },
  {
    id: "126",
    type: "text",
    label: "Anxious",
    streak: 0,
    color: "red-500",
  },
  {
    id: "124",
    type: "boolean",
    label: "Meditation",
    streak: 0,
    color: "yellow-600",
  },
  {
    id: "125",
    type: "number",
    label: "Run (km)",
    streak: 0,
    color: "teal-500",
  },
];

const DataContext = React.createContext<Partial<DataContext>>({
  trackers: startTrackers,
});

export const DataProvider = ({ children }) => {
  const [trackers, setTrackers] = useState<Tracker[]>(startTrackers);
  const [entries, setEntries] = useState<Entry[]>([]);

  const getTracker = (trackerId) => trackers.find(({ id }) => id === trackerId);

  const addTracker = (tracker) => setTrackers((arr) => [...arr, tracker]);

  const editTracker = (tracker) =>
    setTrackers((arr) =>
      arr.map((d) => (d.id === tracker.id ? { ...d, ...tracker } : d))
    );

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
  useEffect(() => {
    trackers.forEach((tracker) => {
      const entries = getEntriesByTracker(tracker.id).sort((a, b) =>
        b.dateKey.localeCompare(a.dateKey)
      );
      let streak = 0;
      entries.some(({ dateKey, value }, i) => {
        const dateToCompare = sub(new Date(), { days: i });
        if (getDateKey(dateToCompare) === dateKey && value !== "false") {
          streak++;
          return false;
        }
        return true;
      });
      editTracker({ ...tracker, streak });
    });
  }, [entries]);

  return (
    <DataContext.Provider
      value={{
        trackers,
        entries,
        getTracker,
        addTracker,
        editTracker,
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
