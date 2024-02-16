import { FullVenture } from "@/types/types";
import React from "react";
import { VentureDetailPendingMain } from "./main";
import { VentureDetailPendingSide } from "./side";

const VentureDetailPending: React.FC<{ venture: FullVenture }> = ({
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
