import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";

import { applicationSchema } from "@/lib/validators/applicationSchema";
import { z } from "zod";
import { applicationInclude } from "./types";

export const applicationRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        application: applicationSchema,
        ventureId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const application = await ctx.db.application.create({
        data: {
          projectSkills: input.application.projectSkills,
          projectInterest: input.application.projectInterest,
          status: "PENDING",
          venture: {
            connect: {
              id: input.ventureId,
            },
          },
          investor: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      });
      return application;
    }),
  update: privateProcedure
    .input(
      z.object({
        id: z.string(),
        application: applicationSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const application = await ctx.db.application.update({
        where: { id: input.id },
        data: {
          projectSkills: input.application.projectSkills,
          projectInterest: input.application.projectInterest,
        },
      });
      return application;
    }),
  getMany: privateProcedure.query(async ({ ctx }) => {
    const applications = await ctx.db.application.findMany({
      where: { investorId: ctx.user.id },
      include: applicationInclude,
    });
    return applications;
  }),
  getOne: privateProcedure
    .input(
      z.object({
        applicationId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const application = await ctx.db.application.findUnique({
        where: { id: input.applicationId },
        include: applicationInclude,
      });
      return application;
    }),

  delete: privateProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const application = await ctx.db.application.delete({
        where: { id: input.id },
      });
      return application;
    }),
  acceptApplication: privateProcedure
    .input(
      z.object({
        applicationId: z.string(),
        ventureId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const application = await ctx.db.application.update({
        where: { id: input.applicationId },
        data: {
          status: "ACCEPTED",
        },
      });
      await ctx.db.application.updateMany({
        where: {
          AND: [
            { ventureId: input.ventureId },
            { NOT: { id: input.applicationId } },
          ],
        },
        data: {
          status: "REJECTED",
        },
      });
      await ctx.db.venture.update({
        where: {
          id: input.ventureId,
        },
        data: {
          status: "BUILDING",
        },
      });
      return application;
    }),
});
