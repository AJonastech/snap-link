import 'server-only'; // <-- ensure this file cannot be imported from the client
import { createHydrationHelpers } from '@trpc/react-query/rsc';
import { cache } from 'react';
import { createCallerFactory, createTRPCContext } from '../server/api/init';
import { makeQueryClient } from './query-client';
import { appRouter } from '../server/api/root';

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during th





export const getQueryClient = cache(makeQueryClient);

 const caller = createCallerFactory(appRouter)({
  session:"1234"
});


export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient,
);