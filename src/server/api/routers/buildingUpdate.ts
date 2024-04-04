import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const buildingUpdateRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        ventureId: z.string(),
        progress: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.buildingUpdate.create({
        data: {
          progress: input.progress,
          ventureId: input.ventureId,
        },
      });

      return user;
    }),
});
