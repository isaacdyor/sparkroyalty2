"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { VentureApplicationUser } from "@/server/api/routers/types";
import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import React, { Fragment, useState } from "react";
import { ApplicationPreview } from "./applicationPreview";

enum Filter {
  ALL = "all",
  MESSAGED = "messaged",
  ARCHIVED = "archived",
}

export const VentureApplicationList: React.FC<{
  venture: VentureApplicationUser;
}> = ({ venture }) => {
  const [sort, setSort] = React.useState("newest");
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const applications = venture.applications;
  return (
    <div className="flex justify-center px-8 py-12 md:p-14 lg:px-20">
      <div className="flex w-full flex-col gap-8">
        <h1 className="text-3xl font-semibold">
          Applications for {venture.title}
        </h1>
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
              filter === Filter.MESSAGED && "text-primary"
            }`}
            onClick={() => setFilter(Filter.MESSAGED)}
          >
            Messaged
          </p>
          <p
            className={`shrink-0 hover:cursor-pointer hover:underline ${
              filter === Filter.ARCHIVED && "text-primary"
            }`}
            onClick={() => setFilter(Filter.ARCHIVED)}
          >
            Archived
          </p>
        </div>
        <div className="flex gap-4 lg:gap-8">
          <div className="relative w-full">
            <Input placeholder="Search" />
            <div className=" absolute right-0 top-0 rounded-r-md  bg-secondary p-2 hover:cursor-pointer hover:bg-secondary/70">
              <MagnifyingGlassIcon className="h-6 w-6 " />
            </div>
          </div>
          <div className="block rounded-full border border-border p-2 hover:cursor-pointer hover:bg-secondary lg:hidden">
            <AdjustmentsHorizontalIcon className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="hidden gap-8 lg:flex">
            <div className="flex items-center gap-4 rounded-lg border border-border px-4 py-2 hover:cursor-pointer hover:bg-secondary/50">
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
              <p>Filters</p>
            </div>

            <div className="flex items-center gap-3">
              <p className="font-medium">Sort:</p>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-56">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="best-match">Best Match</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div>
          {applications.length === 0 && <p>No Applications</p>}
          {applications.map((application) => (
            <Fragment key={application.id}>
              <ApplicationPreview application={application} />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
