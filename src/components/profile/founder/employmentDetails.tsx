import { Founder, Investor } from "@prisma/client";
import React from "react";

export const FounderEmploymentDetails: React.FC<{ founder: Founder }> = ({
  founder,
}) => {
  const employmentDetails = [
    {
      title: "Fullstack Engineer",
      company: "Google",
      startDate: "January 2020",
      endDate: "March 2022",
      description: "Worked on the Google search engine",
    },
    {
      title: "Fullstack Engineer",
      company: "Meta",
      startDate: "May 2022",
      endDate: "Present",
      description: "Worked on the Oculus VR team",
    },
  ];

  return (
    <div className=" flex flex-col gap-8 rounded-lg border-border p-8 md:border">
      <p className="text-4xl font-semibold">Employment details</p>
      {employmentDetails.map((employment, index) => (
        <div key={index} className={`flex flex-col gap-4 `}>
          {/* {index !== 0 && <hr className="border-t border-border" />} */}
          <hr className="border-t border-border" />
          <div className="flex flex-col justify-between md:flex-row">
            <p className="text-2xl">
              {employment.title} | {employment.company}
            </p>
            <p className="text-lg text-muted-foreground">
              {`${employment.startDate} - ${employment.endDate}`}
            </p>
          </div>
          <p>{employment.description}</p>
        </div>
      ))}
    </div>
  );
};
