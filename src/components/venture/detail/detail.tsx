import { FullVenture } from "@/types/types";
import { VentureDetailMain } from "./ventureDetailMain";
import { VentureDetailSide } from "./ventureDetailSide";

export const VentureDetail: React.FC<{ venture: FullVenture }> = ({
  venture,
}) => {
  return (
    <div className="flex justify-center px-14 py-14 lg:px-20">
      <div className="flex w-full items-center justify-center rounded-lg border border-border">
        <VentureDetailMain venture={venture} />
        <VentureDetailSide venture={venture} />
      </div>
    </div>
  );
};
