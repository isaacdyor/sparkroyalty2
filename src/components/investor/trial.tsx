import { getInitials } from "@/lib/utils";
import { api } from "@/trpc/server";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

import Link from "next/link";
import { EmploymentDetails } from "../profile/employmentDetails";
import { MainContent } from "../profile/mainContent";
import { SideBar } from "../profile/sideBar";
import { Header } from "./header";

export default async function Trial() {
  const investor = await api.investors.getCurrent.query();

  if (!investor) return null;

  return (
    <div className="flex justify-center md:px-14 md:py-14 lg:px-20">
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col rounded-lg border-border md:border">
          <Header investor={investor} />
          <div className="flex flex-col-reverse lg:flex-row">
            <SideBar investor={investor} />
            <MainContent investor={investor} />
          </div>
        </div>
        <EmploymentDetails investor={investor} />
      </div>
    </div>
  );
}
