import { FullVenture } from "@/types/types";
import React from "react";
import { VentureDetailPendingMain } from "./main";
import { VentureDetailPendingSide } from "./side";
import { VentureApplicationUser } from "@/server/api/routers/types";

const VentureDetailPending: React.FC<{ venture: VentureApplicationUser }> = ({
  venture,
}) => {
  return (
    <>
      <VentureDetailPendingMain venture={venture} />
      <VentureDetailPendingSide venture={venture} />
    </>
  );
};

export default VentureDetailPending;
