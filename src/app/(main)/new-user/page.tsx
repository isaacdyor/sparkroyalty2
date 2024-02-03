import { WelcomeForm } from "@/components/welcome/welcomeForm";
import { api } from "@/trpc/server";

export default async function WelcomePage() {
  const user = await api.users.getCurrent.query();

  return !user ? <WelcomeForm /> : null;
}
