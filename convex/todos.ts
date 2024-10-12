import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { checkOwner, getUserId } from "./_helpers";

export const list = query({
  args: { listId: v.optional(v.string()) },
  handler: async (ctx, { listId }) => {
    const todos = await ctx.db
      .query("todos")
      .filter((q) => {
        if (listId === "all") return true;
        return q.eq(q.field("listId"), listId);
      })
      .order("desc")
      .take(1000);
    return Promise.all(
      todos.map(async (todo) => {
        const { name, email } = (await ctx.db.get(todo.userId))!;
        return { ...todo, author: name ?? email! };
      }),
    );
  },
});

export const create = mutation({
  args: { text: v.string(), listId: v.optional(v.string()) },
  handler: async (ctx, { text, listId }) => {
    const userId = await getUserId(ctx);
    const list = await ctx.db
      .query("lists")
      .filter((q) => q.eq(q.field("_id"), listId))
      .take(1)
      .then((x) => x[0]);
    await ctx.db.insert("todos", {
      text,
      listId: list?._id,
      userId,
      completed: false,
    });
  },
});

export const update = mutation({
  args: {
    todoId: v.id("todos"),
    text: v.optional(v.string()),
    completed: v.optional(v.boolean()),
    listId: v.optional(v.id("lists")),
  },
  handler: async (ctx, { todoId, ...data }) => {
    const userId = await getUserId(ctx);
    checkOwner(userId, await ctx.db.get(todoId));
    await ctx.db.patch(todoId, data);
  },
});

export const remove = mutation({
  args: { todoId: v.id("todos") },
  handler: async (ctx, { todoId }) => {
    const userId = await getUserId(ctx);
    checkOwner(userId, await ctx.db.get(todoId));
    await ctx.db.delete(todoId);
  },
});
