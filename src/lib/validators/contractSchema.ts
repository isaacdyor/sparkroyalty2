import { z } from "zod";

export const contractSchema = z.object({
  cashPayout: z.string(),
  royaltyPayments: z
    .object({
      percent: z.string(),
      payout: z.string(),
    })
    .array()
    .min(0),
});
