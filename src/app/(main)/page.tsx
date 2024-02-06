import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <div className="h-screen w-screen bg-red-500"></div>;
}
