import { z } from "zod";

export const createCollectionsSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  icon: z.string().optional(),
  color: z.string().optional(),
});

export type CreateCollectionSchema = z.infer<typeof createCollectionsSchema>;
