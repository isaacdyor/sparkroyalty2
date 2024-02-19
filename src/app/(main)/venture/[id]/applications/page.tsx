import { VentureApplicationList } from "@/components/venture/applications/applicationList/applicationList";
import { api } from "@/trpc/server";

export default async function VentureApplicationPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const venture = await api.ventures.getOne.query({
    id,
  });

  return venture ? (
    <VentureApplicationList venture={venture} />
  ) : (
    <p>Venture Not Found</p>
  );
}
