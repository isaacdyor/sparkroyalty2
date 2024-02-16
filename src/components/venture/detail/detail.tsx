import { VentureStatusType } from "@prisma/client";
import VentureDetailPending from "./pending/detail";
import { FullVenture } from "@/types/types";
import { VentureDetailSide } from "./ventureDetailSide";

export const VentureDetail: React.FC<{ venture: FullVenture }> = ({
  venture,
}) => {
  return (
    <div className="flex justify-center px-14 py-14 lg:px-20">
      <div className="flex w-full flex-col rounded-lg border border-border lg:flex-row">
        {venture.status === VentureStatusType.PENDING ? (
          <VentureDetailPending venture={venture} />
        ) : venture.status === VentureStatusType.BUILDING ? (
          <p>Building</p>
        ) : venture.status === VentureStatusType.PAYOUT ? (
          <p>Payout</p>
        ) : (
          <p>Complete</p>
        )}
      </div>
    </div>
  );
};
