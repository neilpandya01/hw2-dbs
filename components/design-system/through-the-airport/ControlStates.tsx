import Button from "@/components/ui/through-the-airport/Button";
import Chip from "@/components/ui/through-the-airport/Chip";
import TextInput from "@/components/ui/through-the-airport/TextInput";
import type { ControlState } from "@/components/ui/through-the-airport/styles";
import Section from "./Section";

const states: ControlState[] = ["rest", "hover", "focus", "pressed", "selected", "disabled"];

const rows: { name: string; render: (s: ControlState) => React.ReactNode | null }[] = [
  { name: "Primary button", render: (s) => <Button state={s} className="w-36">{s === "selected" ? "✓ Logged" : "Log a flight"}</Button> },
  { name: "Secondary button", render: (s) => <Button variant="secondary" state={s} className="w-28">{s === "selected" ? "✓ Saved" : "Export"}</Button> },
  { name: "Filter chip", render: (s) => <Chip state={s} className="w-24 justify-center">Asia</Chip> },
  {
    name: "Text input",
    render: (s) =>
      s === "pressed" || s === "selected" ? null : (
        <TextInput label={`Search (${s})`} hideLabel placeholder="Tokyo" state={s} defaultValue={s === "focus" ? "Tokyo" : undefined} id={`ap-state-input-${s}`} className="w-32" />
      ),
  },
];

const meaning: Record<ControlState, string> = {
  rest: "Available",
  hover: "Lights up or darkens: clickable",
  focus: "Blue ring: keyboard is here",
  pressed: "Drops 2px",
  selected: "Green = done, black = chosen",
  disabled: "Hatched: lane closed",
};

export default function ControlStates() {
  return (
    <Section n={5} title="Control states" note="The yellow button lights up like a sign on hover. Focus is a thick blue ring; disabled is hatched like a closed lane.">
      <div className="-mx-4 min-w-0 overflow-x-auto px-4">
        <table className="w-full min-w-[64rem] table-fixed border-separate border-spacing-y-3 font-ap">
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
                  <span className="block font-ap-cond text-[15px] font-bold tracking-[0.06em] text-ap-text uppercase">{s}</span>
                  <span className="mt-1 block text-xs font-normal text-ap-muted">{meaning[s]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <th scope="row" className="pr-4 text-left align-middle font-ap-cond text-base font-semibold text-ap-muted uppercase">
                  {r.name}
                </th>
                {states.map((s) => (
                  <td key={s} className="px-2 align-middle">
                    <div className="flex h-16 items-center justify-center">{r.render(s) ?? <span className="text-xs text-ap-muted">n/a</span>}</div>
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
