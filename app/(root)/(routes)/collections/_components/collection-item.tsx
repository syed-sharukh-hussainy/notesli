"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { getIconFile } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { format } from "date-fns";

import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import ItemWrapper from "@/components/item-wrapper";
import ItemDropdownMenu from "@/components/item-dropdown-menu";
import AddCollectionDialog from "./add-collection-dialog";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface TaskItemProps {
  collection: Doc<"collections">;
}

const CollectionItem = ({ collection }: TaskItemProps) => {
  const router = useRouter();
  const deleteCollection = useMutation(api.collections.deleteCollection);
  const tasksList = useQuery(api.collections.getCompletedTasksList, {
    collectionId: collection._id,
  });

  const tasks = useQuery(api.collections.getAllTasks, {
    collectionId: collection._id,
  });

  const [showEditDialog, setShowEditDialog] = useState(false);

  const taskIcon = (icon: string): ReactNode => {
    const TaskFile = getIconFile(icon);

    if (TaskFile) {
      return <TaskFile className="h-8 w-8 text-white" />;
    }
    return undefined;
  };

  const handleEdit = () => {
    setShowEditDialog(true);
  };
  const handleOpen = () => [router.push(`/collections/${collection._id}`)];

  const handleDelete = () => {
    const promise = deleteCollection({
      id: collection._id,
    });
    toast.promise(promise, {
      loading: "Deleting collection...",
      success: "Collection deleted",
      error: "Failed to delete a collection",
    });
  };

  return (
    <>
      <ItemWrapper>
        <div className="flex justify-between items-center">
          <div
            style={{
              backgroundColor: collection.color,
            }}
            className="w-14 h-14 flex items-center justify-center rounded-2xl"
          >
            {taskIcon(collection.icon!)}
          </div>

          <ItemDropdownMenu
            handleOpen={handleOpen}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </div>
        <div className="mt-8">
          <p className="text-xl md:text-2xl font-bold  truncate capitalize">
            {collection.title}
          </p>
          <p className="text-muted-foreground text-xs md:text-sm pt-1">
            Created at {""}
            {format(new Date(collection._creationTime), "do MMM yyy")}
          </p>

          <p className="text-muted-foreground text-xs md:text-sm">
            {tasksList?.length} / {tasks?.length} done
          </p>
        </div>
      </ItemWrapper>
      <AddCollectionDialog
        open={showEditDialog}
        setOpen={setShowEditDialog}
        collection={collection}
      />
    </>
  );
};

export default CollectionItem;
