import { RoleType } from "@prisma/client";
import { z } from "zod";

export const ventureSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(100).max(500),
  role: z.nativeEnum(RoleType),
  workDescription: z.string().min(50).max(500),
  skills: z
    .object({ name: z.string().min(1) })
    .array()
    .min(1),
  percent: z.coerce.number().int().min(0).max(100),
  totalPayout: z.coerce.number().int().min(1),
});
