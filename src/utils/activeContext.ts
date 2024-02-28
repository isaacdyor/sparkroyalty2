import type { ActiveType } from "@prisma/client";
import { createContext, useContext } from "react";

type ActiveProps = {
  active: ActiveType | null;
  setActive: (active: ActiveType) => void;
};

export const ActiveContext = createContext<ActiveProps | null>(null);

export const useActiveContext = () => {
  const context = useContext(ActiveContext);
  if (!context) {
    throw new Error(
      "useMessagesContext must be used within a MessagesProvider",
    );
  }
  return context;
};
