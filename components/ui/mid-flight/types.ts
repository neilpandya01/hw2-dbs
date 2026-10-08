export type FlightView = {
  id: string;
  from: string;
  to: string;
  fromCity: string;
  toCity: string;
  date: string; // display, e.g. "Mar 14, 2023"
  airline: string;
  flightNo: string;
  aircraft: string;
  seat: string;
  distanceMi: number;
  duration: string;
  redEye?: boolean;
  newCountry?: boolean;
  note?: string;
};
