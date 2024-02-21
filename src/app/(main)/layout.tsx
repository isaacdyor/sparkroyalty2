import React, { useState } from "react";
import { Navbar } from "@/components/navbar/Navbar";
import AuthComponent from "@/components/navbar/AuthComponent";
import { getActive } from "@/utils/getActive";
import { ActiveContext } from "@/utils/activeContext";
import { ActiveType } from "@prisma/client";
import { ActiveProvider } from "@/components/active-provider";

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const initialActive = await getActive();

  return (
    <>
      <ActiveProvider initialActive={initialActive}>
        <Navbar>
          <AuthComponent />
        </Navbar>
        {children}
      </ActiveProvider>
    </>
  );
};

export default RootLayout;
