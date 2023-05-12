import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const workspaceRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const newWorkspace = await ctx.prisma.workspace.create({
        data: {
          name: input.name,
          createdById: ctx.session.user.id
        }
      })
      await ctx.prisma.workspaceMembers.create({
        data: {
          workspaceId: newWorkspace.id,
          memberId: ctx.session.user.id
        }
      })

      return newWorkspace
    }),
});
