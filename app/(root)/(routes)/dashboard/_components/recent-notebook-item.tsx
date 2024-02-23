import { Doc, Id } from "@/convex/_generated/dataModel";
import { getIconFile } from "@/lib/utils";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

interface RecentNotebookItemProps {
  notebook: Doc<"notebooks">;
}

const RecentNotebookItem = ({ notebook }: RecentNotebookItemProps) => {
  const router = useRouter();
  const noteIcon = (icon: string): ReactNode => {
    const IconFile = getIconFile(icon);

    if (IconFile) {
      return <IconFile className="h-7 w-7 text-white" />;
    }
    return undefined;
  };
  return (
    <div
      role="button"
      onClick={() => {
        router.push(`/notebooks/${notebook._id}`);
      }}
      className="flex gap-x-3 items-center hover:bg-secondary p-3 rounded-lg transition cursor-pointer"
    >
      <div
        style={{
          backgroundColor: notebook.color,
        }}
        className="w-12 h-12 flex items-center justify-center rounded-xl"
      >
        {noteIcon(notebook.icon!)}
      </div>
      <div>
        <p className="text-base md:text-lg font-bold  truncate capitalize">
          {notebook.title}
        </p>
        <p className="text-muted-foreground text-xs md:text-sm">
          Created at {""}
          {format(new Date(notebook._creationTime), "do MMM yyy")}
        </p>
      </div>
    </div>
  );
};

export default RecentNotebookItem;
