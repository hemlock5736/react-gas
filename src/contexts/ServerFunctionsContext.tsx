import { GASClient, ServerFunctions } from "gas-client";
import { FunctionMap } from "gas-client/dist/types/functions";
import { createContext, FC, ReactNode, useRef } from "react";

export const ServerFunctionsContext = createContext<
  ServerFunctions<FunctionMap>
>({});

export const ServerFunctionsProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const serverFunctionsRef = useRef<ServerFunctions<FunctionMap>>();
  if (serverFunctionsRef.current === undefined) {
    const { serverFunctions } = new GASClient({
      allowedDevelopmentDomains: (origin) =>
        /https:\/\/.*\.googleusercontent\.com$/.test(origin),
    });
    serverFunctionsRef.current = serverFunctions;
  }

  return (
    <ServerFunctionsContext.Provider value={serverFunctionsRef.current}>
      {children}
    </ServerFunctionsContext.Provider>
  );
};
