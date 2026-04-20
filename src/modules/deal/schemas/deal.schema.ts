import { z } from 'zod';

export const createDealSchema = z.object({
  body: z.object({
    title: z.string().min(5),
    description: z.string().optional(),
    cashbackValue: z.number().positive(),
    isPercentage: z.boolean().default(true),
    couponCode: z.string().optional().nullable(),
    expiryDate: z.string().datetime().optional().nullable(),
    storeId: z.string().uuid(),
    isFeatured: z.boolean().optional(),
    isTrendingOverride: z.boolean().optional(),
  }),
});

export const updateDealSchema = z.object({
  body: z.object({
    title: z.string().min(5).optional(),
    description: z.string().optional(),
    cashbackValue: z.number().positive().optional(),
    isPercentage: z.boolean().optional(),
    couponCode: z.string().optional().nullable(),
    expiryDate: z.string().datetime().optional().nullable(),
    isActive: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    isTrendingOverride: z.boolean().optional(),
  }),
});

export const getDealsQuerySchema = z.object({
  query: z.object({
    page: z.string().optional().transform((val) => (val ? parseInt(val) : 1)),
    limit: z.string().optional().transform((val) => (val ? parseInt(val) : 10)),
    storeId: z.string().uuid().optional(),
    categoryId: z.string().uuid().optional(),
    isFeatured: z.string().optional().transform((val) => val === 'true'),
    isTrending: z.string().optional().transform((val) => val === 'true'),
    sort: z.enum(['cashback', 'trending', 'newest']).optional().default('newest'),
  }),
});
