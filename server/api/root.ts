import { createTRPCRouter } from "./init";
import { clickRouter } from "./routers/clicks";
import { linksRouter } from "./routers/links";
import { userRouter } from "./routers/user";




export const appRouter = createTRPCRouter({
    user: userRouter,
    links: linksRouter,
    clicks: clickRouter
  });



export type AppRouter = typeof appRouter;