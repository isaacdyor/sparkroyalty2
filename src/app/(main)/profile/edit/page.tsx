import { EditFounder } from "@/components/founder/edit";
import { EditInvestor } from "@/components/investor/edit";
import { getActive } from "@/utils/getActive";
import { ActiveType } from "@prisma/client";

export default async function profilePage() {
  const active = await getActive();

  if (active === ActiveType.NONE) return null;

  return active === ActiveType.FOUNDER ? <EditFounder /> : <EditInvestor />;
}
