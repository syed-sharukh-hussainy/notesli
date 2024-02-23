"use client";

import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";
import SearchCommand from "@/components/search-command";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "./_components/navigation";
import Sidebar from "./_components/sidebar";
import Loading from "@/components/loading";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return redirect("/");
  }

  return (
    <TooltipProvider>
      <div className="h-full">
        <Navigation />
        <div className="hidden md:flex my-20 h-full w-20 flex-col fixed inset-y-0">
          <Sidebar />
        </div>
        <main className="md:pl-20 pt-20 h-full">
          {children}
          <SearchCommand />
        </main>
      </div>
    </TooltipProvider>
  );
};

export default RootLayout;
