import React from "react";
import { Navbar } from "@/components/navbar/Navbar";
import AuthComponent from "@/components/navbar/AuthComponent";
import { getActive } from "@/utils/getActive";

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const active = await getActive();
  return (
    <>
      <Navbar active={active}>
        <AuthComponent />
      </Navbar>
      {children}
    </>
  );
};

export default RootLayout;
