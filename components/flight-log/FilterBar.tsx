import Checkbox from "@/components/ui/mid-flight/Checkbox";
import Chip from "@/components/ui/mid-flight/Chip";
import FilterChips from "@/components/ui/mid-flight/FilterChips";
import Select from "@/components/ui/mid-flight/Select";
import TextInput from "@/components/ui/mid-flight/TextInput";
import YearRange from "@/components/ui/mid-flight/YearRange";
import type { Region } from "@/data/flights";
import { airportByCode, hauls, regions, type Haul } from "@/lib/flightLog";
import { labelText } from "@/components/ui/mid-flight/styles";

/** `route` is an airport pair picked on the globe; it matches flights in either direction. */
export type Filters = { query: string; regions: Region[]; hauls: Haul[]; years: [number, number] | null; redEyes: boolean; firstVisits: boolean; route: [string, string] | null };
export const noFilters: Filters = { query: "", regions: [], hauls: [], years: null, redEyes: false, firstVisits: false, route: null };
export const isFiltered = (f: Filters) =>
  f.query.trim() !== "" || f.regions.length > 0 || f.hauls.length > 0 || f.years !== null || f.redEyes || f.firstVisits || f.route !== null;

export const sorts = ["Most recent", "Longest distance", "Airline"] as const;
export type Sort = (typeof sorts)[number];

type Props = {
  filters: Filters;
  onChange: (f: Filters) => void;
  sort: Sort;
  onSortChange: (s: Sort) => void;
  yearBounds: [number, number];
  /** Chips with no flights under the other filters are disabled. */
  emptyRegions: Region[];
  emptyHauls: Haul[];
};

// Everything that narrows or orders the list: search and sort, region chips, a year range, and two checkboxes.
export default function FilterBar({ filters, onChange, sort, onSortChange, yearBounds, emptyRegions, emptyHauls }: Props) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });
  return (
    <div className="grid gap-5">
      {filters.route && (
        <div className="flex flex-wrap items-center gap-3">
          <span className={labelText}>Route from the globe</span>
          <Chip selected onClick={() => set({ route: null })} aria-label={`Remove route filter: ${filters.route.join(" and ")}`}>
            {airportByCode.get(filters.route[0])?.city} ⇄ {airportByCode.get(filters.route[1])?.city}
            <span aria-hidden className="ml-1">✕</span>
          </Chip>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-[1fr_12rem]">
        <TextInput label="Search" icon="search" type="search" placeholder="City, airport, or airline" value={filters.query} onChange={(e) => set({ query: e.target.value })} />
        <Select label="Sort by" options={[...sorts]} value={sort} onChange={(e) => onSortChange(e.target.value as Sort)} />
      </div>
      <div className="grid gap-2">
        <span className={labelText}>Region</span>
        <FilterChips label="Filter by region" options={regions} value={filters.regions} onChange={(r) => set({ regions: r })} disabledOptions={emptyRegions} />
      </div>
      <div className="grid gap-2">
        <span className={labelText}>Flight time</span>
        <FilterChips label="Filter by flight time" options={[...hauls]} value={filters.hauls} onChange={(h) => set({ hauls: h })} disabledOptions={emptyHauls} />
      </div>
      <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-10">
        <YearRange
          min={yearBounds[0]}
          max={yearBounds[1]}
          value={filters.years ?? yearBounds}
          onChange={(v) => set({ years: v[0] === yearBounds[0] && v[1] === yearBounds[1] ? null : v })}
        />
        <fieldset className="grid gap-3">
          <legend className="sr-only">Only show</legend>
          <Checkbox label="Red-eyes only" checked={filters.redEyes} onChange={(e) => set({ redEyes: e.target.checked })} />
          <Checkbox label="First visit to a country" checked={filters.firstVisits} onChange={(e) => set({ firstVisits: e.target.checked })} />
        </fieldset>
      </div>
    </div>
  );
}
