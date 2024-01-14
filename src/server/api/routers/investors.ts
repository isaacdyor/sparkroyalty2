import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";

import { investorSchema } from "@/lib/validators/investorSchema";

export const investorRouter = createTRPCRouter({
  create: privateProcedure
    .input(investorSchema)
    .mutation(async ({ ctx, input }) => {
      const skillsList = input.skills.map((skill) => skill.name);
      const investor = await ctx.db.investor.create({
        data: {
          id: ctx.user.id,
          email: ctx.user.email!,
          firstName: input.firstName,
          lastName: input.lastName,
          bio: input.bio,
          skills: skillsList,
          country: input.country,
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
    });
    return investor;
  }),
});
