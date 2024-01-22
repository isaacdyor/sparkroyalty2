import { getActive } from "@/utils/getActive";

export default async function AuthButton() {
  const active = await getActive();
  if (!active) return null;

  return <p>{active}</p>;
}
