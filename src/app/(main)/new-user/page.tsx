import { WelcomeForm } from "@/components/welcome/welcomeForm";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function WelcomePage() {
  const user = await api.users.getCurrent.query();
  if (user) redirect("new-profile");

  return <WelcomeForm />;
}
