import { z } from "zod";

export const applicationSchema = z.object({
  projectInterest: z.string().min(50).max(500),
  projectSkills: z.string().min(50).max(500),
});
