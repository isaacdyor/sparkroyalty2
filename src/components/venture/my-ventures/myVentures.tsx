"use client";

import { Button } from "@/components/ui/button";
import type { VentureApplicationUser } from "@/server/api/routers/types";
import Link from "next/link";
import React, { useState } from "react";
import { MiniVenture } from "./miniVenture/miniVenture";

enum Filter {
  ALL = "ALL",
  PENDING = "PENDING",
  BUILDING = "BUILDING",
  PAYOUT = "PAYOUT",
  COMPLETED = "COMPLETED",
}

export const MyVentures: React.FC<{ ventures: VentureApplicationUser[] }> = ({
  ventures,
}) => {
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  const filteredVentures = ventures.filter((venture) => {
    if (filter === Filter.ALL) return true;
    if (filter === Filter.PENDING) return venture.status === "PENDING";
    if (filter === Filter.BUILDING) return venture.status === "BUILDING";
    if (filter === Filter.PAYOUT) return venture.status === "PAYOUT";
    if (filter === Filter.COMPLETED) return venture.status === "COMPLETED";
  });

  return (
    <div className="flex justify-center px-8 py-12 md:p-14 lg:px-20">
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:gap-0">
          <h1 className="text-3xl font-semibold">My Ventures</h1>
          <Link href="venture/new" passHref>
            <Button>Create new venture</Button>
          </Link>
        </div>
        <div className="flex items-center gap-4 overflow-x-auto border-b border-border pb-4 text-lg text-muted-foreground sm:pb-0.5">
          <p
            className={`hover:text shrink-0 hover:cursor-pointer hover:underline ${
              filter === Filter.ALL && "text-primary"
            }`}
            onClick={() => setFilter(Filter.ALL)}
          >
            All
          </p>
          <p
            className={`shrink-0 hover:cursor-pointer hover:underline ${
              filter === Filter.PENDING && "text-primary"
            }`}
            onClick={() => setFilter(Filter.PENDING)}
          >
            Pending
          </p>
          <p
            className={`shrink-0 hover:cursor-pointer hover:underline ${
              filter === Filter.BUILDING && "text-primary"
            }`}
            onClick={() => setFilter(Filter.BUILDING)}
          >
            Building
          </p>
          <p
            className={`shrink-0 hover:cursor-pointer hover:underline ${
              filter === Filter.PAYOUT && "text-primary"
            }`}
            onClick={() => setFilter(Filter.PAYOUT)}
          >
            Payout
          </p>
          <p
            className={`shrink-0 hover:cursor-pointer hover:underline ${
              filter === Filter.COMPLETED && "text-primary"
            }`}
            onClick={() => setFilter(Filter.COMPLETED)}
          >
            Completed
          </p>
        </div>
        <div>
          {filteredVentures.map((venture) => (
            <React.Fragment key={venture.id}>
              <MiniVenture venture={venture} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
