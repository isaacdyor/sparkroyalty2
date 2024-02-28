import { InvestorEmploymentDetails } from "@/components/profile/investor/employmentDetails";
import { InvestorMainContent } from "@/components/profile/investor/mainContent";
import { InvestorSideBar } from "@/components/profile/investor/sideBar";
import type { ApplicationVenture } from "@/server/api/routers/types";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { ApplicantDetailHeader } from "./header";
import { ApplicationDetailMain } from "./main";

export const ApplicantDetail: React.FC<{
  application: ApplicationVenture;
}> = ({ application }) => {
  return (
    <div className="flex flex-col justify-center gap-8 sm:p-14 lg:px-20">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-1 pl-4 pt-4 hover:cursor-pointer hover:underline sm:p-0">
          <ChevronLeftIcon className="h-5 w-5 text-muted-foreground" />
          <Link href={`/venture/${application.venture.id}/applications`}>
            <p>View all applications</p>
          </Link>
        </div>

        <div className="flex w-full flex-col rounded-lg border-border sm:border">
          <ApplicantDetailHeader application={application} />
          <ApplicationDetailMain application={application} />
        </div>
        <div className="flex w-full flex-col gap-6">
          <div className="flex flex-col rounded-lg border-border md:border">
            <div className="flex flex-col-reverse lg:flex-row">
              <InvestorSideBar investor={application.investor} />
              <InvestorMainContent investor={application.investor} />
            </div>
          </div>
          <InvestorEmploymentDetails investor={application.investor} />
        </div>
      </div>
    </div>
  );
};
