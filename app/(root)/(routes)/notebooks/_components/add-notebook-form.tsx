"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateNotebookSchema,
  createNotebookSchema,
} from "@/lib/validations/note";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import IconPicker from "@/components/icon-picker";
import { DialogFooter } from "@/components/ui/dialog";
import ColorPicker from "@/components/color-picker";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import LoadingButton from "@/components/loading-button";
import { Doc } from "@/convex/_generated/dataModel";

const AddNotebookForm = ({
  setIsOpen,
  notebook,
}: {
  setIsOpen: (value: boolean) => void;
  notebook: Doc<"notebooks">;
}) => {
  const create = useMutation(api.notebooks.create);
  const update = useMutation(api.notebooks.updateNotebook);

  const form = useForm<CreateNotebookSchema>({
    resolver: zodResolver(createNotebookSchema),
    defaultValues: {
      title: notebook?.title || "",
      icon: notebook?.icon || "Book",
      color: notebook?.color || "#ef4444",
    },
  });

  const handleSubmit = (input: CreateNotebookSchema) => {
    try {
      if (notebook) {
        const promise = update({
          id: notebook._id,
          title: input.title,
          color: input.color!,
          icon: input.icon!,
        });

        toast.promise(promise, {
          loading: "Updating a new notebook...",
          success: "Notebook updated",
          error: "Failed to update a notebook",
        });
      } else {
        const promise = create({
          title: input.title,
          color: input.color!,
          icon: input.icon!,
        });

        toast.promise(promise, {
          loading: "Creating a new notebook...",
          success: "New notebook created",
          error: "Failed to create a notebook",
        });
      }
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
              <FormLabel>Notebook name</FormLabel>
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
            name="color"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Pick Color</FormLabel>
                <FormControl>
                  <ColorPicker onChange={field.onChange} value={field.value!} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="icon"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Pick Icon</FormLabel>
                <FormControl>
                  <IconPicker onChange={field.onChange} value={field.value!} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <LoadingButton type="submit" loading={form.formState.isSubmitting}>
            {notebook ? "Update Notebook" : "Add Notebook"}
          </LoadingButton>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AddNotebookForm;
