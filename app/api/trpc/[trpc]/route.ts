import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createTRPCContext } from '@/server/api/init';
import { appRouter } from '@/server/api/root';
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: void createTRPCContext as any,
  });
export { handler as GET, handler as POST };