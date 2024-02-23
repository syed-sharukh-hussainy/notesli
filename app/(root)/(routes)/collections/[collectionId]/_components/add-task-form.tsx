"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { Doc, Id } from "@/convex/_generated/dataModel";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import LoadingButton from "@/components/loading-button";
import { CreateTaskSchema, createTasksSchema } from "@/lib/validations/tasks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const AddTaskForm = ({
  setIsOpen,
  task,
  collectionId,
}: {
  setIsOpen: (value: boolean) => void;
  task: Doc<"tasks">;
  collectionId: Id<"collections">;
}) => {
  const create = useMutation(api.collections.createTask);

  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTasksSchema),
    defaultValues: {
      title: "",
      reminder: undefined,
    },
  });

  const handleSubmit = (input: CreateTaskSchema) => {
    try {
      const promise = create({
        taskTitle: input.title,
        reminder: format(input.reminder!, "PPP"),
        collectionId: collectionId,
      });

      toast.promise(promise, {
        loading: "Creating a new collection...",
        success: "New collection created",
        error: "Failed to create a collection",
      });

      form.reset();
      setIsOpen(false);
    } catch (error) {
      console.log("Error", error);
      alert("Something went wrong. Please try again.");
    }
  };
  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task name</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Study Materials" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="reminder"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Reminder</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}

                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <LoadingButton type="submit" loading={form.formState.isSubmitting}>
            {task ? "Update Task" : "Add Task"}
          </LoadingButton>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AddTaskForm;
