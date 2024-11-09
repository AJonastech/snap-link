import { z } from 'zod';
import { createTRPCRouter, baseProcedure, privateProcedure } from '../init';
import { prisma } from '@/lib/prisma';
import { TRPCError } from '@trpc/server';
import { stripe } from '@/lib/stripe';
export const userRouter = createTRPCRouter({
    createUserIfNotExists: baseProcedure
        .input(
            z.object({
                userId: z.string(),
                name: z.string(),
                email: z.string()
            }),
        )
        .mutation(async (opts) => {
            try {
                const existingUser = await prisma.user.findUnique({
                    where: { id: opts.input.userId },
                });
                if (!existingUser) {
                    await prisma.user.create({
                        data: {
                            userId: opts.input.userId,
                            name: opts.input.name,
                            email: opts.input.email,
                        },
                    });
                }
                return {
                    success: `user created successfully`,
                };
            } catch (error) {
                throw new TRPCError({ message: 'Internal Server Error', code: 'INTERNAL_SERVER_ERROR' });
            }
        }),
    getUser: privateProcedure
        .query(async (opts) => {
            const userId = opts.ctx.session;

            if (!userId) {
                throw new TRPCError({ message: 'User ID not found in session', code: 'UNAUTHORIZED' });
            }

            const user = await prisma.user.findUnique({
                where: {
                    userId: userId,
                },
            }).catch((error) => {
                throw new TRPCError({ message: 'Failed to fetch user', code: 'BAD_REQUEST' });
            });

            if (!user) {
                throw new TRPCError({ message: 'User not found', code: 'NOT_FOUND' });
            }

            return user;
        }),
    deleteUser: privateProcedure
        .query(async (opts) => {
            const userId = opts.ctx.session;
            if (!userId) return
            await prisma.user.delete({
                where: { id: userId },
            });
            return { message: 'User deleted successfully' };
        }),
    updateUser: privateProcedure
        .input(
            z.object({
                name: z.string().optional(),
                email: z.string().optional(),
                isPremium: z.boolean().optional(),
                stripeCustomerId: z.string().optional(),
            }),
        )
        .query(async (opts) => {
            const userId = opts.ctx.session;
            if (!userId) return
            const updateData = {
                name: opts.input.name,
                email: opts.input.email,
                isPremium: opts.input.isPremium,
            };
            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data: updateData,
            });
            return updatedUser;
        }),
        createSubscriptionSession: privateProcedure
        .mutation(async ({ ctx }) => {
          const userId = ctx.session;
          if (!userId) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
          }
    
          // Retrieve user from database
          const user = await prisma.user.findUnique({ where: { userId } });
          if (!user) throw new Error('User not found');
    
          // Retrieve or create a Stripe customer for the user
          let customerId = user.stripeCustomerId;
          if (!customerId) {
            const customer = await stripe.customers.create({
              email: user.email,
            });
            customerId = customer.id;
    
            // Update user with Stripe customer ID
            await prisma.user.update({
              where: { userId },
              data: { stripeCustomerId: customerId },
            });
          }
    
          // Create a Stripe checkout session for subscription
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'subscription',
            line_items: [
              {
                price: process.env.STRIPE_PRICE_ID, // Ensure this matches the Premium plan's price ID
                quantity: 1,
              },
            ],
            customer: customerId,
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
            metadata: {
              userId: userId,
            },
          });
    
          return { sessionUrl: session.url };
        }),
    
        getUserSubscription: 
        privateProcedure.query(async ({ ctx }) => {
            const userId = ctx.session;
        
            if (!userId) {
              throw new Error('User not authenticated');
            }
        
            // Fetch user subscription info
            const user = await prisma.user.findUnique({
              where: { userId },
              select: {
                isPremium: true,
                subscriptionStatus: true,
                stripeSubscriptionId: true,
                subscription: {
                  select: {
                    plan: true,
                    startDate: true,
                    endDate: true,
                    isActive: true,
                  },
                },
              },
            });
        
            if (!user) {
              throw new Error('User not found');
            }
        
            return {
              isPremium: user.isPremium,
              subscriptionStatus: user.subscriptionStatus,
              stripeSubscriptionId: user.stripeSubscriptionId,
              plan: user.subscription?.plan,
              startDate: user.subscription?.startDate,
              endDate: user.subscription?.endDate,
              isActive: user.subscription?.isActive,
            }
    
})
})


