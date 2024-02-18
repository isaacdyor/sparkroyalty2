import { Button } from "@/components/ui/button";
import { timeAgo } from "@/lib/utils";
import { VentureWithApplications } from "@/types/types";
import Link from "next/link";
import React from "react";
import { Status } from "../status";
import { PostActions } from "./postActions";

export const MiniVenture: React.FC<{ venture: VentureWithApplications }> = ({
  venture,
}) => {
  return (
    <div className="w-full border-b border-border py-6 ">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row lg:gap-0">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Link href={`/venture/${venture.id}`} passHref>
              <h2 className="text-2xl hover:underline">{venture.title}</h2>
            </Link>
            <Status status={venture.status} />
          </div>

          <p className="text-muted-foreground">{timeAgo(venture.createdAt)}</p>
        </div>
        <div className="flex items-start gap-4">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <p className="text-xl">{venture.applications.length}</p>
              <p className="text-muted-foreground">Applications</p>
            </div>
            <div className="flex flex-col pr-2">
              <p className="text-xl">0</p>
              <p className="text-muted-foreground">Messaged</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              className="hidden md:block"
              href={`/venture/${venture.id}/applications`}
              passHref
            >
              <Button variant="outline" className="bg-transparent">
                View Applications
              </Button>
            </Link>
            <PostActions id={venture.id} />
          </div>
        </div>
      </div>
    </div>
  );
};
