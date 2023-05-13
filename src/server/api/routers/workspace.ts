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
      let member = await ctx.prisma.member.findFirst({
        where: {
          userId: ctx.session.user.id
        },
      })
      if (!member) {
        member = await ctx.prisma.member.create({
          data: {
            userId: ctx.session.user.id
          }
        })
      }

      await ctx.prisma.workspaceMember.create({
        data: {
          workspaceId: newWorkspace.id,
          memberId: member.id,
          status: 'ACTIVE'
        }
      })

      return newWorkspace
    }),
  byId: protectedProcedure
    .input(z.object({ workspaceId: z.string() }))
    .query(async ({ input, ctx }) => {
      const workspace = ctx.prisma.workspace.findFirst({
        where: {
          id: input.workspaceId
        }
      })

      return workspace
    }),
});
