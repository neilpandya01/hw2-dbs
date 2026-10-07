import type { Mood } from "@/lib/moods";
import ColorRoles from "./ColorRoles";
import TypeRoles from "./TypeRoles";
import SpacingShape from "./SpacingShape";
import ComponentGallery from "./ComponentGallery";
import ControlStates from "./ControlStates";
import UIStates from "./UIStates";

export default function DesignSystem({ mood }: { mood: Mood }) {
  return (
    <main className="p-6">
      <h1 className="text-3xl">{mood.name} · Design System</h1>
      <ColorRoles />
      <TypeRoles />
      <SpacingShape />
      <ComponentGallery />
      <ControlStates />
      <UIStates />
    </main>
  );
}
