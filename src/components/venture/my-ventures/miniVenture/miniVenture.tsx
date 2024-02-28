import type { VentureApplicationUser } from "@/server/api/routers/types";
import React from "react";
import { BuildingMiniVenture } from "./building";
import { PendingMiniVenture } from "./pending";

export const MiniVenture: React.FC<{ venture: VentureApplicationUser }> = ({
  venture,
}) => {
  if (venture.status === "PENDING") {
    return <PendingMiniVenture venture={venture} />;
  } else if (venture.status === "BUILDING") {
    return <BuildingMiniVenture venture={venture} />;
  } else if (venture.status === "PAYOUT") {
    return <PendingMiniVenture venture={venture} />;
  } else if (venture.status === "COMPLETED") {
    return <PendingMiniVenture venture={venture} />;
  }
};
