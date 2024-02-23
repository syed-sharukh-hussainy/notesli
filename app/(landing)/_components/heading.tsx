"use client";

import { useConvexAuth } from "convex/react";
import { ArrowRight, Loader2 } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Notes, Tasks, & Plans. Unified. Welcome to{" "}
        <span className="underline">Notesli</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        Notesli is a place where you can create notes <br />
        better and faster.
      </h3>
      {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Loader2 className="text-muted-foreground animate-spin" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href="/dashboard">
            Enter Notesli
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal">
          <Button>
            Get Started
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};
