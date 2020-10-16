import { Tracker } from "./dataTypes";

const initialTrackers: Tracker[] = [
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
    id: "activity-run",
    type: "number",
    label: "Run (km)",
    color: "teal-500",
    disabled: true,
    group: "activities",
  },
];

export default initialTrackers;
