import type { FounderWithUser } from "@/types/types";
import { FounderHeader } from "./header";
import { FounderMainContent } from "./mainContent";
import { FounderSideBar } from "./sideBar";
import { FounderEmploymentDetails } from "./employmentDetails";

export const FounderProfile: React.FC<{ founder: FounderWithUser }> = ({
  founder,
}) => {
  return (
    <div className="flex justify-center md:px-14 md:py-14 lg:px-20">
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col rounded-lg border-border md:border">
          <FounderHeader founder={founder} />
          <div className="flex flex-col-reverse lg:flex-row">
            <FounderSideBar founder={founder} />
            <FounderMainContent founder={founder} />
          </div>
        </div>
        <FounderEmploymentDetails founder={founder} />
      </div>
    </div>
  );
};
