import { InvestorWithUser } from "@/types/types";
import React from "react";
import { InvestorHeader } from "./header";
import { InvestorMainContent } from "./mainContent";
import { InvestorSideBar } from "./sideBar";
import { InvestorEmploymentDetails } from "./employmentDetails";

export const InvestorProfile: React.FC<{ investor: InvestorWithUser }> = ({
  investor,
}) => {
  return (
    <p>hi</p>
    // <div className="flex justify-center md:px-14 md:py-14 lg:px-20">
    //   <div className="flex w-full flex-col gap-6">
    //     <div className="flex flex-col rounded-lg border-border md:border">
    //       <InvestorHeader investor={investor} />
    //       <div className="flex flex-col-reverse lg:flex-row">
    //         <InvestorSideBar investor={investor} />
    //         <InvestorMainContent investor={investor} />
    //       </div>
    //     </div>
    //     <InvestorEmploymentDetails investor={investor} />
    //   </div>
    // </div>
  );
};
