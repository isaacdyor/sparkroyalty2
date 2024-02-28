import type { VentureApplicationUser } from "@/server/api/routers/types";
import React from "react";
import { VentureDetailPendingMain } from "./main";
import { VentureDetailPendingSide } from "./side";

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
