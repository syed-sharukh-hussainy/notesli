"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Doc, Id } from "@/convex/_generated/dataModel";
import AddTaskForm from "./add-task-form";

interface AddTaskDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  task?: Doc<"tasks">;
  collectionId: Id<"collections">;
}

const AddTaskDialog = ({
  open,
  setOpen,
  task,
  collectionId,
}: AddTaskDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl font-bold">
            {task ? "Edit Task" : "Add Task"}
          </DialogTitle>
        </DialogHeader>
        <AddTaskForm
          task={task!}
          setIsOpen={setOpen}
          collectionId={collectionId}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddTaskDialog;
