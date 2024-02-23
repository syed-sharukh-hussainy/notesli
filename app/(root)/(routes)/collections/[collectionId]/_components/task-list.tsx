import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { Trash } from "lucide-react";
import { toast } from "sonner";

interface TaskListProps {
  tasksList: Doc<"tasks">[];
  label?: string;
}

const TaskList = ({ tasksList, label }: TaskListProps) => {
  const completeTask = useMutation(api.collections.completeTask);
  const deleteTask = useMutation(api.collections.deleteTask);

  const handleDelete = (taskId: Id<"tasks">) => {
    const promise = deleteTask({
      taskId,
    });
    toast.promise(promise, {
      loading: "Deleting task...",
      success: "Task deleted",
      error: "Failed to delete a task",
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {tasksList?.map((task) => (
        <div
          key={task._id}
          className="bg-secondary/60 rounded-xl p-3 flex items-center justify-between"
        >
          <div className=" flex items-center w-full gap-x-6">
            <Checkbox
              id={task._id}
              checked={task.checked}
              className="w-7 h-7 rounded-xl border-2"
              onCheckedChange={(checked: boolean) => {
                completeTask({
                  taskId: task._id,
                  checked: checked,
                });
              }}
            />
            <div className="flex flex-col">
              <Label
                htmlFor={task._id}
                className={cn(
                  "text-lg line-clamp-1",
                  task.checked && "line-through text-muted-foreground"
                )}
              >
                {task.taskTitle}
              </Label>
              <p className="text-xs text-muted-foreground">{task.reminder}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={() => handleDelete(task._id)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
