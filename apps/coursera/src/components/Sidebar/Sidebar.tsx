import { validateRequest } from "@/auth";
import React from "react";
import { SessionSidebar } from "./SessionSidebar";
import { NoSessionSidebar } from "./NoSessionSidebar";

export const Sidebar: React.FC = async () => {
  const { session, user } = await validateRequest();

  if (session) {
    return <SessionSidebar />;
  }
  if (!session) {
    return <NoSessionSidebar />;
  }
};
