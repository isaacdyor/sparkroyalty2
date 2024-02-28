import type {
  Application,
  Founder,
  Investor,
  User,
  Venture,
} from "@prisma/client";

export type InvestorWithUser = Investor & { user: User };
export type FounderWithUser = Founder & { user: User };
export type FounderWithUserAndVenture = FounderWithUser & {
  ventures: Venture[];
};
export type VentureWithFounder = Venture & {
  founder: FounderWithUser;
};
export type VentureWithUserAndVenture = Venture & {
  founder: FounderWithUserAndVenture;
};
export type FullVenture = VentureWithUserAndVenture & {
  investor: InvestorWithUser | null;
};
export type VentureWithApplications = FullVenture & {
  applications: Application[];
};

export type VentureWithFounderAndApplications = VentureWithFounder & {
  applications: Application[];
};
