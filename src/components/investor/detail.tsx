import { InvestorWithUser } from "@/types/types";
import { InvestorHeader } from "./header";
import { InvestorEmploymentDetails } from "../profile/investor/employmentDetails";
import { InvestorMainContent } from "../profile/investor/mainContent";
import { InvestorSideBar } from "../profile/investor/sideBar";

export const InvestorDetail: React.FC<{ investor: InvestorWithUser }> = ({
  investor,
}) => {
  console.log(investor);
  return (
    <div className="flex justify-center md:px-14 md:py-14 lg:px-20">
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col rounded-lg border-border md:border">
          <InvestorHeader investor={investor} />
          <div className="flex flex-col-reverse lg:flex-row">
            <InvestorSideBar investor={investor} />
            <InvestorMainContent investor={investor} />
          </div>
        </div>
        <InvestorEmploymentDetails investor={investor} />
      </div>
    </div>
  );
};
