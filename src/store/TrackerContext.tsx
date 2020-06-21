type TrackerType = "slider" | "number" | "text" | "boolean";

export interface Tracker {
  id: string;
  label: string;
  type: TrackerType;
  streak: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface Entry {
  id: string;
  trackerId: string;
  dateKey: string;
  value: string;
}

export const trackers: Tracker[] = [
  {
    id: "test1",
    type: "slider",
    label: "Happy",
    min: 0,
    max: 10,
    step: 1,
    streak: 2,
  },
  {
    id: "test2",
    type: "slider",
    label: "Anxiety",
    min: 0,
    max: 10,
    step: 1,
    streak: 0,
  },
  {
    id: "test3",
    type: "boolean",
    label: "Meditation",
    streak: 2,
  },
  {
    id: "test4",
    type: "text",
    label: "Gratitude",
    streak: 12,
  },
];

const newId = () => `local-${String(Math.random()).slice(2)}`;

export const emptyTracker = (): Tracker => ({
  id: newId(),
  type: "boolean",
  label: "My new tracker",
  streak: 0,
});
