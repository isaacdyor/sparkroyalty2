import { z } from "zod";

export const founderSchema = z.object({
  bio: z.string().min(100).max(500),
  educationAndExperience: z.string(),
});
