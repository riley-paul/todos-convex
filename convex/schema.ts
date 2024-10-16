import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  messages: defineTable({
    userId: v.id("users"),
    body: v.string(),
  }),
  lists: defineTable({
    userId: v.id("users"),
    name: v.string(),
  }),
  todos: defineTable({
    userId: v.id("users"),
    listId: v.optional(v.id("lists")),
    text: v.string(),
    completed: v.boolean(),
  }),
});
