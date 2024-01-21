import { Unauthorized } from "@/components/error-pages/unauthorized";
import NewFounderForm from "@/components/founder/new";
import { getMetadata } from "@/utils/metadata/server";

export default async function NewFounderPage() {
  const metadata = await getMetadata();

  if (metadata.founder) {
    return <Unauthorized />;
  }

  return <NewFounderForm metadata={metadata} />;
}
