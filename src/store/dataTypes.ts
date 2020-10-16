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
