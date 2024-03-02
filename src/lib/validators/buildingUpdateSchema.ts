import { z } from "zod";

export const buildingUpdateSchema = z.object({
  progress: z.string().min(10).max(500),
});
