import { api } from "@/trpc/server";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/utils";
import {
  MapPinIcon,
  CheckBadgeIcon,
  LinkIcon,
} from "@heroicons/react/24/solid";
import { Button } from "../ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import LinkedAccount from "../profile/linkedAccount";
import { SideBar } from "../profile/sideBar";
import { MainContent } from "../profile/mainContent";
import { EmploymentDetails } from "../profile/employmentDetails";

export default async function FounderProfile() {
  const investor = await api.investors.getCurrent.query();

  type Account = {
    imageUrl: string;
    firstName: string;
    lastName: string;
    account: string;
    accountUrl: string;
  };

  if (!investor) return null;

  const linkedAccounts = [
    {
      imageUrl: investor.user.imageUrl,
      firstName: investor.user.firstName,
      lastName: investor.user.lastName,
      account: "Github",
      accountUrl: "https://github.com/isaacdyor",
    },
    {
      imageUrl: investor.user.imageUrl,
      firstName: investor.user.firstName,
      lastName: investor.user.lastName,
      account: "LinkedIn",
      accountUrl: "https://www.linkedin.com/in/isaac-dyor/",
    },
  ];

  return (
    <div className="flex w-full justify-center p-14">
      <div className="flex flex-col gap-6">
        <div className="flex w-full flex-col rounded-lg border border-border">
          <div className="flex w-full justify-between border-b border-border p-8">
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
