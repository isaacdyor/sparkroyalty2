import { FindVentures } from "@/components/venture/find-ventures/findVentures";
import { api } from "@/trpc/server";

export default async function VentureListPage() {
  const ventures = await api.ventures.getAll.query();
  console.log(ventures);
  if (!ventures) return <p>IMPOSSIBLEL</p>;

  return <FindVentures ventures={ventures} />;
}
