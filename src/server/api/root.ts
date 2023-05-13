import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { workspaceRouter } from "~/server/api/routers/workspace";
import { memberRouter } from "~/server/api/routers/member";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  workspace: workspaceRouter,
  member: memberRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
