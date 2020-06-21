# Data Definition

## Objects

### Trackers

- id: string;
- label: string;
- type: "slider" | "number" | "text" | "boolean";
- streak: number;
- min?: number;
- max?: number;
- step?: number;

### Entries

- id: string;
- trackerId: string;
- dateKey: string; // eg 2020-11-26
- value: string;

## Actions

- createTracker: (title, type, min, max, step)
- getTrackers: ()
- updateTracker: (id, title, streak, min, max, step)
- deleteTracker: (id)
- createEntry: (trackerId, dateKey, value) -> updateTracker with streak
- getEntries: (trackerId, dateFrom, dateTo)
- updateEntry: (entryId, value)
- deleteEntry: (entryId)
