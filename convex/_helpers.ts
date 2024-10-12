import { getAuthUserId } from "@convex-dev/auth/server";
import type { MutationCtx } from "./_generated/server";
import type { Id } from "./_generated/dataModel";

export const getUserId = async (ctx: MutationCtx) => {
  const userId = await getAuthUserId(ctx);
  if (userId === null) {
    throw new Error("Not signed in");
  }
  return userId;
};

export function checkOwner<T extends { userId: Id<"users"> }>(
  userId: string,
  record: T | null,
): T {
  if (record === null) {
    throw new Error("Record not found");
  }
  if (record.userId !== userId) {
    throw new Error("Not authorized");
  }
  return record;
}
