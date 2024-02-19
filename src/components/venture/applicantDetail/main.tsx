import { formatCurrency } from "@/lib/utils";
import { ApplicationVenture } from "@/server/api/routers/types";
import React from "react";

export const ApplicationDetailMain: React.FC<{
  application: ApplicationVenture;
}> = ({ application }) => {
  return (
    <div className="flex flex-col gap-8 border-b border-border p-6">
      <div className="flex flex-col justify-between gap-2 border-b border-border pb-2 md:flex-row">
        <h4 className=" text-2xl font-medium">Application Details</h4>
        <div className="text-md flex flex-wrap items-end gap-2">
          <p className="font-semibold">
            <span className="font-normal text-muted-foreground">
              Royalty Rate:
            </span>{" "}
            {application.venture.percent}%
          </p>
          <p className="font-semibold">
            {" "}
            <span className="font-normal text-muted-foreground">
              Total Payout:
            </span>{" "}
            {formatCurrency(application.venture.totalPayout)}
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-xl">Project Interest</p>
        <p className="text-muted-foreground">{application.projectInterest}</p>
      </div>
      <div className="flex flex-col">
        <p className="text-xl">Project Skils</p>
        <p className="text-muted-foreground">{application.projectSkills}</p>
      </div>
    </div>
  );
};
