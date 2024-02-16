import { InvestorDetail } from "@/components/investor/detail";
import { api } from "@/trpc/server";

const InvestorDetailPage: React.FC<{ params: { id: string } }> = async ({
  params: { id },
}) => {
  const investor = await api.investors.getOne.query({ id });
  if (!investor) return <p>Investor not found</p>;
  return <InvestorDetail investor={investor} />;
};

export default InvestorDetailPage;
