import type { VentureApplicationUser } from "@/server/api/routers/types";
import React from "react";
import { VentureDetailBuildingMain } from "./main";
import { VentureDetailBuildingSide } from "./side";

const VentureDetailBuilding: React.FC<{ venture: VentureApplicationUser }> = ({
  venture,
}) => {
  return (
    <>
      <VentureDetailBuildingMain venture={venture} />
      <VentureDetailBuildingSide venture={venture} />
    </>
  );
};

export default VentureDetailBuilding;
