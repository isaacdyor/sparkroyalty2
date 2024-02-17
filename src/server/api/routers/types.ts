import { Prisma } from "@prisma/client";

export const ventureInclude = Prisma.validator<Prisma.VentureInclude>()({
  applications: true,
  founder: {
    include: {
      user: true,
    },
  },
});

export type VentureApplicationUser = Prisma.VentureGetPayload<{
  include: typeof ventureInclude;
}>;
