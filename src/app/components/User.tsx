"use client";
import { useSession } from "next-auth/react";
import React from "react";

const User =  () => {
  const session =  useSession();
  console.log(session.status);

  return <div>User</div>;
};

export default User;
