import { formatCurrency } from "@/lib/utils";
import { ApplicationVenture } from "@/server/api/routers/types";
import React from "react";
import { ApplicationButtons } from "../applicantDetail/applicationButtons";
import { MultiStar } from "../detail/multiStar";
import { Skills } from "../skills";

export const ExtraInfo: React.FC<{ application: ApplicationVenture }> = ({
  application,
}) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <p className="pr-6 font-medium">{application.venture.percent}%</p>
        <p className="pr-6 font-medium">
          {formatCurrency(application.venture.totalPayout)}
          <span className="font-normal"> Total Payout</span>
        </p>
        <p className="pr-6 font-medium">
          10k+ <span className="font-normal">Earned</span>
        </p>
        <MultiStar simple />
      </div>
      <p className="text-muted-foreground">{application.investor.bio}</p>
      <Skills skills={application.investor.skills} />
      <div className="flex gap-2 md:hidden">
        <ApplicationButtons />
      </div>
    </div>
  );
};
