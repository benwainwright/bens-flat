"use server";

import { initialise } from "@/data/initialise";
import { ReactNode } from "react";
import { DatabaseContext } from "./database-context";

interface DatabaseProviderProps {
  children: ReactNode;
}

export const DatabaseProvider = async ({ children }: DatabaseProviderProps) => {
  const database = await initialise();

  return (
    <DatabaseContext.Provider value={{ api: database }}>
      {children}
    </DatabaseContext.Provider>
  );
};
