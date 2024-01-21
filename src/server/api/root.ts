import { investorRouter } from "@/server/api/routers/investors";
import { founderRouter } from "@/server/api/routers/founders";
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
  investors: investorRouter,
  founders: founderRouter,
});

export type AppRouter = typeof appRouter;
