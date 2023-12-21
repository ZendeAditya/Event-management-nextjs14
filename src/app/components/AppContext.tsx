"use client";
import { SessionProvider } from "next-auth/react";

const AppContext = ({ children }: any) => {
  return (
    <div>
      <SessionProvider>{children}</SessionProvider>
    </div>
  );
};

export default AppContext;
