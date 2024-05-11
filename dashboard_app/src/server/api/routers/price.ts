import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const priceRouter = createTRPCRouter({

    createPriceForDrugName: publicProcedure
        .input(z.object({ name: z.string().min(1), price: z.number(), platform: z.string().min(1) }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.price.create({
                data: {
                    drugName: input.name,
                    price: input.price,
                    platform: input.platform,
                }
            });
        }),

    getPricesForDrug: publicProcedure
        .input(z.object({ drugName: z.string().min(1) }))
        .query(async ({ ctx, input }) => {
            return ctx.db.price.findMany({
                where: { drugName: input.drugName },
                orderBy: { createdAt: 'asc' }
            });
        }),

    getPricesForDrugBetweenDates: publicProcedure
        .input(z.object({ drugName: z.string().min(1), startDate: z.date(), endDate: z.date() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.price.findMany({
                where: {
                    drugName: input.drugName,
                    createdAt: {
                        gte: input.startDate,
                        lte: input.endDate
                    }
                },
                orderBy: { createdAt: 'asc' }
            });
        }),

    getPricesForDrugForPlatformBetweenDates: publicProcedure
        .input(z.object({ drugName: z.string().min(1), platform: z.string().min(1), startDate: z.date(), endDate: z.date() }))
        .query(async ({ ctx, input }) => {
            return ctx.db.price.findMany({
                where: {
                    drugName: input.drugName,
                    platform: input.platform,
                    createdAt: {
                        gte: input.startDate,
                        lte: input.endDate
                    }
                },
                orderBy: { createdAt: 'asc' }
            });
        }),

});
