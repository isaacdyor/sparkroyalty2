import { Founder, Investor, User, Venture } from "@prisma/client";

export type InvestorWithUser = Investor & { user: User };
export type FounderWithUser = Founder & { user: User };
export type VentureWithFounder = Venture & { founder: FounderWithUser };
export type FullVenture = VentureWithFounder & {
  investor: InvestorWithUser | null;
};
