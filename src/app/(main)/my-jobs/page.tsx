import { JobsList } from "@/components/jobs/jobsList";
import { api } from "@/trpc/server";

export default async function JobsPage() {
  const jobs = await api.ventures.getJobs.query();
  return jobs ? (
    <JobsList jobs={jobs} />
  ) : (
    <p>You have not submitted any applications</p>
  );
}
