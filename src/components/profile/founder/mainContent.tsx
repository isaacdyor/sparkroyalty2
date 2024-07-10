import type { FounderWithUser } from "@/types/types";
import React from "react";

export const FounderMainContent: React.FC<{ founder: FounderWithUser }> = ({
  founder,
}) => {
  return (
    <div className="h-full w-full border-b border-border lg:w-2/3 lg:border-none">
      <div className="flex flex-col border-b border-border p-8">
        <p className="pb-1 text-2xl font-semibold">Bio</p>
        <p>{founder.bio}</p>
      </div>
    </div>
  );
};
