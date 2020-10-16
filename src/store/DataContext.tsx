import React, { useMemo, useState } from "react";
import getNewId from "../utils/getNewId";
import isDateWithinRange from "../utils/isDateWithinRange";
import { Entry, Tracker, TrackerGroup } from "./dataTypes";
import exampleEntries from "./exampleEntries";
import initialTrackers from "./initialTrackers";

interface DataContext {
  groups: TrackerGroup[];
  trackers: Tracker[];
  activeTrackers: Tracker[];
  entries: Entry[];
  getTracker: Function;
  addTracker: Function;
  editTracker: Function;
  setTracker: Function;
  deleteTracker: Function;
  setTrackerOrder: Function;
  getEntry: Function;
  findEntries: Function;
  addEntry: Function;
  editEntry: Function;
  setEntry: Function;
}

export const newTracker = (): Tracker => ({
  id: getNewId(),
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

const DataContext = React.createContext<Partial<DataContext>>({});

export const DataProvider = ({ children }) => {
  const [groups, setGroups] = useState<TrackerGroup[]>(startGroups);
  const [trackers, setTrackers] = useState<Tracker[]>(initialTrackers);
  const [entries, setEntries] = useState<Entry[]>(exampleEntries());

  const activeTrackers = useMemo(
    () => trackers.filter(({ disabled }) => !disabled),
    [trackers]
  );

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

  const findEntries = (trackerId, minDate, maxDate) =>
    entries.filter(
      (d) =>
        d.trackerId === trackerId &&
        isDateWithinRange(d.dateKey, minDate, maxDate)
    );

  const addEntry = (entry: Entry) => {
    setEntries((d) => [...d, { ...entry, id: getNewId() }]);
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
        activeTrackers,
        entries,
        getTracker,
        addTracker,
        editTracker,
        setTracker,
        deleteTracker,
        setTrackerOrder,
        getEntry,
        findEntries,
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
