import { investorRouter } from "@/server/api/routers/investors";
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  investors: investorRouter,
});

export type AppRouter = typeof appRouter;
