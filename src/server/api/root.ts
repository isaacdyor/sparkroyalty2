import { investorRouter } from "@/server/api/routers/investors";
import { founderRouter } from "@/server/api/routers/founders";
import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/users";

export const appRouter = createTRPCRouter({
  users: userRouter,
  investors: investorRouter,
  founders: founderRouter,
});

export type AppRouter = typeof appRouter;
