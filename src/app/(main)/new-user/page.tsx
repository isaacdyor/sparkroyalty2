import { WelcomeForm } from "@/components/welcome/welcomeForm";
import { api } from "@/trpc/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function WelcomePage() {
  const user = await api.users.getCurrent.query();

  const supabase = createClient(cookies());

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) return null;

  return !user ? <WelcomeForm user={authUser} /> : null;
}
