import Badge from "@/components/ui/through-the-airport/Badge";
import Button from "@/components/ui/through-the-airport/Button";
import Checkbox from "@/components/ui/through-the-airport/Checkbox";
import DetailPanel from "@/components/ui/through-the-airport/DetailPanel";
import FilterChips from "@/components/ui/through-the-airport/FilterChips";
import FlightCard from "@/components/ui/through-the-airport/FlightCard";
import FlightList from "@/components/ui/through-the-airport/FlightList";
import Select from "@/components/ui/through-the-airport/Select";
import StatTile from "@/components/ui/through-the-airport/StatTile";
import Tabs from "@/components/ui/through-the-airport/Tabs";
import TextInput from "@/components/ui/through-the-airport/TextInput";
import TextLink from "@/components/ui/through-the-airport/TextLink";
import Toggle from "@/components/ui/through-the-airport/Toggle";
import YearRange from "@/components/ui/through-the-airport/YearRange";
import Section, { Specimen } from "./Section";
import { sampleFlights } from "./sample";

export default function ComponentGallery() {
  const [hero, ...rest] = sampleFlights;
  return (
    <Section n={4} title="Components" note="Everything here is live. Click, tab and press.">
      <div className="grid gap-10 lg:grid-cols-3">
        <Specimen label="Buttons & link">
          <div className="flex flex-wrap items-center gap-4">
            <Button>Log a flight</Button>
            <Button variant="secondary">Export</Button>
            <TextLink>All flights</TextLink>
          </div>
        </Specimen>
        <Specimen label="Text input">
          <TextInput label="Search" icon="search" placeholder="City, airport or airline" />
        </Specimen>
        <Specimen label="Select">
          <Select label="Sort by" options={["Most recent", "Longest distance", "Airline"]} />
        </Specimen>

        <Specimen label="Checkboxes & radios">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-3.5">
              <Checkbox label="Long haul only" defaultChecked />
              <Checkbox label="Window seat" />
              <Checkbox label="Connections" disabled />
            </div>
            <div className="grid gap-3.5" role="radiogroup" aria-label="Units">
              <Checkbox type="radio" name="ap-units" label="Miles" defaultChecked />
              <Checkbox type="radio" name="ap-units" label="Kilometres" />
            </div>
          </div>
        </Specimen>
        <Specimen label="Toggle">
          <div className="grid gap-4">
            <Toggle label="Show routes on map" defaultOn />
            <Toggle label="Group by year" />
          </div>
        </Specimen>
        <Specimen label="Badges">
          <div className="flex flex-wrap gap-2">
            <Badge tone="success">New country</Badge>
            <Badge tone="info">Red-eye</Badge>
            <Badge tone="warning">Delayed</Badge>
            <Badge>A380</Badge>
          </div>
        </Specimen>

        <Specimen label="Tabs: switch views">
          <Tabs tabs={["Map", "Flights", "Stats"]} />
        </Specimen>
        <Specimen label="Year range">
          <YearRange />
        </Specimen>
        <Specimen label="Stat tiles">
          <div className="flex flex-wrap gap-8">
            <StatTile value="41" label="Flights" />
            <StatTile value="23" label="Countries" />
          </div>
        </Specimen>

        <Specimen label="Filter chips" className="lg:col-span-3">
          <FilterChips options={["Asia", "Europe", "Americas", "Middle East", "Oceania"]} defaultSelected={["Asia"]} />
        </Specimen>

        <Specimen label="Card: click to open the detail panel">
          <DetailPanel flight={hero}>
            <FlightCard flight={hero} />
          </DetailPanel>
        </Specimen>
        <Specimen label="List rows" className="lg:col-span-2">
          <FlightList flights={[hero, ...rest]} />
        </Specimen>

        <Specimen label="Modal / detail panel">
          <div className="flex flex-wrap items-center gap-4">
            <DetailPanel flight={hero} />
            <p className="font-ap text-sm text-ap-muted">Opens over a dimmed page. Esc or ✕ closes it.</p>
          </div>
        </Specimen>
      </div>
    </Section>
  );
}
