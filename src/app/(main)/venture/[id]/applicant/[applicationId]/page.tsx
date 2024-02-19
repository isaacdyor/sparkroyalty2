import { ApplicantDetail } from "@/components/venture/applicantDetail/applicantDetail";
import { VentureDetail } from "@/components/venture/detail/detail";
import { api } from "@/trpc/server";

export default async function VentureDetailPage({
  params: { id, applicationId },
}: {
  params: { id: string; applicationId: string };
}) {
  const venture = await api.ventures.getOne.query({ id });
  const application = await api.applications.getOne.query({ applicationId });
  if (!venture) return <p>Venture not found</p>;
  return application ? (
    <ApplicantDetail application={application} />
  ) : (
    <p>Applicant not found</p>
  );
}
