import { investorRouter } from "@/server/api/routers/investors";
import { founderRouter } from "@/server/api/routers/founders";
import { createTRPCRouter } from "@/server/api/trpc";
import { userRouter } from "./routers/users";
import { ventureRouter } from "./routers/ventures";
import { applicationRouter } from "./routers/applications";

export const appRouter = createTRPCRouter({
  users: userRouter,
  investors: investorRouter,
  founders: founderRouter,
  ventures: ventureRouter,
  applications: applicationRouter,
});

export type AppRouter = typeof appRouter;
