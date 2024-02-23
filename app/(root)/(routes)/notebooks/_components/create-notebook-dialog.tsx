"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddNotebookDialog from "./add-notebook-form";
import { Doc } from "@/convex/_generated/dataModel";

interface CreateNotebookDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  notebook?: Doc<"notebooks">;
}

const CreateNotebookDialog = ({
  open,
  setOpen,
  notebook,
}: CreateNotebookDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl font-bold">
            {notebook ? "Edit Notebook" : "Add Notebook"}
          </DialogTitle>
        </DialogHeader>
        <AddNotebookDialog setIsOpen={setOpen} notebook={notebook!} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateNotebookDialog;
