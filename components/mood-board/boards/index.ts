import type { MoodBoardConfig } from "../types";
import { midFlight } from "./midFlight";

// Mood slug → board contents. Moods without an entry show a placeholder.
export const boards: Record<string, MoodBoardConfig> = {
  "mid-flight": midFlight,
};
