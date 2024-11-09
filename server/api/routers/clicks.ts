import { z } from 'zod';
import { createTRPCRouter, privateProcedure } from '../init';
import { prisma } from '@/lib/prisma';
import { TRPCError } from '@trpc/server';
export const clickRouter = createTRPCRouter({
    fetchLinkClicks: privateProcedure
    .input(
      z.object({
        customId: z.string(), 
        page: z.number().int().positive().default(1),
        limit: z.number().int().positive().default(10),
      })
    )
    .query(async ({ input, ctx }) => {
      const { customId, page, limit } = input;
      const userId = ctx.session; // Assuming you have user authentication
      const skip = (page - 1) * limit;
      if (!userId) {
        throw new TRPCError({ message: 'User ID not found in session', code: 'UNAUTHORIZED' });
      }
  
      // Find the link by custom ID and verify ownership by the user
      const link = await prisma.link.findUnique({
        where: {
          customId,
        },
        select: {
          id: true,
          userId: true,
        },
      });
  
      if (!link || link.userId !== userId) {
        throw new TRPCError({ message: 'Link not found or unauthorized access', code: 'NOT_FOUND' });
      }
  
      const totalClicks = await prisma.click.count({
        where: {
          linkId: link.id,
        },
      });
      // Fetch click details for the specific link
      const clickDetails = await prisma.click.findMany({
        where: {
          linkId: link.id,
        },
        skip,
        take: limit,
        orderBy: {
          date: 'desc', // Order by most recent clicks first
        },
      });
  
      return {
        message: 'Click details fetched successfully',
        data: clickDetails,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalClicks / limit),
           
            totalClicks,
            hasNextPage: skip + clickDetails.length < totalClicks,
            hasPreviousPage: page > 1,
          },
        };
      }),
});



