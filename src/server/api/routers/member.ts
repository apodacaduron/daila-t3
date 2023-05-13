import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const memberRouter = createTRPCRouter({
  workspace: protectedProcedure
    .query(async ({ ctx }) => {
      const workspace = await ctx.prisma.workspace.findFirst({
        where: {
          workspaceMembers: {
            some: {
              status: "ACTIVE",
              member: {
                userId: ctx.session.user.id,
              },
            },
          },
        }
      })

      return workspace
    }),
  me: protectedProcedure
    .query(async ({ ctx }) => {
      const member = await ctx.prisma.member.findFirst({
        where: {
          userId: ctx.session.user.id
        }
      })

      return member
    }),
  workspaces: protectedProcedure
    .query(async ({ ctx }) => {
      const workspaces = await ctx.prisma.workspace.findMany({
        where: {
          workspaceMembers: {
            some: {
              status: "ACTIVE",
              member: {
                userId: ctx.session.user.id,
              },
            },
          },
        }
      })

      return workspaces
    }),
});
