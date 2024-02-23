"use client";

import { LucideIcon } from "lucide-react";

interface ItemProps {
  label: string;
  icon: LucideIcon;
  isSearch?: boolean;
  onClick: () => void;
}

const Item = ({ label, icon: Icon, isSearch, onClick }: ItemProps) => {
  return (
    <div
      role="button"
      onClick={onClick}
      className="flex gap-x-3 text-sm items-center font-medium text-muted-foreground p-3 hover:bg-secondary hover:text-primary transition-colors rounded-md"
    >
      <Icon />
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-event-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">CTRL</span>K
        </kbd>
      )}
    </div>
  );
};

export default Item;
