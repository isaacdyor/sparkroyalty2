import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "../ui/button";
import ProfileButton from "./ProfileButton";
import { api } from "@/trpc/server";

const AuthComponent = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  const user = await api.users.getCurrent.query();

  return authUser ? (
    <ProfileButton user={user} />
  ) : (
    <div className="hidden items-center gap-2 sm:flex">
      <Link href={"/login"} className="w-full sm:w-auto">
        <Button variant="secondary" size="sm" className="w-full">
          Log In
        </Button>
      </Link>
      <Link href="/signup" className="w-full sm:w-auto">
        <Button variant="default" size="sm" className="w-full">
          Sign Up
        </Button>
      </Link>
    </div>
  );
};

export default AuthComponent;
