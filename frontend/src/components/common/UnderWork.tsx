import { Hammer } from "lucide-react";

export function UnderWork() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-center px-4">
      <Hammer className="h-12 w-12 text-text-secondary mb-4" />

      <h2 className="text-xl font-semibold text-text-primary">
        Under Development
      </h2>

      <p className="mt-2 max-w-md text-sm text-text-secondary">
        This page is currently under development. Please check back later for
        updates.
      </p>
    </div>
  );
}