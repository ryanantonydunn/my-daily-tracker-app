import { getDateKey } from "../utils/getDateKey";
import getNewId from "../utils/getNewId";
import { Entry } from "./dataTypes";
import initialTrackers from "./initialTrackers";

const rand = (n) => Math.floor(Math.random() * n);

const exampleEntries = () => {
  // make list of dates
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const day = today.getDate();
  const dateKeys = Array.from({ length: 100 }, (_, i) =>
    getDateKey(new Date(year, month, day - i))
  );

  // run through all dates and trackers and make entries
  const entries: Entry[] = [];
  dateKeys.forEach((dateKey) => {
    initialTrackers.forEach((tracker) => {
      // do nothing for one in 8
      if (rand(8) === 0) return;

      const value =
        tracker.type === "slider"
          ? rand(10)
          : tracker.type === "number"
          ? rand(400) / 4
          : tracker.type === "boolean"
          ? !(rand(5) === 0)
          : tracker.type === "text"
          ? "Lorem ipsum dolor sit amet consectituer"
          : "";

      entries.push({
        id: getNewId(),
        trackerId: tracker.id,
        dateKey,
        value: String(value),
      });
    });
  });
  return entries;
};

export default exampleEntries;
