import Badge from "@/components/ui/first-suite/Badge";
import Button from "@/components/ui/first-suite/Button";
import Checkbox from "@/components/ui/first-suite/Checkbox";
import DetailPanel from "@/components/ui/first-suite/DetailPanel";
import FilterChips from "@/components/ui/first-suite/FilterChips";
import FlightCard from "@/components/ui/first-suite/FlightCard";
import FlightList from "@/components/ui/first-suite/FlightList";
import Select from "@/components/ui/first-suite/Select";
import StatTile from "@/components/ui/first-suite/StatTile";
import Tabs from "@/components/ui/first-suite/Tabs";
import TextInput from "@/components/ui/first-suite/TextInput";
import TextLink from "@/components/ui/first-suite/TextLink";
import Toggle from "@/components/ui/first-suite/Toggle";
import YearRange from "@/components/ui/first-suite/YearRange";
import Section, { Specimen } from "./Section";
import { sampleFlights } from "./sample";

export default function ComponentGallery() {
  const [hero, ...rest] = sampleFlights;
  return (
    <Section n={4} title="Components" note="Everything here is live. Click, tab and press.">
      <div className="grid gap-12 lg:grid-cols-3">
        <Specimen label="Buttons & link">
          <div className="flex flex-wrap items-center gap-4">
            <Button>Log a flight</Button>
            <Button variant="secondary">Export</Button>
            <TextLink>All journeys →</TextLink>
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
              <Checkbox type="radio" name="fs-units" label="Miles" defaultChecked />
              <Checkbox type="radio" name="fs-units" label="Kilometres" />
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
            <Badge tone="slate">Red-eye</Badge>
            <Badge tone="warning">Delayed</Badge>
            <Badge>A380</Badge>
          </div>
        </Specimen>

        <Specimen label="Tabs: switch views">
          <Tabs tabs={["Map", "Journeys", "Statistics"]} />
        </Specimen>
        <Specimen label="Year range">
          <YearRange />
        </Specimen>
        <Specimen label="Stat tiles">
          <div className="flex gap-12">
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
            <p className="font-fs text-xs font-light text-fs-muted">Opens over a softly dimmed page. Esc or ✕ closes it.</p>
          </div>
        </Specimen>
      </div>
    </Section>
  );
}
