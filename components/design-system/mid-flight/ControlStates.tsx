import Button from "@/components/ui/mid-flight/Button";
import Chip from "@/components/ui/mid-flight/Chip";
import TextInput from "@/components/ui/mid-flight/TextInput";
import type { ControlState } from "@/components/ui/mid-flight/styles";
import Section from "./Section";

const states: ControlState[] = ["rest", "hover", "focus", "pressed", "selected", "disabled"];

const rows: { name: string; render: (s: ControlState) => React.ReactNode | null }[] = [
  { name: "Primary button", render: (s) => <Button state={s} className="w-32">{s === "selected" ? "✓ Logged" : "Add a flight"}</Button> },
  { name: "Secondary button", render: (s) => <Button variant="secondary" state={s} className="w-28">{s === "selected" ? "✓ Saved" : "Export"}</Button> },
  { name: "Filter chip", render: (s) => <Chip state={s} className="w-20 justify-center">Asia</Chip> },
  {
    name: "Text input",
    render: (s) =>
      s === "pressed" || s === "selected" ? null : (
        <TextInput label={`Search (${s})`} hideLabel placeholder="Tokyo" state={s} defaultValue={s === "focus" ? "Tokyo" : undefined} id={`state-input-${s}`} className="w-32" />
      ),
  },
];

const meaning: Record<ControlState, string> = {
  rest: "Available",
  hover: "LED glow: clickable",
  focus: "Cyan ring: keyboard is here",
  pressed: "Sinks, darkens",
  selected: "Cyan = chosen",
  disabled: "Dimmed, no glow",
};

export default function ControlStates() {
  return (
    <Section n={5} title="Control states" note="Hover glows like the LED strip, focus is the aisle-light cyan, selected stays cyan.">
      <div className="-mx-4 min-w-0 overflow-x-auto px-4">
        <table className="w-full min-w-[62rem] table-fixed border-separate border-spacing-y-2 font-mf">
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
                  <span className="block font-mf-mono text-[0.6875rem] tracking-[0.2em] text-mf-text uppercase">{s}</span>
                  <span className="block text-[0.6875rem] font-light text-mf-muted">{meaning[s]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <th scope="row" className="pr-4 text-left align-middle text-sm font-normal text-mf-muted">
                  {r.name}
                </th>
                {states.map((s) => (
                  <td key={s} className="px-2 align-middle">
                    <div className="flex h-14 items-center justify-center">{r.render(s) ?? <span className="font-mf-mono text-xs text-mf-muted/50">n/a</span>}</div>
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
