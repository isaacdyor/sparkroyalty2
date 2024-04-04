import { z } from "zod";

export const contractSchema = z.object({
  cashPayout: z.coerce.number(),
  royaltyPayments: z
    .object({
      percent: z.coerce.number(),
      payout: z.coerce.number(),
    })
    .array(),
});
