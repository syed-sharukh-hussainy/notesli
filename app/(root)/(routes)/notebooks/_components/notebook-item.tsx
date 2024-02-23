"use client";

import CreateEditNotebook from "@/app/(root)/(routes)/notebooks/_components/create-notebook-dialog";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { getIconFile } from "@/lib/utils";
import { useMutation } from "convex/react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import ItemDropdownMenu from "@/components/item-dropdown-menu";
import ItemWrapper from "@/components/item-wrapper";

interface NotebookItemProps {
  notebook: Doc<"notebooks">;
}

const NotebookItem = ({ notebook }: NotebookItemProps) => {
  const router = useRouter();
  const deleteNotebook = useMutation(api.notebooks.deleteNotebook);

  const [showEditDialog, setShowEditDialog] = useState(false);

  const noteIcon = (icon: string): ReactNode => {
    const IconFile = getIconFile(icon);

    if (IconFile) {
      return <IconFile className="h-8 w-8 text-white" />;
    }
    return undefined;
  };

  const handleEdit = () => {
    setShowEditDialog(true);
  };

  const handleOpen = () => {
    router.push(`/notebooks/${notebook._id}`);
  };

  const handleDelete = () => {
    const promise = deleteNotebook({
      id: notebook._id,
    });
    toast.promise(promise, {
      loading: "Deleting notebook...",
      success: "Notebook deleted",
      error: "Failed to delete a notebook",
    });
  };

  return (
    <>
      <ItemWrapper>
        <div className="flex justify-between items-center">
          <div
            style={{
              backgroundColor: notebook.color,
            }}
            className="w-14 h-14 flex items-center justify-center rounded-2xl"
          >
            {noteIcon(notebook.icon!)}
          </div>

          <ItemDropdownMenu
            handleOpen={handleOpen}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
        <div className="mt-8">
          <p className="text-xl md:text-2xl font-bold  truncate capitalize">
            {notebook.title}
          </p>
          <p className="text-muted-foreground text-xs md:text-sm pt-1">
            Created at {""}
            {format(new Date(notebook._creationTime), "do MMM yyy")}
          </p>
        </div>
      </ItemWrapper>
      <CreateEditNotebook
        open={showEditDialog}
        setOpen={setShowEditDialog}
        notebook={notebook}
      />
    </>
  );
};

export default NotebookItem;
