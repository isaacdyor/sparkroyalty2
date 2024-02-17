import { VentureApplicationUser } from "@/server/api/routers/types";
import { FindVenturesMain } from "./main";
import { FindVentureSide } from "./side";

export const FindVentures: React.FC<{ ventures: VentureApplicationUser[] }> = ({
  ventures,
}) => {
  return (
    <div className="flex justify-center px-4 py-4 sm:py-12 md:p-14 lg:px-20">
      <div className="flex w-full gap-12">
        <FindVenturesMain ventures={ventures} />
        <FindVentureSide />
      </div>
    </div>
  );
};
