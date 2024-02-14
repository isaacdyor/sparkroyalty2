import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";

import { applicationSchema } from "@/lib/validators/applicationSchema";
import { z } from "zod";

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
});
