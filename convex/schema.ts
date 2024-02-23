import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  notebooks: defineTable({
    title: v.string(),
    userId: v.string(),
    content: v.optional(v.string()),
    color: v.optional(v.string()),
    icon: v.optional(v.string()),
  }).index("by_user", ["userId"]),
  tasks: defineTable({
    taskTitle: v.optional(v.string()),
    reminder: v.optional(v.string()),
    checked: v.optional(v.boolean()),
    userId: v.string(),
    collectionId: v.id("collections"),
  })
    .index("by_collectionId", ["collectionId"])
    .index("checked", ["checked"])
    .index("userId", ["userId"]),
  collections: defineTable({
    title: v.string(),
    userId: v.string(),
    color: v.optional(v.string()),
    icon: v.optional(v.string()),
  }).index("by_user", ["userId"]),
  // users: defineTable({
  //   userId: v.string(),
  //   email: v.string(),
  //   subscriptionId: v.optional(v.string()),
  //   endsOn: v.optional(v.number()),
  //   credits: v.number(),
  // })
  //   .index("by_userId", ["userId"])
  //   .index("by_subscriptionId", ["subscriptionId"]),
});
