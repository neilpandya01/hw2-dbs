import type { Metadata } from "next";
import FlightLog from "@/components/flight-log/FlightLog";

export const metadata: Metadata = { title: "Flight Log" };

export default function FlightLogPage() {
  return <FlightLog />;
}
