import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";

import { founderSchema } from "@/lib/validators/founderSchema";

export const founderRouter = createTRPCRouter({
  create: privateProcedure
    .input(founderSchema)
    .mutation(async ({ ctx, input }) => {
      const founder = await ctx.db.founder.create({
        data: {
          id: ctx.user.id,
          bio: input.bio,
          country: input.country,
          educationAndExperience: input.educationAndExperience,
          user: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      });

      return founder;
    }),
  update: privateProcedure
    .input(founderSchema)
    .mutation(async ({ ctx, input }) => {
      const founder = await ctx.db.founder.update({
        where: { id: ctx.user.id },
        data: {
          bio: input.bio,
          country: input.country,
          educationAndExperience: input.educationAndExperience,
        },
      });

      return founder;
    }),
  getCurrent: privateProcedure.query(async ({ ctx }) => {
    const founder = await ctx.db.founder.findUnique({
      where: { id: ctx.user.id },
      include: {
        user: true,
      },
    });
    return founder;
  }),
});
