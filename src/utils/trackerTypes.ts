import { TrackerType } from "../store/DataContext";

export const trackerTypes = [
  { title: "Checkbox", icon: "check", value: "boolean" },
  { title: "Slider", icon: "linear-scale", value: "slider" },
  { title: "Text", icon: "short-text", value: "text" },
  { title: "Number", icon: "all-inclusive", value: "number" },
];

export const trackerIcon = (trackerType) =>
  trackerTypes.find(({ value }) => value === trackerType)?.icon;
