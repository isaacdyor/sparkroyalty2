import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        country: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.create({
        data: {
          id: ctx.user.id,
          email: ctx.user.email!,
          firstName: input.firstName,
          lastName: input.lastName,
          country: input.country,
        },
      });

      return user;
    }),

  getCurrent: privateProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.user.id },
      include: {
        investor: true,
        founder: true,
      },
    });
    return user;
  }),
});
