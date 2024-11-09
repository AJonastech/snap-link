"use server"
import { TRPCError } from "@trpc/server";
import { prisma } from "./prisma";


export const handleTest = async ()=>{
    try {
        const user = await prisma.user.findUnique({
            where: { id:"123"  },
        });
        if (!user) {
            throw new TRPCError({message: 'User not found', code: 'NOT_FOUND'});
        }
        return user;
    } catch (error) {
        throw new TRPCError({message: 'Failed to fetch user', code: 'BAD_REQUEST'});
    }
}