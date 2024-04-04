"use client";

import type { VentureApplicationUser } from "@/server/api/routers/types";
import React, { useState } from "react";
import { MiniJob } from "./miniJob";

enum Filter {
  ALL = "ALL",
  BUILDING = "BUILDING",
  PAYOUT = "PAYOUT",
  COMPLETED = "COMPLETED",
}

export const JobsList: React.FC<{ jobs: VentureApplicationUser[] }> = ({
  jobs,
}) => {
  const [filter, setFilter] = useState<Filter>(Filter.ALL);

  const filteredJobs = jobs.filter((job) => {
    if (filter === Filter.ALL) return true;
    if (filter === Filter.BUILDING) return job.status === "BUILDING";
    if (filter === Filter.PAYOUT) return job.status === "PAYOUT";
    if (filter === Filter.COMPLETED) return job.status === "COMPLETED";
  });
  return (
    <div className="flex justify-center px-8 py-12 md:p-14 lg:px-20">
      <div className="flex w-full flex-col gap-8">
        <h1 className="text-5xl font-semibold">My Jobs</h1>
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
          <hr className="border-b-0.5 border-border" />
          {filteredJobs.length === 0 && <p>No jobs</p>}
          {filteredJobs.map((job) => (
            <React.Fragment key={job.id}>
              <MiniJob job={job} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
