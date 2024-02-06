import { FullVenture } from "@/types/types";
import { VentureDetailMain } from "./ventureDetailMain";
import { VentureDetailSide } from "./ventureDetailSide";

export const VentureDetail: React.FC<{ venture: FullVenture }> = ({
  venture,
}) => {
  return (
    <div className="flex justify-center pb-32 pt-4">
      <div className="flex w-3/4 items-center justify-center rounded border-2 border-border text-white">
        <VentureDetailMain venture={venture} />
        <VentureDetailSide venture={venture} />
      </div>
    </div>
  );
};
