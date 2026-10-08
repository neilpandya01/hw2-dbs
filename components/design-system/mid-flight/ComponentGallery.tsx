import Badge from "@/components/ui/mid-flight/Badge";
import Button from "@/components/ui/mid-flight/Button";
import Checkbox from "@/components/ui/mid-flight/Checkbox";
import DetailPanel from "@/components/ui/mid-flight/DetailPanel";
import FilterChips from "@/components/ui/mid-flight/FilterChips";
import FlightCard from "@/components/ui/mid-flight/FlightCard";
import FlightList from "@/components/ui/mid-flight/FlightList";
import Select from "@/components/ui/mid-flight/Select";
import StatTile from "@/components/ui/mid-flight/StatTile";
import Tabs from "@/components/ui/mid-flight/Tabs";
import TextInput from "@/components/ui/mid-flight/TextInput";
import TextLink from "@/components/ui/mid-flight/TextLink";
import Toggle from "@/components/ui/mid-flight/Toggle";
import YearRange from "@/components/ui/mid-flight/YearRange";
import Section, { Specimen } from "./Section";
import { sampleFlights } from "./sample";

export default function ComponentGallery() {
  const [hero, ...rest] = sampleFlights;
  return (
    <Section n={4} title="Components" note="Everything here is live — click, tab, and press.">
      <div className="grid gap-10 lg:grid-cols-3">
        <Specimen label="Buttons & link">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Add a flight</Button>
            <Button variant="secondary">Export</Button>
            <TextLink>See all trips →</TextLink>
          </div>
        </Specimen>
        <Specimen label="Text input">
          <TextInput label="Search" icon="search" placeholder="City, airport, or airline" />
        </Specimen>
        <Specimen label="Select">
          <Select label="Sort by" options={["Most recent", "Longest distance", "Airline"]} />
        </Specimen>

        <Specimen label="Checkboxes & radios">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="grid gap-3">
              <Checkbox label="Red-eyes only" defaultChecked />
              <Checkbox label="Window seat" />
              <Checkbox label="Connections" disabled />
            </div>
            <div className="grid gap-3" role="radiogroup" aria-label="Units">
              <Checkbox type="radio" name="units" label="Miles" defaultChecked />
              <Checkbox type="radio" name="units" label="Kilometers" />
            </div>
          </div>
        </Specimen>
        <Specimen label="Toggle">
          <div className="grid gap-4">
            <Toggle label="Show routes on map" defaultOn />
            <Toggle label="Night mode" />
          </div>
        </Specimen>
        <Specimen label="Badges">
          <div className="flex flex-wrap gap-2">
            <Badge tone="night">Red-eye</Badge>
            <Badge tone="success">New country</Badge>
            <Badge>Window</Badge>
            <Badge>A320</Badge>
          </div>
        </Specimen>

        <Specimen label="Tabs — switch views">
          <Tabs tabs={["Map", "List", "Stats"]} />
        </Specimen>
        <Specimen label="Year range">
          <YearRange />
        </Specimen>
        <Specimen label="Stat tiles">
          <div className="flex gap-8">
            <StatTile value="41" label="Flights" />
            <StatTile value="23" label="Countries" />
          </div>
        </Specimen>

        <Specimen label="Filter chips" className="lg:col-span-3">
          <FilterChips options={["Asia", "Europe", "Americas", "Oceania"]} defaultSelected={["Asia"]} />
        </Specimen>

        <Specimen label="Card — click to open the detail panel">
          <DetailPanel flight={hero}>
            <FlightCard flight={hero} />
          </DetailPanel>
        </Specimen>
        <Specimen label="List rows" className="lg:col-span-2">
          <FlightList flights={[hero, ...rest]} />
        </Specimen>

        <Specimen label="Modal / detail panel">
          <div className="flex flex-wrap items-center gap-3">
            <DetailPanel flight={hero} />
            <p className="font-mf text-xs font-light text-mf-muted">Opens over a dimmed cabin; Esc or ✕ closes it.</p>
          </div>
        </Specimen>
      </div>
    </Section>
  );
}
