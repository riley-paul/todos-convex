import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { checkOwner, getUserId } from "./_helpers";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const lists = await ctx.db.query("lists").order("desc").take(100);
    return Promise.all(
      lists.map(async (list) => {
        const { name, email } = (await ctx.db.get(list.userId))!;
        const todos = await ctx.db
          .query("todos")
          .filter((q) => q.eq(q.field("listId"), list._id))
          .collect();
        return { ...list, author: name ?? email!, count: todos.length };
      }),
    );
  },
});

export const create = mutation({
  args: { name: v.string() },
  handler: async (ctx, { name }) => {
    const userId = await getUserId(ctx);
    await ctx.db.insert("lists", { name, userId });
  },
});

export const update = mutation({
  args: { listId: v.id("lists"), name: v.string() },
  handler: async (ctx, { listId, name }) => {
    const userId = await getUserId(ctx);
    checkOwner(userId, await ctx.db.get(listId));
    await ctx.db.patch(listId, { name });
  },
});

export const remove = mutation({
  args: { listId: v.id("lists") },
  handler: async (ctx, { listId }) => {
    const userId = await getUserId(ctx);
    checkOwner(userId, await ctx.db.get(listId));
    await ctx.db.delete(listId);
  },
});
