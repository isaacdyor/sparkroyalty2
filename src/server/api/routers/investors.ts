import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";

import { investorSchema } from "@/lib/validators/investorSchema";
import { z } from "zod";

export const investorRouter = createTRPCRouter({
  create: privateProcedure
    .input(investorSchema)
    .mutation(async ({ ctx, input }) => {
      const skillsList = input.skills.map((skill) => skill.name);
      const investor = await ctx.db.investor.create({
        data: {
          id: ctx.user.id,
          bio: input.bio,
          skills: skillsList,
          educationAndExperience: input.educationAndExperience,
          github: input.github,
          linkedin: input.linkedin,
          website: input.website,
          user: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      });
      await ctx.db.user.update({
        where: { id: ctx.user.id },
        data: {
          active: "INVESTOR",
        },
      });

      return investor;
    }),

  update: privateProcedure
    .input(investorSchema)
    .mutation(async ({ ctx, input }) => {
      const skillsList = input.skills.map((skill) => skill.name);
      const investor = await ctx.db.investor.update({
        where: { id: ctx.user.id },
        data: {
          bio: input.bio,
          skills: skillsList,
          educationAndExperience: input.educationAndExperience,
          github: input.github,
          linkedin: input.linkedin,
          website: input.website,
        },
      });

      return investor;
    }),

  getCurrent: privateProcedure.query(async ({ ctx }) => {
    const investor = await ctx.db.investor.findUnique({
      where: { id: ctx.user.id },
      include: {
        user: true,
      },
    });
    return investor;
  }),
  getOne: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const investor = await ctx.db.investor.findUnique({
        where: { id: input.id },
        include: {
          user: true,
        },
      });
      return investor;
    }),
});
