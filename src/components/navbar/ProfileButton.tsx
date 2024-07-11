"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@prisma/client";
import { getInitials } from "@/lib/utils";
// import { SwitchActiveButton } from "./switchAccount";
import { useActiveContext } from "@/utils/activeContext";

const ProfileButton: React.FC<{ user: User | null }> = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { active, setActive } = useActiveContext();

  const router = useRouter();
  const supabase = createClient();

  const signOut = async () => {
    setActive(null);
    await supabase.auth.signOut();
    router.refresh();
  };

  const ref = React.useRef<HTMLDivElement>(null);

  // close the modal if we click outside of it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref]);

  if (!user || !active) return null;
  return (
    <div ref={ref} className="hidden sm:block">
      <Avatar
        className="hover:cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <AvatarImage src={user.imageUrl} />
        <AvatarFallback>
          {getInitials(user.firstName, user.lastName)}
        </AvatarFallback>
      </Avatar>

      {menuOpen && (
        // <div className="absolute right-5 top-16 z-50 flex w-72 flex-col rounded-lg bg-secondary bg-opacity-80 p-4">
        <div className="absolute right-5 top-16 z-50 flex w-72 flex-col rounded-lg border border-border bg-background bg-opacity-80 p-4 shadow-2xl">
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <div className="pr-4">
                <Avatar>
                  <AvatarImage src={user.imageUrl} />
                  <AvatarFallback>
                    {getInitials(user.firstName, user.lastName)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col">
                <p className="text-xl">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-md text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            {/* <SwitchActiveButton setMenuOpen={setMenuOpen} /> */}
          </div>
          <hr className="my-4 border-t border-border" />
          <div className="flex flex-col gap-3">
            <p className="text-lg text-muted-foreground">
              <Link
                onClick={() => setMenuOpen(false)}
                className="hover:text-muted-foreground/70"
                href="/profile"
              >
                Profile
              </Link>
            </p>

            {/* <Link
              onClick={() => setMenuOpen(false)}
              className="text-lg text-muted-foreground hover:text-muted-foreground/70"
              href="/settings"
            > */}
            <p className="text-muted-foreground">Settings</p>
            {/* </Link> */}
            <p
              onClick={() =>
                signOut().then(() => {
                  setMenuOpen(false);

                  router.refresh();
                })
              }
              className="text-lg text-muted-foreground hover:cursor-pointer hover:text-muted-foreground/70"
            >
              Sign out
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
