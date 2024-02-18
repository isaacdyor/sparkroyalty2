import { ventureSchema } from "@/lib/validators/ventureSchema";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { api } from "@/trpc/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { ventureInclude } from "./types";

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
  update: privateProcedure
    .input(
      z.object({
        id: z.string(),
        venture: ventureSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const skillsList = input.venture.skills.map((skill) => skill.name);
      const venture = await ctx.db.venture.update({
        where: { id: input.id },
        data: {
          title: input.venture.title,
          description: input.venture.description,
          role: input.venture.role,
          workDescription: input.venture.workDescription,
          percent: input.venture.percent,
          totalPayout: input.venture.totalPayout,
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
  getCurrent: privateProcedure.query(async ({ ctx }) => {
    const venture = await ctx.db.venture.findMany({
      where: { founderId: ctx.user.id },
      include: {
        applications: true,
        founder: {
          include: {
            user: true,
            ventures: true,
          },
        },
        investor: {
          include: {
            user: true,
          },
        },
      },
    });
    return venture;
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const venture = await ctx.db.venture.findMany({
      where: { status: "PENDING" },
      include: ventureInclude,
    });
    return venture;
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const venture = await ctx.db.venture.findUnique({
        where: { id: input.id },
        include: {
          founder: {
            include: {
              user: true,
              ventures: true,
            },
          },
          investor: {
            include: {
              user: true,
            },
          },
        },
      });
      return venture;
    }),
  delete: privateProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const venture = await ctx.db.venture.delete({
        where: { id: input.id },
      });
      return venture;
    }),
});
