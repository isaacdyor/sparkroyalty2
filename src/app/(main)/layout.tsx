import React from "react";
import { Navbar } from "@/components/navbar/Navbar";
import AuthComponent from "@/components/navbar/AuthComponent";
import { api } from "@/trpc/server";

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const user = await api.users.getCurrent.query();
  const active = user ? user.active : null;
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
