"use client";
import { VentureApplicationUser } from "@/server/api/routers/types";
import React, { useState } from "react";
import { Filters } from "./filters";
import { VentureSearchMain } from "./main";

export const VentureSearch: React.FC<{
  allVentures: VentureApplicationUser[];
}> = ({ allVentures }) => {
  const [ventures, setVentures] =
    useState<VentureApplicationUser[]>(allVentures);
  return (
    <div className="flex justify-center px-4 py-4 sm:py-12 md:p-14 lg:px-20">
      <div className="flex w-full gap-12">
        <Filters setVentures={setVentures} />
        <VentureSearchMain ventures={ventures} />
      </div>
    </div>
  );
};
