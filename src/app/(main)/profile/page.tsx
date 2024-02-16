import { FounderProfile } from "@/components/profile/founder/profile";
import { InvestorProfile } from "@/components/profile/investor/profile";
import { api } from "@/trpc/server";
import { getActive } from "@/utils/getActive";
import { ActiveType } from "@prisma/client";

export default async function profilePage() {
  const active = await getActive();
  if (!active) return <p>Bruh you needa sign in</p>;
  if (active === ActiveType.NONE) return <p>Not active</p>;
  console.log(active);
  if (active === ActiveType.FOUNDER) {
    const founder = await api.founders.getCurrent.query();
    if (!founder) return <p>Founder not found</p>;
    return <FounderProfile founder={founder} />;
  } else {
    const investor = await api.investors.getCurrent.query();
    if (!investor) return <p>Investor not found</p>;
    return <InvestorProfile investor={investor} />;
  }
}
