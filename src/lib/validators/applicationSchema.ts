import { z } from "zod";

export const applicationSchema = z.object({
  projectInterest: z.string().min(10).max(500),
  projectSkills: z.string().min(10).max(500),
});
