import { buildingUpdateSchema } from "@/lib/validators/buildingUpdateSchema";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const buildingUpdateRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        ventureId: z.string(),
        update: buildingUpdateSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.buildingUpdate.create({
        data: {
          progress: input.update.progress,
          ventureId: input.ventureId,
        },
      });

      return user;
    }),
});
