import { z } from 'zod';

export const RequestWithdrawalSchema = z.object({
  body: z.object({
    amountPaise: z.union([z.number(), z.string().transform(v => BigInt(v))]), // Handle stringified BigInts
    upiId: z.string().min(3).regex(/^[\w.-]+@[\w.-]+$/, 'Invalid UPI ID format (must contain @)'),
  }),
});

export const AdminProcessWithdrawalSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    status: z.enum(['COMPLETED', 'REJECTED']),
    reason: z.string().optional(), // Required only for REJECTED
  }),
});
