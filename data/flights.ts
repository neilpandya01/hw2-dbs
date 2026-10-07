// Static flight history. No API or database — edit this file by hand.
export type Airport = {
  iata: string; // e.g. "ORD"
  city: string;
  country: string;
  lat: number;
  lon: number;
};

export type Flight = {
  id: string;
  date: string; // ISO date, e.g. "2024-06-12"
  from: string; // IATA code
  to: string; // IATA code
  airline?: string;
  flightNumber?: string;
  notes?: string;
};

export const airports: Airport[] = [];

export const flights: Flight[] = [];
