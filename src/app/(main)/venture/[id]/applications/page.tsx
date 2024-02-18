import { ApplicationList } from "@/components/applications/applicationList";
import { api } from "@/trpc/server";

export default async function VentureApplicationPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const applications = await api.applications.getForVenture.query({
    ventureId: id,
  });
  return applications ? (
    <ApplicationList applications={applications} />
  ) : (
    <p>Nobody has applied yet</p>
  );
}
