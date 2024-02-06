import { getInitials } from "@/lib/utils";
import { api } from "@/trpc/server";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

import Link from "next/link";
import { EmploymentDetails } from "../profile/employmentDetails";
import { MainContent } from "../profile/mainContent";
import { SideBar } from "../profile/sideBar";

export default async function FounderProfile() {
  const investor = await api.investors.getCurrent.query();

  if (!investor) return null;

  return (
    <div className="flex justify-center px-14 py-14 lg:px-20">
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col rounded-lg border border-border">
          <div className="flex justify-between border-b border-border p-8">
            <div className="flex gap-4 ">
              <Avatar size="xl">
                <AvatarImage src={investor.user.imageUrl} />
                <AvatarFallback>
                  {getInitials(investor.user.firstName, investor.user.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-4xl font-semibold">{`${investor.user.firstName} ${investor.user.lastName}`}</p>
                <div className="flex items-center gap-1">
                  <MapPinIcon className="h-5 w-5 text-muted-foreground" />
                  <p className="text-lg text-muted-foreground">
                    {investor.user.country}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Link href={`investor/${investor.id}`}>See Public View</Link>
              </Button>
              <Button variant="default">
                <Link href="profile/edit">Edit Profile</Link>
              </Button>
            </div>
          </div>
          <div className="flex">
            <SideBar investor={investor} />
            <MainContent investor={investor} />
          </div>
        </div>
        <EmploymentDetails investor={investor} />
      </div>
    </div>
  );
}
