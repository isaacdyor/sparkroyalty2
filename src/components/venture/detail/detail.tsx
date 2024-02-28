import type { VentureApplicationUser } from "@/server/api/routers/types";
import { VentureStatusType } from "@prisma/client";
import { FounderHistory } from "./history";
import VentureDetailPending from "./pending/detail";

export const VentureDetail: React.FC<{ venture: VentureApplicationUser }> = ({
  venture,
}) => {
  return (
    <div className="flex flex-col justify-center gap-8 sm:px-14 sm:py-14 lg:px-20">
      <div className="flex w-full flex-col rounded-lg border-border sm:border lg:flex-row">
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
      <FounderHistory ventures={venture.founder.ventures} />
    </div>
  );
};
