import { z } from 'zod';

export const createStoreSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    slug: z.string().min(2).max(100),
    logoUrl: z.string().url().optional(),
    description: z.string().optional(),
    affiliateUrl: z.string().url(),
    networkId: z.string().uuid(),
    categoryId: z.string().uuid().optional(),
    isFeatured: z.boolean().optional(),
  }),
});

export const updateStoreSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    slug: z.string().min(2).max(100).optional(),
    logoUrl: z.string().url().optional(),
    description: z.string().optional(),
    affiliateUrl: z.string().url().optional(),
    isActive: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
    categoryId: z.string().uuid().optional(),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

export type CreateStoreDto = z.infer<typeof createStoreSchema>['body'];
export type UpdateStoreDto = z.infer<typeof updateStoreSchema>['body'];
