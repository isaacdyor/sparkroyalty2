"use client";

import { ActiveContext } from "@/utils/activeContext";
import type { ActiveType } from "@prisma/client";
import * as React from "react";
import { useState } from "react";

export const ActiveProvider: React.FC<{
  children: React.ReactNode;
  initialActive: ActiveType | null;
}> = ({ children, initialActive }) => {
  const [active, setActive] = useState<ActiveType | null>(initialActive);
  return (
    <ActiveContext.Provider value={{ active, setActive }}>
      {children}
    </ActiveContext.Provider>
  );
};
