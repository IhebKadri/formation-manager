import { StructureList } from "./StructureList";
import { StructureGrid } from "./StructureGrid";
import type { Structure } from "@/types";

interface StructuresProps {
  view: "grid" | "list";
  structures: Structure[];
  isLoading: boolean;
}

export function Structures({ view, structures, isLoading }: StructuresProps) {
  return (
    <div className="flex flex-col gap-4">
      {view === "grid" ? (
        <StructureGrid structures={structures} isLoading={isLoading} />
      ) : (
        <StructureList structures={structures} isLoading={isLoading} />
      )}
    </div>
  );
}
