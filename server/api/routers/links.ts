import { z } from 'zod';
import { baseProcedure, createTRPCRouter, privateProcedure } from '../init';
import { prisma } from '@/lib/prisma';
import { generateShortId } from '@/lib/utils';
import { TRPCError } from '@trpc/server';
export const linksRouter = createTRPCRouter({
  createLink: privateProcedure
    .input(
      z.object({
        originalUrl: z.string().url(), // Validate as a URL
        customId: z.string().optional(), // Optional custom ID
        expiryDate: z.date().optional(), // Optional expiry date
        password: z.string().optional(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { originalUrl, customId, expiryDate, password } = input;

      const userId = ctx.session; // Assuming you have user authentication
      if (!userId) {
        throw new TRPCError({ message: 'User ID not found in session', code: 'UNAUTHORIZED' });
      }

      if (customId) {
        const existingLink = await prisma.link.findUnique({
          where: {
            customId,
          },
        });

        if (existingLink) {
          throw new Error('Custom ID already in use. Please choose another one.');
        }
      }

      // Generate a short ID if no custom ID was provided
      const shortId = customId || generateShortId();



      const newLink = await prisma.link.create({
        data: {
          originalUrl,
          customId: shortId,
          isPasswordProtected: password ? true : false,
          password,
          shortUrl: `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.APP_BASE_URL}/${shortId}`,
          userId,
          expiryDate, // Store the expiry date if provided
        },
      });

      return {
        message: 'Short URL created successfully',
        link: newLink,
      };
    }),
  fetchLinks: privateProcedure
    .input(
      z.object({
        page: z.number().int().positive().default(1),
        limit: z.number().int().positive().default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session; // Assuming you have user authentication
      if (!userId) {
        throw new TRPCError({ message: 'User ID not found in session', code: 'UNAUTHORIZED' });
      }

      const { page, limit } = input;
      const skip = (page - 1) * limit;
      // Fetch links for the current user with pagination
      let links = await prisma.link.findMany({
        where: {
          userId,
        },
        include: {
          _count: {
            select: { clickDetails: true },
          },
        },

        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc', // Assuming you want the most recent links first
        },
      });

      // Get total count of links for pagination info
      const totalLinks = await prisma.link.count({
        where: {
          userId,
        },
      });
      // Check output structure to ensure _count is returning as expected
      links = links.map(link => ({
        ...link,
        clickCount: link._count.clickDetails, // Extract click count directly
      }));


      return {
        message: 'Links fetched successfully',
        links,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalLinks / limit),
          totalLinks,
          hasNextPage: skip + links.length < totalLinks,
          hasPreviousPage: page > 1,
        },
      };
    }),

  fetchLinkDetail: baseProcedure
    .input(
      z.object({
        customId: z.string(), // Custom ID of the link to fetch
      }),
    )
    .query(async ({ input }) => {
      const { customId } = input;

      // Fetch the link detail for the given custom ID
      const linkDetail = await prisma.link.findUnique({
        where: {
          customId,
        },
        select: {
          id: true,
          customId: true,
          originalUrl: true,
          shortUrl: true,
          isPasswordProtected: true,
          expiryDate: true,
          userId: true,
          createdAt: true,
        },
      });

      if (!linkDetail) {
        throw new TRPCError({ message: 'Link not found', code: 'NOT_FOUND' });
      }

      return {
        message: 'Link detail fetched successfully',
        data: linkDetail
      };
    }),
  registerClick: baseProcedure
    .input(
      z.object({
        customId: z.string(),      // Custom ID of the link clicked
        location: z.string().optional(), // Optional location of the click
        device: z.string().optional(),   // Optional device information
      })
    )
    .mutation(async ({ input }) => {
      const { customId, location, device } = input;

      // Find the link associated with the customId
      const link = await prisma.link.findUnique({
        where: {
          customId,
        },
      });

      if (!link) {
        throw new TRPCError({ message: 'Link not found', code: 'NOT_FOUND' });
      }


      // Create a new Click record with date, location, and device details
      const newClick = await prisma.click.create({
        data: {
          linkId: link.id,
          date: new Date(),    // Automatically set to the current date and time
          location,
          device,
        },
      });

      return {
        message: 'Click registered successfully',
        click: newClick,
      };
    }),

  updateLinkClicks: privateProcedure
    .input(
      z.object({
        customId: z.string(), // Custom ID of the link to update
      }),
    )
    .mutation(async ({ input }) => {
      const { customId } = input;
      // Update the link's clicks without checking user authentication or ownership
      const existingLink = await prisma.link.findUnique({
        where: {
          customId,
        },
      });

      if (!existingLink) {
        throw new TRPCError({ message: 'Link not found', code: 'NOT_FOUND' });
      }

      await prisma.link.update({
        where: {
          customId,
        },
        data: {
        
        },
      });

      return {
        message: 'Link clicks updated successfully',
      };
    }),
  unlockLink: privateProcedure
    .input(
      z.object({
        customId: z.string(), // Custom ID of the link to unlock
        password: z.string(), // Password to unlock the link
      }),
    )
    .mutation(async ({ input }) => {
      const { customId, password } = input;
      // Check if the link exists and the password matches
      const existingLink = await prisma.link.findUnique({
        where: {
          customId,
        },
        select: {
          password: true,
          originalUrl: true, // Added to select the original URL
        },
      });

      if (!existingLink || existingLink.password !== password) {
        throw new TRPCError({ message: 'Link not found or password is incorrect', code: 'NOT_FOUND' });
      }

      // If the password matches, return the original URL
      return {
        message: 'Link unlocked successfully',
        originalUrl: existingLink.originalUrl,
      };
    }),
  deleteLink: privateProcedure
    .input(
      z.object({
        customId: z.string(), // Custom ID of the link to delete
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { customId } = input;
      const userId = ctx.session; // Assuming you have user authentication
      if (!userId) {
        throw new TRPCError({ message: 'User ID not found in session', code: 'UNAUTHORIZED' });
      }
      // Check if the link exists and belongs to the current user
      const existingLink = await prisma.link.findUnique({
        where: {
          customId,
        },
      });

      if (!existingLink || existingLink.userId !== userId) {
        throw new TRPCError({ message: 'Link not found or unauthorized to delete', code: 'NOT_FOUND' });
      }

      // Delete the link
      await prisma.link.delete({
        where: {
          customId,
        },
      });

      return {
        message: 'Link deleted successfully',
      };
    }),
    updateLinkDetails: privateProcedure
      .input(
        z.object({
          customId: z.string(), // Custom ID of the link to update
          originalUrl: z.string().url().optional(), // Optional new original URL
          expiryDate: z.date().optional(), // Optional new expiry date
          password: z.string().optional(), // Optional new password
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const { customId, originalUrl, expiryDate, password } = input;
        const userId = ctx.session; // Assuming you have user authentication
        if (!userId) {
          throw new TRPCError({ message: 'User ID not found in session', code: 'UNAUTHORIZED' });
        }

        // Check if the link exists and belongs to the current user
        const existingLink = await prisma.link.findUnique({
          where: {
            customId,
          },
        });

        if (!existingLink || existingLink.userId !== userId) {
          throw new TRPCError({ message: 'Link not found or unauthorized to update', code: 'NOT_FOUND' });
        }

        // Update the link details
        const updatedLink = await prisma.link.update({
          where: {
            customId,
          },
          data: {
            originalUrl: originalUrl || existingLink.originalUrl,
            expiryDate: expiryDate || existingLink.expiryDate,
            password: password || existingLink.password,
            isPasswordProtected: password ? true : existingLink.isPasswordProtected,
          },
        });

        return {
          message: 'Link details updated successfully',
          link: updatedLink,
        };
      }),
      fetchTopLinks: privateProcedure
      .query(async ({ ctx }) => {
        const userId = ctx.session;
        if (!userId) {
          throw new TRPCError({ message: 'User ID not found in session', code: 'UNAUTHORIZED' });
        }
    
        // Fetch all links with click details and group by month or other criteria for line chart
        const allLinks = await prisma.link.findMany({
          where: { userId },
          include: {
            clickDetails: true,
            _count: { select: { clickDetails: true } },
          },
        });
    
        // Total clicks and link count
        const totalLinkCount = allLinks.length;
        const totalClickCount = allLinks.reduce((acc, link) => acc + link._count.clickDetails, 0);
    
        // Top 4 links based on click counts
        const topLinks = allLinks
          .sort((a, b) => b._count.clickDetails - a._count.clickDetails)
          .slice(0, 4)
          .map(link => ({
            ...link,
            clickCount: link._count.clickDetails,
          }));
  
    
        // Line Chart Data - clicks over time (e.g., monthly)
        const clickDataOverTime = await prisma.click.groupBy({
          by: ['date'],
          _count: { _all: true },
          where: { link: { userId } },
          orderBy: { date: 'asc' },
        });
    
        const lineChartData = {
          labels: clickDataOverTime
            .filter(data => new Date(data.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) // Filter for the past 7 days
            .map(data => data.date.toISOString().slice(0, 10)), // e.g., 'YYYY-MM-DD' for daily
          datasets: [
            {
              label: 'Clicks',
              data: clickDataOverTime
          .filter(data => new Date(data.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) // Filter for the past 7 days
          .map(data => data._count._all),
            },
          ],
        };
    
        // Bar Chart Data - top 4 links by click counts
        const barChartData = {
          labels: topLinks.map(link => link.customId),
          datasets: [
            {
              label: 'Conversions',
              data: topLinks.map(link => link.clickCount),
            },
          ],
        };
    
        // Pie Chart Data - device distribution
        const deviceData = await prisma.click.groupBy({
          by: ['device'],
          _count: { _all: true },
          where: { link: { userId } },
        });
    
        const pieChartData = {
          labels: deviceData.map(data => data.device || 'Unknown'), // Handle undefined values
          datasets: [
            {
              data: deviceData.map(data => data._count._all),
            },
          ],
        };
    
        return {
          totalLinkCount,
          totalClickCount,
          lineChartData,
          barChartData,
          links:topLinks,
          pieChartData,
        };
      }),
    
  

});

