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
            <Button variant="outline">See Public View</Button>
            <Button variant="default">Edit Profile</Button>
          </div>
        </div>
        <div className="flex">
          <div className="flex w-1/3 flex-col gap-2 border-r border-border">
            <div className="! flex items-center justify-between border-b border-border  p-8">
              <div className="flex flex-col">
                <p className="text-2xl">$10k+</p>
                <p className="text-muted-foreground">Total Earnings</p>
              </div>
              <div className="flex flex-col">
                <p className="text-2xl">6</p>
                <p className="text-muted-foreground">Total Jobs</p>
              </div>
              <div className="flex flex-col">
                <p className="text-2xl">2</p>
                <p className="text-muted-foreground">Current Jobs</p>
              </div>
            </div>
            <div className="flex flex-col gap-10 p-8">
              <div className="flex flex-col">
                <p className="pb-1 text-2xl font-semibold">Languages:</p>
                <p className="text-lg">
                  English:{" "}
                  <span className="text-muted-foreground">
                    Native or Billingual
                  </span>
                </p>
              </div>
              <div className="flex flex-col">
                <p className="pb-1 text-2xl font-semibold">Verifications:</p>
                <div className="flex items-center gap-1">
                  <CheckBadgeIcon className="h-5 w-5 text-primary" />
                  <p className="text-lg">Phone Number: Verified</p>
                </div>
                <div className="flex items-center gap-1">
                  <CheckBadgeIcon className="h-5 w-5 text-primary" />
                  <p className="text-lg">ID: Verified</p>
                </div>
              </div>
              <div className="flex flex-col">
                <p className="pb-1 text-2xl font-semibold">Linked Accounts:</p>
                <div className="flex flex-col gap-2">
                  {linkedAccounts.map((account: Account) => (
                    <LinkedAccount account={account} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className=" w-2/3 "></div>
        </div>
      </div>
    </div>
  );
}
