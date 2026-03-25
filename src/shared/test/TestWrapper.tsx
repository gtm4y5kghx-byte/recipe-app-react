import React from "react";
import { DatabaseProvider } from "@nozbe/watermelondb/react";
import { Database } from "@nozbe/watermelondb";

type TestWrapperProps = {
  database: Database;
  children: React.ReactNode;
};

export const TestWrapper = ({ database, children }: TestWrapperProps) => {
  return <DatabaseProvider database={database}>{children}</DatabaseProvider>;
};

export const createWrapper = (database: Database) => {
  return ({ children }: { children: React.ReactNode }) => (
    <TestWrapper database={database}>{children}</TestWrapper>
  );
};
