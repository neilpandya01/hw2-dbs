// Static flight history. No API or database — edit this file by hand.
// Placeholder trips for now: replace them with real flights. Every code used in
// `flights` needs an entry in `airports` (that's where the globe gets coordinates).

export type Region = "Americas" | "Europe" | "Middle East" | "Asia" | "Oceania";

export type Airport = {
  iata: string; // e.g. "ORD"
  city: string;
  country: string;
  region: Region;
  lat: number; // airport reference point, 4 decimals (~10 m)
  lon: number;
};

export type Flight = {
  id: string;
  date: string; // ISO date, e.g. "2024-06-12"
  from: string; // IATA code
  to: string; // IATA code
  airline: string;
  flightNumber: string;
  aircraft: string;
  seat: string;
  redEye?: boolean;
  notes?: string;
  /** Gate-to-gate time in minutes, if you know it. Otherwise it's estimated from distance (shown with "~"). */
  minutes?: number;
};

export const TRAVELER = "Neil";
export const HOME = "ORD";

export const airports: Airport[] = [
  { iata: "ORD", city: "Chicago", country: "United States", region: "Americas", lat: 41.9786, lon: -87.9048 },
  { iata: "JFK", city: "New York", country: "United States", region: "Americas", lat: 40.6413, lon: -73.7781 },
  { iata: "SFO", city: "San Francisco", country: "United States", region: "Americas", lat: 37.6213, lon: -122.379 },
  { iata: "LAX", city: "Los Angeles", country: "United States", region: "Americas", lat: 33.9416, lon: -118.4085 },
  { iata: "SEA", city: "Seattle", country: "United States", region: "Americas", lat: 47.4502, lon: -122.3088 },
  { iata: "MIA", city: "Miami", country: "United States", region: "Americas", lat: 25.7959, lon: -80.287 },
  { iata: "DEN", city: "Denver", country: "United States", region: "Americas", lat: 39.8561, lon: -104.6737 },
  { iata: "YYZ", city: "Toronto", country: "Canada", region: "Americas", lat: 43.6777, lon: -79.6248 },
  { iata: "MEX", city: "Mexico City", country: "Mexico", region: "Americas", lat: 19.4363, lon: -99.0721 },
  { iata: "CUN", city: "Cancún", country: "Mexico", region: "Americas", lat: 21.0365, lon: -86.8771 },
  { iata: "GRU", city: "São Paulo", country: "Brazil", region: "Americas", lat: -23.4356, lon: -46.4731 },
  { iata: "LHR", city: "London", country: "United Kingdom", region: "Europe", lat: 51.47, lon: -0.4543 },
  { iata: "CDG", city: "Paris", country: "France", region: "Europe", lat: 49.0097, lon: 2.5479 },
  { iata: "KEF", city: "Reykjavík", country: "Iceland", region: "Europe", lat: 63.985, lon: -22.6056 },
  { iata: "BCN", city: "Barcelona", country: "Spain", region: "Europe", lat: 41.2974, lon: 2.0833 },
  { iata: "FCO", city: "Rome", country: "Italy", region: "Europe", lat: 41.8003, lon: 12.2389 },
  { iata: "DXB", city: "Dubai", country: "United Arab Emirates", region: "Middle East", lat: 25.2532, lon: 55.3657 },
  { iata: "BOM", city: "Mumbai", country: "India", region: "Asia", lat: 19.0896, lon: 72.8656 },
  { iata: "DEL", city: "Delhi", country: "India", region: "Asia", lat: 28.5562, lon: 77.1 },
  { iata: "SIN", city: "Singapore", country: "Singapore", region: "Asia", lat: 1.3644, lon: 103.9915 },
  { iata: "ICN", city: "Seoul", country: "South Korea", region: "Asia", lat: 37.4602, lon: 126.4407 },
  { iata: "HND", city: "Tokyo", country: "Japan", region: "Asia", lat: 35.5494, lon: 139.7798 },
  { iata: "NRT", city: "Tokyo", country: "Japan", region: "Asia", lat: 35.772, lon: 140.3929 },
  { iata: "SYD", city: "Sydney", country: "Australia", region: "Oceania", lat: -33.9399, lon: 151.1753 },
];

export const flights: Flight[] = [
  { id: "f01", date: "2017-06-18", from: "ORD", to: "LHR", airline: "American", flightNumber: "AA 98", aircraft: "Boeing 777-300ER", seat: "34A", redEye: true, notes: "First time crossing an ocean. Didn't sleep at all — just watched the little plane on the seatback map inch past Greenland." },
  { id: "f02", date: "2017-06-25", from: "LHR", to: "CDG", airline: "Air France", flightNumber: "AF 1081", aircraft: "Airbus A320", seat: "12F" },
  { id: "f03", date: "2017-07-02", from: "CDG", to: "ORD", airline: "United", flightNumber: "UA 987", aircraft: "Boeing 787-10", seat: "40K" },
  { id: "f04", date: "2018-03-10", from: "ORD", to: "MIA", airline: "American", flightNumber: "AA 1349", aircraft: "Airbus A321", seat: "22A" },
  { id: "f05", date: "2018-03-17", from: "MIA", to: "ORD", airline: "American", flightNumber: "AA 2405", aircraft: "Boeing 737-800", seat: "18F" },
  { id: "f06", date: "2018-08-04", from: "ORD", to: "SFO", airline: "United", flightNumber: "UA 1105", aircraft: "Boeing 757-200", seat: "31A" },
  { id: "f07", date: "2018-08-11", from: "SFO", to: "ORD", airline: "United", flightNumber: "UA 238", aircraft: "Boeing 737-900", seat: "27A", redEye: true },
  { id: "f08", date: "2019-05-20", from: "ORD", to: "NRT", airline: "ANA", flightNumber: "NH 11", aircraft: "Boeing 777-300ER", seat: "32A", notes: "Thirteen hours chasing the afternoon. Somewhere over the Bering Sea the whole cabin went blue and silent." },
  { id: "f09", date: "2019-05-27", from: "HND", to: "ICN", airline: "Korean Air", flightNumber: "KE 2708", aircraft: "Airbus A330-300", seat: "41A" },
  { id: "f10", date: "2019-06-02", from: "ICN", to: "ORD", airline: "Korean Air", flightNumber: "KE 37", aircraft: "Boeing 777-300ER", seat: "47K" },
  { id: "f11", date: "2019-12-20", from: "ORD", to: "DEN", airline: "United", flightNumber: "UA 501", aircraft: "Airbus A320", seat: "9A" },
  { id: "f12", date: "2019-12-27", from: "DEN", to: "ORD", airline: "United", flightNumber: "UA 1720", aircraft: "Boeing 737 MAX 9", seat: "14F" },
  { id: "f13", date: "2021-07-09", from: "ORD", to: "LAX", airline: "American", flightNumber: "AA 1", aircraft: "Airbus A321", seat: "20A" },
  { id: "f14", date: "2021-07-16", from: "LAX", to: "JFK", airline: "JetBlue", flightNumber: "B6 524", aircraft: "Airbus A321", seat: "16A", redEye: true, notes: "Red-eye across the whole country. Every city between LA and New York lit up below, one after another." },
  { id: "f15", date: "2021-07-18", from: "JFK", to: "ORD", airline: "Delta", flightNumber: "DL 2421", aircraft: "Airbus A220-300", seat: "11A" },
  { id: "f16", date: "2022-03-12", from: "ORD", to: "CUN", airline: "United", flightNumber: "UA 1218", aircraft: "Boeing 737-800", seat: "25A" },
  { id: "f17", date: "2022-03-19", from: "CUN", to: "ORD", airline: "United", flightNumber: "UA 1897", aircraft: "Boeing 737-800", seat: "23F" },
  { id: "f18", date: "2022-12-18", from: "ORD", to: "DXB", airline: "Emirates", flightNumber: "EK 236", aircraft: "Airbus A380", seat: "81A", redEye: true, notes: "Upper deck of the A380. The ceiling lights faded through purple to a fake starry sky." },
  { id: "f19", date: "2022-12-22", from: "DXB", to: "BOM", airline: "Emirates", flightNumber: "EK 500", aircraft: "Boeing 777-300ER", seat: "38K" },
  { id: "f20", date: "2022-12-30", from: "BOM", to: "DEL", airline: "Vistara", flightNumber: "UK 940", aircraft: "Airbus A320neo", seat: "6A" },
  { id: "f21", date: "2023-01-06", from: "DEL", to: "ORD", airline: "Air India", flightNumber: "AI 127", aircraft: "Boeing 777-200LR", seat: "29A", redEye: true },
  { id: "f22", date: "2023-06-14", from: "ORD", to: "KEF", airline: "Icelandair", flightNumber: "FI 852", aircraft: "Boeing 757-200", seat: "19A", redEye: true, notes: "June over the North Atlantic: it never got fully dark, just a long blue dusk on the wing." },
  { id: "f23", date: "2023-06-17", from: "KEF", to: "BCN", airline: "Icelandair", flightNumber: "FI 594", aircraft: "Boeing 737 MAX 8", seat: "8F" },
  { id: "f24", date: "2023-06-22", from: "BCN", to: "FCO", airline: "Vueling", flightNumber: "VY 6104", aircraft: "Airbus A320", seat: "14A" },
  { id: "f25", date: "2023-06-28", from: "FCO", to: "ORD", airline: "United", flightNumber: "UA 971", aircraft: "Boeing 767-300ER", seat: "37A" },
  { id: "f26", date: "2024-04-05", from: "ORD", to: "SEA", airline: "Alaska", flightNumber: "AS 21", aircraft: "Boeing 737-900", seat: "17A" },
  { id: "f27", date: "2024-04-09", from: "SEA", to: "SFO", airline: "Alaska", flightNumber: "AS 1386", aircraft: "Embraer E175", seat: "4A" },
  { id: "f28", date: "2024-04-12", from: "SFO", to: "ORD", airline: "United", flightNumber: "UA 2235", aircraft: "Boeing 737 MAX 9", seat: "27A" },
  { id: "f29", date: "2024-11-21", from: "ORD", to: "LAX", airline: "American", flightNumber: "AA 2463", aircraft: "Boeing 737-800", seat: "26F" },
  { id: "f30", date: "2024-11-21", from: "LAX", to: "SYD", airline: "Qantas", flightNumber: "QF 12", aircraft: "Airbus A380", seat: "72A", redEye: true, notes: "Fourteen hours over the Pacific in the dark. Crossed the date line asleep and lost a whole Friday." },
  { id: "f31", date: "2024-12-04", from: "SYD", to: "SIN", airline: "Singapore Airlines", flightNumber: "SQ 222", aircraft: "Airbus A350-900", seat: "45A" },
  { id: "f32", date: "2024-12-08", from: "SIN", to: "NRT", airline: "Singapore Airlines", flightNumber: "SQ 12", aircraft: "Boeing 777-300ER", seat: "53K", redEye: true },
  { id: "f33", date: "2024-12-08", from: "NRT", to: "ORD", airline: "United", flightNumber: "UA 882", aircraft: "Boeing 787-9", seat: "38A" },
  { id: "f34", date: "2025-02-14", from: "ORD", to: "MEX", airline: "Aeromexico", flightNumber: "AM 683", aircraft: "Boeing 737 MAX 8", seat: "21A" },
  { id: "f35", date: "2025-02-18", from: "MEX", to: "ORD", airline: "Aeromexico", flightNumber: "AM 682", aircraft: "Boeing 737 MAX 8", seat: "19F" },
  { id: "f36", date: "2025-05-09", from: "ORD", to: "YYZ", airline: "Air Canada", flightNumber: "AC 512", aircraft: "Embraer E175", seat: "10A" },
  { id: "f37", date: "2025-05-12", from: "YYZ", to: "ORD", airline: "Air Canada", flightNumber: "AC 513", aircraft: "Embraer E175", seat: "12F" },
  { id: "f38", date: "2025-08-30", from: "ORD", to: "GRU", airline: "United", flightNumber: "UA 845", aircraft: "Boeing 787-8", seat: "33A", redEye: true },
  { id: "f39", date: "2025-09-08", from: "GRU", to: "MIA", airline: "LATAM", flightNumber: "LA 8190", aircraft: "Boeing 767-300ER", seat: "28A", redEye: true },
  { id: "f40", date: "2025-09-09", from: "MIA", to: "ORD", airline: "American", flightNumber: "AA 1544", aircraft: "Airbus A321", seat: "15A" },
];
