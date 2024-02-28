"use client";

import { formatCurrency, timeAgo } from "@/lib/utils";
import { HandThumbDownIcon, HeartIcon } from "@heroicons/react/24/outline";

import type { VentureApplicationUser } from "@/server/api/routers/types";
import { CheckBadgeIcon, MapPinIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { MultiStar } from "../detail/multiStar";
import { Skills } from "../skills";
import { useRouter } from "next/navigation";

export const VenturePreview: React.FC<{ venture: VentureApplicationUser }> = ({
  venture,
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`venture/${venture.id}`)}
      className="w-full border-b border-border px-4 py-6 hover:cursor-pointer hover:bg-secondary/50 "
    >
      <div className="flex flex-col items-start justify-between gap-4">
        <div className="flex w-full flex-col">
          <div className="flex justify-between">
            <Link href={`/venture/${venture.id}`} passHref>
              <h2 className="text-2xl hover:underline">{venture.title}</h2>
            </Link>

            <div className="flex items-center gap-4">
              <div className="rounded-full p-2 hover:cursor-pointer hover:bg-secondary">
                <HandThumbDownIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="rounded-full p-2 hover:cursor-pointer hover:bg-secondary">
                <HeartIcon className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
          </div>

          <p className="text-muted-foreground">{timeAgo(venture.createdAt)}</p>
        </div>
        <p>{venture.description}</p>
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <p>
            Royalty Rate:{" "}
            <span className="font-semibold">{venture.percent}%</span>
          </p>
          <p>
            Total Payout:{" "}
            <span className="font-semibold">
              {formatCurrency(venture.totalPayout)}
            </span>
          </p>
        </div>

        <Skills skills={venture.skills} />
        <p>{venture.workDescription}</p>
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1 pr-4">
            <CheckBadgeIcon className="h-4 w-4 text-primary" />
            <p className="font-semibold">Payment Verified</p>
          </div>
          <p className="pr-4">
            <span className="font-semibold">10k+</span> Revenue
          </p>
          <div className="pr-4">
            <MultiStar simple />
          </div>

          <p className="pr-4">
            Applications:{" "}
            <span className="font-semibold">{venture.applications.length}</span>
          </p>
          <div className="flex items-center gap-0.5">
            <MapPinIcon className="h-4 w-4 text-muted-foreground" />
            <p>{venture.founder.user.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
