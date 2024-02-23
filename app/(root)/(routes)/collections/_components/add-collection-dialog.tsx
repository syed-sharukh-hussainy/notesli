"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Doc } from "@/convex/_generated/dataModel";
import AddCollectionForm from "./add-collection-form";

interface AddCollectionDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  collection?: Doc<"collections">;
}

const AddCollectionDialog = ({
  open,
  setOpen,
  collection,
}: AddCollectionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl font-bold">
            {collection ? "Edit Collection" : "Add Collection"}
          </DialogTitle>
        </DialogHeader>
        <AddCollectionForm collection={collection!} setIsOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default AddCollectionDialog;
