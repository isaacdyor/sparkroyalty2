import { VentureDetail } from "@/components/venture/detail/detail";
import { api } from "@/trpc/server";

export default async function VentureDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const venture = await api.ventures.getOne.query({ id });
  return venture ? (
    <VentureDetail venture={venture} />
  ) : (
    <p>Venture not found</p>
  );
}
