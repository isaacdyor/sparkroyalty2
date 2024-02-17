import { FindVentures } from "@/components/venture/find-ventures/findVentures";
import { api } from "@/trpc/server";
import { Prisma } from "@prisma/client";

const VentureListPage: React.FC = async () => {
  const ventures = await api.ventures.getAll.query();
  if (!ventures) return <p>IMPOSSIBLEL</p>;

  return <FindVentures ventures={ventures} />;
};

export default VentureListPage;
