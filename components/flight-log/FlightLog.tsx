"use client";

import { useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/mid-flight/Button";
import DetailPanel from "@/components/ui/mid-flight/DetailPanel";
import { mfFonts } from "@/components/ui/mid-flight/fonts";
import { EmptyState, LoadingState, SuccessState } from "@/components/ui/mid-flight/States";
import { bodyText, fmtDistance, headingText, labelText, type Unit } from "@/components/ui/mid-flight/styles";
import Tabs from "@/components/ui/mid-flight/Tabs";
import TextLink from "@/components/ui/mid-flight/TextLink";
import Toggle from "@/components/ui/mid-flight/Toggle";
import { flights as seedFlights, HOME, type Flight, type Region } from "@/data/flights";
import { hauls, regions, summarize, toLogFlights, type LogFlight } from "@/lib/flightLog";
import FilterBar, { isFiltered, noFilters, type Filters, type Sort } from "./FilterBar";
import FlightList, { type View } from "./FlightList";
import Globe, { midpoint } from "./Globe";
import LogFlightDialog from "./LogFlightDialog";
import SiteHeader from "./SiteHeader";
import StatsSummary from "./StatsSummary";

const views: View[] = ["List", "Cards"];

// `ignore…` lets a chip group ask "would this option match anything, given everything else?"
function matches(f: LogFlight, filters: Filters, { ignoreRegions = false, ignoreHauls = false } = {}) {
  const q = filters.query.trim().toLowerCase();
  return (
    (!filters.years || (f.year >= filters.years[0] && f.year <= filters.years[1])) &&
    (ignoreRegions || filters.regions.length === 0 || f.regions.some((r) => filters.regions.includes(r))) &&
    (ignoreHauls || filters.hauls.length === 0 || filters.hauls.includes(f.haul)) &&
    (!filters.redEyes || !!f.redEye) &&
    (!filters.firstVisits || !!f.newCountry) &&
    (!filters.route || (filters.route.includes(f.from) && filters.route.includes(f.to))) &&
    (!q || [f.from, f.to, f.fromCity, f.toCity, f.airline, f.fromAirport.country, f.toAirport.country].some((s) => s.toLowerCase().includes(q)))
  );
}

export default function FlightLog() {
  // Flights logged here live in memory only: a reload brings back data/flights.ts.
  const [raw, setRaw] = useState<Flight[]>(seedFlights);
  const all = useMemo(() => toLogFlights(raw), [raw]);
  const stats = useMemo(() => summarize(all), [all]);
  const routes = useMemo(() => all.map((f) => ({ id: f.id, a: f.fromAirport, b: f.toAirport })), [all]);
  const yearBounds: [number, number] = [stats.firstYear, stats.lastYear];

  const [filters, setFilters] = useState<Filters>(noFilters);
  const [sort, setSort] = useState<Sort>("Most recent");
  const [view, setView] = useState<View>("List");
  const [unit, setUnit] = useState<Unit>("mi");
  const [showRoutes, setShowRoutes] = useState(true);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [detail, setDetail] = useState<LogFlight | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [logging, setLogging] = useState(false);
  const [added, setAdded] = useState<LogFlight | null>(null);

  // The data ships with the page, so this only stands in for a fetch: a short loading state on arrival.
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const filtered = isFiltered(filters);
  const shown = useMemo(() => {
    const list = all.filter((f) => matches(f, filters));
    if (sort === "Longest distance") return [...list].sort((a, b) => b.distanceMi - a.distanceMi);
    if (sort === "Airline") return [...list].sort((a, b) => a.airline.localeCompare(b.airline) || b.iso.localeCompare(a.iso));
    return list;
  }, [all, filters, sort]);
  const shownIds = useMemo(() => new Set(shown.map((f) => f.id)), [shown]);
  const emptyRegions = useMemo(() => regions.filter((r: Region) => !all.some((f) => f.regions.includes(r) && matches(f, filters, { ignoreRegions: true }))), [all, filters]);
  const emptyHauls = useMemo(() => hauls.filter((h) => !all.some((f) => f.haul === h && matches(f, filters, { ignoreHauls: true }))), [all, filters]);

  const highlight = previewId ?? (detailOpen ? detail?.id : null) ?? null;
  const highlighted = all.find((f) => f.id === highlight);
  const focus = useMemo(() => (highlighted ? midpoint(highlighted.fromAirport, highlighted.toAirport) : null), [highlighted]);
  const detailRoute = useMemo(() => (detail ? [{ id: detail.id, a: detail.fromAirport, b: detail.toAirport }] : []), [detail]);
  const detailFocus = useMemo(() => (detail ? midpoint(detail.fromAirport, detail.toAirport) : null), [detail]);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(null), 6000);
    return () => clearTimeout(t);
  }, [added]);

  // After picking on the globe, bring the list into view if it's off screen (phones: it's below the globe).
  const revealList = () => {
    const el = document.getElementById("flights-title");
    const top = el?.getBoundingClientRect().top ?? 0;
    if (el && (top < 0 || top > window.innerHeight * 0.6))
      el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };
  // Clicking the airport or route that's already picked un-picks it (toggle), like a chip.
  const pickAirport = (code: string) => {
    if (filters.query.trim().toUpperCase() === code) return setFilters({ ...filters, query: "" });
    setFilters({ ...noFilters, query: code });
    revealList();
  };
  const pickRoute = (id: string) => {
    const f = all.find((x) => x.id === id);
    if (!f) return;
    setPreviewId(null);
    if (filters.route?.includes(f.from) && filters.route.includes(f.to)) return setFilters({ ...filters, route: null });
    setFilters({ ...noFilters, route: [f.from, f.to] });
    revealList();
  };

  const openFlight = (f: LogFlight) => {
    setDetail(f);
    setDetailOpen(true);
  };
  const addFlight = (f: Flight) => {
    const next = [...raw, f];
    setRaw(next);
    setFilters(noFilters);
    setSort("Most recent");
    setLogging(false);
    setAdded(toLogFlights(next).find((v) => v.id === f.id)!);
    setPreviewId(f.id);
  };

  return (
    <div className={`${mfFonts} min-h-screen bg-mf-bg font-mf text-mf-text antialiased`}>
      {/* Keyboard users can jump past the header, hero and globe straight to the list. */}
      <a
        href="#flights-title"
        className="sr-only z-40 rounded-full bg-mf-surface px-4 py-2 text-sm text-mf-text outline-2 outline-mf-focus focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to flights
      </a>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-6 sm:gap-14 sm:px-8 sm:py-8">
        <SiteHeader unit={unit} onUnitChange={setUnit} />
        <main id="main" className="grid gap-10 sm:gap-14">
          <StatsSummary stats={stats} unit={unit} justLogged={!!added} onLog={() => setLogging(true)} />

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
            <section aria-labelledby="globe-title" className="grid content-start gap-4 lg:sticky lg:top-8 lg:self-start">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <h2 id="globe-title" className={headingText}>
                  Where I&apos;ve been
                </h2>
                <Toggle label="Show routes" on={showRoutes} onChange={setShowRoutes} />
              </div>
              <Globe
                routes={routes}
                activeIds={filtered ? shownIds : undefined}
                highlightId={highlight}
                focus={focus}
                home={HOME}
                showRoutes={showRoutes}
                onAirportClick={pickAirport}
                onRouteClick={pickRoute}
                label={`Globe of ${stats.flights} flights between ${stats.airports} airports in ${stats.countries} countries. Drag or use the arrow keys to turn it; the list has every flight.`}
                className="mx-auto max-w-[36rem]"
              />
              <p className={`min-h-[52px] text-center text-mf-muted ${bodyText}`}>
                {highlighted ? (
                  <>
                    <span className="text-mf-text">
                      {highlighted.fromCity} → {highlighted.toCity}
                    </span>{" "}
                    · {highlighted.date} · {fmtDistance(highlighted.distanceMi, unit)}
                  </>
                ) : (
                  "Drag to turn. Point at a flight to trace it; click a route or an airport to see its flights."
                )}
              </p>
            </section>

            <section aria-labelledby="flights-title" className="grid content-start gap-6">
              <div className="flex items-baseline justify-between gap-4">
                <h2 id="flights-title" className={headingText}>
                  Flights
                </h2>
                <p className={labelText} aria-live="polite">
                  {filtered ? `${shown.length} of ${all.length}` : `${all.length} total`}
                </p>
              </div>
              <FilterBar filters={filters} onChange={setFilters} sort={sort} onSortChange={setSort} yearBounds={yearBounds} emptyRegions={emptyRegions} emptyHauls={emptyHauls} />
              <div className="flex items-end justify-between gap-4">
                <Tabs tabs={views} defaultIndex={views.indexOf(view)} onChange={(i) => setView(views[i])} />
                {filtered && <TextLink onClick={() => setFilters(noFilters)}>Clear filters</TextLink>}
              </div>
              <div role="tabpanel" aria-label={`${view} of flights`}>
                {loading ? (
                  <LoadingState />
                ) : all.length === 0 ? (
                  <EmptyState action={<Button onClick={() => setLogging(true)}>Log a flight</Button>} />
                ) : shown.length === 0 ? (
                  <EmptyState
                    title="No flights match"
                    message="Try another search, or clear the filters to see every trip."
                    action={
                      <Button variant="secondary" onClick={() => setFilters(noFilters)}>
                        Clear filters
                      </Button>
                    }
                  />
                ) : (
                  <FlightList flights={shown} view={view} byYear={sort === "Most recent"} unit={unit} selectedId={highlight} onPreview={setPreviewId} onOpen={openFlight} />
                )}
              </div>
            </section>
          </div>
        </main>
      </div>

      {detail && (
        <DetailPanel
          flight={detail}
          open={detailOpen}
          onClose={() => setDetailOpen(false)}
          unit={unit}
          media={
            <Globe
              routes={detailRoute}
              highlightId={detail.id}
              focus={detailFocus}
              autoRotate={false}
              label={`Globe showing the route from ${detail.fromCity} to ${detail.toCity}.`}
              className="mx-auto max-w-56"
            />
          }
        />
      )}
      <LogFlightDialog open={logging} existing={raw} unit={unit} onClose={() => setLogging(false)} onAdd={addFlight} />

      <div aria-live="polite" className="pointer-events-none fixed inset-x-4 bottom-4 z-30 flex justify-center sm:inset-x-auto sm:right-8 sm:bottom-8">
        {added && (
          <div className="pointer-events-auto w-full max-w-sm">
            <SuccessState title="Flight added" message={`${added.from} → ${added.to} is on your globe for this visit. Nothing is saved.`} onDismiss={() => setAdded(null)}>
              <TextLink onClick={() => openFlight(added)}>View flight</TextLink>
            </SuccessState>
          </div>
        )}
      </div>
    </div>
  );
}
