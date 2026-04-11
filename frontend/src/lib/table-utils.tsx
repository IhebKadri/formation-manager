import type { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

export function sortableHeader<TData, TValue>(label: string) {
  return ({ column }: { column: Column<TData, TValue> }) => {
    const sorted = column.getIsSorted();

    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(sorted === "asc")}
        className="group -ml-3 h-8 gap-2 px-3 font-medium hover:bg-accent/50"
      >
        <div className="flex w-4 items-center justify-center">
          {sorted === "desc" ? (
            <ArrowDown className="h-4 w-4" />
          ) : sorted === "asc" ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground/30 transition-colors group-hover:text-muted-foreground" />
          )}
        </div>
        {label}
      </Button>
    );
  };
}
