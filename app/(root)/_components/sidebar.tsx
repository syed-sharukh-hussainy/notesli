"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SIDEBAR_ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { BookText } from "lucide-react";
import ThemeToggle from "./theme-toggle";

const Sidebar = () => {
  const pathName = usePathname();
  const router = useRouter();

  const onNavigate = (href: string) => {
    router.push(href);
  };

  return (
    <div className="h-full flex flex-col text-primary bg-secondary">
      <div className="h-[calc(100vh-5rem)] flex flex-col items-center justify-between md:py-5">
        <div className="md:hidden flex cursor-pointer transition items-center justify-center pb-6">
          <BookText className="w-8 h-8" />
        </div>
        <div className="flex flex-col items-center gap-5">
          {SIDEBAR_ROUTES.map((route, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <div
                  onClick={() => onNavigate(route.href)}
                  key={route.href}
                  className={cn(
                    "group hover:bg-primary/5 p-4 rounded-md cursor-pointer transition",
                    pathName === route.href ? "bg-primary/5" : ""
                  )}
                >
                  <route.icon
                    className={cn(
                      "h-6 w-6 text-muted-foreground group-hover:text-primary transition",
                      pathName === route.href ? "text-primary" : ""
                    )}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="font-medium text-sm relative"
              >
                {route.label}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Sidebar;
