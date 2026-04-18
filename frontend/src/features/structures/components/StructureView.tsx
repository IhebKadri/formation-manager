import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGrid, List } from "lucide-react";

export const StructureView = ({
  view,
  setView,
}: {
  view: "grid" | "list";
  setView: (view: "grid" | "list") => void;
}) => {
  return (
    <Tabs
      defaultValue={view}
      onValueChange={(value) => setView(value as "grid" | "list")}
      className="w-full"
    >
      <TabsList className="w-full">
        <TabsTrigger value="grid">
          <LayoutGrid />
          Grille
        </TabsTrigger>
        <TabsTrigger value="list">
          <List />
          Liste
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
