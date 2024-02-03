import { EditFounder } from "@/components/founder/edit";
import { EditInvestor } from "@/components/investor/edit";
import { api } from "@/trpc/server";
import { ActiveType } from "@prisma/client";

export default async function profilePage() {
  const user = await api.users.getCurrent.query();

  if (user?.active === ActiveType.NONE) return null;

  return user?.active === ActiveType.FOUNDER ? (
    <EditFounder />
  ) : (
    <EditInvestor />
  );
}
