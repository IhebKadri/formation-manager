import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useProfile } from "@/features/profile/hooks";
import { filterNavigation } from "@/config";

export const SearchCommands = () => {
  const { data: user } = useProfile();
  const sections = user ? filterNavigation(user.role) : [];
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const runCommand = useCallback(
    (command: () => void) => {
      setOpen(false);
      command();
    },
    [setOpen],
  );

  const handleItemSelect = useCallback(
    (url: string) => {
      runCommand(() => navigate(url));
    },
    [runCommand, navigate],
  );

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative w-full items-center justify-start rounded-md bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-72",
        )}
        onClick={() => setOpen(true)}
      >
        <span className="inline-flex">
          Search
          <span className="hidden sm:inline-flex">&nbsp;pages</span>...
        </span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.6rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {sections.map((group) => (
            <CommandGroup key={group.id} heading={group.labelKey}>
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <CommandItem
                    className="text-muted-foreground"
                    key={`${item.labelKey}-main`}
                    onSelect={() => handleItemSelect(item.path ?? "/dashboard")}
                  >
                    <Icon className="mr-2 size-5" />
                    {item.labelKey}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};
