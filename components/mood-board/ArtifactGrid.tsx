import type { MoodBoardConfig } from "./types";
import Artifact from "./Artifact";

// Masonry grid of artifacts: photos, type, color, texture, and interface pieces.
export default function ArtifactGrid({ board }: { board: MoodBoardConfig }) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {board.artifacts.map((a) => (
        <Artifact key={a.caption} artifact={a} theme={board.theme} />
      ))}
    </div>
  );
}
