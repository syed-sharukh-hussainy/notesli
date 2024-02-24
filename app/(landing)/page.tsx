"use client";
import Image from "next/image";
import { Heading } from "./_components/heading";
import ThemeToggle from "../(root)/_components/theme-toggle";
import { useTheme } from "next-themes";

const LandingPage = () => {
  const { theme } = useTheme();
  return (
    <div className="min-h-full flex flex-col">
      <div className="h-20 bg-secondary flex items-center justify-between px-6">
        <h1 className="text-3xl font-bold">Notesli</h1>
        <ThemeToggle />
      </div>
      <div className="flex flex-col items-center justify-center md:justify-start text-center flex-1 px-6 mt-10">
        <Heading />
        <div className="bg-primary w-full max-w-7xl p-3 mt-20 rounded-3xl">
          <Image
            className="w-full rounded-2xl"
            src={
              theme === "dark"
                ? "/landing-bg-dark.png"
                : "/landing-bg-light.png"
            }
            alt="landing-bg"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
