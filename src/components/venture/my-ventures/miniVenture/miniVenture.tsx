import { Button } from "@/components/ui/button";
import { timeAgo } from "@/lib/utils";
import { VentureWithApplications } from "@/types/types";
import Link from "next/link";
import React from "react";
import { Status } from "../../status";
import { PostActions } from "../postActions";
import { useRouter } from "next/navigation";
import { PendingMiniVenture } from "./pending";
import { BuildingMiniVenture } from "./building";
import { VentureApplicationUser } from "@/server/api/routers/types";

export const MiniVenture: React.FC<{ venture: VentureApplicationUser }> = ({
  venture,
}) => {
  if (venture.status === "PENDING") {
    return <PendingMiniVenture venture={venture} />;
  } else if (venture.status === "BUILDING") {
    return <BuildingMiniVenture venture={venture} />;
  } else if (venture.status === "PAYOUT") {
    return <PendingMiniVenture venture={venture} />;
  } else if (venture.status === "COMPLETED") {
    return <PendingMiniVenture venture={venture} />;
  }
};
