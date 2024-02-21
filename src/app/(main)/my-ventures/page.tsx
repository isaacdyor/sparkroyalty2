import { MyVentures } from "@/components/venture/my-ventures/myVentures";
import { api } from "@/trpc/server";

const MyVentureListPage: React.FC = async () => {
  const ventures = await api.ventures.getCurrent.query();

  if (!ventures) return <p>You dont have any ventures</p>;
  return <MyVentures ventures={ventures} />;
};

export default MyVentureListPage;
