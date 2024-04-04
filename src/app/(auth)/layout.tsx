import React from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.png";

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }
  return (
    <>
      <Link href={"/"} className="absolute left-6 top-4 shrink-0 lg:left-14">
        <div className="flex gap-2">
          <Image
            src={logo}
            width={125.2}
            height={91.6}
            className="h-9 w-7"
            alt="Picture of the author"
          />
          <h1 className="text-2xl font-bold text-accent-foreground">
            Spark Royalty
          </h1>
        </div>
      </Link>
      {children}
    </>
  );
};

export default RootLayout;
