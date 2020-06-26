import React, { useState } from "react";
import useKeyboard from "../utils/useKeyboard";

type TrackerType = "slider" | "number" | "text" | "boolean";

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

  keyboardHeight: number;
}

const newId = () => `local-${String(Math.random()).slice(2)}`;

export const emptyTracker = (): Tracker => ({
  id: newId(),
  type: "boolean",
  label: "",
  streak: 0,
});

export const emptySlider = (): SliderValues => ({
  min: "0",
  max: "10",
  step: "1",
});

const DataContext = React.createContext<Partial<DataContext>>({
  trackers: [
    {
      id: "123",
      type: "slider",
      label: "Happy",
      streak: 0,
      slider: {
        min: "0",
        max: "10",
        step: "1",
      },
    },
  ],
});

export const DataProvider = ({ children }) => {
  const [trackers, setTrackers] = useState<Tracker[]>([]);
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

  const getEntry = (trackerId, dateKey) =>
    entries.find((d) => d.trackerId === trackerId && d.dateKey === dateKey);
  const addEntry = (entry: Entry) =>
    setEntries((d) => [...d, { ...entry, id: newId() }]);
  const editEntry = (entry) =>
    setEntries((arr) =>
      arr.map((d) => (d.id === entry.id ? { ...d, ...entry } : d))
    );

  const keyboardHeight = useKeyboard();

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
        keyboardHeight,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
