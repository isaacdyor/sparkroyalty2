import { getMetadata } from "@/utils/metadata/server";
import { redirect } from "next/navigation";
import { NewInvestorForm } from "@/components/investor/new";

export default async function NewInvestorPage() {
  const metadata = await getMetadata();

  if (metadata.investor) {
    redirect("/profile");
  }

  return <NewInvestorForm metadata={metadata} />;
}
