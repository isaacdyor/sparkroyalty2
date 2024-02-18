import { ApplicationVenture } from "@/server/api/routers/types";
import React from "react";
import { MiniApplication } from "./miniApplication";

export const ApplicationList: React.FC<{
  applications: ApplicationVenture[];
}> = ({ applications }) => {
  return (
    <div className="flex justify-center px-8 py-12 md:p-14 lg:px-20">
      <div className="flex w-full flex-col gap-8">
        <h1 className="text-5xl font-semibold">My Applications</h1>
        <div>
          <hr className="border-b-0.5 border-border" />
          {applications.map((application) => (
            <MiniApplication application={application} />
          ))}
        </div>
      </div>
    </div>
  );
};
