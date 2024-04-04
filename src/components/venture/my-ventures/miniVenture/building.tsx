import { Button } from "@/components/ui/button";
import { timeAgo } from "@/lib/utils";
import type { VentureApplicationUser } from "@/server/api/routers/types";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Status } from "../../status";

export const BuildingMiniVenture: React.FC<{
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
          <div className="flex w-24 items-center gap-4">
            <div className="flex flex-col">
              <p className="text-xl">{venture.buildingUpdates?.length ?? 0}</p>
              <p className="text-muted-foreground">Reports</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              className="hidden md:block"
              href={`/venture/${venture.id}/reports`}
              passHref
            >
              <Button
                onClick={(e) => e.stopPropagation()}
                variant="outline"
                className="w-40 bg-transparent"
              >
                View Reports
              </Button>
            </Link>
            <div className="rounded-md border border-border p-2 hover:cursor-pointer hover:bg-secondary">
              <ChatBubbleLeftIcon className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
