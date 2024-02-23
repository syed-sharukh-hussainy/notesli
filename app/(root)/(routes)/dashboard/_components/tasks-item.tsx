import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

interface TasksItemProps {
  icon: LucideIcon;
  label: string;
  size: number | undefined;
  color: string;
}

const TasksItem = ({ icon: Icon, label, size, color }: TasksItemProps) => {
  return (
    <div className="border rounded-2xl p-4 flex items-center gap-x-5">
      <div className={cn("w-fit p-2 rounded-lg", color)}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <div>
        <h5 className="text-lg text-muted-foreground">{label}</h5>
        <p className="text-xl font-semibold">{size}</p>
      </div>
    </div>
  );
};

export default TasksItem;
