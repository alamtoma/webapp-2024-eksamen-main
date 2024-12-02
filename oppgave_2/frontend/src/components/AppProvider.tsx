import React from "react";
import { AuthProvider } from "../components/AuthContext";
import { EventProvider } from "./EventContex";
// import { EventProvider } from "./admin/controllAdmin/EventContext";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <EventProvider>{children}</EventProvider>
    </AuthProvider>
  );
};
