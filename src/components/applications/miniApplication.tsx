import { timeAgo } from "@/lib/utils";
import { ApplicationVenture } from "@/server/api/routers/types";
import { Application } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { ApplicationActions } from "./applicationActions";

export const MiniApplication: React.FC<{ application: ApplicationVenture }> = ({
  application,
}) => {
  const venture = application.venture;
  return (
    <div className="w-full border-b border-border py-6 ">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Link href={`/venture/${venture.id}`} passHref>
              <h2 className="text-2xl hover:underline">{venture.title}</h2>
            </Link>
          </div>

          <p className="text-muted-foreground">
            {timeAgo(application.createdAt)}
          </p>
        </div>
        <ApplicationActions application={application} venture={venture} />
      </div>
    </div>
  );
};
