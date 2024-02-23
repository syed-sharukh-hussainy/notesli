import { LucideIcon, Plus } from "lucide-react";
import React, { ReactNode, useState } from "react";
import { Button } from "./ui/button";

interface ContainerWrapperProps {
  icon: LucideIcon;
  label: string;
  buttonLabel: string;
  setShowDialog: (showDialog: boolean) => void;
  children: ReactNode;
}

const ContainerWrapper = ({
  icon: Icon,
  label,
  buttonLabel,
  setShowDialog,
  children,
}: ContainerWrapperProps) => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center">
        <div className="flex gap-x-5 md:gap-x-4 items-center">
          <Icon className="h-6 w-6 md:w-8 md:h-8 text-muted-foreground" />
          <h2 className="text-2xl md:text-3xl font-bold">{label}</h2>
        </div>
        <Button
          className="text-base sm:h-11 h-9 flex justify-between px-5 rounded-md"
          onClick={() => setShowDialog(true)}
        >
          <span className="sm:flex hidden">{buttonLabel}</span>
          <Plus className="sm:ml-3 w-5 h-5" />
        </Button>
      </div>
      {children}
    </div>
  );
};

export default ContainerWrapper;
