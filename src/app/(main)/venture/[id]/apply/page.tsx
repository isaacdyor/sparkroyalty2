import { VentureApplication } from "@/components/venture/apply/ventureApplication";
import { VentureDetail } from "@/components/venture/detail/detail";
import { api } from "@/trpc/server";
import { ActiveType } from "@prisma/client";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const user = await api.users.getCurrent.query();
  const venture = await api.ventures.getOne.query({ id });
  if (!user) return null;
  if (user.active !== ActiveType.INVESTOR)
    return <p>You must be signed in as an investor</p>;
  return venture ? (
    <VentureApplication id={venture.id} />
  ) : (
    <p>Venture not found</p>
  );
}
