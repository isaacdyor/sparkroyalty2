import { VentureSearch } from "@/components/venture/search/ventureSearch";
import { api } from "@/trpc/server";

const VentureSearchPage: React.FC = async () => {
  const ventures = await api.ventures.getAll.query();
  if (!ventures) return <p>IMPOSSIBLEL</p>;

  return <VentureSearch allVentures={ventures} />;
};

export default VentureSearchPage;
