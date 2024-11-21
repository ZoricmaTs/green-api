import React, {createContext, ReactNode, useContext, useState} from 'react';

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [idInstance, setIdInstance] = useState<number>(0);
  const [apiTokenInstance, setApiTokenInstance] = useState<string>("");

  return <AppContext.Provider value={{idInstance, apiTokenInstance, setIdInstance, setApiTokenInstance}}>
    {children}
  </AppContext.Provider>;
};

export type AppContextType = {
  idInstance: number;
  apiTokenInstance: string;
  setIdInstance: (id: number) => void;
  setApiTokenInstance: (token: string) => void;
};


export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};