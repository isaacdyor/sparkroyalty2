import { FounderDetail } from "@/components/founder/detail";
import { api } from "@/trpc/server";

const FounderDetailPage: React.FC<{ params: { id: string } }> = async ({
  params: { id },
}) => {
  const founder = await api.founders.getOne.query({ id });
  if (!founder) return <p>founder not found</p>;
  return <FounderDetail founder={founder} />;
};

export default FounderDetailPage;
