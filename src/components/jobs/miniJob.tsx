"use client";

import { timeAgo } from "@/lib/utils";
import type { VentureApplicationUser } from "@/server/api/routers/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";

export const MiniJob: React.FC<{ job: VentureApplicationUser }> = ({ job }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push(`/venture/${job.id}`);
      }}
      className="w-full border-b border-border p-6 shadow-xl hover:cursor-pointer hover:bg-secondary/50"
    >
      <div className="flex items-center justify-between gap-6 lg:gap-0">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Link href={`/job/${job.id}`} passHref>
              <h2 className="text-2xl hover:underline">{job.title}</h2>
            </Link>
          </div>

          <p className="text-muted-foreground">{timeAgo(job.createdAt)}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex">
            <div className="flex flex-col pr-6">
              <p className="">Last Report</p>
              <p className="text-muted-foreground">4 days ago</p>
            </div>
            <div className="flex flex-col pr-6">
              <p className="">Next Report</p>
              <p className="text-muted-foreground">3 days</p>
            </div>
          </div>

          <Link href={`/job/${job.id}/applications`} passHref>
            <Button
              onClick={(e) => e.stopPropagation()}
              variant="outline"
              className="hidden bg-transparent sm:block"
            >
              Send Report
            </Button>
          </Link>
          <div className="rounded-md border border-border p-2 hover:cursor-pointer hover:bg-secondary">
            <ChatBubbleLeftIcon className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
