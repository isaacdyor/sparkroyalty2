"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials, timeAgo } from "@/lib/utils";
import type { ApplicationVenture } from "@/server/api/routers/types";
import { HandThumbDownIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { ApplicationButtons } from "../applicantDetail/applicationButtons";
import { ExtraInfo } from "./extraInfo";

export const ApplicationPreview: React.FC<{
  application: ApplicationVenture;
}> = ({ application }) => {
  const router = useRouter();
  const investor = application.investor;
  const venture = application.venture;
  return (
    <div
      onClick={() =>
        router.push(`/venture/${venture.id}/applicant/${application.id}`)
      }
      className="flex w-full flex-col gap-6 border-b border-border p-2 hover:cursor-pointer hover:bg-secondary/50 sm:p-6"
    >
      <div className="flex gap-4">
        <Avatar size="xl">
          <AvatarImage src={investor.user.imageUrl} />
          <AvatarFallback>
            {getInitials(investor.user.firstName, investor.user.lastName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full items-start justify-between">
            <div className="flex flex-col">
              <p className="text-sm text-muted-foreground">
                {timeAgo(application.createdAt)}
              </p>
              <Link href={`/venture/${venture.id}/applicant/${application.id}`}>
                <p className="text-md font-semibold hover:underline">
                  {`${investor.user.firstName} ${investor.user.lastName} | Software Engineer`}
                </p>
              </Link>

              <div className="flex items-center gap-1 pt-0.5">
                <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                <p className=" text-sm text-muted-foreground">
                  {investor.user.country}
                </p>
              </div>
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <div className="rounded-full p-2 hover:cursor-pointer hover:bg-secondary">
                <HandThumbDownIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="flex gap-4">
                <ApplicationButtons application={application} />
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <ExtraInfo application={application} />
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <ExtraInfo application={application} />
      </div>
    </div>
  );
};
