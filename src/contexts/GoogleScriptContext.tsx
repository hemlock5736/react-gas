import { createContext, FC, ReactNode, useRef } from "react";
import { GoogleScript } from "../googleScript/types/google-script";
import { GSClient } from "../googleScript";

export const GoogleScriptContext = createContext<GoogleScript>(
  {} as GoogleScript,
);

export const GoogleScriptProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const googleScriptRef = useRef<GoogleScript>();
  if (googleScriptRef.current === undefined) {
    const { googleScript } = new GSClient({
      allowedDevelopmentDomains: (origin) =>
        /https:\/\/.*\.googleusercontent\.com$/.test(origin),
    });
    googleScriptRef.current = googleScript;
  }

  return (
    <GoogleScriptContext.Provider value={googleScriptRef.current}>
      {children}
    </GoogleScriptContext.Provider>
  );
};
