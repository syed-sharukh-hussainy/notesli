"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";
import ThemeToggle from "./theme-toggle";

const Navigation = () => {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center px-8 h-20 border-primary/10 bg-secondary">
      <div className="flex items-center">
        {/* <MobileSidebar isPro={isPro} /> */}
        <MobileSidebar />
        <Link href="/">
          <h1 className="hidden md:block text-xl md:text-3xl font-bold text-primary">
            Notesli
          </h1>
        </Link>
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Navigation;
