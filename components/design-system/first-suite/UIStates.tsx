import { EmptyState, ErrorState, LoadingState, SuccessState } from "@/components/ui/first-suite/States";
import Section, { Specimen } from "./Section";

export default function UIStates() {
  return (
    <Section n={6} title="UI states" note="What the flight log says when there's nothing yet, something on its way, a problem, or good news.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Specimen label="Empty"><EmptyState /></Specimen>
        <Specimen label="Loading"><LoadingState /></Specimen>
        <Specimen label="Error"><ErrorState /></Specimen>
        <Specimen label="Success"><SuccessState /></Specimen>
      </div>
    </Section>
  );
}
