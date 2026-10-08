import Button from "@/components/ui/first-suite/Button";
import Chip from "@/components/ui/first-suite/Chip";
import TextInput from "@/components/ui/first-suite/TextInput";
import type { ControlState } from "@/components/ui/first-suite/styles";
import Section from "./Section";

const states: ControlState[] = ["rest", "hover", "focus", "pressed", "selected", "disabled"];

const rows: { name: string; render: (s: ControlState) => React.ReactNode | null }[] = [
  { name: "Primary button", render: (s) => <Button state={s} className="w-36">{s === "selected" ? "✓ Logged" : "Log a flight"}</Button> },
  { name: "Secondary button", render: (s) => <Button variant="secondary" state={s} className="w-28">{s === "selected" ? "✓ Saved" : "Export"}</Button> },
  { name: "Filter chip", render: (s) => <Chip state={s} className="w-20 justify-center">Asia</Chip> },
  {
    name: "Text input",
    render: (s) =>
      s === "pressed" || s === "selected" ? null : (
        <TextInput label={`Search (${s})`} hideLabel placeholder="Tokyo" state={s} defaultValue={s === "focus" ? "Tokyo" : undefined} id={`fs-state-input-${s}`} className="w-32" />
      ),
  },
];

const meaning: Record<ControlState, string> = {
  rest: "Available",
  hover: "Line darkens: clickable",
  focus: "Brass ring: keyboard is here",
  pressed: "Settles 1px, deepens",
  selected: "Espresso = chosen",
  disabled: "Sand, no line",
};

export default function ControlStates() {
  return (
    <Section n={5} title="Control states" note="Hover darkens the line, focus is a deep-brass ring, selected turns espresso. Nothing glows or lifts.">
      <div className="-mx-4 min-w-0 overflow-x-auto px-4">
        <table className="w-full min-w-[64rem] table-fixed border-separate border-spacing-y-3 font-fs">
          <colgroup>
            <col className="w-40" />
            {states.map((s) => (
              <col key={s} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th />
              {states.map((s) => (
                <th key={s} scope="col" className="px-2 pb-3 text-center align-top">
                  <span className="block text-[11px] font-medium tracking-[0.24em] text-fs-text uppercase">{s}</span>
                  <span className="mt-1 block text-[11px] font-light text-fs-muted">{meaning[s]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <th scope="row" className="pr-4 text-left align-middle text-sm font-light text-fs-muted">
                  {r.name}
                </th>
                {states.map((s) => (
                  <td key={s} className="px-2 align-middle">
                    <div className="flex h-16 items-center justify-center">{r.render(s) ?? <span className="text-xs font-light text-fs-muted">n/a</span>}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
