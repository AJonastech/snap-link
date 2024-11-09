import { initTRPC } from '@trpc/server';
import { cache } from 'react';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { getAuth } from '@clerk/nextjs/server';

export const createTRPCContext = cache(async (opts: CreateNextContextOptions) => {
  const { req } = opts;
  const user = getAuth(req)

  return { session: user.userId };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.context<typeof createTRPCContext>().create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers

const enforceUserAuth = t.middleware(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new Error("Not autheticated")
  }
  return next();
});



export const createTRPCRouter = t.router;
export const baseProcedure = t.procedure;
export const privateProcedure = t.procedure.use(enforceUserAuth);
export const createCallerFactory = t.createCallerFactory;