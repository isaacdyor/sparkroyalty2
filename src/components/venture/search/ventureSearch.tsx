"use client";
import type { VentureApplicationUser } from "@/server/api/routers/types";
import React from "react";
import { Filters } from "./filters";
import { VentureSearchMain } from "./main";

export const VentureSearch: React.FC<{
  allVentures: VentureApplicationUser[];
}> = ({ allVentures }) => {
  // const [ventures, setVentures] =
  //   useState<VentureApplicationUser[]>(allVentures);

  return (
    <div className="flex justify-center px-4 py-4 sm:py-12 md:p-14 lg:px-20">
      <div className="flex w-full gap-12">
        <Filters />
        <VentureSearchMain ventures={allVentures} />
      </div>
    </div>
  );
};
