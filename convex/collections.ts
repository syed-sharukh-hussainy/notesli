import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const createCollection = mutation({
  args: {
    title: v.string(),
    color: v.string(),
    icon: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }
    const userId = identity.subject;

    const collection = await ctx.db.insert("collections", {
      title: args.title,
      userId,
      color: args.color,
      icon: args.icon,
    });

    return collection;
  },
});

export const deleteCollection = mutation({
  args: {
    id: v.id("collections"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }
    const userId = identity.subject;

    const existingCollection = await ctx.db.get(args.id);

    if (!existingCollection) {
      throw new Error("NotFound");
    }
    if (existingCollection.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const collection = await ctx.db.delete(args.id);

    return collection;
  },
});

export const getCollections = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }
    const userId = identity.subject;

    const collections = await ctx.db
      .query("collections")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    return collections;
  },
});

export const getCollectionById = query({
  args: {
    collectionId: v.id("collections"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const collection = await ctx.db.get(args.collectionId);

    if (!collection) {
      throw new Error("NotFound");
    }

    if (collection?.userId !== userId) {
      throw new Error("Unauthorized");
    }

    return collection;
  },
});

export const getAllTasks = query({
  args: {
    collectionId: v.id("collections"),
  },
  handler: async (ctx, args) => {
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_collectionId", (q) =>
        q.eq("collectionId", args.collectionId)
      )
      .order("desc")
      .collect();

    return tasks;
  },
});

export const getTasksList = query({
  args: {
    collectionId: v.id("collections"),
  },
  handler: async (ctx, args) => {
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_collectionId", (q) =>
        q.eq("collectionId", args.collectionId)
      )
      .filter((q) => q.eq(q.field("checked"), false))
      .order("desc")
      .collect();

    return tasks;
  },
});

export const getCompletedTasksList = query({
  args: {
    collectionId: v.id("collections"),
  },
  handler: async (ctx, args) => {
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("by_collectionId", (q) =>
        q.eq("collectionId", args.collectionId)
      )
      .filter((q) => q.eq(q.field("checked"), true))
      .order("desc")
      .collect();

    return tasks;
  },
});

export const getCompletedTasksByUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const tasks = await ctx.db
      .query("tasks")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("checked"), true))
      .order("desc")
      .take(8);

    return tasks;
  },
});

export const getPendingTasksByUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const tasks = await ctx.db
      .query("tasks")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("checked"), false))
      .order("desc")
      .take(8);

    return tasks;
  },
});

export const getAllTasksByUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;
    const tasks = await ctx.db
      .query("tasks")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    return tasks;
  },
});

export const createTask = mutation({
  args: {
    collectionId: v.id("collections"),
    taskTitle: v.string(),
    reminder: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const task = await ctx.db.insert("tasks", {
      collectionId: args.collectionId,
      taskTitle: args.taskTitle,
      reminder: args.reminder,
      userId,
      checked: false,
    });
    return task;
  },
});

export const completeTask = mutation({
  args: {
    taskId: v.id("tasks"),
    checked: v.boolean(),
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.patch(args.taskId, {
      checked: args.checked,
    });
    return task;
  },
});

export const deleteTask = mutation({
  args: {
    taskId: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    const task = await ctx.db.delete(args.taskId);
    return task;
  },
});

// export const createTaskItem = mutation({
//   args: {
//     id: v.id("tasks"),
//     taskLabel: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       throw new Error("Unauthenticated");
//     }
//     const userId = identity.subject;

//     const existingTask = await ctx.db.get(args.id);

//     if (!existingTask) {
//       throw new Error("NotFound");
//     }
//     if (existingTask.userId !== userId) {
//       throw new Error("Unauthorized");
//     }
//     const taskItem = await ctx.db.insert("taskList", {
//       taskLabel: args.taskLabel,
//       taskId: args.id,
//     });

//     return taskItem;
//   },
// });
