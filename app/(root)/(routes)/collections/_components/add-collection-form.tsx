"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { Doc } from "@/convex/_generated/dataModel";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ColorPicker from "@/components/color-picker";
import IconPicker from "@/components/icon-picker";
import { DialogFooter } from "@/components/ui/dialog";
import LoadingButton from "@/components/loading-button";

import {
  createCollectionsSchema,
  CreateCollectionSchema,
} from "@/lib/validations/collections";

const AddCollectionForm = ({
  setIsOpen,
  collection,
}: {
  setIsOpen: (value: boolean) => void;
  collection: Doc<"collections">;
}) => {
  const create = useMutation(api.collections.createCollection);
  // const update = useMutation(api.notebooks.updateNotebook);

  const form = useForm<CreateCollectionSchema>({
    resolver: zodResolver(createCollectionsSchema),
    defaultValues: {
      title: collection?.title || "",
      icon: collection?.icon || "Book",
      color: collection?.color || "#ef4444",
    },
  });

  const handleSubmit = (input: CreateCollectionSchema) => {
    try {
      if (collection) {
        // const promise = update({
        //   id: task._id,
        //   title: input.title,
        //   color: input.color!,
        //   icon: input.icon!,
        // });
        // toast.promise(promise, {
        //   loading: "Updating a new notebook...",
        //   success: "Notebook updated",
        //   error: "Failed to update a notebook",
        // });
      } else {
        const promise = create({
          title: input.title,
          color: input.color!,
          icon: input.icon!,
        });

        toast.promise(promise, {
          loading: "Creating a new collection...",
          success: "New collection created",
          error: "Failed to create a collection",
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
              <FormLabel>Collection name</FormLabel>
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
            {collection ? "Update Collection" : "Add Collection"}
          </LoadingButton>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AddCollectionForm;
