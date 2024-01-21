import { EditFounder } from "@/components/founder/edit";
import { ActiveType } from "@/types/types";
import { getMetadata } from "@/utils/metadata/server";

export default async function profilePage() {
  const metadata = await getMetadata();

  if (metadata.active === ActiveType.NONE) return null;

  return metadata.active === ActiveType.FOUNDER ? (
    <EditFounder />
  ) : (
    <EditInvestor />
  );
}
