import React, {createContext, ReactNode, useContext, useState} from 'react';

export type ApiTokenContextType = {
  apiToken: string;
  setApiToken: (token: string) => void;
};

export const ApiTokenContext = createContext<ApiTokenContextType | undefined>(undefined);

export const ApiTokenProvider = ({ children }: { children: ReactNode }) => {
  const [apiToken, setApiToken] = useState<string>("");

  return <ApiTokenContext.Provider value={{apiToken, setApiToken}}>
    {children}
  </ApiTokenContext.Provider>;
};



export const useApiTokenContext = (): ApiTokenContextType => {
  const context = useContext(ApiTokenContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};