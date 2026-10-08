import type { MoodBoardConfig } from "../types";
import { throughTheAirport } from "./throughTheAirport";
import { firstSuite } from "./firstSuite";
import { midFlight } from "./midFlight";

// Mood slug → board contents. Moods without an entry show a placeholder.
export const boards: Record<string, MoodBoardConfig> = {
  "mid-flight": midFlight,
  "first-suite": firstSuite,
  "through-the-airport": throughTheAirport,
};
