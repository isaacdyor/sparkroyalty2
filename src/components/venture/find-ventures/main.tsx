"use client";

import { Search } from "@/components/navbar/search";
import { Venture } from "@prisma/client";
import { VenturePreview } from "./venturePreview";
import { Fragment, useState } from "react";
import { VentureWithFounder } from "@/types/types";
import { VentureApplicationUser } from "@/server/api/routers/types";

enum Filter {
  BestMatches = "bestMatches",
  MostRecent = "mostRecent",
  SavedVentures = "savedVentures",
}

export const FindVenturesMain: React.FC<{
  ventures: VentureApplicationUser[];
}> = ({ ventures }) => {
  const [filter, setFilter] = useState<Filter>(Filter.BestMatches);
  return (
    <div className="flex w-full flex-col gap-4">
      <Search />
      <h1 className="text-3xl font-semibold">Ventures you might like</h1>
      <div className="flex items-center gap-4 overflow-x-auto border-b border-border pb-4 text-lg text-muted-foreground sm:pb-0.5">
        <p
          className={`hover:text shrink-0 hover:cursor-pointer hover:underline ${
            filter === Filter.BestMatches && "text-primary"
          }`}
          onClick={() => setFilter(Filter.BestMatches)}
        >
          Best Matches
        </p>
        <p
          className={`shrink-0 hover:cursor-pointer hover:underline ${
            filter === Filter.MostRecent && "text-primary"
          }`}
          onClick={() => setFilter(Filter.MostRecent)}
        >
          Most Recent
        </p>
        <p
          className={`shrink-0 hover:cursor-pointer hover:underline ${
            filter === Filter.SavedVentures && "text-primary"
          }`}
          onClick={() => setFilter(Filter.SavedVentures)}
        >
          Saved ventures
        </p>
      </div>

      <div>
        {ventures.map((venture) => (
          <Fragment key={venture.id}>
            <VenturePreview venture={venture} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};
