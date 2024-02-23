"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { getIconFile } from "@/lib/utils";
import { useQuery } from "convex/react";
import { format } from "date-fns";
import { Loader2, Plus } from "lucide-react";
import React, { ReactNode, useState } from "react";
import AddTaskDialog from "./_components/add-task-dialog";

import TaskList from "./_components/task-list";

interface CollectionIdProps {
  params: {
    collectionId: Id<"collections">;
  };
}

const CollectionId = ({ params }: CollectionIdProps) => {
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const collection = useQuery(api.collections.getCollectionById, {
    collectionId: params.collectionId,
  });

  const tasksList = useQuery(api.collections.getTasksList, {
    collectionId: params.collectionId,
  });
  const completedTasksList = useQuery(api.collections.getCompletedTasksList, {
    collectionId: params.collectionId,
  });

  const noteIcon = (icon: string): ReactNode => {
    const IconFile = getIconFile(icon);

    if (IconFile) {
      return <IconFile className="w-7 h-7 md:h-10 md:w-10 text-white" />;
    }
    return undefined;
  };

  if (collection === undefined) {
    return (
      <div className="flex justify-center items-center w-full mt-36 ">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (collection === null) {
    return <div>Not found</div>;
  }

  return (
    <>
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-4 items-center">
            <div
              style={{
                backgroundColor: collection?.color!,
              }}
              className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-xl md:rounded-2xl"
            >
              {noteIcon(collection?.icon!)}
            </div>
            <div>
              <h2 className="text-xl md:text-3xl font-bold capitalize">
                {collection?.title}
              </h2>
              <p className="text-muted-foreground text-sm">
                {format(new Date(collection._creationTime), "do MMM yyy")}
              </p>
            </div>
          </div>
          <Button
            className="text-base sm:h-11 h-9 flex justify-between px-5 rounded-md"
            onClick={() => setShowTaskDialog(true)}
          >
            <span className="sm:flex hidden">Add Task</span>
            <Plus className="sm:ml-3 w-5 h-5" />
          </Button>
        </div>
        <div className="mt-10 flex flex-col gap-3">
          <div>
            <h2 className="text-lg font-bold pb-2">
              Tasks - {tasksList?.length}
            </h2>
            <TaskList label="Tasks" tasksList={tasksList!} />
          </div>
          <div>
            <h2 className="text-lg font-bold pb-2">
              Completed - {completedTasksList?.length}
            </h2>
          </div>
          <TaskList label="Completed" tasksList={completedTasksList!} />
        </div>
      </div>
      <AddTaskDialog
        collectionId={params.collectionId}
        open={showTaskDialog}
        setOpen={setShowTaskDialog}
      />
    </>
  );
};

export default CollectionId;
