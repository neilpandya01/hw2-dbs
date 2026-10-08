import { airports, HOME, type Airport, type Flight, type Region } from "@/data/flights";
import type { FlightView } from "@/components/ui/mid-flight/types";

export const regions: Region[] = ["Americas", "Europe", "Middle East", "Asia", "Oceania"];

export const airportByCode = new Map(airports.map((a) => [a.iata, a]));

// Flight length, by gate-to-gate time. Roughly the short / medium / long / ultra-long haul split airlines use.
export const hauls = ["Under 3h", "3–6h", "6–12h", "12h+"] as const;
export type Haul = (typeof hauls)[number];
export const haulOf = (minutes: number): Haul => (minutes < 180 ? "Under 3h" : minutes < 360 ? "3–6h" : minutes < 720 ? "6–12h" : "12h+");

export type LogFlight = FlightView & {
  iso: string;
  year: number;
  fromAirport: Airport;
  toAirport: Airport;
  regions: Region[];
  minutes: number;
  estimated: boolean; // minutes came from distance, not from the log
  haul: Haul;
};

const rad = (d: number) => (d * Math.PI) / 180;

// Great-circle distance on the WGS-84 ellipsoid (Vincenty's inverse formula), the same
// basis as Great Circle Mapper and airline published distances. A plain sphere can be off by ~0.5%.
export function distanceMi(a: Airport, b: Airport) {
  const A = 6378137, F = 1 / 298.257223563, B = A * (1 - F);
  const L = rad(b.lon - a.lon);
  const U1 = Math.atan((1 - F) * Math.tan(rad(a.lat))), U2 = Math.atan((1 - F) * Math.tan(rad(b.lat)));
  const sinU1 = Math.sin(U1), cosU1 = Math.cos(U1), sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);
  let lambda = L, sinSigma = 0, cosSigma = 0, sigma = 0, cos2Alpha = 0, cos2SigmaM = 0;
  for (let i = 0; i < 200; i++) {
    const sinL = Math.sin(lambda), cosL = Math.cos(lambda);
    sinSigma = Math.hypot(cosU2 * sinL, cosU1 * sinU2 - sinU1 * cosU2 * cosL);
    if (sinSigma === 0) return 0;
    cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosL;
    sigma = Math.atan2(sinSigma, cosSigma);
    const sinAlpha = (cosU1 * cosU2 * sinL) / sinSigma;
    cos2Alpha = 1 - sinAlpha * sinAlpha;
    cos2SigmaM = cos2Alpha ? cosSigma - (2 * sinU1 * sinU2) / cos2Alpha : 0;
    const C = (F / 16) * cos2Alpha * (4 + F * (4 - 3 * cos2Alpha));
    const prev = lambda;
    lambda = L + (1 - C) * F * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM ** 2)));
    if (Math.abs(lambda - prev) < 1e-12) break;
  }
  const u2 = (cos2Alpha * (A * A - B * B)) / (B * B);
  const kA = 1 + (u2 / 16384) * (4096 + u2 * (-768 + u2 * (320 - 175 * u2)));
  const kB = (u2 / 1024) * (256 + u2 * (-128 + u2 * (74 - 47 * u2)));
  const dSigma = kB * sinSigma * (cos2SigmaM + (kB / 4) * (cosSigma * (-1 + 2 * cos2SigmaM ** 2) - (kB / 6) * cos2SigmaM * (-3 + 4 * sinSigma ** 2) * (-3 + 4 * cos2SigmaM ** 2)));
  return (B * kA * (sigma - dSigma)) / 1609.344; // unrounded: each view rounds once, in its own unit
}

// Gate-to-gate estimate when the log has no time: ~30 min of taxi and climb plus ~490 mph cruise.
const estimateMinutes = (mi: number) => Math.round((30 + mi / 8.2) / 5) * 5;
const fmtDuration = (m: number, estimated: boolean) => `${estimated ? "~" : ""}${Math.floor(m / 60)}h ${String(m % 60).padStart(2, "0")}m`;
const fmtDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

// Newest first. `newCountry` marks the first time a country shows up as a destination.
export function toLogFlights(list: Flight[]): LogFlight[] {
  const seen = new Set([airportByCode.get(HOME)?.country]);
  const views = [...list]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((f) => {
      const fromAirport = airportByCode.get(f.from)!, toAirport = airportByCode.get(f.to)!;
      const distance = distanceMi(fromAirport, toAirport);
      const estimated = f.minutes === undefined;
      const minutes = f.minutes ?? estimateMinutes(distance);
      const newCountry = !seen.has(toAirport.country);
      seen.add(toAirport.country);
      return {
        id: f.id,
        from: f.from,
        to: f.to,
        fromCity: fromAirport.city,
        toCity: toAirport.city,
        date: fmtDate(f.date),
        airline: f.airline,
        flightNo: f.flightNumber,
        aircraft: f.aircraft,
        seat: f.seat,
        distanceMi: distance,
        duration: fmtDuration(minutes, estimated),
        redEye: f.redEye,
        newCountry,
        note: f.notes,
        iso: f.date,
        year: +f.date.slice(0, 4),
        fromAirport,
        toAirport,
        regions: [...new Set([fromAirport.region, toAirport.region])],
        minutes,
        estimated,
        haul: haulOf(minutes),
      };
    });
  return views.reverse();
}

export const EARTH_CIRCUMFERENCE_MI = 24901; // at the equator
const KM_PER_MI = 1.609344;

export function summarize(list: LogFlight[]) {
  const codes = new Set(list.flatMap((f) => [f.from, f.to]));
  const countries = new Set([...codes].map((c) => airportByCode.get(c)!.country));
  // Totals add up the per-flight figures as displayed, so the headline always equals the sum of the rows.
  const miles = list.reduce((s, f) => s + Math.round(f.distanceMi), 0);
  const km = list.reduce((s, f) => s + Math.round(f.distanceMi * KM_PER_MI), 0);
  const minutes = list.reduce((s, f) => s + f.minutes, 0);
  const years = list.map((f) => f.year);
  return {
    flights: list.length,
    miles,
    km,
    hours: Math.round(minutes / 60),
    hoursEstimated: list.some((f) => f.estimated),
    airports: codes.size,
    countries: countries.size,
    firstYear: Math.min(...years),
    lastYear: Math.max(...years),
  };
}
