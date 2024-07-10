import ProfileType from "@/components/welcome/profileType";
import { api } from "@/trpc/server";

export default async function WelcomePage() {
  const user = await api.users.getCurrent.query();

  console.log(user);

  return user ? <ProfileType /> : null;
}
