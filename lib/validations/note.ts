import { z } from "zod";

export const createNotebookSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  icon: z.string().optional(),
  color: z.string().optional(),
});

export type CreateNotebookSchema = z.infer<typeof createNotebookSchema>;
