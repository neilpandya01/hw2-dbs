import type { FlightView } from "@/components/ui/first-suite/types";

// Placeholder flights used to set the components in real content
// (the same trips as the Mid Flight system, so the two can be compared).
export const sampleFlights: FlightView[] = [
  {
    id: "f1", from: "ORD", to: "NRT", fromCity: "Chicago", toCity: "Tokyo", date: "Mar 14, 2023",
    airline: "ANA", flightNo: "NH 11", aircraft: "Boeing 777-300ER", seat: "1A",
    distanceMi: 6283, duration: "13h 05m", redEye: true, newCountry: true,
    note: "Woke up somewhere over the Bering Sea with the sun coming up on the wing.",
  },
  { id: "f2", from: "JFK", to: "LHR", fromCity: "New York", toCity: "London", date: "Jun 02, 2023", airline: "British Airways", flightNo: "BA 178", aircraft: "Boeing 777-200", seat: "41K", distanceMi: 3451, duration: "6h 55m", redEye: true },
  { id: "f3", from: "LHR", to: "CDG", fromCity: "London", toCity: "Paris", date: "Jun 09, 2023", airline: "Air France", flightNo: "AF 1081", aircraft: "Airbus A320", seat: "12F", distanceMi: 216, duration: "1h 15m" },
  { id: "f4", from: "SFO", to: "ORD", fromCity: "San Francisco", toCity: "Chicago", date: "Aug 21, 2023", airline: "United", flightNo: "UA 2235", aircraft: "Boeing 737 MAX 9", seat: "27A", distanceMi: 1846, duration: "4h 10m" },
];
