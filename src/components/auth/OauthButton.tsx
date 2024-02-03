"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import type { Provider } from "@supabase/supabase-js";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const OauthButton: React.FC<{ provider: Provider }> = ({ provider }) => {
  const pathname = usePathname();
  const supabase = createClient();

  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      // options: {
      //   redirectTo: `${location.origin}/auth/callback?next=${pathname}`,
      // },
    });

    if (error) {
      setError(error.message);
    }
  };

  if (provider === "google") {
    return (
      <Button
        variant="outline"
        className="mb-2 w-full font-normal text-muted-foreground"
        onClick={() => handleLogin().catch(console.error)}
      >
        <div className="flex items-center gap-2">
          <FcGoogle className="h-5 w-5" />
          <p>Sign in with Google</p>
        </div>
      </Button>
    );
  }

  if (provider === "github") {
    return (
      <Button
        variant="outline"
        className="mb-2 w-full font-normal text-muted-foreground"
        onClick={handleLogin}
      >
        <div className="flex items-center gap-2">
          <FaGithub className="h-5 w-5" />
          <p>Sign in with GitHub</p>
        </div>
      </Button>
    );
  }

  if (error) {
    return (
      <div className="mb-3 mt-1 rounded-md border border-destructive bg-destructive/10 p-3">
        <p className="text-center text-sm font-medium text-destructive">
          {error}
        </p>
      </div>
    );
  }
};

export default OauthButton;
