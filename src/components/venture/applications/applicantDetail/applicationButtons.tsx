import { Button } from "@/components/ui/button";
import React from "react";
import { AcceptApplicationButton } from "../acceptApplication";
import { ApplicationVenture } from "@/server/api/routers/types";

export const ApplicationButtons: React.FC<{
  application: ApplicationVenture;
}> = ({ application }) => {
  return (
    <>
      <Button className="w-full bg-transparent px-6" variant="outline">
        Message
      </Button>
      <AcceptApplicationButton application={application} />
    </>
  );
};
