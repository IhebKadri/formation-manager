import { ThemeModeToggle } from "../themes/theme-mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "../ui/breadcrumb";
import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";
import { NotificationCenter } from "./NotifCenter";
import { SearchCommands } from "./SearchCommands";

export const Navbar = () => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 mx-6 sm:mx-2">
      <div className="flex justify-between w-full mx-2.5 sm:mx-2">
        <div className="flex items-center justify-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="data-[orientation=vertical] my-1.5"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden sm:block">
                <BreadcrumbLink href="/">Training Center</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex items-center gap-2 px-4">
          <div className="hidden sm:block">
            <SearchCommands />
          </div>
          <NotificationCenter />
          <ThemeModeToggle />
        </div>
      </div>
    </header>
  );
};
