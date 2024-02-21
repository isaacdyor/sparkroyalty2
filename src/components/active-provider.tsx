"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { ActiveContext } from "@/utils/activeContext";
import { ActiveType } from "@prisma/client";
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
