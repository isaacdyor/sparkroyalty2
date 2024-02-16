"use client";
import { VentureStatusType } from "@prisma/client";
import React from "react";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Status: React.FC<{ status: VentureStatusType }> = ({ status }) => {
  let statusText = "";
  let toolTipText = "";
  switch (status) {
    case VentureStatusType.PENDING:
      statusText = "Pending";
      toolTipText = "Pending acceptance";
      break;
    case VentureStatusType.BUILDING:
      statusText = "The investor is building the venture";
      break;
    case VentureStatusType.PAYOUT:
      statusText = "The royalties are being paid out";
      break;
    case VentureStatusType.COMPLETED:
      statusText = "Completed";
      break;
  }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge>{statusText}</Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{toolTipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
