import FounderProfile from "@/components/founder/profile";
import InvestorProfile from "@/components/investor/profile";
import { getActive } from "@/utils/getActive";
import { ActiveType } from "@prisma/client";

export default async function profilePage() {
  const active = await getActive();
  if (!active) return <p>Bruh you needa sign in</p>;
  if (active === ActiveType.NONE) return <p>Not active</p>;

  return active === ActiveType.FOUNDER ? (
    <FounderProfile />
  ) : (
    <InvestorProfile />
  );
}
