import SiteHeader from "./SiteHeader";
import StatsSummary from "./StatsSummary";
import WorldMap from "./WorldMap";
import FilterBar from "./FilterBar";
import FlightList from "./FlightList";
import FlightDetailPanel from "./FlightDetailPanel";

export default function FlightLog() {
  return (
    <main className="p-6">
      <SiteHeader />
      <StatsSummary />
      <WorldMap />
      <FilterBar />
      <FlightList />
      <FlightDetailPanel />
    </main>
  );
}
