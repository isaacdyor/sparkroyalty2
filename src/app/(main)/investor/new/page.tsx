import { getMetadata } from "@/utils/metadata/server";
import { redirect } from "next/navigation";

export default async function NewInvestorForm() {
  const metadata = await getMetadata();

  if (!metadata.investor) {
    redirect("/profile");
  }
}
