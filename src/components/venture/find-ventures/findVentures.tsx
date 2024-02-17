"use client";

import { Search } from "@/components/navbar/search";
import { Venture } from "@prisma/client";
import { VenturePreview } from "./venturePreview";

export const FindVentures: React.FC<{ ventures: Venture[] }> = ({
  ventures,
}) => {
  return (
    <div className="flex justify-center px-8 py-12 md:p-14 lg:px-20">
      <div className="flex w-full flex-col gap-8">
        <Search />
        <h1 className="text-3xl font-semibold">Ventures you might like</h1>
        <div>
          <hr className="border-b-0.5 border-border" />
          {ventures.map((venture) => (
            <VenturePreview venture={venture} />
          ))}
        </div>
      </div>
    </div>
  );
};
