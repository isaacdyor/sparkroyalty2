import { FounderWithUser } from "@/types/types";
import { FounderEmploymentDetails } from "../profile/founder/employmentDetails";
import { FounderMainContent } from "../profile/founder/mainContent";
import { FounderSideBar } from "../profile/founder/sideBar";
import { FounderHeader } from "../founder/header";

export const FounderDetail: React.FC<{ founder: FounderWithUser }> = ({
  founder,
}) => {
  console.log(founder);
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
