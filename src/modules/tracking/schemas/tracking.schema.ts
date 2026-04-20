import { z } from 'zod';

export const RedirectQuerySchema = z.object({
  dealId: z.string().uuid().optional(),
});

export const PostbackPayloadSchema = z.object({
  click_id: z.string().min(1, "click_id is required"),
  txn_id: z.string().min(1, "txn_id is required"),
  amount: z.string().transform(Number).refine(n => !isNaN(n) && n >= 0, "Invalid amount"),
  payout: z.string().optional().transform(v => v ? Number(v) : undefined).refine(n => n === undefined || (!isNaN(n) && n >= 0), "Invalid payout"),
  status: z.string().min(1, "status is required"),
});

export type PostbackPayload = z.infer<typeof PostbackPayloadSchema>;
