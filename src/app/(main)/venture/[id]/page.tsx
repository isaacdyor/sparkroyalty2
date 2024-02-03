import { api } from "@/trpc/server";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const venture = await api.ventures.getOne.query({ id });
  return <div>{venture?.title}</div>;
}
