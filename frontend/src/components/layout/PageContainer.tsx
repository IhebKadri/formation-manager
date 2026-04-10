import { cn } from "@/lib/utils";
import * as React from "react";

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "h-full py-2 px-2 sm:px-4 overflow-y-auto flex flex-col",
          className,
        )}
        {...props}
      />
    );
  },
);

PageContainer.displayName = "PageContainer";
export { PageContainer };