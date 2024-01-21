import { z } from "zod";

export const founderSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  bio: z.string().min(100).max(500),
  country: z.string().min(1),
  educationAndExperience: z.string(),
});
