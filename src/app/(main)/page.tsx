import { Button } from "@/components/ui/button";
import { api } from "@/trpc/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

import Link from "next/link";

export default async function HomePage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const authUser = await supabase.auth.getUser();
  let user;
  if (authUser.data.user) {
    user = await api.users.getCurrent.query();
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 pt-40">
      <h1 className="text-center text-7xl font-semibold">
        Introducing Spark Royalty
      </h1>
      <p className="text-center text-3xl font-semibold text-muted-foreground">
        The World&apos;s First Royalty Based Freelancing Marketplace
      </p>
      {!authUser.data.user && (
        <Button>
          <Link href="/signup">Get Started</Link>
        </Button>
      )}
      {user?.active === "INVESTOR" && (
        <Button>
          <Link href="/find-ventures">Get Started</Link>
        </Button>
      )}
      {user?.active === "FOUNDER" && (
        <Button>
          <Link href="/venture/new">Get Started</Link>
        </Button>
      )}

      <div className="absolute top-20 -z-10 h-full max-h-[36rem] w-full max-w-5xl rounded-full bg-primary/10 blur-3xl" />
    </div>
  );
}
