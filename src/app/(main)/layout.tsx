import { ActiveProvider } from "@/components/active-provider";
import AuthComponent from "@/components/navbar/AuthComponent";
import { Navbar } from "@/components/navbar/Navbar";
import { getActive } from "@/utils/getActive";
import React from "react";

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
