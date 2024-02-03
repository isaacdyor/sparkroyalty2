import { ventureSchema } from "@/lib/validators/ventureSchema";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { z } from "zod";

export const ventureRouter = createTRPCRouter({
  create: privateProcedure
    .input(ventureSchema)
    .mutation(async ({ ctx, input }) => {
      const skillsList = input.skills.map((skill) => skill.name);
      const venture = await ctx.db.venture.create({
        data: {
          title: input.title,
          description: input.description,
          role: input.role,
          workDescription: input.workDescription,
          percent: input.percent,
          totalPayout: input.totalPayout,
          skills: skillsList,
          status: "PENDING",
          founder: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      });
      return venture;
    }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const venture = await ctx.db.venture.findUnique({
        where: { id: input.id },
      });
      return venture;
    }),
});
