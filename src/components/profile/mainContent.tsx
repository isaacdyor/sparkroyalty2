import { InvestorWithUser } from "@/types/types";
import React from "react";

export const MainContent: React.FC<{ investor: InvestorWithUser }> = ({
  investor,
}) => {
  return (
    <div className="h-full w-2/3">
      <div className="flex flex-col border-b border-border p-8">
        <p className="pb-1 text-2xl font-semibold">Fullstack Engineer</p>
        <p>{investor.bio}</p>
      </div>
      <div className="flex flex-col border-b border-border p-8">
        <p className="pb-1 text-2xl font-semibold">History</p>
        <p>{investor.bio}</p>
      </div>
      <div className="flex flex-col border-b border-border p-8">
        <p className="pb-1 text-2xl font-semibold">Portfolio</p>
        <p>{investor.bio}</p>
      </div>
      <div className="flex flex-col border-b border-border p-8">
        <p className="pb-1 text-2xl font-semibold">Skills</p>
        <div className="flex gap-1">
          {investor.skills.map((skill) => (
            <p className="rounded-full bg-secondary px-3 py-1">{skill}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
