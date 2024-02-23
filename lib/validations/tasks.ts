import { z } from "zod";

export const createTasksSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  reminder: z.date().optional(),
});

export type CreateTaskSchema = z.infer<typeof createTasksSchema>;
