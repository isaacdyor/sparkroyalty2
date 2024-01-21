import FounderProfile from "@/components/founder/profile";
import InvestorProfile from "@/components/investor/investor-profile";
import { ActiveType } from "@/types/types";
import { getMetadata } from "@/utils/metadata/server";

export default async function profilePage() {
  const metadata = await getMetadata();

  if (metadata.active === ActiveType.NONE) return null;

  return metadata.active === ActiveType.FOUNDER ? (
    <FounderProfile />
  ) : (
    <InvestorProfile />
  );
}
