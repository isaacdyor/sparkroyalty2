import { ApplicationList } from "@/components/applications/applicationList";
import { api } from "@/trpc/server";

export default async function ApplicationsPage() {
  const applications = await api.applications.getMany.query();
  return applications ? (
    <ApplicationList applications={applications} />
  ) : (
    <p>You have not submitted any applications</p>
  );
}
