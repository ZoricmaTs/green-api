import React, {createContext, ReactNode, useContext, useState} from 'react';

export type ApiUrlContextType = {
  apiUrl: string;
  setApiUrl: (url: string) => void;
};

export const ApiUrlContext = createContext<ApiUrlContextType | undefined>(undefined);

export const ApiUrlProvider = ({ children }: { children: ReactNode }) => {
  const [apiUrl, setApiUrl] = useState<string>("");

  return <ApiUrlContext.Provider value={{apiUrl, setApiUrl}}>
    {children}
  </ApiUrlContext.Provider>;
};



export const useApiUrlContext = (): ApiUrlContextType => {
  const context = useContext(ApiUrlContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};