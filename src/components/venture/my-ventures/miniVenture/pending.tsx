import { Button } from "@/components/ui/button";
import { timeAgo } from "@/lib/utils";
import { VentureWithApplications } from "@/types/types";
import Link from "next/link";
import React from "react";
import { Status } from "../../status";
import { PostActions } from "../postActions";
import { useRouter } from "next/navigation";
import { VentureApplicationUser } from "@/server/api/routers/types";

export const PendingMiniVenture: React.FC<{
  venture: VentureApplicationUser;
}> = ({ venture }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/venture/${venture.id}`);
      }}
      className="w-full border-b border-border p-6 hover:cursor-pointer hover:bg-secondary/50"
    >
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
          <div className="flex flex-col">
            <p className="text-xl">{venture.applications.length}</p>
            <p className="text-muted-foreground">Applications</p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              className="hidden md:block"
              href={`/venture/${venture.id}/applications`}
              passHref
            >
              <Button
                onClick={(e) => e.stopPropagation()}
                variant="outline"
                className="bg-transparent"
              >
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
