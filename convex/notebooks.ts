import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const create = mutation({
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

    const notebook = await ctx.db.insert("notebooks", {
      title: args.title,
      userId,
      color: args.color,
      icon: args.icon,
    });

    return notebook;
  },
});

export const updateNotebook = mutation({
  args: {
    id: v.id("notebooks"),
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

    const existingNotebook = await ctx.db.get(args.id);

    if (!existingNotebook) {
      throw new Error("NotFound");
    }
    if (existingNotebook.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const notebook = await ctx.db.patch(args.id, {
      title: args.title,
      icon: args.icon,
      color: args.color,
    });

    return notebook;
  },
});

export const deleteNotebook = mutation({
  args: {
    id: v.id("notebooks"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }
    const userId = identity.subject;

    const existingNotebook = await ctx.db.get(args.id);

    if (!existingNotebook) {
      throw new Error("NotFound");
    }
    if (existingNotebook.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const notebook = await ctx.db.delete(args.id);

    return notebook;
  },
});

export const getNotebooks = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }
    const userId = identity.subject;

    const notebooks = await ctx.db
      .query("notebooks")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    return notebooks;
  },
});

export const getRecentNotebooks = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }
    const userId = identity.subject;

    const notebooks = await ctx.db
      .query("notebooks")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(4);

    return notebooks;
  },
});

export const getNotebookById = query({
  args: {
    notebookId: v.id("notebooks"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const notebook = await ctx.db.get(args.notebookId);

    if (notebook?.userId !== userId) {
      throw new Error("Unauthorized");
    }

    return notebook;
  },
});

export const update = mutation({
  args: {
    id: v.id("notebooks"),
    content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }
    const userId = identity.subject;

    const { id, content } = args;

    const existingNotebook = await ctx.db.get(args.id);

    if (!existingNotebook) {
      throw new Error("NotFound");
    }
    if (existingNotebook.userId !== userId) {
      throw new Error("Unauthorized");
    }
    const notebook = await ctx.db.patch(args.id, {
      content,
    });

    return notebook;
  },
});
