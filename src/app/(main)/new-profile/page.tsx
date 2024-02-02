import ProfileType from "@/components/welcome/profileType";
import { api } from "@/trpc/server";

export default async function WelcomePage() {
  const user = await api.users.getCurrent.query();

  return user ? <ProfileType /> : null;
}
