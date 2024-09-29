import { DatabaseApi } from "@/data/create-api";
import { createContext } from "react";

interface DatabaseContextProps {
  api?: DatabaseApi | undefined;
}

export const DatabaseContext = createContext<DatabaseContextProps>({});
