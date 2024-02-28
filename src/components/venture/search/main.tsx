import { Search } from "@/components/navbar/search";
import type { VentureApplicationUser } from "@/server/api/routers/types";
import React, { Fragment } from "react";
import { VenturePreview } from "../find-ventures/venturePreview";

export const VentureSearchMain: React.FC<{
  ventures: VentureApplicationUser[];
}> = ({ ventures }) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <Search />
      <h1 className="text-3xl font-semibold">Ventures you might like</h1>

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
